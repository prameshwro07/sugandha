import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import ProductGallery from "../ProductGallery";
import HomeProductCard from "../HomeProductCard";
import { ArrowRight } from "lucide-react";

export default function BestSellers() {
  // Select your featured products
  const bestSellers = products.filter((product) =>
    [

      "blueberry-musk",
      "hawas",
      "cr7-attar",
      "amaze4-gift-set",
      "eclaire"
    ].includes(product.slug)
  );

  return (
    <section className="bg-slate-50 py-5 lg:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-0">

        <div className="flex items-center justify-between">

          <div>

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              Best Sellers
            </span>

            <h2 className="mt-1.5 text-lg font-medium text-slate-900 lg:text-xl">
              Customer's Favorites
            </h2>

            <p className="mt-1.5 max-w-xl text-sm pb-1 text-slate-600">
              Discover the fragrances our customers love the most.
            </p>

          </div>


          {/* Desktop View All */}
          <Link
            href="/shop"
            className="hidden md:flex items-center justify-center gap-2 border border-slate-300 px-10 py-2 text-sm font-semibold transition hover:border-sky-500 hover:text-sky-600"
          >
            View All
            <ArrowRight size={18} />
          </Link>

        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className={`
        ${index >= 4 ? "hidden lg:block" : ""}
        ${index >= 5 ? "hidden 2xl:block" : ""}
      `}
            >
              <HomeProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">

          <Link
            href="/shop"
            className="flex w-full items-center justify-center gap-2 border border-slate-200 px-10 py-2 font-semibold transition hover:border-sky-500 hover:text-sky-600"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}