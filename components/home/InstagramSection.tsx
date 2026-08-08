import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { instagramItems } from "@/lib/instagram";

export default function InstagramSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
            <Image
  src="/instagram.png"
  alt="Instagram"
  width={18}
  height={18}
/>
            Follow @shopsugandha
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Latest on Instagram
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Discover our newest fragrances, reels, and behind-the-scenes
            moments.
          </p>

        </div>

        {/* Grid */}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {instagramItems.map((item) => (

            <Link
              key={item.id}
              href={item.url}
              target="_blank"
              className="group relative overflow-hidden rounded-3xl"
            >

              <div className="relative aspect-square">

                <Image
                  src={item.image}
                  alt="Instagram Post"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/45">

                  <span className="translate-y-4 rounded-full bg-white px-5 py-3 font-semibold text-slate-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View on Instagram
                  </span>

                </div>

                {/* Reel Badge */}

                {item.type === "reel" && (
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 p-2">
                    <Play className="h-4 w-4 fill-slate-900 text-slate-900" />
                  </div>
                )}

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}