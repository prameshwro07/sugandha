"use client";

import Image from "next/image";
import { products } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function HomeSidebar() {
    const router = useRouter();
    const todaysPick = products.find(
        (product) =>
            product.name.toLowerCase().includes("blueberry musk")
    );

    return (
        <aside className="flex h-full flex-col border-r py-4 border-slate-200 pr-5">

            <div className="relative overflow-hidden">

                <div className="border-b border-slate-200 py-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                        Today's Pick
                    </h2>
                </div>


                {todaysPick && (
                    <div className="relative mt-4 overflow-hidden rounded-[3px]">

                        {/* Product Image */}
                        <div className="relative aspect-[3/4] w-full">

                            <Image
                                src={todaysPick.images[2]}
                                alt={todaysPick.name}
                                fill
                                className="object-cover"
                                sizes="220px"
                            />

                        </div>


                        {/* Product Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3 pt-12">

                            <h3 className="truncate whitespace-nowrap text-sm font-semibold text-white">
                                {todaysPick.name}
                            </h3>

                            <div className="mt-2 flex items-center justify-between gap-2">

                                <p className="text-sm font-semibold text-white">
                                    NPR {todaysPick.price.toLocaleString()}
                                </p>

                                <button
                                    onClick={() => router.push("/shop")}
                                    type="button"
                                    className="bg-slate-200 rounded-md border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-900 transition hover:bg-sky-200"
                                >
                                    Discover →
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>

            <div className="border-t border-slate-200 py-6">

                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">
                    Why Sugandha?
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    More than just a fragrance.
                </p>

                <div className="mt-6 space-y-6">

                    <div>
                        <h4 className="text-xs font-semibold text-slate-800">
                            ✦ Premium Fragrances
                        </h4>

                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                            Carefully selected scents for every occasion.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-slate-800">
                            ✦ Carefully Selected
                        </h4>

                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                            Quality fragrances chosen for you.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-slate-800">
                            ✦ Alcohol-Free
                        </h4>

                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                            Enjoy a beautiful fragrance experience without alcohol.
                        </p>
                    </div>


                    <div>
                        <h4 className="text-xs font-semibold text-slate-800">
                            ✦ Made for Every Occasion
                        </h4>

                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                            A fragrance for every mood and moment.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-slate-800">
                            ✦ Fast Delivery
                        </h4>

                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                            Quick delivery across Kathmandu Valley.
                        </p>
                    </div>

                </div>

            </div>

            <div className="border-t border-slate-200 py-7">

                <p className="text-sm font-bold tracking-wide text-slate-900">
                    SMELL GOOD.
                </p>

                <p className="mt-1 text-sm font-bold tracking-wide text-sky-500">
                    FEEL CONFIDENT.
                </p>

                <p className="mx-auto mt-3 text-[11px] leading-5 text-slate-500">
                    Find your signature fragrance.
                </p>

                <button
                    onClick = {() => router.push('/shop')}
                    type="button"
                    className="mt-5 bg-white border border-slate-200 px-4 py-2 text-[11px] font-semibold text-slate-900 transition hover:bg-sky-300"
                >
                    Shop Collection →
                </button>

            </div>

        </aside>
    );
}