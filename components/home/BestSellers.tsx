import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import ProductGallery from "../ProductGallery";
import HomeProductCard from "../HomeProductCard";

export default function BestSellers() {
  // Select your featured products
  const bestSellers = products.filter((product) =>
    [
      "cr7-attar",
      "blueberry-musk",
      "chocolate-musk",
      "french-tobacco",
    ].includes(product.slug)
  );

  return (
    <section className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
              Best Sellers
            </span>

            {/* <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Customer Favorites
            </h2> */}

            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Discover the fragrances our customers love the most.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:border-sky-500 hover:text-sky-600 md:block"
          >
            View All
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {bestSellers.map((product) => (
            <HomeProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/shop"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:border-sky-500 hover:text-sky-600"
          >
            View All Products
          </Link>
        </div>

      </div>
    </section>
  );
}