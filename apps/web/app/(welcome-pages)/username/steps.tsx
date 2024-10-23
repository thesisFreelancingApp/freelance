"use client";

import * as React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, XCircle, CalendarIcon, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendarFR";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { checkUsername } from "@/server.actions/welcome/username.actions";

type AlertType = "success" | "error" | "info";

interface ProfileData {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  bio: string;
}

const initialProfile: ProfileData = {
  firstName: "",
  lastName: "",
  address: "",
  birthDate: undefined,
  phoneNumber: "",
  bio: "",
};

const renderAlert = (
  type: AlertType,
  message: string,
  username: string | null = null,
) => {
  const alertClass = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  }[type];

  return (
    <Alert className={`${alertClass} mt-2`}>
      <AlertDescription>
        {username ? (
          <>
            {message} <br />
            <span className="font-bold">{username}</span>
          </>
        ) : (
          message
        )}
      </AlertDescription>
    </Alert>
  );
};

export default function MultiStepFormPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [username, setUsername] = React.useState("");
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const [profile, setProfile] = React.useState<ProfileData>(initialProfile);
  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<keyof ProfileData, boolean>>
  >({});

  const progress = (currentStep / 3) * 100;

  const isValidUsername = (username: string) => /^[a-z0-9]{4,}$/.test(username);

  const handleCheckUsername = React.useCallback(async () => {
    if (!isValidUsername(username)) {
      setIsAvailable(false);
      setErrorMessages([
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
      setErrorMessages([
        "Une erreur s'est produite lors de la vérification du nom d'utilisateur.",
      ]);
    } finally {
      setLoading(false);
    }
  }, [username]);

  React.useEffect(() => {
    if (username.length > 2) {
      const delayDebounceFn = setTimeout(handleCheckUsername, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [username, handleCheckUsername]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  const renderUsernameStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Choisir un nom d'utilisateur</CardTitle>
        <CardDescription>
          Choisis un nom d'utilisateur unique et disponible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <span className="absolute text-muted-foreground left-3 top-1/2 -translate-y-1/2">
            @
          </span>
          <Input
            type="text"
            value={username}
            onChange={(e) => {
              setErrorMessages([]);
              setUsername(e.target.value);
            }}
            placeholder="Nom d'utilisateur"
            className="pl-8 pr-10"
          />
          {isAvailable === true && (
            <CheckCircle className="absolute text-green-500 right-3 top-1/2 -translate-y-1/2" />
          )}
          {isAvailable === false && (
            <XCircle className="absolute text-red-500 right-3 top-1/2 -translate-y-1/2" />
          )}
        </div>
        <div className="mt-4">
          {loading && renderAlert("info", "Vérification en cours...")}
          {isAvailable === true &&
            renderAlert("success", "Nom d'utilisateur disponible :", username)}
          {isAvailable === false &&
            !errorMessages.length &&
            renderAlert(
              "error",
              "Ce nom d'utilisateur est déjà pris ou n'est pas valide.",
              username,
            )}
          {errorMessages.length > 0 &&
            renderAlert("error", errorMessages.join(" "))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => setCurrentStep(2)}
          disabled={loading || !isAvailable}
        >
          Suivant
        </Button>
      </CardFooter>
    </Card>
  );

  const renderProfileStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Créer votre profil</CardTitle>
        <CardDescription>
          Renseignez vos informations personnelles.
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
            className={fieldErrors.firstName ? "border-red-500" : ""}
          />
          <Input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            placeholder="Nom de famille"
            className={fieldErrors.lastName ? "border-red-500" : ""}
          />
          <div>
            <Label>Date de Naissance</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${fieldErrors.birthDate ? "border-red-500" : ""}`}
                >
                  {profile.birthDate
                    ? format(profile.birthDate, "PPP", { locale: fr })
                    : "Sélectionner une date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={profile.birthDate}
                  onSelect={(date) =>
                    setProfile((prev) => ({ ...prev, birthDate: date }))
                  }
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            placeholder="Adresse"
            className={fieldErrors.address ? "border-red-500" : ""}
          />
          <Input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            placeholder="Numéro de téléphone"
            className={fieldErrors.phoneNumber ? "border-red-500" : ""}
          />
          <Textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            placeholder="Parlez-nous de vous"
            className={fieldErrors.bio ? "border-red-500" : ""}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Précédent
        </Button>
        <Button onClick={() => setCurrentStep(3)}>Suivant</Button>
      </CardFooter>
    </Card>
  );

  const renderFinalStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Étape 3</CardTitle>
        <CardDescription>Cette étape est vide pour l'instant.</CardDescription>
      </CardHeader>
      <CardContent>{/* Contenu futur */}</CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          Précédent
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="mt-6  bg-background text-center border rounded-lg">
      <main className="container mx-auto p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Bienvenue parmi nous !
        </h1>
        <h1 className="text-xl pb-4">
          Merci de compléter votre profil pour profiter pleinement de notre
          plateforme.
        </h1>
        <Progress value={progress} className="mb-8" />
        <div className="max-w-md mx-auto">
          {currentStep === 1 && renderUsernameStep()}
          {currentStep === 2 && renderProfileStep()}
          {currentStep === 3 && renderFinalStep()}
        </div>
      </main>
    </div>
  );
}
