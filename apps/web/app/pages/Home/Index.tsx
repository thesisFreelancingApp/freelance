import Hero from "./Hero";
import CategoriesIcon from "./CategoriesIcon";
import Testimonials from "./Testimonials";
import ExploreServices from "./ExploreServices";
import WhyChooseUs from "./WhyChooseUs";
import PromotionalBanner from "./PromotionalBanner";
import RecentProjects from "./RecentProjects";
import NewsletterSignUp from "./NewsletterSignUp";
import MobileAppPromo from "./MobileAppPromo";
import Footer from "./Footer";
import FeaturedFreelancers from "./FeaturedFreelancers";
import FreelancerCard from "./FreelancerCard";
import SupportPalestine from "./supportPalestine";
import HowItWorks from "./comment-ça-marche";import FreelancerCard from "./FreelancerCard";
const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <CategoriesIcon />
        <FreelancerCard/>
        {/* <FreelancerCard/> */}
        {/* <FeaturedFreelancers /> */}
        {/* <HowItWorks /> */}
        <SupportPalestine />
        <HowItWorks/>
        {/* <ExploreServices /> */}
        {/* <WhyChooseUs /> */}
        {/* <Testimonials /> */}
        <PromotionalBanner />
        {/* <RecentProjects /> */}
        {/* <NewsletterSignUp /> */}
        {/* <MobileAppPromo /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
