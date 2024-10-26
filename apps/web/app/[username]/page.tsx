import UserProfilePage from "@/app/pages/profilepublic/index";
import { getUserProfileByUsername } from "@/server.actions/profilePublic/profilePublic.actions";

interface UserProfile {
  profile?: {
    firstName: string;
    lastName: string;
    profilePic?: string;
    bio?: string;
    birthDate?: string;
    title?: string;
  };
}

const AnotherPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  if (!username) {
    return <div>Username not provided</div>;
  }

  // Type assertion to UserProfile or null
  const userProfile = (await getUserProfileByUsername(
    username,
  )) as UserProfile | null;

  if (!userProfile || !userProfile.profile) {
    return <div>User profile not found</div>;
  }

  const { firstName, lastName, profilePic, bio, birthDate, title } =
    userProfile.profile;

  const profile = {
    firstName,
    lastName,
    profilePic,
    bio,
    birthDate,
    title,
  };

  return <UserProfilePage profile={profile} username={username} />;
};

export default AnotherPage;
