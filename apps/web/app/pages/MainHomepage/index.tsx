import FeaturedServices from "@/app/pages/MainHomepage/FeaturedServices";
import TopFreelancers from "@/app/pages/MainHomepage/TopFreelancers";
import WhyChooseUs from "@/app/pages/MainHomepage/WhyChooseUs";
import { isAuthenticated } from "@/server.actions/auth/auth.actions";
import { getCategories } from "@/server.actions/category/category.actions";
import { getFeaturedServices } from "@/server.actions/services.actions";
import Hero from "./BannerHero";
import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";
import { getFreelancer } from "@/server.actions/seller-dashboard.actions";
const freelancers = [
  { name: "Alice Johnson", expertise: "Web Developer", rating: 4.9 },
  { name: "John Smith", expertise: "Graphic Designer", rating: 4.7 },
  { name: "Emma Davis", expertise: "Digital Marketer", rating: 4.8 },
];
export default async function Index() {
  const categories = await getCategories();
  const authenticated = await isAuthenticated();
  const services = await getFeaturedServices();
  // const freelancer = await getFreelancer();
  // console.log(categories,"___________________________________________________________________");
  
  return (
    <>
      <section>
        <Hero authenticated={authenticated} />

        <SearchBar placeholder="Rechercher..." />

        <CategoryList categories={categories} />

        <TopFreelancers freelancers={freelancers} />

        {/* <FeaturedServices services={services} /> */}

        <WhyChooseUs />
      </section>
    </>
  );
}
