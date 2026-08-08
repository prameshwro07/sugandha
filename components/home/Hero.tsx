import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import FloatingBottle from "./FloatingBottle";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-50">
      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-6 pt-14 pb-16 lg:flex-row lg:px-8">
        {/* LEFT */}
        <div className="flex-1 text-center lg:text-left">

          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Smell Good. Feel Confident.
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 md:text-5xl">
            Premium
            <span className="block text-sky-500">
              Attars & Perfumes
            </span>
          </h1>

          {/* <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Discover carefully selected fragrances that match your personality,
            boost your confidence, and leave a lasting impression wherever you go.
          </p> */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-7 py-4 font-semibold text-white transition hover:bg-sky-600"
            >
              Shop Collection
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
            >
              Get Recommendation
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-600 lg:justify-start">
            <span>🚚 Delivery Across Nepal</span>
            <span>💳 Cash on Delivery</span>
            <span>⚡ Instant Delivery Coming Soon</span>
          </div>
        </div>

        {/* <div className="flex flex-1 justify-center">
          <FloatingBottle />
        </div> */}
      </div>
    </section>
  );
}