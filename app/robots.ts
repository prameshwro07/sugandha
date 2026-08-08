import type { MetadataRoute } from "next";
import { brand } from "@/lib/products";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/owner/", "/api/"],
    },
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
