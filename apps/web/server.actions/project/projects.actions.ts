"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { Decimal } from "@prisma/client/runtime/library";
interface ProjectData {
  title: string;
  description: string;
  minBudget: Decimal;
  maxBudget: Decimal;
  proposedPrice: Decimal;
}

export async function createProjectAction(data: ProjectData) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }

    const userId = user.user.id;
    const project = await prisma.projects.create({
      data: {
        title: data.title,
        description: data.description,
        minBudget: new Decimal(data.minBudget),
        maxBudget: new Decimal(data.maxBudget),
        proposedPrice: new Decimal(data.proposedPrice),
        creator: {
          connect: { id: userId },
        },
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

export async function searchUserAction({ term }: SearchUserParams) {
  try {
    const users = await prisma.authUser.findMany({
      where: {
        OR: [
          { email: { contains: term, mode: "insensitive" } },
          { username: { contains: term, mode: "insensitive" } },
        ],
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
