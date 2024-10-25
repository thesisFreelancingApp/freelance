"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

interface InitializeBuyerAndSellerProfileOptions {
  buyer?: boolean;
  seller?: boolean;
}

export async function initializeBuyerAndSellerProfile({
  buyer = false,
  seller = false,
}: InitializeBuyerAndSellerProfileOptions) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user.user?.email) {
      console.log("Error retrieving user:", error);
      return { success: false, message: "User email not found." };
    }

    const email = user.user.email;

    // Find the existing PersonalProfile by email
    const personalProfile = await prisma.personalProfile.findUnique({
      where: { userEmail: email },
    });

    if (!personalProfile) {
      return {
        success: false,
        message: "Personal profile not found for the given email.",
      };
    }

    const profileId = personalProfile.id;

    // Conditionally create a `Buyer` profile
    if (buyer) {
      await prisma.buyer.create({
        data: {
          id: profileId, // Set Buyer ID to match PersonalProfile ID
          profileId: profileId, // Link to the existing PersonalProfile
        },
      });
    }

    // Conditionally create a `Seller` profile without `ProfessionalProfile`
    if (seller) {
      await prisma.seller.create({
        data: {
          id: profileId, // Set Seller ID to match PersonalProfile ID
          profileId: profileId, // Link to the existing PersonalProfile
          language: [], // Initialize an empty language array or a default if needed
        },
      });
    }

    return {
      success: true,
      message: "Buyer and/or Seller profile initialized successfully.",
    };
  } catch (error) {
    console.error("Error initializing Buyer and/or Seller profile(s):", error);
    return {
      success: false,
      message: "Failed to initialize Buyer and/or Seller profile(s).",
    };
  }
}
