
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  {
    src: "/mainBanner.png",
    alt: "Sugandha attar and fragrance collection in Nepal",
  },
  {
    src: "/heroCombo.png",
    alt: "Sugandha premium perfume collection in Nepal",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[160px] sm:h-[220px] md:h-[300px] lg:h-[420px] overflow-hidden">
      {banners.map((banner, index) => (
        <Image
          key={banner.src}
          src={banner.src}
          alt={banner.alt}
          fill
          priority={index === 0}
          className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}