"use client";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="col-span-1 shadow-none md:col-span-2 bg-background">
      <CardContent className="pt-2">
        <div>
          <h3 className="mb-2 font-semibold">Services</h3>
          <p className="text-muted-foreground">To change</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainCardProfile;
