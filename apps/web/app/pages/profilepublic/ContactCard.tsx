import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail } from "lucide-react";

interface Profile {
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
  // console.log(profile);
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
          <Button className="w-full mt-6" size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Contact me
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Average response time: 1 hour
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
