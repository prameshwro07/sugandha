"use client";

import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/src/store/cart";
import ImageSlider from "./imageSlider";

type Props = {
  product: Product;
  compact?: boolean;
  suggestion?: boolean;
};

export function ProductCard({ product, compact = false, suggestion = false }: Props) {
  const addToCart = useCart((state) => state.addToCart);
  const router = useRouter();
  return (
    <article
      onClick={() => router.push(`/product/${product.slug}`)}
      className={`group w-full max-w-[280px] overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${compact ? "max-w-[210px]" : ""
        }`}
    >
      {/* Product Image */}
      <div
        className={`relative overflow-hidden bg-sky-50 ${compact ? "aspect-[4/5]" : "aspect-square"
          }`}
      >
        <ImageSlider
          images={product.images}
          alt={product.name}
        />
      </div>


      {/* Content */}
      <div className={compact ? "p-3" : "p-3 lg:p-4"}>
        <h2
          className={`line-clamp-1 font-semibold text-slate-900 ${compact ? "text-sm" : "text-sm lg:text-base"
            }`}
        >
          {product.name}
        </h2>

        <p
          className={`mt-1 line-clamp-2 text-slate-500 ${compact ? "text-xs" : "text-xs lg:text-sm"
            }`}
        >
          {product.notes}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span
            className={`font-bold text-slate-900 ${compact ? "text-sm" : "text-base"
              }`}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <div
          className={`mt-3 flex flex-col ${compact ? "gap-1.5" : "gap-2"
            }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white font-semibold transition hover:bg-sky-50 ${compact
              ? "px-3 py-2 text-xs"
              : "px-4 py-2.5 text-sm"
              }`}
          >
            <ShoppingCart
              size={compact ? 14 : 16}
              className="hidden md:block"
            />

            Add to Cart
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/checkout?buyNow=${product.id}`);
            }}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 font-semibold text-slate-900 transition hover:bg-sky-300 ${compact
              ? "px-3 py-2 text-xs"
              : "px-4 py-2.5 text-sm"
              }`}
          >
            <ShoppingBag
              size={compact ? 14 : 16}
              className="hidden md:block"
            />
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}