import { NextResponse } from "next/server";
import { createOwnerSocketToken, getOwnerSession } from "@/lib/auth";

export async function POST() {
  const session = await getOwnerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    return NextResponse.json({ token: await createOwnerSocketToken() });
  } catch {
    return NextResponse.json(
      { message: "Socket authentication is not configured." },
      { status: 500 },
    );
  }
}
