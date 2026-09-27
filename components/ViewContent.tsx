"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { trackMetaEvent } from "@/lib/meta-pixel";

export default function ViewContent({ product }: { product: Product }) {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_ids: [product.id],
      content_type: "product",
      content_name: product.name,
      contents: [{ id: product.id, quantity: 1, item_price: product.price }],
      value: product.price,
      currency: "NPR",
    });
  }, [product.id, product.name, product.price]);
  return null;
}
