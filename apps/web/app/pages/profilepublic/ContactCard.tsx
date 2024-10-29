"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Settings } from "lucide-react";
import { MessageBox } from "@/components/MessageBox";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Loading from "@/app/loading";

interface Profile {
  id: string;
  profilePic: string;
  firstName: string;
  lastName: string;
}

interface ContactCardProfileProps {
  profile: Profile;
}

export default function ContactCardProfile({
  profile,
}: ContactCardProfileProps) {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsOwnProfile(user?.id === profile.id);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkUser();
  }, [profile.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card className="col-span-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-20 h-20 border-2 border-primary">
            <AvatarImage
              src={profile.profilePic}
              alt={`${profile.firstName || ""} ${profile.lastName || ""}`}
            />
            <AvatarFallback>
              {`${profile.firstName?.charAt(0) || "?"}${
                profile.lastName?.charAt(0) || "?"
              }`}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="flex items-center mt-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            Offline - 09:08 PM local time
          </p>

          <div className="w-full mt-6">
            {isOwnProfile ? (
              <Button asChild className="w-full" variant="outline">
                <Link href="/profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            ) : (
              <MessageBox
                receiverId={profile.id}
                receiverName={`${profile.firstName} ${profile.lastName}`}
                receiverProfilePic={profile.profilePic}
              />
            )}
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            {isOwnProfile
              ? "Manage your profile settings"
              : "Average response time: 1 hour"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
