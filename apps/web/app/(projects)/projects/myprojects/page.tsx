import ProjectManagementPage from "@/app/pages/projects/MyProjects";
import {
  getMyProjectsCreated,
  getMyParticipatedProjects,
  getMyProjectInvitations,
} from "@/server.actions/project/projects.actions";

export default async function ProjectsPage() {
  const createdProjects = await getMyProjectsCreated();
  const participatedProjects = await getMyParticipatedProjects();
  const projectInvitations = await getMyProjectInvitations();

  return (
    <ProjectManagementPage
      createdProjects={createdProjects ?? []}
      participatedProjects={participatedProjects ?? []}
      projectInvitations={projectInvitations ?? []}
    />
  );
}
