"use client";

import Image from "next/image";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/store/cart";
import type { ComboOffer as ComboOfferType } from "@/lib/products";
import { formatPrice } from "@/lib/products";

type Props = {
  combo: ComboOfferType;
};

export default function ComboOffer({ combo }: Props) {
  const router = useRouter();
  const addToCart = useCart((state) => state.addToCart);

  const savings = combo.originalPrice - combo.price;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-sky-50">
      <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:p-12">

        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image
            src={combo.image}
            alt={combo.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <span className="inline-flex rounded-full bg-sky-400 px-3 py-1 text-xs font-semibold text-slate-900">
            COMBO OFFER
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {combo.name}
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
            {combo.description}
          </p>

          {/* Items */}
          <div className="mt-5 flex flex-wrap gap-2">
            {combo.items.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-6 flex items-end gap-3">
            <span className="text-2xl font-bold text-sky-600">
              {formatPrice(combo.price)}
            </span>

            <span className="pb-0.5 text-sm text-slate-400 line-through">
              {formatPrice(combo.originalPrice)}
            </span>
          </div>

          {/* Savings */}
          <p className="mt-1 text-sm font-semibold text-green-600">
            Save {formatPrice(savings)}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">

            <button
              onClick={() => {
                // We'll connect this to the cart properly next
                router.push(`/product/${combo.slug}`);
              }}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-sky-400
                px-6
                text-sm
                font-semibold
                text-slate-900
                transition
                hover:bg-sky-300
                active:scale-[0.98]
              "
            >
              View Combo
              <ArrowRight size={16} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}