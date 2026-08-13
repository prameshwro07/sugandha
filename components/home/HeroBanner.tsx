"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const banners = [
  {
    src: "/posh2.png",
    alt: "Sugandha premium perfume collection in Nepal",
  },
  {
    src: "/hero3.png",
    alt: "Sugandha attar and fragrance collection in Nepal",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[160px] sm:h-[220px] md:h-[300px] lg:h-[420px] overflow-hidden">
      <Image
        key={banners[current].src}
        src={banners[current].src}
        alt={banners[current].alt}
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />
    </div>
  );
}