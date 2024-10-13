import Hero from "./Hero";
import PopularCategories from "./PopularCategories";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import ExploreServices from "./ExploreServices";
import WhyChooseUs from "./WhyChooseUs";
import PromotionalBanner from "./PromotionalBanner";
import RecentProjects from "./RecentProjects";
import NewsletterSignUp from "./NewsletterSignUp";
import MobileAppPromo from "./MobileAppPromo";
import Footer from "./Footer";
import FeaturedFreelancers from "./FeaturedFreelancers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <PopularCategories />
        <FeaturedFreelancers />
        <HowItWorks />
        <ExploreServices />
        <WhyChooseUs />
        <Testimonials />
        <PromotionalBanner />
        <RecentProjects />
        <NewsletterSignUp />
        <MobileAppPromo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
