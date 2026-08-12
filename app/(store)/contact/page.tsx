import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import FragranceRecommendation from "@/components/contact/FragranceRecommendation";
import ContactForm from "@/components/contact/ContactForm";
import BusinessInfo from "@/components/contact/BusinessInfo";
import FAQ from "@/components/home/FAQ";
import SocialLinks from "@/components/contact/SocialLinks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactCards />
      {/* <FragranceRecommendation /> */}
      <BusinessInfo />
      {/* <FAQ /> */}
      {/* <SocialLinks /> */}
    </main>
  );
}