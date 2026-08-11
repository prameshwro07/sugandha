"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type ShopContentProps = {
    initialCategory?: string;
};

function formatCategory(category: string) {
    return category
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

export default function ShopContent({
    initialCategory = "all",
}: ShopContentProps) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState(initialCategory);

    const categories = useMemo(
        () => [
            "all",
            ...new Set(
                products.flatMap((product) => product.categories)
            ),
        ],
        []
    );

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.categories.includes(selectedCategory);

        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <>
            {/* =====================================================
                SHOP INTRO
                ===================================================== */}
            <div className="mb-8 px-6 py-6 w-full text-center sm:mb-10">
                <p className="text-sm font-medium text-sky-500">
                    Home / Shop
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                    Explore Our Collection
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                    Discover premium alcohol-free attars crafted for
                    every personality and every occasion.
                </p>
            </div>

            {/* =====================================================
    MOBILE CATEGORY
    ===================================================== */}
            <div className="mb-7 md:hidden">

                {/* Category heading */}
                <div className="mb-3 flex items-center px-6">
                    <h2 className="flex-1 text-center text-sm font-bold uppercase tracking-wide text-slate-900">
                        Shop By Category
                    </h2>

                    <span className="ml-3 shrink-0 whitespace-nowrap text-xs text-slate-400">
                        Swipe →
                    </span>
                </div>

                {/* Scrollable categories */}
                <div className="overflow-x-auto px-7 pb-1 scrollbar-hide">
                    <div className="flex w-max gap-2">
                        {categories.map((category) => {
                            const isSelected =
                                selectedCategory === category;

                            return (
                                <button
                                    key={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${isSelected
                                            ? "bg-sky-400 text-slate-900 shadow-sm"
                                            : "border border-slate-200 bg-white text-slate-600"
                                        }`}
                                >
                                    {formatCategory(category)}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>


            {/* =====================================================
    MOBILE PRODUCT COUNT
    ===================================================== */}
            <div className="mb-6 px-6 md:hidden">
                <p className="text-slate-500">
                    Showing {filteredProducts.length} Products
                </p>
            </div>


            {/* =====================================================
    MOBILE PRODUCTS
    ===================================================== */}
            <div className="grid grid-cols-2 gap-3 px-6 md:hidden">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {/* =====================================================
                TABLET + DESKTOP
                One full-width component
                ===================================================== */}
            <div className="hidden w-full md:block">

                {/* =========================================================
        FULL-WIDTH SHOP BORDER
        ========================================================= */}
                <div className="w-full border-y border-slate-200">

                    {/* =====================================================
            SAME CONTAINER / PADDING AS HEADER
            ===================================================== */}
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                        {/* =================================================
                CATEGORY + PRODUCTS
                ================================================= */}
                        <div className="flex w-full items-stretch">

                            {/* =================================================
                    CATEGORY SIDEBAR
                    ================================================= */}
                            <aside
                                className="
                        w-[180px]
                        shrink-0
                        border-r
                        border-slate-200
                        py-6
                        pr-4

                        lg:w-[210px]
                        lg:pr-5

                        xl:w-[220px]
                    "
                            >

                                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                                    Shop By Category
                                </h2>

                                <div className="mt-5 space-y-1">

                                    {categories.map((category) => {

                                        const isSelected =
                                            selectedCategory === category;

                                        return (
                                            <button
                                                key={category}
                                                onClick={() =>
                                                    setSelectedCategory(category)
                                                }
                                                className={`
                                        flex
                                        w-full
                                        items-center
                                        px-3
                                        py-2.5
                                        text-left
                                        text-sm
                                        font-medium
                                        transition

                                        ${isSelected
                                                        ? "bg-sky-100 text-sky-700"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                    }
                                    `}
                                            >

                                                <span
                                                    className={`
                                            mr-3
                                            h-1.5
                                            w-1.5
                                            shrink-0
                                            rounded-full

                                            ${isSelected
                                                            ? "bg-sky-500"
                                                            : "bg-transparent"
                                                        }
                                        `}
                                                />

                                                {formatCategory(category)}

                                            </button>
                                        );
                                    })}

                                </div>

                            </aside>


                            {/* =================================================
                    PRODUCT SHOWCASE
                    ================================================= */}
                            <section
                                className="
                        min-w-0
                        flex-1
                        py-6
                        pl-5

                        lg:pl-6
                        xl:pl-7
                    "
                            >

                                {/* =================================================
                        PRODUCT HEADER
                        ================================================= */}
                                <div
                                    className="
                            mb-5
                            flex
                            items-end
                            justify-between
                            border-b
                            border-slate-200
                            pb-4
                        "
                                >

                                    <div>

                                        <h2 className="text-lg font-bold text-slate-900 lg:text-xl">
                                            {formatCategory(selectedCategory)}
                                        </h2>

                                        <p className="mt-1 text-xs text-slate-500 lg:text-sm">
                                            Showing {filteredProducts.length}{" "}
                                            {filteredProducts.length === 1
                                                ? "product"
                                                : "products"}
                                        </p>

                                    </div>

                                </div>

                                <div
                                    className="
                            grid

                            grid-cols-2
                            gap-4

                            lg:grid-cols-4
                            lg:gap-4

                            2xl:grid-cols-5
                            2xl:gap-5
                        "
                                >

                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}

                                </div>

                            </section>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}