"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import RequirementsStep from "@/app/project/RequirementsStep";
import MediaStep from "./GalleryStep";
import OverviewStep from "./OverviewStep";
import PricingStep from "./PricingStep";
import StepDetails from "./StepDetails";
import StepProgress from "./StepProgress";

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
  requirements: { title: string; detail: string }[];
  skills: { value: string }[];
}

const steps = [
  "Détail du Projet",
  "Budget et Durée",
  "Médias",
  "Exigences",
  "Révision",
];

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ProjectForm>({
    defaultValues: {
      sprints: [
        {
          title: "Exemple de titre de sprint",
          description: "Exemple de description de sprint",
        },
      ],
      medias: [],
      requirements: [],
      skills: [],
    },
  });
  const { handleSubmit, watch } = form;

  useEffect(() => {
    const stepName = steps[currentStep];
    router.replace(`?step=${encodeURIComponent(stepName)}`);
  }, [currentStep, router]);

  useEffect(() => {
    const stepQuery = searchParams.get("step");
    const stepIndex = steps.findIndex((step) => step === stepQuery);
    if (stepIndex !== -1) setCurrentStep(stepIndex);
  }, [searchParams]);

  const onSubmit = async (data: ProjectForm) => {
    console.log(data);
    // Place submission logic here
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <OverviewStep form={form} />;
      case 1:
        return <PricingStep form={form} />;
      case 2:
        return <MediaStep form={form} />;
      case 3:
        return <RequirementsStep form={form} />;
      default:
        return null;
    }
  };

  const projectDetails = {
    Aperçu: {
      Titre: watch("title"),
      Description: watch("description"),
      Sprints: watch("sprints") || [],
    },
    Tarification: {
      "Budget Min": watch("minBudget"),
      "Budget Max": watch("maxBudget"),
      "Niveau d'expérience": watch("experienceLevel"),
      "Délai estimé": watch("timeline"),
    },
    Médias: { Éléments: watch("medias") },
    Exigences: { Éléments: watch("requirements") },
    Compétences: { Éléments: watch("skills") || [] },
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <StepProgress
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {currentStep === steps.length - 1 ? (
        // Render full-page revision step
        <div className="p-6 bg-white rounded-md shadow-md">
          <StepDetails
            currentStep={currentStep}
            projectDetails={projectDetails}
          />
          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit(onSubmit)}>
              Soumettre le Projet
            </Button>
          </div>
        </div>
      ) : (
        // Render standard step layout
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {renderCurrentStep()}
            <div className="flex flex-col justify-between mt-6 space-y-2 lg:flex-row lg:space-y-0">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
              >
                Retour
              </Button>
              <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
                <Button variant="outline">Annuler</Button>
                <Button
                  onClick={
                    currentStep === steps.length - 1
                      ? handleSubmit(onSubmit)
                      : handleNextStep
                  }
                >
                  {currentStep === steps.length - 1
                    ? "Soumettre"
                    : "Enregistrer & Continuer"}
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <StepDetails
              currentStep={currentStep}
              projectDetails={projectDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
}
