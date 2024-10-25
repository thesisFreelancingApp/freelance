import prisma from "@/lib/prismaClient";

export const createProfessionalProfile = async (data: {
  sellerId: string;
  language: string[];
  personalWebsite?: string;
  occupations?: any;
  skills?: any;
  educations?: any;
  certifications?: any;
  companyName?: string;
  profession?: string;
  experienceYears?: number;
  website?: string;
  preferredCategoryId?: number;
}) => {
  const newProfile = await prisma.professionalProfile.create({
    data: {
      sellerId: data.sellerId,
      language: data.language,
      personalWebsite: data.personalWebsite || null,
      occupations: data.occupations || null,
      skills: data.skills || null,
      educations: data.educations || null,
      certifications: data.certifications || null,
      companyName: data.companyName || null,
      profession: data.profession || null,
      experienceYears: data.experienceYears || null,
      website: data.website || null,
      preferredCategoryId: data.preferredCategoryId || null,
    },
  });

  return newProfile;
};
