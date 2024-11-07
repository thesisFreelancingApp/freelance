import CategoryShowcase from "./CategoryShowcase";
import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import InteractiveHowItWorks from "./InteractiveHowItWorks";
import SearchHero from "./SearchHero";
import Testimonials from "./Testimonials";
import TrustIndicators from "./TrustIndicators";
import TunisianTalents from "./TunisianTalents";

export default function LandingPage() {
  return (
    <main className="mx-auto  max-w-7xl bg-background">
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
