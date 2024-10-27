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
  educations?: string[];
  professionalProfile?: ProfessionalProfile;
};

type ProfessionalProfile = {
  educations?: string[];
  // Add other properties as needed
};

const Educations = ({
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
                <h3 className="mb-2 font-semibold">Educations</h3>
          <p className="text-muted-foreground">
            {profile.professionalProfile?.educations?.map((education) => (
              <Badge key={education}>{education}</Badge>
            ))}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Educations;