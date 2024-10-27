"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Profile = {
  profilePic?: string;
  firstName?: string | null;
  lastName?: string;
  username: string;
  title?: string;
  bio?: string;
  occupations?: string[];
  professionalProfile?: ProfessionalProfile;
};

type ProfessionalProfile = {
  occupations?: string[];
  // Add other properties as needed
};

const Occupations = ({
  profile,
  username,
}: {
  profile: Profile;
  username: string;
}) => {
 

  
  return (
    <Card className="col-span-1 shadow-none md:col-span-2 bg-background">
      <CardContent className="pt-2">
        <div>
          <h3 className="mb-2 font-semibold">Occupations</h3>
          <p className="text-muted-foreground">
            {profile.professionalProfile?.occupations?.map((occupation) => (
              <Badge key={occupation}>{occupation}</Badge>
            ))}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Occupations;