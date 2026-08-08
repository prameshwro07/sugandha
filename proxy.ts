import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const cookieName = "owner_session";

async function hasValidOwnerSession(request: NextRequest) {
  const token = request.cookies.get(cookieName)?.value;
  const secret = process.env.OWNER_JWT_SECRET;

  if (!token || !secret || secret.length < 32) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === "owner";
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/orders" && request.method === "POST") {
    return NextResponse.next();
  }

  const authorized = await hasValidOwnerSession(request);

  if (authorized) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/owner/login";
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(cookieName);
  return response;
}

export const config = {
  matcher: ["/owner/dashboard/:path*", "/api/orders/:path*", "/api/owner/socket-token"],
};
