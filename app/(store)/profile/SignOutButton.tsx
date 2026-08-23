"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/profile" })}
      className="w-full -4 py-3 text-sm font-medium text-red-600 transition"
    >
      Sign Out
    </button>
  );
}