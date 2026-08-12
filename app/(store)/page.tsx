import Script from "next/script";

import { brand, products } from "@/lib/products";

import BestSellers from "@/components/home/BestSellers";
import HeroBanner from "@/components/home/HeroBanner";
import FAQ from "@/components/home/FAQ";
import ShopByCategory from "@/components/home/ShopByCategory";
import HomeSidebar from "@/components/home/HomeSidebar";
import HeroIntro from "@/components/home/HeroIntro";
import SignatureSection from "@/components/home/SignatureSection";

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <HeroBanner />

      <div className="md:hidden">
        <HeroIntro />
        <BestSellers />
        <ShopByCategory />
        <FAQ />
      </div>

      <div className="hidden md:block">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-4 lg:px-4">
            <HeroIntro />
          <div className="grid grid-cols-[220px_minmax(0,1fr)] items-stretch">

            <HomeSidebar />
            <main className="min-w-0 pl-6 lg:pl-7">
              
              <section className="border-b border-slate-200 pb-8">

                <BestSellers />

              </section>
              <section className="pt-8">

                <ShopByCategory />

              </section>

              <section className="mt-12">

                <FAQ />

              </section>

            </main>

          </div>

        </div>

      </div>
    </>
  );
}