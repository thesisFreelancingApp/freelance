"use client";

import { Button } from "@/components/ui/button"; // Assurez-vous que le bouton a une largeur définie dans son propre fichier CSS
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  getUserProfile,
  updateUserProfile,
} from "@/server.actions/profile/profile.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  address: z.string().min(1, "Address is required."),
  birthDate: z.string().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().min(4).max(160),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .optional(),
  userEmail: z.string().email("Invalid email format").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      birthDate: "",
      phoneNumber: "",
      bio: "",
      username: "",
      userEmail: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await getUserProfile();
        const formattedProfile = {
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          address: profile.address || "",
          bio: profile.bio || "",
          username: profile.username || "",
          userEmail: profile.userEmail || "",
          phoneNumber: profile.phoneNumber || "",
          birthDate: profile.birthDate
            ? new Date(profile.birthDate).toISOString().slice(0, 10)
            : "",
        };
        form.reset(formattedProfile);
      } catch (error) {
        toast({
          title: "Error fetching profile",
          description: "Could not retrieve the user profile.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      };
      await updateUserProfile(formattedData);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "An error occurred while updating the profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable form input component
  const FormInput = ({
    name,
    label,
    type = "text",
    placeholder,
  }: {
    name: keyof ProfileFormValues;
    label: string;
    type?: string;
    placeholder?: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="grid w-full grid-cols-1 gap-4">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>

        <FormInput name="birthDate" label="Birth Date" type="date" />
        <FormInput
          name="address"
          label="Address"
          placeholder="Enter your address"
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter your phone number"
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  className="w-full resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
