"use client";

import ContactCardProfile from "@/app/pages/profilepublic/ContactCard";
import MainCardProfile from "@/app/pages/profilepublic/MainProfil";
import MainCardProfile2 from "@/app/pages/profilepublic/Sesrvice";
import { useState } from "react";
export default function UserProfilePage({
  username,
  profile,
}: {
  username: string;
  profile: any;
}) {
  const [showFullBio, setShowFullBio] = useState(false);

  const toggleBio = () => setShowFullBio(!showFullBio);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        Profil non trouvé
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MainCardProfile profile={profile} username={username} />
        <div className="md:col-span-1 md:sticky md:top-8">
          <ContactCardProfile profile={profile} />
        </div>
      </div>
      <MainCardProfile2 profile={profile} username={username} />
    </div>
  );
}
