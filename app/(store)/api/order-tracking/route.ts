import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";
import { serializeOrder } from "@/lib/orders";

export async function POST(request: Request) {
  try {
    const { orderId, phone } = await request.json();

    if (!orderId || !phone) {
      return NextResponse.json(
        { message: "Order ID and phone number are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Validate Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { message: "Invalid Order ID." },
        { status: 400 }
      );
    }

    const order = await OrderModel.findOne({
      _id: orderId,
      phone: phone.trim(),
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: serializeOrder(order),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}