"use client";

import { EducationSection } from "@/app/pages/sellers/pro-info/EducationSection";
import OccupationsSection from "@/app/pages/sellers/pro-info/OccupationsSection";
import SkillsSection from "@/app/pages/sellers/pro-info/SkillsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createProfessionalProfile } from "@/server.actions/sellers/proinfo/info";
import { format } from "date-fns";
import { useState } from "react";

// Define the Occupation type with Date
type Occupation = {
  title: string;
  from: Date | undefined;
  to: Date | undefined;
};
type Skill = { name: string; level: string };
type Education = {
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
};
type Certification = { name: string; issuer: string; year: string };
type Language = { name: string; proficiency: string };

export default function ProfessionalInfoForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // States for each section
  const [occupations, setOccupations] = useState<Occupation[]>([
    { title: "", from: undefined, to: undefined },
  ]);
  const [companyName, setCompanyName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [experienceYears, setExperienceYears] = useState<number | "">("");
  const [skills, setSkills] = useState<Skill[]>([{ name: "", level: "" }]);
  const [education, setEducation] = useState<Education[]>([
    { country: "", university: "", title: "", major: "", year: "" },
  ]);
  const [certifications, setCertifications] = useState<Certification[]>([
    { name: "", issuer: "", year: "" },
  ]);
  const [languages, setLanguages] = useState<Language[]>([
    { name: "", proficiency: "" },
  ]);
  const [website, setWebsite] = useState<string>("");

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const handleSubmit = async () => {
    const profileData = {
      companyName,
      profession,
      experienceYears: experienceYears === "" ? undefined : experienceYears,
      languages: languages.map((lang) => lang.name),
      personalWebsite: website,
      occupations: occupations.map((occupation) => ({
        ...occupation,
        from: occupation.from
          ? format(occupation.from, "yyyy-MM-dd")
          : undefined,
        to: occupation.to ? format(occupation.to, "yyyy-MM-dd") : undefined,
      })),
      skills,
      educations: education,
      certifications,
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
        <CardTitle>{`Step ${currentStep}`}</CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <OccupationsSection
            occupations={occupations}
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
          />
        )}
        {currentStep === 2 && (
          <SkillsSection
            skills={skills}
            addSkill={() => setSkills([...skills, { name: "", level: "" }])}
            removeSkill={(index) =>
              setSkills(skills.filter((_, i) => i !== index))
            }
            updateSkill={(index, field, value) =>
              setSkills(
                skills.map((skill, i) =>
                  i === index ? { ...skill, [field]: value } : skill,
                ),
              )
            }
          />
        )}
        {currentStep === 3 && (
          <EducationSection
            education={education}
            addEducation={() =>
              setEducation([
                ...education,
                { country: "", university: "", title: "", major: "", year: "" },
              ])
            }
            removeEducation={(index) =>
              setEducation(education.filter((_, i) => i !== index))
            }
            updateEducation={(index, field, value) =>
              setEducation(
                education.map((edu, i) =>
                  i === index ? { ...edu, [field]: value } : edu,
                ),
              )
            }
          />
        )}
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          >
            Back
          </Button>
          <Button
            onClick={
              currentStep === totalSteps
                ? handleSubmit
                : () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
            }
          >
            {currentStep === totalSteps ? "Submit" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
