"use client";

import { Product, formatPrice } from "@/lib/products";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/store/cart";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const addToCart = useCart((state) => state.addToCart);
  const router = useRouter();

  const save = product.originalPrice - product.price;

  return (
    <div className="flex flex-col">

      {/* Product Name */}
      <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl lg:text-3xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-1.5 text-sm sm:mt-3 sm:text-base">
        <Star
          size={15}
          className="fill-yellow-400 text-yellow-400 sm:h-[18px] sm:w-[18px]"
        />

        <span className="font-medium">
          {product.rating}
        </span>

        <span className="text-xs text-slate-500 sm:text-sm">
          ({product.reviews} Reviews)
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
        {product.description}
      </p>

      {/* Price */}
      <div className="mt-4 flex items-center gap-2 sm:mt-5 sm:gap-3">
        <span className="text-2xl font-bold text-sky-500 sm:text-3xl">
          {formatPrice(product.price)}
        </span>

        <span className="text-sm text-slate-400 line-through sm:text-lg">
          {formatPrice(product.originalPrice)}
        </span>
      </div>

      {/* Stock & Volume */}
      <div className="mt-4 space-y-2 text-sm sm:mt-5 sm:space-y-3 sm:text-base">

        <div className="flex gap-2">
          <span className="font-semibold">
            Stock:
          </span>

          <span
            className={
              product.stockStatus === "in-stock"
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {product.stockStatus === "in-stock"
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>

        <div className="flex gap-2">
          <span className="font-semibold">
            Volume:
          </span>

          <span>{product.volume}</span>
        </div>

      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:gap-3">

        <button
          onClick={() => addToCart(product)}
          disabled={product.stockStatus === "out-of-stock"}
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-200
            text-sm
            font-semibold
            transition-transform
            duration-150
            hover:bg-sky-50
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:h-12
            sm:rounded-xl
            sm:text-base
          "
        >
          Add to Cart
        </button>

        <button
          onClick={() =>
            router.push(`/checkout?buyNow=${product.id}`)
          }
          disabled={product.stockStatus === "out-of-stock"}
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-sky-400
            text-sm
            font-semibold
            text-slate-900
            transition-transform
            duration-150
            hover:bg-sky-300
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            sm:h-12
            sm:rounded-xl
            sm:text-base
          "
        >
          Buy Now
        </button>

      </div>

    </div>
  );
}