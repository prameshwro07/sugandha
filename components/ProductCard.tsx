"use client";

import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/src/store/cart";
import ImageSlider from "./imageSlider";
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

  // Show only the first two words
  const shortName = product.name.split(" ").slice(0, 2).join(" ");

  return (
    // <article
    //   className={`
    //     group
    //     w-full
    //     text-left
    //     ${compact ? "max-w-[210px]" : "max-w-[280px]"}
    //   `}
    // >
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
        "
      >
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
      <div className={compact ? "pt-2" : "pt-2.5"}>
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
            lg:text-base
          "
        >
          {shortName}
        </button>

        {/* Rating */}
        <div className="mt-1 flex items-center">
          <span className="text-[11px] leading-none tracking-tight text-yellow-500">
            ★★★★★
          </span>

          <span className="ml-1 text-[10px] leading-none text-slate-400 lg:text-xs">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <p className="mt-1 text-sm font-bold leading-none text-sky-600 lg:text-base">
          {formatPrice(product.price)}
        </p>

        {/* Buttons */}
        <div className="mt-2.5 flex w-full flex-col gap-1.5">
          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="
              inline-flex
              h-9
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
              lg:h-10
              lg:text-sm
            "
          >
            <ShoppingCart
              size={15}
              strokeWidth={2}
              className="hidden sm:block"
            />
            Add to Cart
          </button>

          {/* Buy Now */}
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/checkout?buyNow=${product.id}`);
            }}
            className="
              inline-flex
              h-9
              w-full
              items-center
              justify-center
              gap-1.5
              bg-sky-400
              px-3
              text-xs
              font-semibold
              text-slate-900
              transition-all
              duration-200
              hover:bg-sky-300
              active:scale-[0.98]
              lg:h-10
              lg:text-sm
            "
          >
            <ShoppingBag
              size={15}
              strokeWidth={2}
              className="hidden sm:block"
            />
            Buy Now
          </button> */}
        </div>
      </div>
    </article>
  );
}