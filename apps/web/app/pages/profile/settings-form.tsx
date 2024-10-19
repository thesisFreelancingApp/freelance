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
} from "@/server.actions/profile/profile.actions"; // Assume these are exported from your server
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema for the form
const profileFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  birthDate: z.string().optional(), // Ensure birthDate is handled as a string
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
    async function fetchProfile() {
      setIsLoading(true);
      try {
        const profile = await getUserProfile();
        // Handle null values, convert birthDate to a string format (if it's a Date)
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
            : "", // Formatting date as a string in YYYY-MM-DD
        };
        form.reset(formattedProfile); // Pre-fill the form with profile data
      } catch (error) {
        toast({
          title: "Error fetching profile",
          description: "Could not retrieve the user profile.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      // Convert birthDate from string to Date
      const formattedData = {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      };
      await updateUserProfile(formattedData); // Pass formatted data
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

  return (
    <div className="container w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mx:w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
