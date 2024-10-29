// Imports
import ContactCardProfile from "@/app/pages/profilepublic/ContactCard";
import MainCardProfile from "@/app/pages/profilepublic/MainProfil";
import Services from "@/app/pages/profilepublic/Services";
import { getUserProfileByUsername } from "@/server.actions/profilePublic/profilePublic.actions";
import Skills from "@/app/pages/profilepublic/skills";
import Langues from "@/app/pages/profilepublic/langues";
import Occupations from "@/app/pages/profilepublic/occupations";
import Educations from "@/app/pages/profilepublic/educations";
import Certifications from "@/app/pages/profilepublic/certifications";
// Adjust the path as needed


// Types
interface Seller {
  professionalProfile?: any; // Adjust the type as needed
}

interface profile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePic: string;
  bio?: string;
  birthDate?: string;
  title?: string;
  seller?: Seller; // Add this line
   // Ensure this matches the imported type
educations?: { faculty: string }[];
langues?: { langue: string }[];
occupations?: { occupation: string }[];
skills?: { skill: string }[];
certifications?: { certification: string }[];
}

interface UserProfile {
  profile?: profile;
}

// Component
const AnotherPage = async ({ username }: { username: string }) => {
  if (!username) {
    return <div>Username not provided</div>;
  }

  // Fetch user profile and ensure it's of type UserProfile or null
  const userProfile = (await getUserProfileByUsername(
    username,
  )) as UserProfile | null;

  if (!userProfile || !userProfile.profile) {
    return <div>User profile not found</div>;
  }

  const { id, firstName, lastName, profilePic, bio, birthDate, title, seller, } = userProfile.profile;
  const professionalProfile = seller?.professionalProfile;

  const profile = {
    id,
    firstName,
    lastName,
    username,
    profilePic,
    bio,
    birthDate,
    title,
    seller,
    professionalProfile: professionalProfile || {},
    educations: professionalProfile?.educations || [],
    langues: professionalProfile?.langues || [],
    occupations: professionalProfile?.occupations || [],
    skills: professionalProfile?.skills || [],
    certifications: professionalProfile?.certifications || [],
  };

  if (!professionalProfile) {
    return (
      <div className="container px-4 py-8 mx-auto space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MainCardProfile profile={profile} username={username} />
          <div className="md:col-span-1 md:sticky md:top-8">
            <ContactCardProfile profile={profile} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MainCardProfile profile={profile} username={username} />
        <div className="md:col-span-1 md:sticky md:top-8">
          <ContactCardProfile profile={profile} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Services profile={profile } username={username} />
        <div className="md:col-span-1 md:sticky md:top-8">
          <Langues profile={profile } username={username} />
        </div>
        <div className="md:col-span-1 md:sticky md:top-8">
          <Occupations profile={profile } username={username} />
          </div>
          <div className="md:col-span-1 md:sticky md:top-8">
          <Skills profile={profile } username={username} />
        </div>
        <Educations profile={profile } username={username} />
        <Certifications profile={profile} username={username} />
      </div>
    </div>
  );
};

export default AnotherPage;
