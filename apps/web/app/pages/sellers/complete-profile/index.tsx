"use client";

import CompletionStep from "@/app/pages/sellers/complete-profile/CompletionStep";
import SkillsAndEducation from "@/app/pages/sellers/complete-profile/EducationAndSkillsSection";
import LanguageSection from "@/app/pages/sellers/complete-profile/LanguageSection";
import OccupationsSection from "@/app/pages/sellers/complete-profile/OccupationsSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createProfessionalProfile } from "@/server.actions/sellers/pro-Infomation.actions";
import * as Toast from "@radix-ui/react-toast";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Component() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalSteps = 4;
  const initialStep = parseInt(searchParams.get("step") || "1", 10);
  const [currentStep, setCurrentStep] = useState<number>(
    Math.min(initialStep, totalSteps),
  );

  const progress = (currentStep / totalSteps) * 100;

  const [occupations, setOccupations] = useState<Occupation[]>([
    { title: "", from: undefined, to: undefined },
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [type, setCompanyType] = useState<"freelancer" | "company">(
    "freelancer",
  );
  const [timeZone, setTimeZone] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [experienceLevel, setExperienceLevel] =
    useState<string>("no_experience");
  const [sector, setSector] = useState<string>("");

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const updateStepInUrl = (step: number) => {
    const newUrl = `${window.location.pathname}?step=${step}`;
    router.replace(newUrl);
  };

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
      educations: educations.map((edu) => ({
        ...edu,
        from: edu.from ? format(edu.from, "yyyy-MM-dd") : undefined,
        to: edu.to ? format(edu.to, "yyyy-MM-dd") : undefined,
      })),
      certifications: certifications.map((cert) => ({
        ...cert,
        date: cert.date ? format(cert.date, "yyyy-MM") : undefined,
      })),
      languages,
      timeZone,
    };

    try {
      const newProfile = await createProfessionalProfile(profileData);
      console.log("Profile created:", newProfile);
      setToastMessage("Profile created successfully!");
      setToastOpen(true);
      setCurrentStep(totalSteps);
      updateStepInUrl(totalSteps);
    } catch (error) {
      console.error("Error creating profile:", error);
      setToastMessage("Error creating profile. Please try again.");
      setToastOpen(true);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => {
      const nextStep = Math.min(prev + 1, totalSteps);
      updateStepInUrl(nextStep);
      return nextStep;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      const previousStep = Math.max(prev - 1, 1);
      updateStepInUrl(previousStep);
      return previousStep;
    });
  };

  useEffect(() => {
    updateStepInUrl(currentStep);
  }, [currentStep]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Détails Professionnels
          </CardTitle>
          <Progress value={progress} className="w-full mb-6" />
          <CardDescription>Merci de compléter votre profil.</CardDescription>
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
            <SkillsAndEducation
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
              skills={skills}
              addSkill={(skill) => setSkills([...skills, skill])}
              removeSkill={(index) =>
                setSkills(skills.filter((_, i) => i !== index))
              }
              educations={educations}
              addEducation={() =>
                setEducations([
                  ...educations,
                  { faculty: "", from: undefined, to: undefined },
                ])
              }
              removeEducation={(index) =>
                setEducations(educations.filter((_, i) => i !== index))
              }
              updateEducation={(index, field, value) =>
                setEducations(
                  educations.map((edu, i) =>
                    i === index ? { ...edu, [field]: value } : edu,
                  ),
                )
              }
            />
          )}
          {currentStep === 3 && (
            <LanguageSection
              languages={languages}
              setLanguages={setLanguages}
              timeZone={timeZone}
              setTimeZone={setTimeZone}
            />
          )}
          {currentStep === 4 && <CompletionStep />}
          {/* Boutons de navigation */}
          {currentStep < totalSteps - 1 && (
            <div className="flex justify-between mt-4">
              {currentStep > 1 && (
                <Button variant="secondary" onClick={prevStep}>
                  Retour
                </Button>
              )}
              <Button onClick={nextStep}>Suivant</Button>
            </div>
          )}

          {/* Boutons de Soumission à l’avant-dernière étape */}
          {currentStep === totalSteps - 1 && (
            <div className="flex justify-between mt-4">
              <Button variant="secondary" onClick={prevStep}>
                Retour
              </Button>
              <Button onClick={handleSubmit}>Soumettre</Button>
            </div>
          )}
        </CardContent>

        <Toast.Provider>
          <Toast.Root open={toastOpen} onOpenChange={setToastOpen}>
            <Toast.Title>{toastMessage}</Toast.Title>
          </Toast.Root>
          <Toast.Viewport />
        </Toast.Provider>
      </Card>
    </div>
  );
}
