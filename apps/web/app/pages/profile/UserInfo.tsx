import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  getUserProfile,
  updateUserPicUrl,
  updateUserProfile,
} from "@/server.actions/profile/profile.actions";
import { uploadProfilePicture } from "@/server.actions/uploaderCloudinary.actions";
import { revalidatePath } from "next/cache";

export default async function UserProfile() {
  const userEmail = "mak.prod07@gmail.com";

  // Fetch the user profile
  const profile = await getUserProfile(userEmail);

  // Check if profile is incomplete
  const isProfileIncomplete =
    !profile?.firstName || !profile?.lastName || !profile?.phoneNumber;

  // Fonction pour uploader la photo de profil vers Cloudinary
  async function handleProfilePicUpload(formData: FormData) {
    "use server";

    // Récupérer le fichier à partir du FormData
    const file = formData.get("profilePic") as File;

    // Vérifier si un fichier a bien été uploadé
    if (file && file.size > 0) {
      // Appel à Cloudinary pour uploader l'image
      const uploadedImageUrl = await uploadProfilePicture(file);

      // Si l'image a été uploadée avec succès
      if (uploadedImageUrl) {
        // Mettre à jour les informations du profil côté serveur
        await updateUserPicUrl(uploadedImageUrl, profile?.userEmail);
        revalidatePath("/profile");
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end mb-4"></div>
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
        <Separator orientation="vertical" className="hidden lg:block" />
        <section className="flex-1 space-y-6">
          {/* Display a message if the profile is incomplete */}
          {isProfileIncomplete && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              Your profile is incomplete. Please fill out all the required
              fields to complete your profile.
            </div>
          )}

          {/* Affichage de l'avatar */}
          <div className="flex items-center space-x-4">
            <form action={handleProfilePicUpload}>
              <Label htmlFor="profilePic" className="cursor-pointer">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    id="avatarImage"
                    src={profile?.profilePic || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback>
                    {profile?.firstName?.charAt(0) || "S"}
                    {profile?.lastName?.charAt(0) || "T"}
                  </AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  className="hidden"
                  accept="image/*"
                  oninput="this.form.submit();"
                />
              </Label>
            </form>
            <div>
              <h2 className="text-2xl font-semibold">
                {profile?.firstName} {profile?.lastName}
              </h2>
            </div>
          </div>

          {/* Formulaire pour la mise à jour des autres informations */}
          <form action={updateUserProfile} className="space-y-4">
            <input type="hidden" name="profileId" value={profile?.id || ""} />
            <input type="hidden" name="userEmail" value={userEmail} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Sara"
                  defaultValue={profile?.firstName || "Foulen"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Tancredi"
                  defaultValue={profile?.lastName || "Ben Falten"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phoneNumber"
                  placeholder="(+1) 555-123-4567"
                  defaultValue={profile?.phoneNumber || "+216 99 55 22 44"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="New York, USA"
                  defaultValue={profile?.address || "Tunis, Carthage"}
                />
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Save Profile Information
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
