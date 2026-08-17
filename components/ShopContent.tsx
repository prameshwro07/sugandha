"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import HomeProductCard from "./HomeProductCard"
import Link from "next/link";

type ShopContentProps = {
    initialCategory?: string;
    pageTitle?: string;
    pageDescription?: string;
    breadcrumb?: string;
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

const seoCategories = new Set([
    "men",
    "women",
    "unisex",
    "attar",
    "perfume",
    "new",
    "best-seller",
    "combo",
]);

export default function ShopContent({
    initialCategory = "all",
    pageTitle = "Explore Our Collection",
    pageDescription =
    "Discover premium perfumes and roll-on-oils crafted for every personality, occasion, and unforgettable moment with lasting fragrance.",
    breadcrumb = "Home / Shop",
}: ShopContentProps) {
    const router = useRouter();
    const params = useParams();

    const categoryScrollRef = useRef<HTMLDivElement>(null);

    const urlCategory =
        typeof params.category === "string"
            ? params.category
            : initialCategory;

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState(urlCategory);
    const handleCategoryChange = (category: string) => {
        // Save current horizontal category scroll position
        const scrollPosition =
            categoryScrollRef.current?.scrollLeft ?? 0;

        sessionStorage.setItem(
            "shop-category-scroll",
            String(scrollPosition)
        );

        // All has its own /shop route
        const url =
            category === "all"
                ? "/shop"
                : `/shop/${category}`;

        router.push(url, {
            scroll: false,
        });
    };
    useEffect(() => {
        const savedScroll = sessionStorage.getItem(
            "shop-category-scroll"
        );

        if (!savedScroll) return;

        const restoreScroll = () => {
            if (categoryScrollRef.current) {
                categoryScrollRef.current.scrollLeft =
                    Number(savedScroll);
            }
        };

        restoreScroll();

        // Fallback in case the element wasn't ready on first attempt
        const timeout = setTimeout(restoreScroll, 0);

        return () => clearTimeout(timeout);
    }, [initialCategory]);

    useEffect(() => {
        const savedScroll = sessionStorage.getItem(
            "shop-category-scroll"
        );

        if (!savedScroll) return;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (categoryScrollRef.current) {
                    categoryScrollRef.current.scrollLeft =
                        Number(savedScroll);
                }
            });
        });
    }, [initialCategory]);

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

    const isSeoCategory = seoCategories.has(selectedCategory);

    const displayTitle = isSeoCategory
        ? pageTitle
        : "Explore Our Collection";

    const displayDescription = isSeoCategory
        ? pageDescription
        :
        "Shop premium perfumes and roll-on oils online in Nepal. Discover long-lasting fragrances from Sugandha for men, women, and everyone.";

    const displayBreadcrumb = isSeoCategory
        ? breadcrumb
        : "Home / Shop";

    const navigateToCategory = (category: string) => {
        const scrollPosition =
            categoryScrollRef.current?.scrollLeft ?? 0;

        sessionStorage.setItem(
            "shop-category-scroll",
            String(scrollPosition)
        );

        return category === "all"
            ? "/shop"
            : `/shop/${category}`;
    };

    return (
        <>
            <div className="mb-8 px-4 py-1 w-full text-center sm:mb-10">
                <p className="text-sm font-medium text-sky-500">
                    {displayBreadcrumb}
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                    {displayTitle}
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                    {displayDescription}
                </p>
            </div>

            <div className="mb-7 md:hidden">
                <h2 className="text-center text-sm font-bold uppercase tracking-wide text-slate-900 pb-4">
                    Shop By Category
                </h2>

                {/* Category heading */}
                <div className="relative mb-3 px-6">


                    <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs text-slate-400">
                        Swipe →
                    </span>
                </div>

                {/* Scrollable categories */}
                <div className="relative">

                    {/* Top Divider */}
                    <div className="mx-6 border-t border-slate-200" />

                    {/* Categories */}
                    <div ref={categoryScrollRef} style={{ scrollBehavior: "auto" }} className="overflow-x-auto px-7 py-3 scrollbar-hide">
                        <div className="flex w-max gap-2">
                            {categories.map((category) => {
                                const isSelected =
                                    selectedCategory === category;

                                const className = `whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium transition ${isSelected
                                    ? "bg-sky-400 text-slate-900 shadow-sm"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                    }`;

                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={className}
                                    >
                                        {formatCategory(category)}
                                    </button>
                                );
                            })}

                        </div>
                    </div>

                    {/* Bottom Divider */}
                    <div className="mx-6 border-t border-slate-200" />
                </div>
            </div>

            <div className="mb-6 px-6 md:hidden">
                <p className="text-slate-500">
                    Showing {filteredProducts.length} Products
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:hidden px-6">
                {filteredProducts.map((product) => (
                    <HomeProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            <div className="hidden w-full md:block">
                <div className="w-full border-y border-slate-200">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex w-full items-stretch">
                            <aside className="w-[180px] shrink-0 border-r border-slate-200 py-6 pr-4 lg:w-[210px] lg:pr-5 xl:w-[220px]">
                                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                                    Shop By Category
                                </h2>
                                <div className="mt-5 space-y-1">
                                    {categories.map((category) => {
                                        const isSelected =
                                            selectedCategory === category;

                                        const className = `flex w-full items-center px-3 py-2.5 text-left text-sm font-medium transition ${isSelected
                                            ? "bg-sky-100 text-sky-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`;

                                        const content = (
                                            <>
                                                <span
                                                    className={`mr-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${isSelected
                                                        ? "bg-sky-500"
                                                        : "bg-transparent"
                                                        }`}
                                                />

                                                <span>
                                                    {formatCategory(category)}
                                                </span>
                                            </>
                                        );

                                        return (
                                            <button
                                                key={category}
                                                onClick={() => handleCategoryChange(category)}
                                                className={className}
                                            >
                                                {content}
                                            </button>
                                        );
                                    })}
                                </div>
                            </aside>

                            <section className="min-w-0 flex-1 py-6 pl-5 lg:pl-6 xl:pl-7">
                                <div className="mb-5 flex items-end justify-between border-b border-slate-200 pb-4">
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

                                <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 lg:gap-4 2xl:grid-cols-5 2xl:gap-5">

                                    {filteredProducts.map((product) => (
                                        <HomeProductCard
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