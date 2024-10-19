import { getUserProfile } from "@/server.actions/profile/profile.actions";
import ProfileForm from "./settings";

export default async function ProfilePage() {
  try {
    const userProfile = await getUserProfile();

    if (!userProfile) {
      throw new Error("User profile not found");
    }

    // Préparer les données du profil avec des valeurs par défaut si elles sont manquantes
    const profileData = {
      firstName: userProfile.firstName || "",
      lastName: userProfile.lastName || "",
      address: userProfile.address || "",
      bio: userProfile.bio || "",
      username: userProfile.username || "",
      userEmail: userProfile.userEmail || "",
      phoneNumber: userProfile.phoneNumber || "",
      birthDate: userProfile.birthDate
        ? new Date(userProfile.birthDate).toISOString().split("T")[0]
        : "", // Formatage de la date de naissance en chaîne (YYYY-MM-DD)
    };

    return <ProfileForm initialProfile={profileData} />;
  } catch (error) {
    console.error("Error fetching user profile:", error);

    // Afficher un message d'erreur convivial à l'utilisateur
    return (
      <div className="text-red-600 font-semibold">
        Unable to load user profile. Please try again later.
      </div>
    );
  }
}
