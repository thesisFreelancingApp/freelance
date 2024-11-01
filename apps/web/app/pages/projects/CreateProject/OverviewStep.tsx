"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

// Interface de formulaire pour le projet
interface ProjectForm {
  title: string;
  description: string;
  minBudget: string;
  maxBudget: string;
  timeline: string;
  experienceLevel: string;
  sprints: { title: string; description: string }[];
  medias: MediaItem[];
  requirements: { title: string; detail: string }[];  // Exigences du projet
  skills: { value: string }[];  // Compétences requises (array of objects)
}

interface MediaItem {
  url: string;
  type: string;
}
interface OverviewStepProps {
  form: UseFormReturn<ProjectForm>;
}

export default function OverviewStep({ form }: OverviewStepProps) {
  const { register, control } = form;

  // Gestion des champs de tableau "sprints" avec useFieldArray
  const { fields: sprintFields, append: appendSprint } = useFieldArray({
    control,
    name: "sprints",
  });

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="mb-6 text-2xl font-semibold">Aperçu du Projet</h1>

        {/* Titre du Projet */}
        <div className="mb-6">
          <Label className="text-base font-medium">Titre du Projet</Label>
          <Input
            {...register("title", { required: "Le titre est requis" })}
            placeholder="Entrez le titre du projet"
            className="mt-2"
          />
        </div>

        {/* Description du Projet */}
        <div className="mb-6">
          <Label className="text-base font-medium">Description du Projet</Label>
          <Textarea
            {...register("description", {
              required: "La description est requise",
            })}
            placeholder="Fournissez une description pour le projet"
            className="min-h-[120px] mt-2"
          />
        </div>

        {/* Section des Sprints */}
        <div>
          <Label className="text-base font-medium">Sprints</Label>
          <p className="mb-4 text-sm text-gray-500">
            Ajoutez chaque sprint impliqué dans la réalisation de votre projet.
          </p>

          {/* Liste des sprints existants */}
          {sprintFields.map((field, index) => (
            <div key={field.id} className="mb-4">
              {/* Titre du Sprint */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center w-6 h-6 text-sm rounded-full bg-primary/20 text-primary">
                  {index + 1}
                </div>
                <Input
                  {...register(`sprints.${index}.title`)}
                  placeholder="Titre du sprint"
                  className="flex-1"
                />
              </div>

              {/* Description du Sprint */}
              <Textarea
                {...register(`sprints.${index}.description`)}
                placeholder="Description du sprint"
              />
            </div>
          ))}

          {/* Bouton pour ajouter un nouveau sprint */}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => appendSprint({ title: "", description: "" })}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Ajouter un sprint
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
