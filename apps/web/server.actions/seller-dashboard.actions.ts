// lib/actions.ts
"use server"
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

const supabase = createClient();




// Fetch earnings data from the database
export async function getSellerTotalEarnings() {
    const {
        data: { user },
      } = await supabase.auth.getUser();
    const sellerProfile = await prisma.profile.findUnique({
        where: {
            id: user?.id, // or username: sellerUsername if you want to filter by username
        },
        select: {
            username: true,
            totalEarnings: true,
            freelancerRatings:true
            
        },
    });

    if (!sellerProfile) {
        throw new Error('Seller not found'); // Handle case where the seller does not exist
    }

    return sellerProfile; // This will return the seller's profile with their username and total earnings
}



export async function freelancerProfile() {
    const {
        data: { user },
      } = await supabase.auth.getUser();
    const sellerProfile = await prisma.profile.findUnique({
        where: {
            id: user?.id, // or username: sellerUsername if you want to filter by username
        },
        select: {
            firstName: true,
            lastName: true,
            profilePic:true,
            bio:true,
            address:true,
            skills:true,
            languages:true,
            freelancerRatings:true,
            userEmail:true,
            phoneNumber:true,
            createdServices:true
            
        },
    });

    if (!sellerProfile) {
        throw new Error('Seller not found'); // Handle case where the seller does not exist
    }

    return sellerProfile; // This will return the seller's profile with their username and total earnings
}


export const getUsers= async () => {
    const users = await prisma.profile.findMany({
        where: {
            role: "user"
        },
        select: {
            firstName: true,
            lastName: true,
            profilePic:true,
            bio:true,
            address:true,
            skills:true,
            languages:true,
            freelancerRatings:true,
            userEmail:true,
            phoneNumber:true,
            createdServices: {
                select: {
                    id:true,
                    category:true,
                    description:true,
                    name:true,
                    images:true,
                    packages:true,
                    createdAt:true,
                    ratings:true,
                    creator:true,
                }
            }
            
            
        },
    });
    return users;
  }



  export const getFreelancer= async () => {
    const users = await prisma.profile.findMany({
        where: {
            role: "user"
        },
        select: {
            firstName: true,
            lastName: true,
            profilePic:true,
            // bio:true,
            // address:true,
            // skills:true,
            // languages:true,
            // freelancerRatings:true,
            userEmail:true,
            phoneNumber:true,
            createdServices: {
                select: {
                    id:true,
                    category:true,
                }
            }
            
            
        },
    });
    return users;
  }