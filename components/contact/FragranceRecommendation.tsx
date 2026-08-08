"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

const fragrances = [
  "Fresh",
  "Sweet",
  "Woody",
  "Floral",
  "Musky",
  "Vanilla",
  "Fruity",
  "Oriental",
];

export default function FragranceRecommendation() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((value) => value !== item)
        : [...prev, item]
    );
  };

  const whatsappLink = useMemo(() => {
    const message =
      selected.length === 0
        ? `Hi Sugandha! I'm looking for a fragrance recommendation.`
        : `Hi Sugandha!

I'm looking for a fragrance recommendation.

I usually like:
${selected.map((item) => `• ${item}`).join("\n")}

Could you recommend something for me?`;

    return `https://wa.me/9779818849093?text=${encodeURIComponent(message)}`;
  }, [selected]);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">

        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100">
          <Sparkles className="h-8 w-8 text-sky-600" />
        </div>

        <h2 className="mt-8 text-4xl font-bold text-slate-900">
          Need Help Choosing a Fragrance?
        </h2>

        <p className="mt-6 text-lg text-slate-600">
          Select the fragrance styles you enjoy, and we'll recommend something
          that suits your personality.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {fragrances.map((item) => {
            const active = selected.includes(item);

            return (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`rounded-full border px-6 py-3 font-medium transition-all ${
                  active
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-slate-300 bg-white hover:border-sky-400"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          className="mt-12 inline-flex rounded-xl bg-green-500 px-8 py-4 font-semibold text-white transition hover:bg-green-600"
        >
          Get Recommendation
        </a>

      </div>
    </section>
  );
}