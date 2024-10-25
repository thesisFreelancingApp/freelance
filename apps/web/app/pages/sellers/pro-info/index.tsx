import { EducationSection } from "@/app/pages/sellers/pro-info/EducationSection";
import OccupationsSection from "@/app/pages/sellers/pro-info/OccupationsSection";
import SkillsSection from "@/app/pages/sellers/pro-info/SkillsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createProfessionalProfile } from "@/server.actions/sellers/proinfo/info";
import { useState } from "react";

type Occupation = { title: string; from: string; to: string };
type Skill = { name: string; level: string };
type Education = {
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
};

export default function ProfessionalInfoForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Example ID – Replace this with the actual value from your app's context or props
  const sellerProfileId = "yourSellerProfileId"; // Replace with dynamic value as needed

  // States for each section
  const [occupations, setOccupations] = useState<Occupation[]>([
    { title: "", from: "", to: "" },
  ]);
  const [skills, setSkills] = useState<Skill[]>([{ name: "", level: "" }]);
  const [education, setEducation] = useState<Education[]>([
    { country: "", university: "", title: "", major: "", year: "" },
  ]);
  const [companyName, setCompanyName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [experienceYears, setExperienceYears] = useState<number | "">("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [website, setWebsite] = useState<string>("");

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  // Form submit handler
  const handleSubmit = async () => {
    const profileData = {
      sellerProfileId,
      companyName,
      profession,
      experienceYears: experienceYears === "" ? undefined : experienceYears, // Ensure experienceYears is either a number or undefined
      languages,
      personalWebsite: website,
      occupations,
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
              setOccupations([...occupations, { title: "", from: "", to: "" }])
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
