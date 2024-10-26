"use client";

import CertificationsSection from "@/app/pages/sellers/pro-info/CertificationsSection";
import EducationSection from "@/app/pages/sellers/pro-info/EducationSection";
import LanguageSection from "@/app/pages/sellers/pro-info/LanguageSection";
import OccupationsSection from "@/app/pages/sellers/pro-info/OccupationsSection";
import SkillsSection from "@/app/pages/sellers/pro-info/SkillsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createProfessionalProfile } from "@/server.actions/sellers/proinfo/info";
import * as Toast from "@radix-ui/react-toast";
import { format } from "date-fns";
import { useState } from "react";

// Define the types for various sections
type Occupation = {
  title: string;
  from: Date | undefined;
  to: Date | undefined;
};
type Education = {
  faculty: string;
  from: Date | undefined;
  to: Date | undefined;
};
type Certification = {
  title: string;
  institution: string;
  date: Date | undefined;
};

export default function ProfessionalInfoForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // State for each section
  const [occupations, setOccupations] = useState<Occupation[]>([
    { title: "", from: undefined, to: undefined },
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [type, setCompanyType] = useState<"freelancer" | "company">(
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
    const convertExperienceYears = (experienceLevel: string) => {
      switch (experienceLevel) {
        case "No Experience":
          return 0;
        case "Junior":
          return 2;
        case "Intermediate":
          return 4;
        case "Senior":
          return 7;
        default:
          return undefined;
      }
    };

    const profileData = {
      type,
      companyName: type === "company" ? companyName : "freelance",
      profession,
      experienceYears: convertExperienceYears(experienceLevel),
      sector: type === "company" ? sector : undefined,
      occupations: occupations.map((occupation) => ({
        ...occupation,
        from: occupation.from
          ? format(occupation.from, "yyyy-MM-dd")
          : undefined,
        to: occupation.to ? format(occupation.to, "yyyy-MM-dd") : undefined,
      })),
      skills,
      education: education.map((edu) => ({
        ...edu,
        from: edu.from ? format(edu.from, "yyyy-MM-dd") : undefined,
        to: edu.to ? format(edu.to, "yyyy-MM-dd") : undefined,
      })),
      certifications: certifications.map((cert) => ({
        ...cert,
        date: cert.date ? format(cert.date, "yyyy-MM") : undefined,
      })),
      languages,
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

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <OccupationsSection
            occupations={occupations}
            companyType={type}
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
        {currentStep === 2 && (
          <SkillsSection skills={skills} setSkills={setSkills} />
        )}
        {currentStep === 3 && (
          <EducationSection
            educations={education}
            setEducation={setEducation}
          />
        )}
        {currentStep === 4 && (
          <CertificationsSection
            certifications={certifications}
            addCertification={() =>
              setCertifications([
                ...certifications,
                { title: "", institution: "", date: undefined },
              ])
            }
            removeCertification={(index) =>
              setCertifications(certifications.filter((_, i) => i !== index))
            }
            updateCertification={(index, field, value) =>
              setCertifications(
                certifications.map((cert, i) =>
                  i === index ? { ...cert, [field]: value } : cert,
                ),
              )
            }
          />
        )}
        {currentStep === 5 && (
          <LanguageSection languages={languages} setLanguages={setLanguages} />
        )}

        <div className="flex justify-between mt-4">
          {currentStep > 1 && <Button onClick={prevStep}>Back</Button>}
          {currentStep < totalSteps ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
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
