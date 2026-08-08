"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import HomeProductCard from "./HomeProductCard";

function formatCategory(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


export default function ShopContent() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categories = useMemo(
        () => [
            "all",
            ...new Set(products.flatMap((product) => product.categories)),
        ],
        []
    );

    const filteredProducts = products.filter((product) => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.categories.includes(selectedCategory);

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;

    });
    return (
        <>
            {/* Hero */}

            <div className="mb-10 text-center">

                <p className="text-sm text-sky-500 font-medium">
                    Home / Shop
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                    Explore Our Collection
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 md:text-base">
                    Discover premium alcohol-free attars crafted for every
                    personality and every occasion.
                </p>

                <div className="mb-8 flex flex-wrap gap-3">

                    {categories.map((category) => (

                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition
                                    ${selectedCategory === category
                                    ? "bg-sky-400 text-slate-900"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}

                </div>

                <p className="mb-6 text-slate-500">
                    Showing {filteredProducts.length} Products
                </p>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                    {filteredProducts.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                        // <HomeProductCard
                        //     key={product.id}
                        //     product={product}
                        // />

                    ))}

                </div>

                
            </div>
        </>
    );
}