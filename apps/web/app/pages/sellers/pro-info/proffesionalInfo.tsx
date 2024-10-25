"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProfessionalProfile } from "@/server.actions/sellers/proinfo/info"; // Update this path accordingly
import * as Toast from "@radix-ui/react-toast";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
type Certification = { name: string; issuer: string; year: string };
type Language = { name: string; proficiency: string };

export default function ProfessionalInfoForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Page 1 States
  const [occupations, setOccupations] = useState<Occupation[]>([
    { title: "", from: "", to: "" },
  ]);
  const [companyName, setCompanyName] = useState("");
  const [profession, setProfession] = useState("");
  const [experienceYears, setExperienceYears] = useState<number | "">("");

  // Page 2 States
  const [skills, setSkills] = useState<Skill[]>([{ name: "", level: "" }]);
  const [education, setEducation] = useState<Education[]>([
    { country: "", university: "", title: "", major: "", year: "" },
  ]);

  // Page 3 States
  const [certifications, setCertifications] = useState<Certification[]>([
    { name: "", issuer: "", year: "" },
  ]);
  const [languages, setLanguages] = useState<Language[]>([
    { name: "", proficiency: "" },
  ]);
  const [website, setWebsite] = useState("");

  const router = useRouter();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addOccupation = () => {
    setOccupations([...occupations, { title: "", from: "", to: "" }]);
  };

  const removeOccupation = (index: number) => {
    setOccupations(occupations.filter((_, i) => i !== index));
  };

  const addSkill = () => setSkills([...skills, { name: "", level: "" }]);
  const removeSkill = (index: number) =>
    setSkills(skills.filter((_, i) => i !== index));

  const addEducation = () =>
    setEducation([
      ...education,
      { country: "", university: "", title: "", major: "", year: "" },
    ]);
  const removeEducation = (index: number) =>
    setEducation(education.filter((_, i) => i !== index));

  const addCertification = () =>
    setCertifications([...certifications, { name: "", issuer: "", year: "" }]);
  const removeCertification = (index: number) =>
    setCertifications(certifications.filter((_, i) => i !== index));

  const addLanguage = () =>
    setLanguages([...languages, { name: "", proficiency: "" }]);
  const removeLanguage = (index: number) =>
    setLanguages(languages.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    const profileData = {
      companyName,
      profession,
      experienceYears,
      languages: languages.map((lang) => lang.name),
      personalWebsite: website,
      occupations,
      skills,
      educations: education,
      certifications,
      website,
    };

    console.log("Profile Data to Submit:", profileData);

    try {
      const newProfile = await createProfessionalProfile(profileData);
      console.log("Profile created:", newProfile);
      setToastMessage("Profile created successfully!");
      setToastOpen(true);
      // router.push("/") // Redirect after successful profile creation
    } catch (error) {
      console.error("Error creating profile:", error);
      setToastMessage("Error creating profile. Please try again.");
      setToastOpen(true);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Basic Professional Info";
      case 2:
        return "Skills and Education";
      case 3:
        return "Additional Information";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{getStepTitle(currentStep)}</CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <>
            {/* Occupations Section */}
            <div className="space-y-4">
              <Label>Your Occupations</Label>
              {occupations.map((occupation, index) => (
                <div key={index} className="space-y-2">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <Input
                      value={occupation.title}
                      onChange={(e) => {
                        const newOccupations = [...occupations];
                        newOccupations[index].title = e.target.value;
                        setOccupations(newOccupations);
                      }}
                      placeholder="Enter occupation"
                    />
                    <Input
                      type="date"
                      value={occupation.from}
                      onChange={(e) => {
                        const newOccupations = [...occupations];
                        newOccupations[index].from = e.target.value;
                        setOccupations(newOccupations);
                      }}
                      placeholder="From"
                    />
                    <Input
                      type="date"
                      value={occupation.to}
                      onChange={(e) => {
                        const newOccupations = [...occupations];
                        newOccupations[index].to = e.target.value;
                        setOccupations(newOccupations);
                      }}
                      placeholder="To"
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOccupation(index)}
                      className="mt-2"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Occupation
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addOccupation} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Occupation
              </Button>
            </div>

            {/* Company Name Section */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
              />
            </div>

            {/* Profession Section */}
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Enter your profession"
              />
            </div>

            {/* Experience Years Section */}
            <div className="space-y-2">
              <Label htmlFor="experienceYears">Years of Experience</Label>
              <Input
                id="experienceYears"
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                placeholder="Enter your years of experience"
              />
            </div>

            <Button onClick={() => setCurrentStep(2)}>Next</Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Skills Section */}
            <div className="space-y-2">
              <Label>Skills</Label>
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = [...skills];
                      newSkills[index].name = e.target.value;
                      setSkills(newSkills);
                    }}
                    placeholder="Skill name"
                  />
                  <Select
                    value={skill.level}
                    onValueChange={(value) => {
                      const newSkills = [...skills];
                      newSkills[index].level = value;
                      setSkills(newSkills);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addSkill} variant="outline" size="sm">
                Add Skill
              </Button>
            </div>

            {/* Education Section */}
            <div className="space-y-2">
              <Label>Education</Label>
              {education.map((edu, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <Input
                    value={edu.country}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].country = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Country"
                  />
                  <Input
                    value={edu.university}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].university = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="University"
                  />
                  <Input
                    value={edu.title}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].title = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Title"
                  />
                  <Input
                    value={edu.major}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].major = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Major"
                  />
                  <Input
                    type="number"
                    value={edu.year}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].year = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Year"
                  />
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addEducation} variant="outline" size="sm">
                Add Education
              </Button>
            </div>

            <div className="flex justify-between mt-4">
              <Button onClick={() => setCurrentStep(1)}>Back</Button>
              <Button onClick={() => setCurrentStep(3)}>Next</Button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* Certifications Section */}
            <div className="space-y-2">
              <Label>Certifications</Label>
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={cert.name}
                    onChange={(e) => {
                      const newCertifications = [...certifications];
                      newCertifications[index].name = e.target.value;
                      setCertifications(newCertifications);
                    }}
                    placeholder="Certification name"
                  />
                  <Input
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCertifications = [...certifications];
                      newCertifications[index].issuer = e.target.value;
                      setCertifications(newCertifications);
                    }}
                    placeholder="Issuer"
                  />
                  <Input
                    type="number"
                    value={cert.year}
                    onChange={(e) => {
                      const newCertifications = [...certifications];
                      newCertifications[index].year = e.target.value;
                      setCertifications(newCertifications);
                    }}
                    placeholder="Year"
                  />
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCertification(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addCertification} variant="outline" size="sm">
                Add Certification
              </Button>
            </div>

            {/* Languages Section */}
            <div className="space-y-2">
              <Label>Languages</Label>
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={lang.name}
                    onChange={(e) => {
                      const newLanguages = [...languages];
                      newLanguages[index].name = e.target.value;
                      setLanguages(newLanguages);
                    }}
                    placeholder="Language"
                  />
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) => {
                      const newLanguages = [...languages];

                      newLanguages[index].proficiency = value;
                      setLanguages(newLanguages);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLanguage(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addLanguage} variant="outline" size="sm">
                Add Language
              </Button>
            </div>

            {/* Personal Website Section */}
            <div className="space-y-2">
              <Label htmlFor="website">Personal Website</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter your website URL"
              />
            </div>

            <div className="flex justify-between mt-4">
              <Button onClick={() => setCurrentStep(2)}>Back</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </>
        )}
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
