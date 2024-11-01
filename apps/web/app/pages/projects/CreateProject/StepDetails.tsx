"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface MediaItem {
  url: string;
  type: string;
}

interface Sprint {
  title: string;
  description: string;
}

interface Skill {
  value: string;
}

interface ProjectDetails {
  [key: string]: Record<string, any>;
}

interface StepDetailsProps {
  currentStep: number;
  projectDetails: ProjectDetails;
}

export default function StepDetails({
  currentStep,
  projectDetails = {},
}: StepDetailsProps) {
  // Helper function to render section content
  const renderSectionContent = (
    section: string,
    details: Record<string, any>,
  ) => {
    return Object.entries(details)
      .filter(
        ([_, value]) =>
          value && (Array.isArray(value) ? value.length > 0 : true),
      )
      .map(([label, value]) => (
        <div key={label} className="grid gap-1 sm:grid-cols-3">
          <dt className="font-medium text-gray-700">{label} :</dt>
          <dd className="sm:col-span-2">
            {Array.isArray(value) ? (
              section === "Médias" ? (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {value.map((media: MediaItem, index) => (
                    <div key={index} className="relative">
                      {media.type === "image" ? (
                        <img
                          src={media.url}
                          alt={`Media ${index + 1}`}
                          className="object-cover w-full h-full rounded-md"
                        />
                      ) : (
                        <video
                          controls
                          src={media.url}
                          className="object-cover w-full h-full rounded-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : label === "Sprints" ? (
                <ol className="space-y-1 list-decimal list-inside">
                  {value.map((sprint: Sprint, index) => (
                    <li key={index}>
                      <strong>{sprint.title}:</strong> {sprint.description}
                    </li>
                  ))}
                </ol>
              ) : label === "Éléments" && section === "Compétences" ? (
                <ul className="space-y-1 list-disc list-inside">
                  {value.map((skill: Skill, index) => (
                    <li key={index}>{skill.value}</li>
                  ))}
                </ul>
              ) : (
                <ol className="space-y-1 list-decimal list-inside">
                  {value.map((item, index) => (
                    <li key={index}>
                      {item.title}: {item.detail}
                    </li>
                  ))}
                </ol>
              )
            ) : (
              <span className="text-gray-600">{value}</span>
            )}
          </dd>
        </div>
      ));
  };

  if (currentStep === 0) {
    return (
      <Card className="h-fit">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Détails du Projet</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            {[
              "Ajoutez plus de détails sur votre offre et pourquoi les clients devraient travailler avec vous.",
              "Montrez aux clients potentiels les étapes que vous suivez pour réaliser votre projet.",
              "Répondez aux questions fréquentes des clients pour éviter les échanges incessants.",
            ].map((text, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary" aria-hidden="true">
                  •
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  const validSections = Object.entries(projectDetails).filter(([_, details]) =>
    Object.values(details).some(
      (value) => value && (Array.isArray(value) ? value.length > 0 : true),
    ),
  );

  return (
    <Card className="h-fit">
      <CardContent className="p-6">
        {validSections.map(([section, details], index) => (
          <div key={section}>
            <section>
              <h2 className="mb-4 text-lg font-semibold">{section}</h2>
              <dl className="space-y-3 text-sm">
                {renderSectionContent(section, details)}
              </dl>
            </section>
            {index < validSections.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
