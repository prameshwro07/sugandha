"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Props = {
  images: string[];
  alt: string;
  className?: string;
};

export default function ImageSlider({ images, alt, className = "aspect-square", }: Props) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    // <div className="relative aspect-square overflow-hidden rounded-xl bg-sky-50">
    <div className={`relative overflow-hidden  bg-sky-50 ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={images.length > 1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={500}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}