import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
// import Mission from "@/components/about/Mission";
import WhyChooseUs from "@/components/about/WhyChooseUs";
// import Values from "@/components/about/Values";
import HowItWorks from "@/components/about/HowItWorks";
// import WhyDifferent from "@/components/about/WhyDifferent";
import CTA from "@/components/about/CTA";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      {/* <Mission /> */}
      <WhyChooseUs />
      {/* <Values /> */}
      <HowItWorks />
      {/* <WhyDifferent /> */}
      <CTA />
    </main>
  );
}