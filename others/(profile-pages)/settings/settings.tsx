"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { updateUserProfile } from "@/server.actions/profile/profile.actions";
import { checkUsername } from "@/server.actions/welcome/username.actions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

// Définir l'interface UserProfile
interface UserProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  userEmail?: string;
  address?: string;
  birthDate?: string; // Utiliser string pour la valeur de l'input
  phoneNumber?: string;
  bio?: string;
}

interface ProfileFormProps {
  initialProfile: UserProfile;
}

export default function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [errorMessages, setErrorMessages] = useState("");
  const [loadingUsernameCheck, setLoadingUsernameCheck] =
    useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Vérification du nom d'utilisateur
  const handleCheckUsername = async (username: string) => {
    if (profile.username === initialProfile.username) {
      return;
    }
    if (isUsernameAvailable === false) {
      setErrorMessages("Ce nom d'utilisateur n'est pas disponible.");
      return;
    }
    if (username.length < 4) {
      setIsUsernameAvailable(false);
      setErrorMessages(
        "Le nom d'utilisateur doit contenir au moins 4 caractères.",
      );
      return;
    }
    setLoadingUsernameCheck(true);
    setErrorMessages("");
    try {
      const res = await checkUsername(username);
      setIsUsernameAvailable(res);
    } catch (error) {
      setErrorMessages(
        "Une erreur s'est produite lors de la vérification du nom d'utilisateur.",
      );
    } finally {
      setLoadingUsernameCheck(false);
    }
  };

  // Déclenche la vérification après 500ms lors de la saisie
  useEffect(() => {
    if (profile.username && profile.username.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        handleCheckUsername(profile.username || "");
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      // Réinitialiser la disponibilité lorsque l'input est vide ou trop court
      setIsUsernameAvailable(null);
    }
  }, [profile.username]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profile.username === initialProfile.username) {
      return;
    }
    if (isUsernameAvailable === false) {
      toast({
        title: "Nom d'utilisateur indisponible",
        description: "Ce nom d'utilisateur n'est pas disponible.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const updatedProfile = {
        ...profile,
        birthDate: profile.birthDate ? new Date(profile.birthDate) : null,
      };

      await updateUserProfile(updatedProfile);
      toast({
        title: "Profil mis à jour",
        description: "Votre profil a été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur de mise à jour",
        description:
          "Une erreur s'est produite lors de la mise à jour du profil.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">
          Ajustez votre compte en utilisant votre email ou nom d'utilisateur.
        </p>
      </div>
      <Separator className="my-6" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full">
          <Label>Email</Label>
          <Input
            name="userEmail"
            value={profile.userEmail}
            onChange={handleChange}
            placeholder="Entrez votre email"
            className="w-full"
            disabled
          />
        </div>{" "}
        <div className="flex flex-col w-full ">
          <Label>Nom d'utilisateur</Label>

          <div className="relative flex items-center w-full mt-1">
            <span className="absolute text-gray-500 left-3">@</span>{" "}
            {/* Icône @ pour l'input */}
            <Input
              name="username"
              value={profile.username}
              onChange={(e) => {
                setErrorMessages("");

                handleChange(e);
              }}
              placeholder="Entrez votre nom d'utilisateur"
              className="w-full h-10 pl-10 pr-10 border rounded"
            />
            {/* Icône de disponibilité */}
            {isUsernameAvailable === true && (
              <FiCheckCircle
                className="absolute text-green-500 right-3"
                size={24} // Taille ajustée
              />
            )}
            {isUsernameAvailable === false && (
              <FiXCircle
                className="absolute text-red-500 right-3"
                size={24} // Taille ajustée
              />
            )}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading || isUsernameAvailable === false}
          className="w-full"
        >
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </form>
      {errorMessages && (
        <div className="p-2 mt-4 text-red-600 bg-red-100 border border-red-400 rounded-md">
          {errorMessages}
        </div>
      )}
    </>
  );
}
