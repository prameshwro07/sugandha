import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getOwnerSession } from "@/lib/auth";
import ContactMessage from "@/lib/models/ContactMessage";

export async function GET() {
  // Same owner authentication used by /api/orders
  const session = await getOwnerSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    await connectToDatabase();

    const messages = await ContactMessage.find({})
      .sort({ createdAt: -1 })
      .limit(250)
      .lean();

    return NextResponse.json({
      messages,
    });
  } catch (error) {
    console.error("Could not load contact messages.", error);

    return NextResponse.json(
      { message: "Could not load contact messages." },
      { status: 500 },
    );
  }
}