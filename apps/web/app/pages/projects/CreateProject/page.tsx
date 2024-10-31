"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createProjectAction } from "@/server.actions/project/projects.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MediaStep from "./GalleryStep";
import OverviewStep from "./OverviewStep";
import PricingStep from "./PricingStep";
import RequirementsStep from "./RequirementsStep";
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

const steps = ["Détail du Projet", "Budget et Durée", "Médias", "Exigences"];
export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
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
    try {
      console.log("Données soumises :", data);

      // Crée le projet en appelant `createProjectAction`
      const project = await createProjectAction(data);

      // Vérifiez que le projet a bien été créé avant de rediriger
      if (project?.id) {
        // Notification de succès
        toast({
          title: "Projet créé avec succès !",
          description: "Redirection vers l'affectation du projet...",
        });

        // Redirection après succès
        router.push(`/projects/assign/${project.id}`);
      } else {
        console.error("Le projet n'a pas pu être créé");
        // Notification d'échec
        toast({
          title: "Erreur lors de la création du projet",
          description: "Veuillez réessayer plus tard.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      // Notification d'erreur avec message détaillé
      toast({
        title: "Erreur inattendue",
        description:
          "Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.",
      });
    }
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
    <div className="p-6 mx-auto space-y-4 max-w-7xl">
      <StepProgress
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg md:col-span-2">
          <div className="space-y-4">
            {renderCurrentStep()}
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePreviousStep}
                variant="outline"
                disabled={currentStep === 0}
              >
                Retour
              </Button>
              <Button
                onClick={
                  currentStep === steps.length - 1
                    ? handleSubmit(onSubmit)
                    : handleNextStep
                }
              >
                {currentStep === steps.length - 1
                  ? "Soumettre le Projet"
                  : "Enregistrer & Continuer"}
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="rounded-lg ">
          <StepDetails
            currentStep={currentStep}
            projectDetails={projectDetails}
          />
        </div>
      </div>
    </div>
  );
}
