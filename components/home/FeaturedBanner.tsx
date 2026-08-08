import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function FeaturedBanner() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">

        {/* Image */}

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-sky-200/30 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/banner-v2.jpg"
              alt="Premium Attar Collection"
              width={700}
              height={800}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}

        <div>
          <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            DISCOVER YOUR SIGNATURE SCENT
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Every Fragrance
            <br />
            Leaves a
            <span className="text-sky-500"> Lasting Impression.</span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Whether you're heading to work, meeting friends, attending a family
            gathering, or celebrating a special occasion, the right fragrance
            helps you feel confident and remembered.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-sky-500" />
              <span>Carefully selected fragrances</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-sky-500" />
              <span>Long-lasting scent experience</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-sky-500" />
              <span>Suitable for every occasion</span>
            </div>
          </div>

          <Link
            href="/shop"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-7 py-4 font-semibold text-white transition hover:bg-sky-600"
          >
            Explore Collection

            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}