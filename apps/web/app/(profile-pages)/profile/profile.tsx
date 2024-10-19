"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendarFR";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils-cn";
import { updateUserProfile } from "@/server.actions/profile/profile.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ar, fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Définir l'interface UserProfile
interface UserProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  userEmail?: string;
  address?: string;
  birthDate?: Date; // Changement au type Date
  phoneNumber?: string;
  bio?: string;
}

interface ProfileFormProps {
  initialProfile: UserProfile;
}

// Schéma pour la validation de la date
const FormSchema = z.object({
  dob: z.date({
    required_error: "Une date de naissance est requise.",
  }),
});

export default function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(profile);
      const formattedData = {
        ...profile,
        birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined,
      };

      await updateUserProfile(formattedData);
      toast({
        title: "Profil mis à jour",
        description: "Votre profil a été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur de mise à jour",
        description:
          "Une erreur est survenue lors de la mise à jour du profil.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profil</h2>
        <p className="text-muted-foreground">
          Personnalisez votre compte et ajustez vos préférences de profil.
        </p>
      </div>
      <Separator className="my-6" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="w-full">
            <Label>Prénom</Label>
            <Input
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="Entrez votre prénom"
              className="w-full"
            />
          </div>

          <div className="w-full">
            <Label>Nom de famille</Label>
            <Input
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Entrez votre nom de famille"
              className="w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <Label>Adresse</Label>
          <Input
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Entrez votre adresse"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="w-full">
            <Label>Numéro de téléphone</Label>
            <Input
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              placeholder="Entrez votre numéro de téléphone"
              className="w-full"
            />
          </div>

          <div className="w-full">
            <Label>Date de Naissance</Label>
            <Form {...form}>
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {profile.birthDate ? (
                              format(profile.birthDate, "PPP", {
                                locale: fr || ar,
                              })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50 " />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setProfile((prevState) => ({
                              ...prevState,
                              birthDate: date,
                            }));
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-02")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </div>
        </div>

        <div className="w-full">
          <Label>Bio</Label>
          <Textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Parlez-nous de vous"
            className="block w-full p-2 mt-1 rounded-md"
            rows={4}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
        </Button>
      </form>
    </>
  );
}
