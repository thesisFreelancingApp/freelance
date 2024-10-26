// Imports
import ContactCardProfile from "@/app/pages/profilepublic/ContactCard";
import MainCardProfile from "@/app/pages/profilepublic/MainProfil";
import Services from "@/app/pages/profilepublic/Services";
import { getUserProfileByUsername } from "@/server.actions/profilePublic/profilePublic.actions";

// Types
interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  profilePic: string;
  bio?: string;
  birthDate?: string;
  title?: string;
}

interface UserProfile {
  profile?: Profile;
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

  // Destructure user profile data
  const {
    firstName,
    lastName,
    profilePic = "",
    bio,
    birthDate,
    title,
  } = userProfile.profile;
  const profile = {
    firstName,
    lastName,
    username,
    profilePic,
    bio,
    birthDate,
    title,
  };

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MainCardProfile profile={profile} username={username} />
        <div className="md:col-span-1 md:sticky md:top-8">
          <ContactCardProfile profile={profile} />
        </div>
      </div>
      <Services profile={profile} username={username} />
    </div>
  );
};

export default AnotherPage;
