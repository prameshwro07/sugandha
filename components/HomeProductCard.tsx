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

  return (
    <div
      onClick={() => router.push(`/product/${product.slug}`)}
      className="
        group
        w-full
        overflow-hidden
        rounded-2xl
        bg-white
        text-left
        shadow-[0_4px_20px_rgba(15,23,42,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]
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
            p-3
            transition-transform
            duration-500
            group-hover:scale-105
          "
          sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 250px"
        />
      </div>

      {/* Product Details */}
      <div className="relative p-3 sm:p-4">

        {/* Product Name */}
        <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center">
          <span className="text-[11px] tracking-tight text-yellow-500 sm:text-sm">
            ★★★★★
          </span>

          <span className="ml-1.5 text-[10px] text-slate-400 sm:text-xs">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <p className="mt-1.5 text-base font-bold text-sky-600 sm:text-lg">
          {formatPrice(product.price)}
        </p>

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
                bottom-16
                left-1/2
                z-20
                -translate-x-1/2
                whitespace-nowrap
                rounded-lg
                bg-slate-800
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
            mt-3
            h-9
            w-full
            rounded-xl
            bg-sky-500
            text-xs
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-sky-600
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