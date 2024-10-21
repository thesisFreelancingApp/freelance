"use client";
import Page from "@/app/layout/Page";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendarFR";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { updateProfileWithEmail } from "@/server.actions/welcome/createProfile.actions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const renderAlert = (type: "success" | "error" | "info", message: string) => {
  let alertClass = "";
  if (type === "success") {
    alertClass = "text-green-500";
  } else if (type === "error") {
    alertClass = "text-red-500";
  } else if (type === "info") {
    alertClass = "text-blue-500";
  }

  return <Alert className={`${alertClass} mt-2 max-w-md`}>{message}</Alert>;
};
export default () => {
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    address: string;
    birthDate: Date | undefined;
    phoneNumber: string;
    bio: string;
  }>({
    firstName: "",
    lastName: "",
    address: "",
    birthDate: undefined,
    phoneNumber: "",
    bio: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<{
    firstName: boolean;
    lastName: boolean;
    address: boolean;
    birthDate: boolean;
    phoneNumber: boolean;
    bio: boolean;
  }>({
    firstName: false,
    lastName: false,
    address: false,
    birthDate: false,
    phoneNumber: false,
    bio: false,
  });

  const router = useRouter();

  const handleUpdateProfile = async () => {
    setErrorMessages([]);
    setLoading(true);

    const newFieldErrors = {
      firstName: !profile.firstName,
      lastName: !profile.lastName,
      address: !profile.address,
      birthDate: !profile.birthDate,
      phoneNumber: !profile.phoneNumber,
      bio: !profile.bio,
    };

    setFieldErrors(newFieldErrors);

    // Validation: si un champ est vide, on affiche les erreurs
    const hasErrors = Object.values(newFieldErrors).some((error) => error);

    if (hasErrors) {
      setLoading(false);
      setErrorMessages((prev) => [
        ...prev,
        "Tous les champs sont obligatoires.",
      ]);
      return;
    }

    const updatedProfile = {
      ...profile,
      birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined,
    };

    try {
      const result = await updateProfileWithEmail(updatedProfile);
      setUpdateSuccess(result);
      if (result) {
<<<<<<< HEAD
        router.push("/profile"); // Redirige vers la page profil après succès
=======
        router.push("/profil");
>>>>>>> f14d11dae128ccc7729b468d54cca9168be77a4b
      }
    } catch (error) {
      setUpdateSuccess(false);
      setErrorMessages((prev) => [
        ...prev,
        "Une erreur s'est produite lors de la mise à jour du profil.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: false }); // Efface les erreurs lorsque l'utilisateur tape
  };

  return (
    <Page>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Créer votre profil</CardTitle>
          <CardDescription>
            Renseignez vos informations personnelles pour compléter votre profil
            et accéder à une expérience sur mesure.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Prénom</Label>
              <Input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                placeholder="Foulen(a)"
                className={`w-full ${fieldErrors.firstName ? "border-red-500" : ""}`}
              />
            </div>
            <div>
              <Label>Nom de famille</Label>
              <Input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                placeholder="Ben Falten"
                className={`w-full ${fieldErrors.lastName ? "border-red-500" : ""}`}
              />
            </div>
            <div>
              <Label>Adresse</Label>
              <Input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                placeholder="216 rue tounes, Tunis"
                className={`w-full ${fieldErrors.address ? "border-red-500" : ""}`}
              />
            </div>

            {/* Calendar Date Picker */}
            <div className="w-full">
              <Label>Date de Naissence</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full pl-3 text-left ${fieldErrors.birthDate ? "border-red-500" : ""}`}
                  >
                    {profile.birthDate
                      ? format(new Date(profile.birthDate), "PPP", {
                          locale: fr,
                        })
                      : "Sélectionner une date"}
                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    captionLayout="dropdown-buttons"
                    mode="single"
                    selected={profile.birthDate || undefined}
                    onSelect={(date) =>
                      setProfile({ ...profile, birthDate: date || undefined })
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-02")
                    }
                    fromYear={1960}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="w-full">
              <Label>Numéro de téléphone</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleInputChange}
                placeholder="99552244"
                className={`w-full ${fieldErrors.phoneNumber ? "border-red-500" : ""}`}
              />
            </div>
            <div className="w-full">
              <Label>Biographie</Label>
              <Textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Parlez nous de vous :) ..."
                className={`w-full p-2 border rounded ${fieldErrors.bio ? "border-red-500" : ""}`}
                rows={4}
              />
            </div>
          </div>

          {/* Alert Section */}
          <div className="max-w-md mx-auto mt-4">
            {loading &&
              renderAlert("info", "Mise à jour du profil en cours...")}
            {updateSuccess === true &&
              renderAlert("success", "Profil mis à jour avec succès !")}
            {updateSuccess === false &&
              renderAlert("error", "Erreur lors de la mise à jour du profil.")}
            {errorMessages.length > 0 &&
              renderAlert("error", errorMessages.join(" "))}
          </div>

          {/* Save Button */}
          <Button
            className="w-full mt-3"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            Sauvegarder
          </Button>
        </CardContent>

        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </Page>
  );
};
