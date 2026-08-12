"use client";

import { useRouter } from "next/navigation";

export default function SignatureSection() {
  const router = useRouter();

  return (
    <section className="w-full bg-slate-50 py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">

        {/* Eyebrow */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-600 sm:text-xs">
          Your Signature
        </p>

        {/* Heading */}
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
          What's Your Signature?
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
          Your fragrance says something about you.
        </p>

        {/* Scent types */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600 sm:gap-x-8 sm:text-sm">
          <span>Fresh</span>
          <span className="text-sky-400">•</span>
          <span>Sweet</span>
          <span className="text-sky-400">•</span>
          <span>Bold</span>
          <span className="text-sky-400">•</span>
          <span>Sensual</span>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="mt-5 rounded-md bg-sky-400 px-5 py-2 text-xs font-semibold text-slate-900 transition hover:bg-sky-500 active:scale-[0.98]"
        >
          Discover Your Scent →
        </button>

      </div>
    </section>
  );
}