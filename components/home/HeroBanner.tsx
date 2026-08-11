"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
//   "/hero1.jpg",
  // "/commingSoonBanner.png",
  "/posh2.png",
  "/hero3.png",
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
        key={banners[current]}
        src={banners[current]}
        alt="Sugandha Banner"
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />
    </div>
  );
}