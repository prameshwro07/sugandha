import Script from "next/script";
import { ProductShowcase } from "@/components/ProductShowcase";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { brand, products } from "@/lib/products";
import AnnouncementBar from "@/components/announcementBar";
import Image from "next/image";
import CategorySection from "@/components/CategorySection";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellers from "@/components/home/BestSellers";
import FeaturedBanner from "@/components/home/FeaturedBanner";
import FinalCTA from "@/components/home/FinalCTA";
import InstagramSection from "@/components/home/InstagramSection";
import HeroBanner from "@/components/home/HeroBanner";
import FAQ from "@/components/home/FAQ";


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: brand.name,
    url: brand.siteUrl,
    logo: `${brand.siteUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.contactPhone,
      contactType: "customer service",
    },
    makesOffer: products.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: product.name,
        image: `${brand.siteUrl}${product.images}`,
      },
      price: product.price,
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <Script
        id="store-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroBanner />

      <BestSellers />

      <FAQ />

    </>
  )
};