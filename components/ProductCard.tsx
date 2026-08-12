"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/src/store/cart";
import Image from "next/image";

type Props = {
  product: Product;
  compact?: boolean;
  suggestion?: boolean;
};

export function ProductCard({
  product,
  compact = false,
  suggestion = false,
}: Props) {
  const addToCart = useCart((state) => state.addToCart);
  const router = useRouter();

  const shortName = product.name.split(" ").slice(0, 2).join(" ");

  return (
    <article className="group w-full text-left">

      {/* Product Image */}
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="
          relative
          aspect-square
          w-full
          cursor-pointer
          overflow-hidden
          bg-slate-50
          lg:aspect-[1/0.9]
          xl:aspect-[1/0.86]
        "
      >
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="
            (max-width: 640px) 50vw,
            (max-width: 1024px) 33vw,
            220px
          "
          className="
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-[1.04]
          "
        />
      </div>


      {/* Product Details */}
      <div className={compact ? "pt-1.5" : "pt-2"}>

        {/* Product Name */}
        <button
          onClick={() => router.push(`/product/${product.slug}`)}
          className="
            block
            w-full
            truncate
            text-left
            text-sm
            font-semibold
            leading-tight
            tracking-tight
            text-slate-900
            transition-colors
            duration-200
            hover:text-sky-600
            lg:text-sm
          "
        >
          {shortName}
        </button>


        {/* Rating */}
        <div className="mt-0.5 flex items-center">
          <span className="text-[10px] leading-none tracking-tight text-yellow-500">
            ★★★★★
          </span>

          <span className="ml-1 text-[10px] leading-none text-slate-400">
            ({product.rating})
          </span>
        </div>


        {/* Price */}
        <p className="mt-1 text-sm font-bold leading-none text-sky-600">
          {formatPrice(product.price)}
        </p>


        {/* Add to Cart */}
        <div className="mt-2 flex w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="
              inline-flex
              h-8
              w-full
              items-center
              justify-center
              gap-1.5
              border
              border-slate-200
              bg-white
              px-3
              text-xs
              font-semibold
              text-slate-800
              transition-all
              duration-200
              hover:border-sky-500
              hover:bg-sky-500
              hover:text-white
              active:scale-[0.98]
              lg:h-9
            "
          >
            Add to Cart
          </button>
        </div>

      </div>
    </article>
  );
}