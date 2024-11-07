"use server";

import prisma from "@/lib/prismaClient";

// Récupérer un utilisateur par email
export const getUserByEmail = async (email: string) => {
  const user = await prisma.authUser.findUnique({
    where: { email },
    include: { profile: true },
  });
  return user;
};

// Créer un nouvel utilisateur
export const createUser = async (email: string, name?: string) => {
  const user = await prisma.authUser.create({
    data: { email, name },
  });
  console.log("houni", createUser);
  return user;
};

// Mettre à jour un utilisateur
export const updateUser = async (
  email: string,
  data: Partial<{ name: string; id: string }>,
) => {
  const user = await prisma.authUser.update({
    where: { email },
    data,
  });
  return user;
};

// Supprimer un utilisateur
export const deleteUser = async (email: string) => {
  const user = await prisma.authUser.delete({
    where: { email },
  });
  return user;
};
