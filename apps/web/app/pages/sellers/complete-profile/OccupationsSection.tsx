"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

type Occupation = {
  title: string;
  from: Date | undefined;
  to: Date | undefined;
};

type OccupationsSectionProps = {
  occupations: Occupation[];
  companyType: "freelancer" | "company";
  companyName: string;
  profession: string;
  experienceLevel: string;
  sector: string;
  addOccupation: () => void;
  removeOccupation: (index: number) => void;
  updateOccupation: (
    index: number,
    field: keyof Occupation,
    value: any,
  ) => void;
  setCompanyType: (value: "freelancer" | "company") => void;
  setCompanyName: (value: string) => void;
  setProfession: (value: string) => void;
  setExperienceLevel: (value: string) => void;
  setSector: (value: string) => void;
};

export default function Component({
  occupations,
  companyType,
  companyName,
  profession,
  experienceLevel,
  sector,
  addOccupation,
  removeOccupation,
  updateOccupation,
  setCompanyType,
  setCompanyName,
  setProfession,
  setExperienceLevel,
  setSector,
}: OccupationsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil de Carrière</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyType">Type d'Entreprise</Label>
          <Select
            value={companyType}
            onValueChange={(value) =>
              setCompanyType(value as "freelancer" | "company")
            }
          >
            <SelectTrigger id="companyType">
              <SelectValue placeholder="Sélectionnez le type d'entreprise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="freelancer">Freelance</SelectItem>
              <SelectItem value="company">Entreprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Nom de l'Entreprise</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Entrez le nom de votre entreprise"
            disabled={companyType === "freelancer"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector">Secteur</Label>
          <Select
            value={sector}
            onValueChange={setSector}
            disabled={companyType === "freelancer"}
          >
            <SelectTrigger id="sector">
              <SelectValue placeholder="Sélectionnez le secteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technologie</SelectItem>
              <SelectItem value="healthcare">Santé</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Éducation</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="manufacturing">Industrie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Entrez votre profession"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Niveau d'Expérience</Label>
          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
            <SelectTrigger id="experienceLevel">
              <SelectValue placeholder="Sélectionnez le niveau d'expérience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no_experience">Aucune expérience</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="intermediate">Intermédiaire</SelectItem>
              <SelectItem value="senior">Sénior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Vos Occupations</Label>
          {occupations.map((occupation, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor={`occupation-title-${index}`}>Titre</Label>
                    <Input
                      id={`occupation-title-${index}`}
                      value={occupation.title}
                      onChange={(e) =>
                        updateOccupation(index, "title", e.target.value)
                      }
                      placeholder="Entrez le titre de l'occupation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`occupation-from-${index}`}>De</Label>
                    <Input
                      id={`occupation-from-${index}`}
                      type="date"
                      value={
                        occupation.from
                          ? occupation.from.toISOString().slice(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        updateOccupation(
                          index,
                          "from",
                          new Date(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`occupation-to-${index}`}>À</Label>
                    <Input
                      id={`occupation-to-${index}`}
                      type="date"
                      value={
                        occupation.to
                          ? occupation.to.toISOString().slice(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        updateOccupation(index, "to", new Date(e.target.value))
                      }
                    />
                  </div>
                </div>
                {index > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeOccupation(index)}
                    className="mt-4"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer l'Occupation
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          <Button onClick={addOccupation} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Occupation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
