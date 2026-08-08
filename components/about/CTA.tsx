import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400" />

      {/* Decorative Blur */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium tracking-wide text-white backdrop-blur">
          YOUR NEXT FRAGRANCE AWAITS
        </span>

        <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-5xl">
          Ready to Find Your
          <br />
          Signature Fragrance?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-sky-100">
          Discover carefully selected fragrances that match your personality,
          boost your confidence, and leave a lasting impression wherever you go.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-lg font-semibold text-sky-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Explore Collection
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}