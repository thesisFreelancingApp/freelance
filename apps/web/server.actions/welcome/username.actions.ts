"use server";
import prisma from "@/lib/prismaClient";

export async function checkUsername(username: string): Promise<boolean> {
  const user = await prisma.profile.findUnique({
    where: { username: username },
  });

  return user ? false : true;
}

export async function updateUsernameByEmail(
  email: string,
  newUsername: string,
): Promise<boolean> {
  try {
    console.log(email);
    await prisma.profile.update({
      where: { userEmail: email },
      data: { username: newUsername }, // Met à jour le nom d'utilisateur
    });

    return true; // Mise à jour réussie
  } catch (error) {
    console.log("Erreur lors de la mise à jour du nom d'utilisateur:", error);
    return false; // En cas d'erreur, retourne false
  }
}
