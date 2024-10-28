"use server";

// export const dynamic = "force-dynamic";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

export const createProfessionalProfile = async (data: {
  languages: string[];
  personalWebsite?: string;
  occupations?: {
    title: string;
    from: string | undefined;
    to: string | undefined;
  }[];
  skills?: string[];
  educations?: {
    faculty: string;
    from: string | undefined;
    to: string | undefined;
  }[];
  certifications?: {
    title: string;
    institution: string;
    date: string | undefined;
  }[];
  companyName?: string;
  profession?: string;
  experienceYears?: number | undefined;
  sector?: string;
  website?: string;
}) => {
  console.log("Profile Data:", data);

  // Create the Supabase client
  const supabase = createClient();

  // Get the current authenticated user from Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(user?.id);
  // If there is no authenticated user, handle the error accordingly
  if (error || !user) {
    throw new Error("User is not authenticated");
  }

  // Create the professional profile using the authenticated user's ID
  const newProfile = await prisma.professionalProfile.create({
    data: {
      language: data.languages,
      personalWebsite: data.personalWebsite || null,
      occupations: data.occupations || undefined,
      skills: data.skills || undefined,
      educations: data.educations || undefined,
      certifications: data.certifications || undefined,
      companyName: data.companyName || null,
      profession: data.profession || null,
      experienceYears: data.experienceYears || null,
      sector: data.sector || null,
      website: data.website || null,

      seller: {
        connect: { id: user.id },
      },
    },
  });

  return newProfile;
};

export async function isSellerWithProfessionalProfile() {
  try {
    const supabase = createClient();
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      return { isSeller: false, isNotCompleted: false, isAuthenticated: false };
    }

    const userId = userData.user.id;

    // Fetch the AuthUser with related PersonalProfile, Seller, and ProfessionalProfile data
    const seller = await prisma.seller.findUnique({
      where: { profileId: userId },
      include: {
        professionalProfile: true,
      },
    });

    const isNotCompleted = seller?.professionalProfile === null;
    const isSeller = seller;
    const obj = { isSeller, isNotCompleted };

    // Check if user has both a seller and a professional profile
    return obj;
  } catch (error) {
    console.error("Error checking seller with professional profile:", error);
    return false;
  }
}
