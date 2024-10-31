import ProjectManagementPage from "@/app/pages/projects/MyProjects";
import { getMyProjects } from "@/server.actions/project/projects.actions";

export default async function ProjectsPage() {
  const projects = await getMyProjects();

  return <ProjectManagementPage projects={projects ?? []} />;
}
