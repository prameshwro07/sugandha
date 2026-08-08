"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export default function SuggestionProductCard({
  product,
}: Props) {
  return (
    <Link href={`/product/${product.slug}`}>
      <article
        className="
          group
          overflow-hidden
          rounded-xl
          border
          border-slate-100
          bg-white
          shadow-[0_3px_14px_rgba(15,23,42,0.06)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_8px_22px_rgba(15,23,42,0.10)]
        "
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="
              object-contain
              p-2
              transition-transform
              duration-300
              group-hover:scale-105
            "
            sizes="135px"
          />
        </div>

        {/* Product Content */}
        <div className="p-2">

          {/* Product Name */}
          <h3 className="truncate text-[11px] font-semibold text-slate-800">
            {product.name}
          </h3>

          {/* Notes */}
          <p className="mt-0.5 truncate text-[9px] text-slate-400">
            {product.notes}
          </p>

          {/* Rating + View */}
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[9px] text-amber-500">
              ★ {product.rating}
            </span>

            <span className="text-[9px] font-semibold text-sky-500">
              View →
            </span>
          </div>

        </div>
      </article>
    </Link>
  );
}