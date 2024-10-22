"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  birthDate: z.string().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().max(160).min(4),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .optional(),
  userEmail: z.string().email({ message: "Invalid email format." }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
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
          firstName: profile?.firstName || "",
          lastName: profile?.lastName || "",
          address: profile?.address || "",
          bio: profile?.bio || "",
          username: profile?.username || "",
          userEmail: profile?.userEmail || "",
          phoneNumber: profile?.phoneNumber || "",
          birthDate: profile?.birthDate
            ? new Date(profile?.birthDate).toISOString().slice(0, 10)
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
    placeholder,
  }: {
    name: keyof ProfileFormValues;
    label: string;
    placeholder?: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className="w-full" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <FormInput
            name="userEmail"
            label="Email"
            placeholder="Enter your email"
          />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
