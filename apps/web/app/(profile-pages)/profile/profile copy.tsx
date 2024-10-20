"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils-cn";
import { updateUserProfile } from "@/server.actions/profile/profile.actions";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ChangeEvent, FormEvent, useState } from "react";

// Define UserProfile interface
interface UserProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  userEmail?: string;
  address?: string;
  birthDate?: string; // Use string for input value
  phoneNumber?: string;
  bio?: string;
}

interface ProfileFormProps {
  initialProfile: UserProfile;
}

export default function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const formattedData = {
        ...profile,
        birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined,
      };
      await updateUserProfile(formattedData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Error",
        description: "An error occurred while updating the profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Personalize your account and adjust your profile preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="w-full">
            <Label>First Name</Label>
            <Input
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full"
            />
          </div>

          <div className="w-full">
            <Label>Last Name</Label>
            <Input
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <Label>Address</Label>
          <Input
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="w-full">
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>

          <div className="w-full">
            <Label>Date of Birth</Label>

            <Input
              name="birthDate"
              type="date"
              value={profile.birthDate}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <Label>Bio</Label>
          <Textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="block w-full p-2 mt-1 rounded-md"
            rows={4}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </>
  );
}
