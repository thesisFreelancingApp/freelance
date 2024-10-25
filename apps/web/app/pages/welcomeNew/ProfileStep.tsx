"use client ";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendarFR";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils-cn";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface ProfileData {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  bio: string;
}
interface ProfileStepProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  fieldErrors: Record<string, boolean>;
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
  handleUpdateProfile,
  handleInputChange,
  loading,
}: ProfileStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            className={cn(fieldErrors.firstName && "border-red-500")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            className={cn(fieldErrors.lastName && "border-red-500")}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          name="address"
          value={profile.address}
          onChange={handleInputChange}
          className={cn(fieldErrors.address && "border-red-500")}
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
              selected={profile.birthDate}
              onSelect={(date) =>
                setProfile((prev) => ({ ...prev, birthDate: date }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={profile.phoneNumber}
          onChange={handleInputChange}
          className={cn(fieldErrors.phoneNumber && "border-red-500")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Biographie</Label>
        <Textarea
          id="bio"
          name="bio"
          value={profile.bio}
          onChange={handleInputChange}
          className={cn(fieldErrors.bio && "border-red-500")}
        />
      </div>
      <Button onClick={handleUpdateProfile} disabled={loading}>
        Mettre à jour le profil
      </Button>
    </div>
  );
}
