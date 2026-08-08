"use client";

import { products, Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import SuggestionProductCard from "./SuggestionProductCard";

type Props = {
  product: Product;
};

export default function ProductSuggestions({
  product,
}: Props) {

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
    .slice(0, 10)
    .map((item) => item.product);
  if (suggestions.length === 0) return null;

  return (
    <section className="mx-auto mt-20 max-w-6xl px-8 py-8 lg:px-8">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          You May Also Like
        </h2>

        <p className="mt-2 text-slate-500">
          Similar fragrances you might enjoy.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-4">
        {suggestions.map((product) => (
          <SuggestionProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}