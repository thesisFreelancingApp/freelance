// components/ProjectDetailsPage.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cancelRequest } from "@/server.actions/project/projects.actions"; // Importer une action d'annulation
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MediaItem {
  url: string;
  type: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  minBudget: string | null;
  maxBudget: string | null;
  createdAt: Date;
  updatedAt: Date;
  requirements: { title: string; detail: string }[];
  skills: { value: string }[];
  sprints: { title: string; description: string }[];
  participants: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
  participantRequests: {
    id: string;
    requester: { firstName: string; lastName: string; email: string };
    status: string;
  }[];
  medias: MediaItem[];
}

interface ProjectDetailsPageProps {
  project: Project;
}

export default function ProjectDetailsPage({
  project,
}: ProjectDetailsPageProps) {
  const router = useRouter();
  const [pendingRequests, setPendingRequests] = useState(
    project.participantRequests.filter(
      (request) => request.status === "PENDING",
    ),
  );

  // Fonction pour annuler une demande de participation
  const handleCancelRequest = async (requestId: string) => {
    try {
      await cancelRequest(requestId); // Appeler l'action d'annulation
      setPendingRequests((prev) =>
        prev.filter((request) => request.id !== requestId),
      );
    } catch (error) {
      console.error("Erreur lors de l'annulation de la demande :", error);
    }
  };

  return (
    <div className="p-6 mx-auto space-y-4 max-w-7xl">
      <Button onClick={() => router.back()} className="mb-4">
        Retour
      </Button>

      <div className="flex space-x-4">
        {/* Détails du Projet */}
        <div className="flex-1 p-4 space-y-4 border rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <p className="text-sm text-gray-600">{project.description}</p>

          <div className="text-sm text-gray-500">
            Budget: {project.minBudget ? project.minBudget : "N/A"} -{" "}
            {project.maxBudget ? project.maxBudget : "N/A"}
          </div>
          <div className="text-sm text-gray-500">
            Date de création: {new Date(project.createdAt).toLocaleDateString()}
          </div>

          {/* Section des Sprints */}
          <div>
            <h2 className="mt-4 font-semibold">Sprints</h2>
            {project.sprints.length > 0 ? (
              <ul className="list-disc list-inside">
                {project.sprints.map((sprint, index) => (
                  <li key={index}>
                    <strong>{sprint.title}</strong>: {sprint.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun sprint défini.</p>
            )}
          </div>

          {/* Section des Exigences */}
          <div>
            <h2 className="mt-4 font-semibold">Exigences</h2>
            {project.requirements.length > 0 ? (
              <ul className="list-disc list-inside">
                {project.requirements.map((requirement, index) => (
                  <li key={index}>
                    <strong>{requirement.title}</strong>: {requirement.detail}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune exigence définie.</p>
            )}
          </div>

          {/* Section des Compétences */}
          <div>
            <h2 className="mt-4 font-semibold">Compétences Requises</h2>
            {project.skills.length > 0 ? (
              <ul className="list-disc list-inside">
                {project.skills.map((skill, index) => (
                  <li key={index}>{skill.value}</li>
                ))}
              </ul>
            ) : (
              <p>Aucune compétence spécifiée.</p>
            )}
          </div>

          {/* Section des Médias */}
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Médias Associés</CardTitle>
            </CardHeader>
            <CardContent>
              {project.medias.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {project.medias.map((mediaItem, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden aspect-video"
                    >
                      {mediaItem.type === "image" ? (
                        <img
                          src={mediaItem.url}
                          alt={`Media ${index + 1}`}
                          className="object-cover w-full h-full border rounded-md"
                        />
                      ) : (
                        <video
                          className="object-cover w-full h-full border rounded-md"
                          controls
                          src={mediaItem.url}
                          title={`Media ${index + 1}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Aucun média associé.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Carte des Demandes en Attente */}
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Demandes en Attente</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRequests.length > 0 ? (
              <ul className="space-y-4">
                {pendingRequests.map((request) => (
                  <li
                    key={request.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      {request.requester.firstName} {request.requester.lastName}{" "}
                      - {request.requester.email}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelRequest(request.id)}
                    >
                      Annuler
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune demande en attente.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
