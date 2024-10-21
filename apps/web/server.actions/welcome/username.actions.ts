"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
export async function checkUsername(username: string): Promise<boolean> {
  const user = await prisma.profile.findUnique({
    where: { username: username },
  });

  return user ? false : true;
}

export async function updateUsernameByEmail(
  newUsername: string,
): Promise<boolean> {
  try {
    // console.log(email);
    // Initialiser le client Supabase
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return false;
    }
    const email = user.user.email;
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
