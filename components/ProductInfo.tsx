"use client";

import { Product, formatPrice } from "@/lib/products";
import { ShoppingBag, ShoppingCart, Star } from "lucide-react";
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
      <h1 className="text-2xl font-bold text-slate-900">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2">
        <Star
          size={18}
          className="fill-yellow-400 text-yellow-400"
        />

        <span className="font-medium">
          {product.rating}
        </span>

        <span className="text-slate-500">
          ({product.reviews} Reviews)
        </span>
      </div>

      {/* Description */}
      <div className="">

        {/* <h2 className="text-xl font-bold">
          Description
        </h2> */}

        <p className="mt-4 leading-8 text-slate-600">
          {product.description}
        </p>

      </div>

      {/* Price */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-3xl font-bold text-sky-500">
          {formatPrice(product.price)}
        </span>

        <span className="text-lg text-slate-400 line-through">
          {formatPrice(product.originalPrice)}
        </span>
      </div>

      {/* <p className="mt-2 text-green-600 font-medium">
        Save {formatPrice(save)}
      </p> */}

      {/* Stock */}
      <div className="mt-6 space-y-3">

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
      <div className="mt-8 flex flex-col gap-3">

        <button
          onClick={() => addToCart(product)}
          disabled={product.stockStatus === "out-of-stock"}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-semibold  hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 transition-transform duration-150 active:scale-90"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <button
          onClick={() =>
            router.push(`/checkout?buyNow=${product.id}`)
          }
          disabled={product.stockStatus === "out-of-stock"}
          className="flex items-center justify-center gap-2 rounded-xl bg-sky-400 py-3 font-semibold text-slate-900 hover:bg-sky-300 disabled:cursor-not-allowed disabled:bg-slate-300 transition-transform duration-150 active:scale-90"
        >
          <ShoppingBag size={18} />
          Buy Now
        </button>

      </div>

    </div>
  );
}