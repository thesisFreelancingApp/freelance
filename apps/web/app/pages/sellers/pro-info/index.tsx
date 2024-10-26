"use client";

import OccupationsSection from "@/app/pages/sellers/pro-info/OccupationsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createProfessionalProfile } from "@/server.actions/sellers/proinfo/info";
import * as Toast from "@radix-ui/react-toast";
import { format } from "date-fns";
import { useState } from "react";

// Define the Occupation type with Date
type Occupation = {
  title: string;
  from: Date | undefined;
  to: Date | undefined;
};

export default function ProfessionalInfoForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 1;
  const progress = (currentStep / totalSteps) * 100;

  // States for Occupation section and additional fields
  const [occupations, setOccupations] = useState<Occupation[]>([
    { title: "", from: undefined, to: undefined },
  ]);
  const [companyType, setCompanyType] = useState<"freelancer" | "company">(
    "freelancer",
  );
  const [companyName, setCompanyName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [experienceLevel, setExperienceLevel] =
    useState<string>("no_experience");
  const [sector, setSector] = useState<string>("");

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const handleSubmit = async () => {
    const profileData = {
      companyType,
      companyName: companyType === "company" ? companyName : undefined,
      profession,
      experienceLevel,
      sector: companyType === "company" ? sector : undefined,
      occupations: occupations.map((occupation) => ({
        ...occupation,
        from: occupation.from
          ? format(occupation.from, "yyyy-MM-dd")
          : undefined,
        to: occupation.to ? format(occupation.to, "yyyy-MM-dd") : undefined,
      })),
    };

    try {
      const newProfile = await createProfessionalProfile(profileData);
      console.log("Profile created:", newProfile);
      setToastMessage("Profile created successfully!");
      setToastOpen(true);
    } catch (error) {
      console.error("Error creating profile:", error);
      setToastMessage("Error creating profile. Please try again.");
      setToastOpen(true);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{`Occupation Information`}</CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <OccupationsSection
            occupations={occupations}
            companyType={companyType}
            companyName={companyName}
            profession={profession}
            experienceLevel={experienceLevel}
            sector={sector}
            addOccupation={() =>
              setOccupations([
                ...occupations,
                { title: "", from: undefined, to: undefined },
              ])
            }
            removeOccupation={(index) =>
              setOccupations(occupations.filter((_, i) => i !== index))
            }
            updateOccupation={(index, field, value) =>
              setOccupations(
                occupations.map((occ, i) =>
                  i === index ? { ...occ, [field]: value } : occ,
                ),
              )
            }
            setCompanyType={setCompanyType}
            setCompanyName={setCompanyName}
            setProfession={setProfession}
            setExperienceLevel={setExperienceLevel}
            setSector={setSector}
          />
        )}

        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </CardContent>

      <Toast.Provider>
        <Toast.Root open={toastOpen} onOpenChange={setToastOpen}>
          <Toast.Title>{toastMessage}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </Card>
  );
}
