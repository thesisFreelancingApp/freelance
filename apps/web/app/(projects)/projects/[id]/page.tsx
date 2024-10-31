import ProjectDetailsPage from "@/app/pages/projects/ProjectDetails";
import { getProject } from "@/server.actions/project/projects.actions";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;

  const project = await getProject(id);

  if (!project) {
    return notFound();
  }

  return <ProjectDetailsPage project={project} />;
}
