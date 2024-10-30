import HeroSection from "./HeroSection";
import SearchHero from "./SearchHero";
import TrustIndicators from "./TrustIndicators";
import CategoryShowcase from "./CategoryShowcase";
import TunisianTalents from "./TunisianTalents";
import FeaturesSection from "./FeaturesSection";
import InteractiveHowItWorks from "./InteractiveHowItWorks";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <main className="bg-background">
      <HeroSection />
      <SearchHero />
      <TrustIndicators />
      <CategoryShowcase />
      <TunisianTalents />
      <FeaturesSection />
      <InteractiveHowItWorks />
      <Testimonials />
      <CTASection />
    </main>
  );
}
