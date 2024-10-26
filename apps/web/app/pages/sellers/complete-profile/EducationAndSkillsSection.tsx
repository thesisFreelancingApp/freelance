import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// Define types for each section
type Certification = {
  title: string;
  institution: string;
  date: Date | undefined;
};

type Education = {
  faculty: string;
  from: Date | undefined;
  to: Date | undefined;
};

type SkillsAndEducationProps = {
  certifications: Certification[];
  addCertification: () => void;
  removeCertification: (index: number) => void;
  updateCertification: (
    index: number,
    field: keyof Certification,
    value: any,
  ) => void;

  skills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;

  educations: Education[];
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateEducation: (index: number, field: keyof Education, value: any) => void;
};

export default function SkillsAndEducation({
  certifications,
  addCertification,
  removeCertification,
  updateCertification,
  skills,
  addSkill,
  removeSkill,
  educations,
  addEducation,
  removeEducation,
  updateEducation,
}: SkillsAndEducationProps) {
  const [skillInput, setSkillInput] = useState<string>("");

  return (
    <div className="space-y-8">
      {/* Certifications Section */}
      <div className="space-y-4">
        <Label>Your Certifications</Label>
        {certifications.map((certification, index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <Input
                value={certification.title}
                onChange={(e) =>
                  updateCertification(index, "title", e.target.value)
                }
                placeholder="Certification title"
              />
              <Input
                value={certification.institution}
                onChange={(e) =>
                  updateCertification(index, "institution", e.target.value)
                }
                placeholder="Institution"
              />
              <Input
                type="month"
                value={
                  certification.date
                    ? certification.date.toISOString().slice(0, 7)
                    : ""
                }
                onChange={(e) =>
                  updateCertification(index, "date", new Date(e.target.value))
                }
                placeholder="Date (month and year)"
              />
            </div>
            {index > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(index)}
                className="mt-2"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Certification
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addCertification} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <Label>Skills</Label>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Enter a skill"
          />
          <Button
            onClick={() => {
              if (skillInput.trim()) {
                addSkill(skillInput);
                setSkillInput(""); // Clear input after adding skill
              }
            }}
          >
            Add Skill
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 bg-gray-200 rounded-full"
            >
              <span>{skill}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(index)}
              >
                <Trash2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <Label>Your Education</Label>
        {educations.map((education, index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <Input
                value={education.faculty}
                onChange={(e) =>
                  updateEducation(index, "faculty", e.target.value)
                }
                placeholder="Enter faculty or school name"
              />
              <Input
                type="date"
                value={
                  education.from
                    ? education.from.toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  updateEducation(index, "from", new Date(e.target.value))
                }
                placeholder="From"
              />
              <Input
                type="date"
                value={
                  education.to ? education.to.toISOString().slice(0, 10) : ""
                }
                onChange={(e) =>
                  updateEducation(index, "to", new Date(e.target.value))
                }
                placeholder="To"
              />
            </div>
            {index > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="mt-2"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Education
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addEducation} variant="outline" size="sm">
          Add Education
        </Button>
      </div>
    </div>
  );
}
