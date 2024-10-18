"use server";

import prisma from "@/lib/prismaClient";

// Fetch user profile
export async function getUserProfile(userEmail: string) {
  // Fetch user profile from the database dynamically based on the user email
  const userProfile = await prisma.profile.findUnique({
    where: { userEmail },
  });

  return userProfile;
}

// Update user profile

export async function updateUserProfile(formData: FormData) {
  const firstName = formData.get("firstName")?.toString() || "";
  const id = formData.get("id")?.toString() || "";
  const userEmail = formData.get("userEmail")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";
  const address = formData.get("location")?.toString() || "";
  const profilePic = formData.get("profilePic")?.toString() || "";
  const languages = formData.get("languages")?.toString() || "";
  const bio = formData.get("bio")?.toString() || "";
  const birthDateRaw = formData.get("birthDate")?.toString();
  let birthDate: Date | null = null;

  if (birthDateRaw) {
    const parsedDate = new Date(birthDateRaw);
    if (!isNaN(parsedDate.getTime())) {
      birthDate = parsedDate;
    } else {
      throw new Error("Invalid birth date provided.");
    }
  }

  await prisma.profile.upsert({
    where: { userEmail },
    update: {
      firstName,
      lastName,
      phoneNumber,
      address,
      profilePic,
      languages,
      bio,
      birthDate,
    },
    create: {
      id: id, // Generate a unique ID for the new profile
      userEmail,
      firstName,
      lastName,
      phoneNumber,
      address,
      profilePic,
      languages,
      bio,
      birthDate,
    },
  });
}
export async function updateUserPicUrl(url, email) {
  const NewUrl = url || "";
  if (url) {
    await prisma.profile.update({
      where: { userEmail: email },
      data: {
        profilePic: NewUrl,
      },
    });
  }
}

// import {
//   getUserProfile,
//   updateUserProfile as serverUpdateProfile,
//   updateUserPicUrl,
// } from "@/server/actions/profile.actions";
import { uploadProfilePicture as serverUploadPicture } from "@/server/actions/uploaderCloudinary.actions";
import { revalidatePath } from "next/cache";

// Fetch user profile on the server
export async function fetchUserProfile(userEmail) {
  return await getUserProfile(userEmail);
}

// Handle profile picture upload on the server
export async function uploadProfilePic(formData, userEmail) {
  const file = formData.get("profilePic") as File;
  if (file && file.size > 0) {
    const uploadedImageUrl = await serverUploadPicture(file);
    if (uploadedImageUrl) {
      await updateUserPicUrl(uploadedImageUrl, userEmail);
      revalidatePath("/profile");
    }
  }
}

// Handle profile update on the server
export async function updateUserProfile(formData) {
  const profileId = formData.get("profileId");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phoneNumber = formData.get("phoneNumber");
  const location = formData.get("location");
  const dob = formData.get("dob");

  if (profileId && firstName && lastName && phoneNumber && location && dob) {
    await serverUpdateProfile({
      profileId,
      firstName,
      lastName,
      phoneNumber,
      location,
      dob,
    });
    revalidatePath("/profile");
  }
}
