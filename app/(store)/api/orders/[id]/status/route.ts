import { NextResponse } from "next/server";
import { getOwnerSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";
import { emitOrderEvent } from "@/lib/realtime";
import { serializeOrder } from "@/lib/orders";
import { statusUpdateSchema } from "@/lib/validation";
import { sendDeliveryEmail, sendCancellationEmail } from "@/lib/email";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getOwnerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const payload = statusUpdateSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ message: "Invalid status." }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const { id } = await context.params;
    const order = await OrderModel.findById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    if (order.status !== "Pending") {
      return NextResponse.json(
        { message: "Finalized orders cannot be changed." },
        { status: 409 },
      );
    }

    order.status = payload.data.status;
    await order.save();
    console.log(order);

    if (order.status === "Delivered") {
      await sendDeliveryEmail({
        customerName: order.customerName,
        email: order.email,
        orderId: order._id.toString(),
        productName: order.products.name,
        quantity: order.products.quantity,
        totalPrice: order.totalPrice,
      });
    }

    if (order.status === "Cancelled") {
      await sendCancellationEmail({
        customerName: order.customerName,
        email: order.email,
        orderId: order._id.toString(),
        productName: order.productName,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
      });
    }

    const serialized = serializeOrder(order);
    await emitOrderEvent("order:updated", serialized);

    return NextResponse.json({ order: serialized });
  } catch {
    return NextResponse.json(
      { message: "Could not update order status." },
      { status: 500 },
    );
  }
}
