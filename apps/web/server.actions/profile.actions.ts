"use server";

import prisma from "@/lib/prismaClient";

// Récupérer un profil par ID
export const getProfileById = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { id },
  });
  return profile;
};

// Créer un nouveau profil
// export const createProfile = async (data: {
//   firstName: string;
//   lastName: string;
//   userEmail: string;
// }) => {
//   const profile = await prisma.profile.create({
//     data,
//   });
//   return profile;
// };

// Mettre à jour un profil
export const updateProfile = async (
  id: string,
  data: Partial<{ firstName: string; lastName: string }>,
) => {
  const profile = await prisma.profile.update({
    where: { id },
    data,
  });
  return profile;
};

// Supprimer un profil
export const deleteProfile = async (id: string) => {
  const profile = await prisma.profile.delete({
    where: { id },
  });
  return profile;
};
