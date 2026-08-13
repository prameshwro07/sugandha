"use client";

import { signIn } from "next-auth/react";
import Image from "next/image"

export default function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/profile" })}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <Image
        src="/icons/google.png"
        alt="Cart"
        width={18}
        height={18}
      />
      Continue with Google
    </button>
  );
}