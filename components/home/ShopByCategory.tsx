"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Men",
    slug: "men",
    image: "/categories/men2.png",
    description: "Bold & confident",
  },
  {
    name: "Women",
    slug: "women",
    image: "/categories/women.png",
    description: "Elegant & captivating",
  },
  {
    name: "Unisex",
    slug: "unisex",
    image: "/categories/unixes.png",
    description: "Made for everyone",
  },
  {
    name: "Attar",
    slug: "attar",
    image: "/categories/attar.jpg",
    description: "Traditional & long-lasting",
  },
  {
    name: "Perfume",
    slug: "perfume",
    image: "/categories/perfume.jpg",
    description: "Fresh & sophisticated",
  },
  {
    name: "Combo",
    slug: "combo",
    image: "/categories/combo.jpg",
    description: "More fragrance, less price",
  },
  {
    name: "New",
    slug: "new",
    image: "/categories/new.jpg",
    description: "new arriavals",
  },
  {
    name: "Best Seller",
    slug: "best-seller",
    image: "/categories/best-seller.jpg",
    description: "out best seller"
  }
];

export default function ShopByCategory() {
  const router = useRouter();

  return (

    <section className="w-full bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="py-2 text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
          Explore
        </p>
      </div>


      {/* Blue Heading Banner */}
      <div className="w-full bg-sky-200 py-6 sm:py-5">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <h2 className="mt-2 text-xl tracking-tight text-slate-900 sm:text-3xl">
            Shop by Category
          </h2>

          {/* <p className="mt-1.5 text-sm text-slate-900 sm:text-base">
            Find a fragrance that matches your style and personality.
          </p> */}

        </div>
      </div>


      {/* Categories */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
        mt-6
        flex
        gap-4
        overflow-x-auto
        pb-2
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
        >
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() =>
                router.push(`/shop?category=${category.slug}`)
              }
              className="
            group
            w-[130px]
            shrink-0
            text-left
            sm:w-[150px]
          "
            >
              {/* Square Image */}
              <div className="
            relative
            aspect-square
            w-full
            rounded-full
            overflow-hidden
            border
            border-sky-600
            bg-slate-100
            transition-transform
            duration-300
            group-hover:scale-[1.02]
          ">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="150px"
                  className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
                />
              </div>

              {/* Name */}
              {/* <h3 className="
            mt-2.5
            text-center
            text-sm
            font-bold
            text-slate-900
            sm:text-base
          ">
                {category.name}
              </h3> */}

              {/* Description */}
              {/* <p className="
            mt-0.5
            text-center
            text-xs
            text-slate-500
          ">
                {category.description}
              </p> */}
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}