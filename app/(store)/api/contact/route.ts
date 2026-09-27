import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";
import { contactMessageSchema } from "@/lib/validation";
import { readJsonBody, RequestBodyTooLargeError } from "@/lib/request-body";

const MAX_CONTACT_BODY_BYTES = 16 * 1024;

export async function POST(request: Request) {
  try {
    const session = await auth();

    let body: unknown;
    try {
      body = await readJsonBody(request, MAX_CONTACT_BODY_BYTES);
    } catch (error) {
      const tooLarge = error instanceof RequestBodyTooLargeError;
      return NextResponse.json(
        { error: tooLarge ? "Contact request is too large." : "Invalid request body." },
        { status: tooLarge ? 413 : 400 }
      );
    }

    const payload = contactMessageSchema.safeParse(body);
    if (!payload.success) {
      return NextResponse.json(
        { error: "Please check the contact form fields and try again." },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = payload.data;

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
