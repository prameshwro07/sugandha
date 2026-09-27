import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";
import { orderCreateSchema } from "@/lib/validation";
import { orderDateParts, serializeOrder } from "@/lib/orders";
import { getOwnerSession } from "@/lib/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { readJsonBody, RequestBodyTooLargeError } from "@/lib/request-body";

const MAX_ORDER_BODY_BYTES = 64 * 1024;

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await readJsonBody(request, MAX_ORDER_BODY_BYTES);
    } catch (error) {
      const tooLarge = error instanceof RequestBodyTooLargeError;
      return NextResponse.json(
        { message: tooLarge ? "Order request is too large." : "Invalid request body." },
        { status: tooLarge ? 413 : 400 },
      );
    }

    const payload = orderCreateSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json(
        {
          message: "Please check the order form.",
          errors: payload.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { products, paymentMethod, customerName, phone, email, address } =
      payload.data;

    // Totals
    const subtotal = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );

    const FREE_DELIVERY_THRESHOLD = 999;
    const DELIVERY_FEE = 79;

    const deliveryFee =
      subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

    const totalPrice = subtotal + deliveryFee;

    await connectToDatabase();

    const dateParts = orderDateParts();

    const order = await OrderModel.create({
      customerName,
      phone,
      email: email ?? undefined,
      address,

      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        images: p.image ? [p.image] : [],
      })),

      totalPrice,
      paymentMethod,
      status: "Pending",
      ...dateParts,
    });

    if (order.email) {
      try {
        await sendOrderConfirmationEmail({
          customerName: order.customerName,
          email: order.email,
          orderId: order._id.toString(),
          products: order.products,
          totalPrice: order.totalPrice,
          paymentMethod: order.paymentMethod,
        });
      } catch (emailError) {
        const code =
          typeof emailError === "object" && emailError !== null && "code" in emailError
            ? String(emailError.code)
            : "unknown";
        console.error("ORDER_CONFIRMATION_EMAIL_FAILED", code);
      }
    }

    const serialized = serializeOrder(order);

    return NextResponse.json({ order: serialized }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("MONGODB_URI")
        ? "Order storage is not configured yet."
        : "We could not save your order. Please try again.";

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getOwnerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const view = url.searchParams.get("view");
    const search = url.searchParams.get("search")?.trim();
    const status = url.searchParams.get("status");
    const now = new Date();
    const filter: Record<string, unknown> = {};

    if (status && ["Pending", "Delivered", "Cancelled"].includes(status)) {
      filter.status = status;
    }

    if (view === "today") {
      filter.date = orderDateParts(now).date;
    }

    if (view === "month") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      filter.timestamp = { $gte: start, $lt: end };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const orders = await OrderModel.find(filter)
      .sort({ timestamp: -1 })
      .limit(250)
      .lean();
    const today = orderDateParts(now).date;
    const [statsResult] = await OrderModel.aggregate<StatsResult>([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0] },
          },
          todayRevenue: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "Delivered"] },
                    { $eq: ["$date", today] },
                  ],
                },
                { $ifNull: ["$price", 0] },
                0,
              ],
            },
          },
        },
      },
    ]);
    const stats = {
      totalOrders: statsResult?.totalOrders ?? 0,
      pendingOrders: statsResult?.pendingOrders ?? 0,
      deliveredOrders: statsResult?.deliveredOrders ?? 0,
      todayRevenue: statsResult?.todayRevenue ?? 0,
    };

    return NextResponse.json({
      orders: orders.map(serializeOrder),
      stats,
    });
  } catch {
    return NextResponse.json(
      { message: "Could not load orders." },
      { status: 500 },
    );
  }
}

type StatsResult = {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  todayRevenue: number;
};
