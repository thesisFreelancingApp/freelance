"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

// Create the Supabase client
const supabase = createClient();

export const createProfessionalProfile = async (data: {
  sellerId?: string; // sellerId is now optional because we're fetching it from Supabase
  languages: string[];
  personalWebsite?: string;
  sellerProfileId:string;
  occupations?: any;
  skills?: any;
  educations?: any;
  certifications?: any;
  companyName?: string;
  profession?: string;
  experienceYears?: number;
  website?: string;
  //   preferredCategoryId?: number;
}) => {
  // Get the current authenticated user from Supabase
  const {
    data: { user },
    
    error,
  } = await supabase.auth.getUser();
  console.log(user,"sssssssssssssssssssssssssssssssssssssssssssssssss");
  
  // If there is no authenticated user, handle the error accordingly
  if (error || !user) {
    throw new Error("User is not authenticated");
  }

  // Create the professional profile using the authenticated user's ID
  const newProfile = await prisma.professionalProfile.create({
    data: {
      sellerId: user.id, // Use the authenticated user's ID as sellerId
      language: data.languages,
      personalWebsite: data.personalWebsite || null,
      occupations: data.occupations || null,
      skills: data.skills || null,
      educations: data.educations || null,
      certifications: data.certifications || null,
      companyName: data.companyName || null,
      profession: data.profession || null,
      experienceYears: data.experienceYears || null,
      website: data.website || null,
      //   preferredCategoryId: data.preferredCategoryId || null,
    },
  });

  return newProfile;
};
