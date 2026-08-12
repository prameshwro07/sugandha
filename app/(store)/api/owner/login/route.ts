import { NextResponse } from "next/server";
import {
  createOwnerSession,
  setOwnerCookie,
  verifyOwnerCredentials,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = loginSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json(
      { message: "Enter your login details." },
      { status: 400 },
    );
  }

  try {
    const valid = await verifyOwnerCredentials(
      payload.data.username,
      payload.data.password,
    );
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid username or password." },
        { status: 401 },
      );
    }

    const token = await createOwnerSession();
    await setOwnerCookie(token);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const configured =
      error instanceof Error &&
      (error.message.includes("configured") ||
        error.message.includes("OWNER_JWT_SECRET"));
    return NextResponse.json(
      {
        message: configured ? error.message : "Login failed. Please try again.",
      },
      { status: 500 },
    );
  }
}
