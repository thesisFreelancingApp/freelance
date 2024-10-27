import { getUserProfile } from "@/server.actions/profile/profile.actions";
import ProfileForm from "./profile";

export default async function ProfilePage() {
  try {
    const userProfile = await getUserProfile();

    if (!userProfile) {
      throw new Error("User profile not found");
    }

    const profileData = {
      firstName: userProfile.firstName || "",
      lastName: userProfile.lastName || "",
      address: userProfile.address || "",
      bio: userProfile.bio || "",
      username: userProfile.username || "",
      userEmail: userProfile.userEmail || "",
      phoneNumber: userProfile.phoneNumber || "",
      birthDate: userProfile.birthDate
        ? new Date(userProfile.birthDate)
        : undefined,
    };

    return <ProfileForm initialProfile={profileData} />;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <div>Error loading user profile.</div>;
  }
}
