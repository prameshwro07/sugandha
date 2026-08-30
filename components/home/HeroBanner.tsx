// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// const banners = [
//     {
//     src: "/summerBanner-version-4.png",
//     alt: "Sugandha attar and fragrance collection in Nepal",
//   },
//   {
//     src: "/banner3.jpeg",
//     alt: "Sugandha premium perfume collection in Nepal",
//   }
// ];

// export default function HeroBanner() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 4000); // Change every 4 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-[160px] sm:h-[220px] md:h-[300px] lg:h-[420px] overflow-hidden">
//       <Image
//         key={banners[current].src}
//         src={banners[current].src}
//         alt={banners[current].alt}
//         fill
//         priority
//         className="object-cover transition-opacity duration-700"
//       />
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  {
    src: "/summerBanner-version-4.png",
    alt: "Sugandha attar and fragrance collection in Nepal",
  },
  {
    src: "/banner3.jpeg",
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