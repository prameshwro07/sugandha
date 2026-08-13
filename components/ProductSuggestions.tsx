"use client";

import { products, Product } from "@/lib/products";
import SuggestionProductCard from "./SuggestionProductCard";

type Props = {
  product: Product;
};

export default function ProductSuggestions({ product }: Props) {
  const suggestions = products
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      product: p,
      score: p.categories.filter((category) =>
        product.categories.includes(category)
      ).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map((item) => item.product);

  if (suggestions.length === 0) return null;

  return (
    <section className="mx-auto mt-10 max-w-[1800px] px-4 py-4 sm:px-6 lg:px-12">

      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          You May Also Like
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Similar fragrances you might enjoy.
        </p>
      </div>

      {/* Suggestions */}
      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-7
          2xl:grid-cols-10
        "
      >
        {suggestions.map((product, index) => (
          <div
            key={product.id}
            className={`
              ${index >= 4 ? "hidden" : ""}
              sm:${index >= 6 ? "hidden" : ""}
              md:${index >= 8 ? "hidden" : ""}
              lg:${index >= 12 ? "hidden" : ""}
              xl:${index >= 14 ? "hidden" : ""}
              2xl:${index >= 20 ? "hidden" : ""}
            `}
          >
            <SuggestionProductCard product={product} />
          </div>
        ))}
      </div>

    </section>
  );
}