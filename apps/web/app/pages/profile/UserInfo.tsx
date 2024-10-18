"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { fetchUserProfile, uploadProfilePic, updateUserProfile } from "@/server.actions/profi/profile.actions"le;
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils-cn";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define schema
const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default async function UserProfile() {
  const userEmail = "mak.prod07@gmail.com";
  
  const profile = await fetchUserProfile(userEmail);

  const isProfileIncomplete =
    !profile?.firstName || !profile?.lastName || !profile?.phoneNumber;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Profile updated with values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end mb-4"></div>
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
        <Separator orientation="vertical" className="hidden lg:block" />
        <section className="flex-1 space-y-6">
          {isProfileIncomplete && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              Your profile is incomplete. Please fill out all the required fields to complete your profile.
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative">
                  <Avatar className="w-20 h-20 cursor-pointer group">
                    <AvatarImage
                      src={
                        profile?.profilePic || "https://github.com/shadcn.png"
                      }
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {profile?.firstName?.charAt(0) || "S"}
                      {profile?.lastName?.charAt(0) || "T"}
                    </AvatarFallback>

                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black rounded-full opacity-0 group-hover:opacity-70">
                      <FiCamera className="w-8 h-8 text-white" />
                    </div>
                  </Avatar>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Profile Picture</DialogTitle>
                </DialogHeader>
                <form action={(formData) => uploadProfilePic(formData, userEmail)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profilePic">
                      Choose a new profile picture
                    </Label>
                    <Input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Save New Picture
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <div>
              <h2 className="text-2xl font-semibold">
                {profile?.firstName} {profile?.lastName}
              </h2>
            </div>
          </div>

          {/* Profile update form */}
          <form action={(formData) => updateUserProfile(formData)} className="space-y-4">
            <input type="hidden" name="profileId" value={profile?.id || ""} />
            <input type="hidden" name="userEmail" value={userEmail} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Sara"
                  defaultValue={profile?.firstName || "Foulen"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Tancredi"
                  defaultValue={profile?.lastName || "Ben Falten"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phoneNumber"
                  placeholder="(+1) 555-123-4567"
                  defaultValue={profile?.phoneNumber || "+216 99 55 22 44"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="New York, USA"
                  defaultValue={profile?.address || "Tunis, Carthage"}
                />
              </div>

              {/* Date of Birth Field */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Save Profile Information
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
