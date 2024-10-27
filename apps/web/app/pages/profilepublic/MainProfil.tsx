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
  rating?: number; // Ajoutez ce champ pour la note
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
    <Card className="col-span-1 shadow-none md:col-span-2 bg-background">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="size-40">
          <AvatarImage
            src={profile.profilePic}
            alt={`${profile.firstName || ""} ${profile.lastName || ""}`}
          />
          <AvatarFallback>
            {(profile.firstName?.[0] || "") + (profile.lastName?.[0] || "")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h2>
            <span className="text-muted-foreground">@{username}</span>
          </div>
          <h4 className="text-lg text-muted-foreground">
            {profile.title || "Freelanceur"}
          </h4>
          {profile.rating !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span> {/* Étoile */}
              <span>{profile.rating}</span> {/* Note */}
            </div>
          )}
        </div>
      </CardHeader>
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
