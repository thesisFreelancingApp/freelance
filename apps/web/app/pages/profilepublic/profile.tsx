import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Profile = {
  name: string;
  username: string;
  title: string;
  languages: string[];
  about: string;
  skills: string[];
  imageUrl: string;
};

export default function ProfileCard({ userProfile }: { userProfile: Profile }) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userProfile.imageUrl} alt={userProfile.name} />
          <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            <span className="text-muted-foreground">@{userProfile.username}</span>
          </div>
          <p className="text-lg text-muted-foreground">{userProfile.title}</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h3 className="mb-2 font-semibold">Languages</h3>
          <span>{userProfile.languages.join(", ")}</span>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">About me</h3>
          <p className="text-muted-foreground">{userProfile.about}</p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}