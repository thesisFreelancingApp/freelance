"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { updateProfileWithEmail } from "@/server.actions/welcome/createProfile.actions";
import {
  checkUsername,
  updateUsernameByEmail,
} from "@/server.actions/welcome/username.actions";
import { useRouter } from "next/navigation";
import * as React from "react";
import CompletionStep from "./CompletionStep";
import ProfileStep from "./ProfileStep";
import RoleSelectionStep from "./RoleSelectionStep";
import UsernameStep from "./UsernameStep";

interface ProfileData {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  bio: string;
  avatarUrl?: string;
}

const initialProfile: ProfileData = {
  firstName: "",
  lastName: "",
  address: "",
  birthDate: undefined,
  phoneNumber: "",
  bio: "",
  avatarUrl: "",
};

export default function MultiStepFormPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [username, setUsername] = React.useState("");
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState<boolean | null>(
    null,
  );
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const router = useRouter();
  const stepNames = ["username", "profile", "role-selection", "completion"];

  React.useEffect(() => {
    const stepName = stepNames[currentStep - 1];
    router.replace(`?step=${stepName}`);
  }, [currentStep, router]);

  const [fieldErrors, setFieldErrors] = React.useState<
    Record<string, string | null>
  >({
    firstName: null,
    lastName: null,
    address: null,
    birthDate: null,
    phoneNumber: null,
    bio: null,
  });

  const [profile, setProfile] = React.useState<ProfileData>(initialProfile);

  const validateField = (name: string, value: string | Date | undefined) => {
    const errors: { [key: string]: string | null } = {};

    if (!value) {
      errors[name] = `Ce champ est requis.`;
    } else {
      errors[name] = null;
    }

    setFieldErrors((prev) => ({ ...prev, ...errors }));
    return !!errors[name];
  };

  const handleCheckUsername = async () => {
    try {
      setLoading(true);
      setErrorMessages([]);
      const isAvailable = await checkUsername(username);
      setIsAvailable(isAvailable);
    } catch (error) {
      setErrorMessages([
        "Erreur lors de la vérification du nom d'utilisateur.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async () => {
    if (validateField("username", username)) return;

    try {
      const result = await updateUsernameByEmail(username);
      if (result) setCurrentStep(2);
      else setErrorMessages(["Email non trouvé."]);
    } catch (error) {
      setErrorMessages(["Erreur lors de la mise à jour du nom d'utilisateur."]);
    }
  };

  const handleUpdateProfile = async () => {
    setErrorMessages([]);
    setLoading(true);

    const hasErrors = Object.keys(profile).some((field) =>
      validateField(field, profile[field as keyof ProfileData]),
    );

    if (hasErrors) {
      setLoading(false);
      setErrorMessages(["Tous les champs sont obligatoires."]);
      return;
    }

    try {
      const result = await updateProfileWithEmail(profile);
      setUpdateSuccess(result);
      if (result) setCurrentStep(3);
    } catch (error) {
      setUpdateSuccess(false);
      setErrorMessages([
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
    setProfile((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UsernameStep
            username={username}
            setUsername={setUsername}
            isAvailable={isAvailable}
            loading={loading}
            errorMessages={errorMessages}
            handleUpdateUsername={handleUpdateUsername}
            handleCheckUsername={handleCheckUsername}
          />
        );
      case 2:
        return (
          <ProfileStep
            profile={profile}
            setProfile={setProfile}
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            handleUpdateProfile={handleUpdateProfile}
            handleInputChange={handleInputChange}
            loading={loading}
          />
        );
      case 3:
        return <RoleSelectionStep onComplete={() => setCurrentStep(4)} />;
      case 4:
        return <CompletionStep />;
      default:
        return null;
    }
  };

  return (
    <div className="grid w-full px-4 py-8 ">
      <Card className="w-full max-w-2xl mx-auto ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Bienvenue parmi nous !
          </CardTitle>
          <Progress value={(currentStep / 4) * 100} className="mb-6" />
          <CardDescription>Merci de compléter votre profil.</CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
}
