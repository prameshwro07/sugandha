"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { formatPrice, products } from "@/lib/products";
import ImageSlider from "./imageSlider";
import { useCart } from "@/src/store/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CartToast from "./CartToast";
import { ProductCard } from "./ProductCard";

export function ProductShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}