// lib/actions.ts
"use server"
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";



// Fetch recent orders from the database
const services = await prisma.service.findMany({
  include: {
    creator: {
      select: {
        id: true,
        username: true,
      },
    },
    buyers: {
      select: {
        id: true,
        username: true,
      },
    },
  },
});

// Fetch earnings data from the database
export async function getSellerTotalEarnings() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  

    const sellerProfile = await prisma.profile.findUnique({
        where: {
            id: user.id, // or username: sellerUsername if you want to filter by username
        },

    });

    if (!sellerProfile) {
        throw new Error('Seller not found'); // Handle case where the seller does not exist
    }

    return sellerProfile; // This will return the seller's profile with their username and total earnings
}
