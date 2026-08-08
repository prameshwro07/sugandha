"use client";

import Link from "next/link";

interface Props {
  title: string;
  message: string;
}

export default function CartToast({ title, message }: Props) {
  return (
    <div className="w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        {message}
      </p>

      <Link
        href="/cart"
        className="mt-4 inline-block rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600"
      >
        View Cart
      </Link>
    </div>
  );
}