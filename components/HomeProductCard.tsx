"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { useCart } from "@/src/store/cart";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export default function HomeProductCard({ product }: Props) {
  const router = useRouter();
  const addToCart = useCart((state) => state.addToCart);
  const [showAdded, setShowAdded] = useState(false);

  // Show only the first two words
  const shortName = product.name.split(" ").slice(0, 2).join(" ");

  return (
    <div className="group w-full text-left">
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
    object-contain
    transition-transform
    duration-500
    ease-out
    group-hover:scale-[1.04]
  "
        />

        {/* Added to Cart Message */}
        <AnimatePresence>
          {showAdded && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="
                absolute
                bottom-4
                left-1/2
                z-20
                -translate-x-1/2
                whitespace-nowrap
                rounded-full
                bg-slate-900
                px-3
                py-2
                text-[11px]
                font-medium
                text-white
                shadow-lg
              "
            >
              ✓ Added to cart
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compact Product Details */}
      <div className="pt-2.5">
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
            sm:text-base
          "
        >
          {shortName}
        </button>

        {/* Rating */}
        <div className="mt-1 flex items-center">
          <span className="text-[11px] leading-none tracking-tight text-yellow-500">
            ★★★★★
          </span>

          <span className="ml-1 text-[10px] leading-none text-slate-400 sm:text-xs">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <p className="mt-1 text-sm font-bold leading-none text-sky-600 sm:text-base">
          {formatPrice(product.price)}
        </p>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();

            addToCart(product);

            setShowAdded(true);

            setTimeout(() => {
              setShowAdded(false);
            }, 1500);
          }}
          className="
            mt-2.5
            h-9
            w-full
            border
            border-slate-200
            bg-white
            text-xs
            font-semibold
            text-slate-800
            transition-all
            duration-200
            hover:border-sky-500
            hover:bg-sky-500
            hover:text-white
            active:scale-[0.98]
            sm:h-10
            sm:text-sm
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}