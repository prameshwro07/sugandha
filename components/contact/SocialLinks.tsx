import Link from "next/link";
import Image from "next/image";

const socials = [
  {
    image: "/instagram.png",
    title: "Instagram",
    description: "Discover our latest fragrances and reels.",
    href: "https://instagram.com/shopsugandha",
  },
  {
    image: "/facebook.png",
    title: "Facebook",
    description: "Stay updated with offers and announcements.",
    href: "https://www.facebook.com/profile.php?id=61592136763590",
  },
  {
    image: "/tiktok.png",
    title: "TikTok",
    description: "Watch fragrance reviews and short videos.",
    href: "https://tiktok.com/@shopsugandha",
  },
];

export default function SocialLinks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Follow Us
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Join Our Community
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Follow Sugandha for fragrance inspiration, new arrivals,
            and exclusive offers.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {socials.map((social) => (
  <Link
    key={social.title}
    href={social.href}
    target="_blank"
    className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-sky-200 hover:bg-white hover:shadow-xl"
  >
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
      <Image
        src={social.image}
        alt={social.title}
        width={34}
        height={34}
        className="object-contain"
      />
    </div>

    <h3 className="mt-6 text-xl font-semibold text-slate-900">
      {social.title}
    </h3>

    <p className="mt-3 text-slate-600">
      {social.description}
    </p>
  </Link>
))}
        </div>

      </div>
    </section>
  );
}