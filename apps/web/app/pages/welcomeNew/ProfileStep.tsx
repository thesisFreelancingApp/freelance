"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendarFR";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils-cn";
import { uploadImage } from "@/server.actions/uploadMedias.actions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";

interface ProfileData {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  bio: string;
  avatarUrl?: string;
}

interface ProfileStepProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  fieldErrors: Record<string, string | null>;
  setFieldErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >;
  handleUpdateProfile: () => Promise<void>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  loading: boolean;
}

export default function ProfileStep({
  profile,
  setProfile,
  fieldErrors,
  setFieldErrors,
  handleUpdateProfile,
  handleInputChange,
  loading,
}: ProfileStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({
          ...prev,
          avatarUrl: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);

      startTransition(async () => {
        try {
          const result = await uploadImage(file); // result est de type string (l'URL directe)

          if (result) {
            setProfile((prev) => ({ ...prev, avatarUrl: result })); // Utilisez result directement
            setUploadError(null);
          } else {
            setUploadError("Échec du téléchargement de l'avatar.");
          }
        } catch (error) {
          console.error("Erreur lors du téléchargement :", error);
          setUploadError("Erreur lors du téléchargement de l'image.");
        }
      });
    } else {
      setUploadError("Seuls les fichiers image sont autorisés.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const validatePhoneNumber = (phone: string) => /^[0-9]{8,15}$/.test(phone);

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProfile((prev) => ({ ...prev, phoneNumber: value }));

    if (validatePhoneNumber(value)) {
      setFieldErrors((prev) => ({ ...prev, phoneNumber: null }));
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        phoneNumber: "Numéro de téléphone invalide. Utilisez 8 à 15 chiffres.",
      }));
    }
  };

  const birthYearLimit = new Date().getFullYear() - 12;

  const handleDateChange = (date: Date | undefined) => {
    setProfile((prev) => ({ ...prev, birthDate: date }));

    if (date && date.getFullYear() > birthYearLimit) {
      setFieldErrors((prev) => ({
        ...prev,
        birthDate: "Vous devez avoir au moins 12 ans.",
      }));
    } else {
      setFieldErrors((prev) => ({ ...prev, birthDate: null }));
    }
  };

  const bioMaxLength = 350;

  return (
    <div className="space-y-4">
      {/* Avatar Upload Section */}
      <div className="flex items-center my-4 space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profile.avatarUrl} alt="Photo de profil" />
          <AvatarFallback>
            {profile.avatarUrl ? "PP" : "Pas de photo"}
          </AvatarFallback>
        </Avatar>
        <div>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
            ref={fileInputRef}
            aria-label="Télécharger une nouvelle photo de profil"
            disabled={isPending}
          />
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={isPending}
            onClick={handleButtonClick}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isPending ? "Téléchargement..." : "Changer la photo"}
          </Button>
          {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
        </div>
      </div>

      {/* Existing Profile Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Foulen"
            value={profile.firstName}
            onChange={handleInputChange}
            className={cn(fieldErrors.firstName ? "border-red-500" : "")}
          />
          {fieldErrors.firstName && (
            <p className="text-sm text-red-500">{fieldErrors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Ben Falten"
            value={profile.lastName}
            onChange={handleInputChange}
            className={cn(fieldErrors.lastName ? "border-red-500" : "")}
          />
          {fieldErrors.lastName && (
            <p className="text-sm text-red-500">{fieldErrors.lastName}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          name="address"
          placeholder="216 Rue Tounes, Tunisie"
          value={profile.address}
          onChange={handleInputChange}
          className={cn(fieldErrors.address ? "border-red-500" : "")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthDate">Date de naissance</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !profile.birthDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {profile.birthDate ? (
                format(profile.birthDate, "PPP", { locale: fr })
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={profile.birthDate}
              onSelect={handleDateChange}
              fromYear={new Date().getFullYear() - 100}
              toYear={birthYearLimit}
            />
          </PopoverContent>
        </Popover>
        {fieldErrors.birthDate && (
          <p className="text-sm text-red-500">{fieldErrors.birthDate}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="+216 99 55 44 22"
          value={profile.phoneNumber}
          onChange={handlePhoneInputChange}
          className={cn(fieldErrors.phoneNumber ? "border-red-500" : "")}
        />
        {fieldErrors.phoneNumber && (
          <p className="text-sm text-red-500">{fieldErrors.phoneNumber}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Biographie</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Parlez-nous de vous"
          value={profile.bio}
          onChange={(e) =>
            e.target.value.length <= bioMaxLength && handleInputChange(e)
          }
          className={cn(fieldErrors.bio ? "border-red-500" : "")}
        />
        <p className="text-sm text-gray-500">
          {profile.bio.length}/{bioMaxLength} caractères
        </p>
        {fieldErrors.bio && (
          <p className="text-sm text-red-500">{fieldErrors.bio}</p>
        )}
      </div>
      <Button onClick={handleUpdateProfile} disabled={loading}>
        Créez votre profil
      </Button>
    </div>
  );
}
