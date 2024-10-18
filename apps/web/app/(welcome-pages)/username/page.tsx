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
import { getUserEmail } from "@/server.actions/auth.actions";
import {
  checkUsername,
  updateUsernameByEmail,
} from "@/server.actions/welcome/username.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

// Fonction pour afficher des alertes unifiées avec possibilité d'inclure le nom d'utilisateur
const renderAlert = (
  type: "success" | "error" | "info",
  message: string,
  username: string | null,
) => {
  let alertClass = "";
  if (type === "success") {
    alertClass = "text-green-500";
  } else if (type === "error") {
    alertClass = "text-red-500";
  } else if (type === "info") {
    alertClass = "text-blue-500";
  }

  return (
    <Alert className={`${alertClass} mt-2 max-w-md`}>
      {username ? (
        <p>
          {message} <br />
          <span className="font-bold">{username}</span>
        </p>
      ) : (
        <p>{message}</p>
      )}
    </Alert>
  );
};

export default () => {
  const [username, setUsername] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  // Validation du nom d'utilisateur
  const isValidUsername = (username: string) => {
    const regex = /^[a-z0-9]{4,}$/;
    return regex.test(username);
  };

  // Vérification du nom d'utilisateur
  const handleCheckUsername = async (username: string) => {
    if (!isValidUsername(username)) {
      setIsAvailable(false);
      setErrorMessages((prev) => [
        ...prev,
        "Le nom d'utilisateur doit contenir au moins 4 caractères, uniquement des lettres minuscules et des chiffres.",
      ]);
      return;
    }
    setLoading(true);
    setErrorMessages([]);
    try {
      const res = await checkUsername(username);
      setIsAvailable(res);
    } catch (error) {
      setErrorMessages((prev) => [
        ...prev,
        "Une erreur s'est produite lors de la vérification du nom d'utilisateur.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Mise à jour du nom d'utilisateur
  const handleUpdateUsername = async () => {
    setErrorMessages([]);
    try {
      const data = await getUserEmail();
      const { email } = data || "";
      if (email) {
        const result = await updateUsernameByEmail(email, username);
        setUpdateSuccess(result);
        if (result) {
          router.push("/profil");
        }
      } else {
        setErrorMessages((prev) => [
          ...prev,
          "L'email de l'utilisateur n'a pas pu être récupéré.",
        ]);
      }
    } catch (error) {
      setUpdateSuccess(false);
      setErrorMessages((prev) => [
        ...prev,
        "Une erreur s'est produite lors de la mise à jour du nom d'utilisateur.",
      ]);
    }
  };

  // Déclenche la vérification après 500ms lors de la saisie
  useEffect(() => {
    if (username.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        handleCheckUsername(username);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [username]);

  return (
    <Page>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Choisis un nom d'utilisateur</CardTitle>
          <CardDescription>
            Choisis un nom d'utilisateur unique, qui te ressemble et qui est
            rien qu'à toi.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative">
            {/* Icône "@" à gauche */}
            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
              @
            </span>

            {/* Input avec icône dynamique à droite */}
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="w-full p-2 pl-10 pr-10 border rounded"
            />

            {/* Icône de disponibilité */}
            {isAvailable === true && (
              <FiCheckCircle className="absolute text-green-500 transform -translate-y-1/2 right-3 top-1/2" />
            )}
            {isAvailable === false && (
              <FiXCircle className="absolute text-red-500 transform -translate-y-1/2 right-3 top-1/2" />
            )}
          </div>

          {/* Zone d'alerte limitée en largeur */}
          <div className="max-w-md mx-auto mt-4">
            {loading && renderAlert("info", "Vérification en cours...", null)}
            {isAvailable === true &&
              renderAlert(
                "success",
                `Nom d'utilisateur disponible :`,
                username,
              )}
            {isAvailable === false &&
              !(errorMessages.length > 0) &&
              renderAlert(
                "error",
                "Ce nom d'utilisateur est déjà pris ou n'est pas valide. Merci de réessayer...",
                username,
              )}
            {updateSuccess === true &&
              renderAlert(
                "success",
                "Nom d'utilisateur mis à jour avec succès !",
                null,
              )}
            {updateSuccess === false &&
              renderAlert(
                "error",
                "Erreur lors de la mise à jour du nom d'utilisateur.",
                null,
              )}
            {errorMessages.length > 0 &&
              renderAlert("error", errorMessages.join(" "), null)}
          </div>

          {/* Bouton Suivant */}
          {isAvailable === true && (
            <Button className="w-full mt-3" onClick={handleUpdateUsername}>
              Suivant
            </Button>
          )}
        </CardContent>

        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </Page>
  );
};
