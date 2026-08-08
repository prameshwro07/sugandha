import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-12 text-center lg:px-8">
        {/* Badge */}
        <span className="rounded-full border border-sky-200 bg-white px-4 py-1 text-sm font-medium text-sky-700 shadow-sm">
          CONTACT SUGANDHA
        </span>

        {/* Heading */}
        <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
          We're Here to Help You
          <br />
          <span className="text-sky-500">Smell Your Best.</span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          Whether you're looking for the perfect fragrance, have a question
          about your order, or simply need some advice, our team is always
          happy to help.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="https://wa.me/9779818849093?text=Hi%20Sugandha!%20I'm%20looking%20for%20a%20fragrance%20recommendation."
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-7 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            <img src="/whatsapp.png" alt="" className="h-5 w-5"/>
            Chat on WhatsApp
          </Link>

          <Link
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
          >
            Send a Message
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span>💬 Friendly Support</span>
          <span>🚚 Delivery Across Nepal</span>
          <span>⚡ Instant Delivery (Coming Soon)</span>
        </div>
      </div>
    </section>
  );
}