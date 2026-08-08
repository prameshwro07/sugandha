import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const cookieName = "owner_session";

function secretKey() {
  const secret = process.env.OWNER_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("OWNER_JWT_SECRET must be at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyOwnerCredentials(username: string, password: string) {
  const configuredUsername = process.env.OWNER_USERNAME;
  const passwordHash = process.env.OWNER_PASSWORD_HASH;
  const plainPassword = process.env.OWNER_PASSWORD;

  if (!configuredUsername || (!passwordHash && !plainPassword)) {
    throw new Error("Owner credentials are not configured.");
  }

  if (username !== configuredUsername) {
    return false;
  }

  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  return password === plainPassword;
}

export async function createOwnerSession() {
  return new SignJWT({ role: "owner" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey());
}

export async function createOwnerSocketToken() {
  return new SignJWT({ role: "owner", scope: "orders:read" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setAudience("socket")
    .setExpirationTime("10m")
    .sign(secretKey());
}

export async function getOwnerSession() {
  const store = await cookies();
  const token = store.get(cookieName)?.value;
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "owner" ? payload : null;
  } catch {
    return null;
  }
}

export async function setOwnerCookie(token: string) {
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearOwnerCookie() {
  const store = await cookies();
  store.delete(cookieName);
}
