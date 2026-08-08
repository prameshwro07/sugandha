"use client";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export default function ProductGallery({
  product
}: Props) {

  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  return (
    <div className="w-full">

      {/* Large Image */}
      <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl border-none bg-slate-50">

        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className="object-cover transition duration-300"
          sizes="(max-width: 768px) 50vw,
         (max-width: 1280px) 33vw,
         25vw"
        />

      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto justify-center">

        {product.images.map((image) => (

          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${selectedImage === image
                ? "border-sky-400"
                : "border-slate-200"
              }`}
          >

            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />

          </button>

        ))}

      </div>

    </div>
  );
}