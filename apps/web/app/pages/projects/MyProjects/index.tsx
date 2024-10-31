"use client";

import { Button } from "@/components/ui/button";
import { Projects } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
interface ProjectManagementPageProps {
  projects: Projects[];
}

export default function ProjectManagementPage({
  projects,
}: ProjectManagementPageProps) {
  const router = useRouter();

  const handleCreateProject = () => {
    router.push("/projects/create-project");
  };

  return (
    <div className="p-6 mx-auto space-y-4 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Mes projets</h1>
        <Button onClick={handleCreateProject}>Créer un projet</Button>
      </div>
      <Separator />

      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 space-y-2 border rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-sm text-gray-600">{project.description}</p>
              <div className="text-sm text-gray-500">
                Budget: {Number(project.minBudget)} -{" "}
                {Number(project.maxBudget)} TND
              </div>
              <Button
                onClick={() => router.push(`/projects/${project.id}`)}
                variant="outline"
              >
                Voir le projet
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun projet trouvé.</p>
      )}
    </div>
  );
}
