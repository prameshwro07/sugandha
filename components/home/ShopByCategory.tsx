import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Men",
    slug: "men",
    image: "/categories/Men.png",
    description: "Bold & confident",
  },
  {
    name: "Women",
    slug: "women",
    image: "/categories/Women.png",
    description: "Elegant & captivating",
  },
  {
    name: "Unisex",
    slug: "unisex",
    image: "/categories/Unisex.png",
    description: "Made for everyone",
  },
  {
    name: "Attar",
    slug: "attar",
    image: "/categories/Attars.png",
    description: "Traditional & long-lasting",
  },
  {
    name: "Perfume",
    slug: "perfume",
    image: "/categories/Perfume.png",
    description: "Fresh & sophisticated",
  },
  {
    name: "Combo",
    slug: "combo",
    image: "/categories/Combo.png",
    description: "More fragrance, less price",
  },
  {
    name: "New",
    slug: "new",
    image: "/categories/New.png",
    description: "New arrivals",
  },
  {
    name: "Best Seller",
    slug: "best-seller",
    image: "/categories/BestSeller.png",
    description: "Our best sellers",
  },
];

const seoCategories = new Set([
  "men",
  "women",
  "unisex",
  "attar",
  "perfume",
]);

export default function ShopByCategory() {
  return (
    <section className="bg-slate-50 py-5 lg:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-0">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Explore
        </p>

        <h2 className="mt-1 text-xl font-medium tracking-tight text-slate-900">
          Shop by Category
        </h2>

        <p className="mt-1.5 max-w-xl pb-1 text-sm text-slate-600">
          Choose your scent. Make it yours.
        </p>

        <div
          className="
            mt-4
            flex
            gap-3
            overflow-x-auto
            pb-1
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={
                seoCategories.has(category.slug)
                  ? `/shop/${category.slug}`
                  : `/shop?category=${category.slug}`
              }
              aria-label={`Shop ${category.name} fragrances`}
              className="
                group
                flex
                w-[72px]
                shrink-0
                flex-col
                items-center
                sm:w-[82px]
                md:w-[92px]
                lg:w-[105px]
                xl:w-[115px]
              "
            >
              <div
                className="
                  relative
                  mx-auto
                  aspect-square
                  w-[72px]
                  overflow-hidden
                  rounded-full
                  border
                  border-sky-500
                  bg-slate-100
                  transition-transform
                  duration-300
                  group-hover:scale-[1.02]
                  sm:w-[82px]
                  md:w-[92px]
                  lg:w-[105px]
                  xl:w-[115px]
                "
              >
                <Image
                  src={category.image}
                  alt={`${category.name} perfumes and attars`}
                  fill
                  sizes="
                    (min-width: 1280px) 115px,
                    (min-width: 1024px) 105px,
                    (min-width: 768px) 92px,
                    (min-width: 640px) 82px,
                    72px
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              <p className="mt-2 truncate text-center text-xs font-medium text-slate-700">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}