"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

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
  requirements: { title: string; detail: string }[];  // Exigences du projet
  skills: { value: string }[];  // Compétences requises (array of objects)
}

interface PricingStepProps {
  form: UseFormReturn<ProjectForm>;
}

export default function PricingStep({ form }: PricingStepProps) {
  const { register, setValue, watch } = form;

  // Watcher pour voir la valeur actuelle dans le formulaire
  const experienceLevel = watch("experienceLevel", "");

  // Etats locaux pour timeline
  const [timelineNumber, setTimelineNumber] = useState("");
  const [timelineUnit, setTimelineUnit] = useState("jours");

  // Mise à jour de `timeline` dans le formulaire
  const handleTimelineChange = (number: string, unit: string) => {
    setTimelineNumber(number);
    setTimelineUnit(unit);
    setValue("timeline", `${number} ${unit}`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="mb-6 text-2xl font-semibold">
          Durèe & Tarification du Projet
        </h1>

        {/* Budget Minimum */}
        <div className="mb-6">
          <Label className="text-base font-medium">Budget Minimum</Label>
          <Input
            {...register("minBudget", {
              required: "Le budget minimum est requis",
            })}
            placeholder="Entrez le budget minimum"
            className="mt-2"
            type="number"
          />
        </div>

        {/* Budget Maximum */}
        <div className="mb-6">
          <Label className="text-base font-medium">Budget Maximum</Label>
          <Input
            {...register("maxBudget", {
              required: "Le budget maximum est requis",
            })}
            placeholder="Entrez le budget maximum"
            className="mt-2"
            type="number"
          />
        </div>

        {/* Timeline avec unité */}
        <div className="mb-6">
          <Label className="text-base font-medium">Délai estimé</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              placeholder="Entrez le délai"
              type="number"
              value={timelineNumber}
              onChange={(e) =>
                handleTimelineChange(e.target.value, timelineUnit)
              }
              className="flex-1"
            />
            <Select
              onValueChange={(value) =>
                handleTimelineChange(timelineNumber, value)
              }
              value={timelineUnit}
            >
              <SelectTrigger className="w-32">
                <span className="text-gray-500">{timelineUnit}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jours">Jours</SelectItem>
                <SelectItem value="semaines">Semaines</SelectItem>
                <SelectItem value="mois">Mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Niveau d'expérience */}
        <div className="mb-6">
          <Label className="text-base font-medium">Niveau d'Expérience</Label>
          <Select
            onValueChange={(value) => setValue("experienceLevel", value)}
            value={experienceLevel}
          >
            <SelectTrigger className="mt-2">
              <span className="text-gray-500">
                {experienceLevel || "Sélectionnez un niveau d'expérience"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Débutant">Débutant</SelectItem>
              <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
