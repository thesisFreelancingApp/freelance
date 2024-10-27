"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

export default function Component({
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
      <Card>
        <CardHeader>
          <CardTitle>Vos Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {certifications.map((certification, index) => (
            <div key={index} className="space-y-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <Input
                  value={certification.title}
                  onChange={(e) =>
                    updateCertification(index, "title", e.target.value)
                  }
                  placeholder="Titre de la certification"
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
                  placeholder="Date (mois et année)"
                />
              </div>
              {index > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer la Certification
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addCertification} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Certification
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compétences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Entrez une compétence"
            />
            <Button
              onClick={() => {
                if (skillInput.trim()) {
                  addSkill(skillInput);
                  setSkillInput("");
                }
              }}
            >
              Ajouter la Compétence
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                  className="h-auto p-0 ml-2 text-primary-foreground"
                >
                  <Trash2 className="w-3 h-3" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Votre Éducation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {educations.map((education, index) => (
            <div key={index} className="space-y-2">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <Input
                  value={education.faculty}
                  onChange={(e) =>
                    updateEducation(index, "faculty", e.target.value)
                  }
                  placeholder="Entrez le nom de la faculté ou de l'école"
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
                  placeholder="De"
                />
                <Input
                  type="date"
                  value={
                    education.to ? education.to.toISOString().slice(0, 10) : ""
                  }
                  onChange={(e) =>
                    updateEducation(index, "to", new Date(e.target.value))
                  }
                  placeholder="À"
                />
              </div>
              {index > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer l'Éducation
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Éducation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
