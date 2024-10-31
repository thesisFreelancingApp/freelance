"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

interface MediaItem {
  url: string;
  type: string;
}
interface ProjectForm {
  title: string;
  description: string;
  minBudget: string;
  maxBudget: string;
  timeline: string;
  experienceLevel: string;
  sprints: { title: string; description: string }[];
  medias: MediaItem[];
  requirements: { title: string; detail: string }[]; // Exigences du projet
  skills: { value: string }[]; // Compétences requises (array of objects)
}

interface RequirementsStepProps {
  form: UseFormReturn<ProjectForm>;
}

export default function RequirementsStep({ form }: RequirementsStepProps) {
  const { register, control } = form;

  // Gestion des champs dynamiques pour les exigences et les compétences
  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: "requirements",
  });
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="mb-6 text-2xl font-semibold">Exigences & Compétences</h1>

        {/* Exigences */}
        <div className="mb-6">
          <Label className="text-base font-medium">Exigences du Projet</Label>
          <p className="mb-4 text-sm text-gray-500">
            Ajoutez les exigences spécifiques pour le projet.
          </p>
          {requirementFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-4">
              <Input
                {...register(`requirements.${index}.title` as const)}
                placeholder="Titre de l'exigence"
                className="flex-1"
              />
              <Input
                {...register(`requirements.${index}.detail` as const)}
                placeholder="Détails de l'exigence"
                className="flex-1"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeRequirement(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendRequirement({ title: "", detail: "" })}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Ajouter une exigence
          </Button>
        </div>

        {/* Compétences requises */}
        <div className="mb-6">
          <Label className="text-base font-medium">Compétences Requises</Label>
          <p className="mb-4 text-sm text-gray-500">
            Ajoutez les compétences requises pour ce projet.
          </p>
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-4">
              <Input
                {...register(`skills.${index}.value` as const)}
                placeholder="Compétence requise"
                className="flex-1"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeSkill(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendSkill({ value: "" })}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Ajouter une compétence
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
