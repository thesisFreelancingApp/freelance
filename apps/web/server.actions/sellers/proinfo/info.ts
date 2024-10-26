"use server";

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

  // If there is no authenticated user, handle the error accordingly
  if (error || !user) {
    throw new Error("User is not authenticated");
  }

  // Create the professional profile using the authenticated user's ID
  const newProfile = await prisma.professionalProfile.create({
    data: {
      sellerProfileId: user.id, // Use the authenticated user's ID as sellerId
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
    },
  });

  return newProfile;
};
