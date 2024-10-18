"use client";

import Page from "@/app/layout/Page";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateProfileWithEmail } from "@/server.actions/welcome/profile.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// Fonction pour afficher des alertes unifiées avec les détails du profil
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
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthDate: "",
    phoneNumber: "",
    bio: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams(); // Pour récupérer les paramètres de l'URL
  const email = searchParams.get("email"); // Récupère l'email depuis les paramètres

  // Fonction pour mettre à jour le profil
  const handleUpdateProfile = async () => {
    setErrorMessages([]);
    if (!email) {
      setErrorMessages((prev) => [
        ...prev,
        "Email non fourni, impossible de mettre à jour le profil.",
      ]);
      return;
    }

    setLoading(true);

    // Conversion de birthDate en Date avant de l'envoyer à l'API
    const updatedProfile = {
      ...profile,
      birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined, // Conversion en Date
    };

    try {
      const result = await updateProfileWithEmail(email, updatedProfile); // Envoi du profil mis à jour avec birthDate en tant que Date
      setUpdateSuccess(result);
      if (result) {
        router.push("/profil"); // Redirige vers la page profil après succès
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

  // Gérer les changements d'input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <Page>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Mettre à jour le profil</CardTitle>
          <CardDescription>
            Modifiez vos informations personnelles ci-dessous.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              placeholder="Prénom"
              className="w-full"
            />
            <Input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              placeholder="Nom de famille"
              className="w-full"
            />
            <Input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              placeholder="Adresse"
              className="w-full"
            />
            <Input
              type="date"
              name="birthDate"
              value={profile.birthDate}
              onChange={handleInputChange}
              placeholder="Date de naissance"
              className="w-full"
            />
            <Input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              placeholder="Numéro de téléphone"
              className="w-full"
            />
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              placeholder="Biographie"
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          {/* Zone d'alerte */}
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

          {/* Bouton Sauvegarder */}
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
