"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

type Profile = {
  profilePic?: string;
  firstName?: string | null;
  lastName?: string;
  username: string;
  title?: string;
  bio?: string;
};

const MainCardProfile = ({
  profile,
  username,
}: {
  profile: Profile;
  username: string;
}) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const toggleBio = () => setShowFullBio(!showFullBio);

  const bioPreview =
    profile.bio && profile.bio.length > 100
      ? `${profile.bio.slice(0, 100)}...`
      : profile.bio;

  return (
    <Card className="col-span-1 border-none shadow-none md:col-span-2 bg-background">
      <CardContent className="pt-2">
        <div>
          <h3 className="mb-2 font-semibold">À propos de moi</h3>
          <p className="text-muted-foreground">
            {showFullBio ? profile.bio : bioPreview}
          </p>
          {profile.bio && profile.bio.length > 100 && (
            <Button
              variant="link"
              onClick={toggleBio}
              className="h-auto p-0 mt-2 font-normal text-foreground"
            >
              {showFullBio ? "Lire moins" : "Lire la suite"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MainCardProfile;
