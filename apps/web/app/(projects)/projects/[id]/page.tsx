import ProjectDetailsPage from "@/app/pages/projects/ProjectDetails";
import { getUserId } from "@/server.actions/auth/auth.actions";
import { getProject } from "@/server.actions/project/projects.actions";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({
  params: { id },
}: ProjectPageProps) {
  const [project, currentUser] = await Promise.all([
    getProject(id),
    getUserId(),
  ]);

  if (!project) return notFound();

  return (
    <ProjectDetailsPage
      project={project}
      currentUserId={currentUser?.userId || null}
    />
  );
}
