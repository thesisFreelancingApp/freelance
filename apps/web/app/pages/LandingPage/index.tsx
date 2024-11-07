import FAQComponent from "@/app/pages/LandingPage/FAQs";
import NewsLetter3 from "@/app/pages/LandingPage/NewsLetter";
import CategoryShowcase from "./CategoryShowcase";
import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import SearchHero from "./SearchHero";
import Testimonials from "./Testimonials";
import TrustIndicators from "./TrustIndicators";
export default function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl bg-background">
      <HeroSection />
      <SearchHero />
      <CategoryShowcase />
      {/* <TunisianTalents /> */}
      <FeaturesSection />
      <Testimonials />
      <TrustIndicators />
      <CTASection />
      {/* <InteractiveHowItWorks /> */}
      <NewsLetter3 />
      <FAQComponent />
    </main>
  );
}
