
import { brand, products } from "@/lib/products";

import BestSellers from "@/components/home/BestSellers";
import HeroBanner from "@/components/home/HeroBanner";
import FAQ from "@/components/home/FAQ";
import ShopByCategory from "@/components/home/ShopByCategory";
import HomeSidebar from "@/components/home/HomeSidebar";
import HeroIntro from "@/components/home/HeroIntro";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com";

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",

  "@id": `${baseUrl}/#store`,

  name: "Sugandha",

  alternateName: "Sugandha Attar",

  url: baseUrl,

  logo: `${baseUrl}/logo.png`,

  description:
    "Sugandha is a Nepal-based online store offering perfumes and attars.",

  parentOrganization: {
    "@id": `${baseUrl}/#organization`,
  },

  areaServed: {
    "@type": "Country",
    name: "Nepal",
  },

  currenciesAccepted: "NPR",

  contactPoint: {
    "@type": "ContactPoint",
    telephone: brand.contactPhone,
    contactType: "customer service",
    areaServed: "NP",
    availableLanguage: ["English", "Nepali"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(storeSchema),
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