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

  professionalProfile?: ProfessionalProfile;
  seller?: Seller;
};

type ProfessionalProfile = {
  educations?: { faculty: string }[]; // Update the type to include faculty
  // Add other properties as needed
};
  type Seller = {
    professionalProfile?: ProfessionalProfile;
  };  




const Educations = ({
  profile,
  username,
}: {
  profile: Profile;
  username: string;
}) => {
  console.log("yeeeeeeeeeeeeeeeeeeees", profile);
  return (
    <Card className="col-span-1 shadow-none md:col-span-2 bg-background">
      <CardContent className="pt-2">
        <div>
          <h3 className="mb-2 font-semibold">Educations</h3>
          <p className="text-muted-foreground">
            {profile.seller?.professionalProfile?.educations?.map((education) => (
              <Badge key={education.faculty}>{education.faculty}</Badge>
            ))}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Educations;
