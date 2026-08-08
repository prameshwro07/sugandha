"use client";

import { products } from "@/lib/products";
import HomeProductCard from "./HomeProductCard";
import { motion } from "framer-motion";
type Props = {
  title: string;
  subtitle: string;
  category: string;
};

export default function CategorySection({
  title,
  subtitle,
  category,
}: Props) {
  const filteredProducts = products.filter((product) =>
    product.categories.includes(category)
  );

  if (filteredProducts.length === 0) return null;

  return (
    <section className="mb-8 text-center">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >

        <div className="flex flex-col items-center text-center">

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            {subtitle}
          </p>

        </div>

      </motion.div>
      <div className="mt-8 flex justify-center">

        <button className="rounded-full border border-sky-200 px-6 py-2 font-medium text-sky-500 transition hover:bg-sky-50">
          View All →
        </button>

      </div>

      <div className="mt-8 flex items-center justify-center gap-4">

        <div className="h-px w-48 bg-slate-200" />

        <div className="h-2 w-2 rounded-full bg-sky-400" />

        <div className="h-px w-48 bg-slate-200" />

      </div>
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="
    flex
    gap-6
    overflow-x-auto
    overflow-y-hidden
    pb-2
    snap-x
    snap-mandatory
    scrollbar-hide
    touch-pan-x
    overscroll-x-contain
    px-[calc(50vw-90px)]
  "
        >
          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="w-[180px] shrink-0 snap-start"
            >
              <HomeProductCard product={product} />
            </div>

          ))}

        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">

        <div className="h-px w-48 bg-slate-200" />

        <div className="h-2 w-2 rounded-full bg-sky-400" />

        <div className="h-px w-48 bg-slate-200" />

      </div>

    </section>
  );
}
