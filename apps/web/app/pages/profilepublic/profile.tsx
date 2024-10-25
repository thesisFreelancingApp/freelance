import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Profile = {
  profilePic?: string;
  firstName?: string | null;
  lastName?: string;
  username: string;
  title?: string;
  bio?: string;
};

const Profile = ({ profile }: { profile: Profile }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const toggleBio = () => setShowFullBio(!showFullBio);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src= '/placeholder.svg' alt= ""/>
          <AvatarFallback>{(profile.firstName?.charAt(0) || "") + (profile.lastName?.charAt(0) || "")}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
            <span className="text-muted-foreground">@{profile.username}</span>
          </div>
          <h4 className="text-lg text-muted-foreground">{profile.title || 'Développeur Full Stack'}</h4>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h3 className="mb-2 font-semibold">À propos de moi</h3>
          <p className="text-muted-foreground">
            {showFullBio ? profile.bio : profile.bio?.split('\n').slice(0, 2).join('...')}
          </p>
          {profile.bio && profile.bio.split('\n').length > 2 && (
            <button onClick={toggleBio} className="text-blue-500">
              {showFullBio ? 'Lire moins' : 'Lire la suite'}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
