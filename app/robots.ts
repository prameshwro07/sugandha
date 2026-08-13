import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/owner/",
        "/checkout",
        "/cart",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}