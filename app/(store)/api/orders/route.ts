import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { emitOrderEvent } from "@/lib/realtime";
import { OrderModel } from "@/lib/models/order";
import { orderCreateSchema } from "@/lib/validation";
import { orderDateParts, serializeOrder } from "@/lib/orders";
import { getOwnerSession } from "@/lib/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = orderCreateSchema.safeParse(await request.json());

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
        image: p.image,
      })),

      totalPrice,
      paymentMethod,
      status: "Pending",
      ...dateParts,
    });

    await sendOrderConfirmationEmail({
      customerName: order.customerName,
      email: order.email,
      orderId: order._id.toString(),
      products: order.products,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
    });

    const serialized = serializeOrder(order);

    emitOrderEvent("order:created", serialized).catch((eventError) => {
      console.error("Could not emit order creation event.", eventError);
    });

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
      .lean(false);
    const allOrders = await OrderModel.find({})
      .select("status price date")
      .lean();
    const today = orderDateParts(now).date;

    const stats = allOrders.reduce(
      (acc, order) => {
        acc.totalOrders += 1;
        if (order.status === "Pending") acc.pendingOrders += 1;
        if (order.status === "Delivered") {
          acc.deliveredOrders += 1;
          if (order.date === today) acc.todayRevenue += order.price;
        }
        return acc;
      },
      { totalOrders: 0, pendingOrders: 0, deliveredOrders: 0, todayRevenue: 0 },
    );

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
