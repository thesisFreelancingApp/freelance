"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { Decimal } from "@prisma/client/runtime/library";

interface ProjectData {
  title: string;
  description: string;
  minBudget: string;
  maxBudget: string;
  timeline: string;
  experienceLevel: string;
  sprints: { title: string; description: string }[];
  medias: { url: string; type: string }[];
  requirements: { title: string; detail: string }[];
  skills: { value: string }[];
}

export async function createProjectAction(data: ProjectData) {
  try {
    // Vérifiez que les champs de budget sont définis

    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }
    const min = new Decimal(data.minBudget) || 0;
    const max = new Decimal(data.maxBudget) || 0;
    const userId = user.user.id;
    const project = await prisma.projects.create({
      data: {
        title: data.title,
        description: data.description,
        minBudget: min,
        maxBudget: max,
        // On suppose que le prix proposé est égal à maxBudget
        proposedPrice: new Decimal(data.maxBudget),
        creator: {
          connect: { id: userId },
        },
        // Stocker les objets structurés sous forme de JSON
        sprints: data.sprints,
        medias: data.medias,
        requirements: data.requirements,
        skills: data.skills,
      },
    });
    return project;
  } catch (error) {
    console.error("Erreur lors de la création du projet :", error);
    throw new Error("La création du projet a échoué");
  }
}

interface AssignUserParams {
  userId: string;
  projectId: string;
}

export async function assignUserToProjectAction({
  userId,
  projectId,
}: AssignUserParams) {
  try {
    const participant = await prisma.customServiceParticipant.create({
      data: {
        customServiceId: projectId,
        participantId: userId,
      },
    });

    return participant;
  } catch (error) {
    console.error("Erreur lors de l'assignation de l'utilisateur :", error);
    throw new Error("Erreur d'assignation de l'utilisateur");
  }
}

// Interface for search parameters
interface SearchUserParams {
  term: string; // The search term, which can be part of email or username
}

export async function searchUserAction({ term }: { term: string }) {
  try {
    const users = await prisma.authUser.findMany({
      where: {
        OR: [
          { email: { contains: term, mode: "insensitive" } },
          { username: { contains: term, mode: "insensitive" } },
        ],
        profile: {
          OR: [{ buyer: { isNot: null } }, { seller: { isNot: null } }],
        },
      },
      include: {
        profile: {
          select: {
            buyer: true, // Inclut le profil 'Buyer'
            seller: true,
            firstName: true,
            lastName: true,
            profilePic: true, // Inclut le profil 'Seller'
          },
        },
      },
    });

    return users;
  } catch (error) {
    console.error("Error searching for users:", error);
    throw new Error("Failed to search for users");
  }
}

// Interface for the participation request data
interface ParticipationRequestData {
  userId: string;
  projectId: string;
}

export async function sendParticipationRequestAction({
  userId,
  projectId,
}: ParticipationRequestData) {
  try {
    // Check if there's already a pending or accepted request
    // Check if there's already an existing participation request
    const existingRequest = await prisma.projectParticipantRequest.findFirst({
      where: {
        projectId,
        requesterId: userId,
        status: { in: ["PENDING", "ACCEPTED"] }, // Checks if a request is pending or already accepted
      },
    });

    if (existingRequest) {
      throw new Error(
        "A participation request already exists for this project.",
      );
    }
    // Create a new request if no duplicate was found
    const request = await prisma.projectParticipantRequest.create({
      data: {
        projectId,
        requesterId: userId,
        status: "PENDING",
      },
    });

    return request;
  } catch (error) {
    console.error("Error sending participation request:", error);
    throw new Error("Failed to send participation request");
  }
}

// Importez Prisma client

// Fonction pour obtenir les projets d'un créateur spécifique
export async function getMyProjectsCreated() {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }

    const userId = user.user.id;
    const projects = await prisma.projects.findMany({
      where: {
        creatorId: userId, // Filtre par ID du créateur
      },

      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    throw new Error("Impossible de récupérer les projets");
  }
}

export async function getProject(id?: string) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }

    const creatorId = user.user.id;
    // Si un ID spécifique est fourni, retourne uniquement ce projet
    if (id) {
      const project = await prisma.projects.findUnique({
        where: { id },
        include: {
          participantRequests: {
            include: {
              requester: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          participants: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return project || null;
    }

    // Si un creatorId est fourni sans id, retourne tous les projets créés par cet utilisateur
    if (creatorId) {
      const projects = await prisma.projects.findMany({
        where: { creatorId },
        select: {
          id: true,
          title: true,
          description: true,
          minBudget: true,
          maxBudget: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return projects.length ? projects : null;
    }

    // Si aucun id ni creatorId n'est fourni, retourne null
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    throw new Error("Impossible de récupérer les projets.");
  }
}

// server.actions/request.actions.ts

export async function cancelRequest(requestId: string) {
  try {
    await prisma.projectParticipantRequest.update({
      where: { id: requestId },
      data: { status: "CANCELLED" },
    });
  } catch (error) {
    console.error("Erreur lors de l'annulation de la demande :", error);
    throw new Error("Impossible d'annuler la demande de participation.");
  }
}

export async function getMyParticipatedProjects() {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }

    const userId = user.user.id;
    const participatedProjects = await prisma.projects.findMany({
      where: {
        creatorId: {
          not: userId, // Exclure les projets dont l'utilisateur est le créateur
        },
        participants: {
          some: {
            id: userId, // Inclure seulement les projets où l'utilisateur est un participant
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return participatedProjects;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des projets auxquels l'utilisateur participe :",
      error,
    );
    throw new Error(
      "Impossible de récupérer les projets auxquels l'utilisateur participe",
    );
  }
}
// Exemple d'action pour récupérer les invitations de projets
export async function getMyProjectInvitations() {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }

    const userId = user.user.id;
    const invitations = await prisma.projectParticipantRequest.findMany({
      where: {
        requesterId: userId,
        status: "PENDING", // Invitation en attente
      },
      include: {
        project: true, // Inclut les détails du projet dans l'invitation
      },
    });

    return invitations;
  } catch (error) {
    console.error("Erreur lors de la récupération des invitations :", error);
    throw new Error("Impossible de récupérer les invitations");
  }
}
