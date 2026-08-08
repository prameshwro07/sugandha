import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">
      {/* Background Blur */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-12 text-center lg:px-8">
        {/* Badge */}
        <span className="rounded-full border border-sky-200 bg-white px-4 py-1 text-sm font-medium text-sky-700 shadow-sm">
          ABOUT SUGANDHA
        </span>

        {/* Heading */}
        <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
          Fragrances That Leave
          <br />
          <span className="text-sky-500">a Lasting Impression.</span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          At Sugandha, we believe fragrance is more than just a scent—it's
          confidence, personality, and the memories you leave behind. Our
          mission is to help people across Nepal discover fragrances they truly
          love wearing, every single day.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-10 rounded-xl bg-sky-500 px-7 py-3 font-semibold text-white transition hover:bg-sky-600"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}