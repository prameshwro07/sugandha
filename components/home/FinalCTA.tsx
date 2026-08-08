import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400" />

      {/* Decorative Glow */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center text-white">

        <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
          Let's Smell Good ✨
        </span>

        <h2 className="mt-8 text-4xl font-extrabold leading-tight md:text-5xl">
          Ready to Find Your
          <br />
          Signature Fragrance?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-sky-50">
          Discover fragrances that match your personality, elevate your
          confidence, and leave a lasting impression wherever you go.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-sky-600 transition hover:scale-105 hover:bg-slate-100"
          >
            Shop Collection
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="https://wa.me/97798XXXXXXXX"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </Link>
        </div>

        <p className="mt-8 text-sm text-sky-100">
          🚚 Delivery Across Nepal • 💳 Cash on Delivery • ⚡ Instant Delivery
          (Coming Soon)
        </p>

      </div>
    </section>
  );
}