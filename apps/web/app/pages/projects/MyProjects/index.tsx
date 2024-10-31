"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Projects } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaCheck, FaEye, FaPlus, FaTimes } from "react-icons/fa"; // Importation des icônes

interface ProjectManagementPageProps {
  createdProjects: Projects[];
  participatedProjects: Projects[];
  projectInvitations: Array<{ project: Projects }>;
}

export default function Component({
  createdProjects = [],
  participatedProjects = [],
  projectInvitations = [],
}: ProjectManagementPageProps) {
  const router = useRouter();

  const handleAcceptInvitation = useCallback((projectId: string) => {
    console.log(`Acceptation de l'invitation pour le projet ${projectId}`);
    // Logique pour accepter l'invitation (ex: appel API)
  }, []);

  const handleDeclineInvitation = useCallback((projectId: string) => {
    console.log(`Refus de l'invitation pour le projet ${projectId}`);
    // Logique pour refuser l'invitation (ex: appel API)
  }, []);

  const ProjectCard = ({
    project,
    actions,
  }: {
    project: Projects;
    actions?: React.ReactNode;
  }) => (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold ">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Budget : {Number(project.minBudget)} - {Number(project.maxBudget)} TND
        </div>
        <div className="flex gap-2">
          {actions || (
            <Button
              variant="outline"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <FaEye className="mr-2" /> Voir le projet
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ProjectSection = ({
    title,
    projects,
    renderProject,
    emptyMessage,
  }: {
    title: string;
    projects: any[];
    renderProject: (project: any) => React.ReactNode;
    emptyMessage: string;
  }) => (
    <section className="space-y-4">
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(renderProject)}
        </div>
      ) : (
        <p className="text-muted-foreground">{emptyMessage}</p>
      )}
    </section>
  );

  return (
    <div className="container py-8 space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <Button onClick={() => router.push("/projects/create-project")}>
          <FaPlus className="mr-2" /> Créer un projet
        </Button>
      </div>

      <Separator className="my-6" />
      <ProjectSection
        title="Invitations aux Projets"
        projects={projectInvitations}
        renderProject={({ project }) => (
          <ProjectCard
            key={project.id}
            project={project}
            actions={
              <div className="flex flex-col gap-2 ">
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <FaEye className="mr-2" /> Voir le projet
                </Button>
                <div className="space-x-1">
                  <Button onClick={() => handleAcceptInvitation(project.id)}>
                    <FaCheck className="mr-2" /> Accepter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeclineInvitation(project.id)}
                  >
                    <FaTimes className="mr-2" /> Refuser
                  </Button>
                </div>
              </div>
            }
          />
        )}
        emptyMessage="Aucune invitation reçue."
      />

      <ProjectSection
        title="Mes Projets Créés"
        projects={createdProjects}
        renderProject={(project) => (
          <ProjectCard key={project.id} project={project} />
        )}
        emptyMessage="Aucun projet créé trouvé."
      />

      <Separator className="my-6" />

      <ProjectSection
        title="Projets auxquels je participe"
        projects={participatedProjects}
        renderProject={(project) => (
          <ProjectCard key={project.id} project={project} />
        )}
        emptyMessage="Aucun projet de participation trouvé."
      />

      <Separator className="my-6" />
    </div>
  );
}
