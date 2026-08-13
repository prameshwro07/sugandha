import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";

export async function POST(request: Request) {
  try {
    const session = await auth();

    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        {
          error: "Please fill in all fields.",
        },
        { status: 400 }
      );
    }

    // Basic message length protection
    if (message.length > 5000) {
      return NextResponse.json(
        {
          error: "Message is too long.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,

      // If logged in, save the user's email
      userEmail: session?.user?.email ?? undefined,

      status: "New",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        contactId: contactMessage._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT_MESSAGE_ERROR:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}