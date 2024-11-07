import SearchBar from "@/app/pages/MainHomepage/SearchBar";
import WelcomBanner from "@/app/pages/MainHomepage/WelcomeBanner";
import RecommendedFreelancers from "@/app/pages/MainHomepage/YourNavigation";
import { isAuthenticated } from "@/server.actions/auth/auth.actions";
import { getCategories } from "@/server.actions/category/category.actions";
import { getUserProfile } from "@/server.actions/profile/profile.actions";
import { getAllUserProfile } from "@/server.actions/profilePublic/profilePublic.actions";
import { getFeaturedServices } from "@/server.actions/services.actions";
import getProfileCompletionStatus from "@/server.actions/userInfo/infoUser.actions";
// const freelancers = [
//   { name: "Alice Johnson", expertise: "Web Developer", rating: 4.9 },
//   { name: "John Smith", expertise: "Graphic Designer", rating: 4.7 },
//   { name: "Emma Davis", expertise: "Digital Marketer", rating: 4.8 },
// ];
export interface Freelancer {
  firstName: string;
  lastName: string;
  professionalProfile?: {
    rating: number;
    occupations?: { title: string }[];
    skills?: { skill: string }[];
    certifications?: { certification: string }[];
    educations?: { faculty: string }[];
    profilePic: string;
  };
  // ... other properties ...
}
export default async function Index() {
  const userInfo = await getProfileCompletionStatus();

  const categories = await getCategories();
  const authenticated = await isAuthenticated();
  const services = await getFeaturedServices();
  const freelancers = await getAllUserProfile();
  const user = await getUserProfile();

  return (
    <>
      <section>
        <WelcomBanner user={user} userInfo={userInfo} />
        <SearchBar placeholder="Rechercher..." />
        <RecommendedFreelancers />
        {/* <Hero authenticated={authenticated} />
       

        <CategoryList categories={categories} />

        <TopFreelancers freelancers={freelancers} />

        <FeaturedServices services={services as Service[]} />

        <WhyChooseUs /> */}
      </section>
    </>
  );
}
