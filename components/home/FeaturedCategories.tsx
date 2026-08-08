import Link from "next/link";

const categories = [
  {
    emoji: "🌿",
    title: "Fresh",
    description: "Clean & Refreshing",
    href: "/shop?category=fresh",
  },
  {
    emoji: "🍬",
    title: "Sweet",
    description: "Warm & Delicious",
    href: "/shop?category=sweet",
  },
  {
    emoji: "🌳",
    title: "Woody",
    description: "Rich & Earthy",
    href: "/shop?category=woody",
  },
  {
    emoji: "🌸",
    title: "Floral",
    description: "Soft & Elegant",
    href: "/shop?category=floral",
  },
  {
    emoji: "🌙",
    title: "Musky",
    description: "Deep & Long Lasting",
    href: "/shop?category=musky",
  },
  {
    emoji: "🍊",
    title: "Citrus",
    description: "Bright & Energizing",
    href: "/shop?category=citrus",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Explore by Category
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Find a Fragrance That Matches You
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Whether you prefer fresh, sweet, woody, or floral notes, explore
            fragrances based on your personal style.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-sky-300 hover:bg-white hover:shadow-xl"
            >
              <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
                {category.emoji}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                {category.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}