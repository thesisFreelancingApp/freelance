"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

// Get buyer overview data
export const createService = async () => {
    console.log('reachedddddddddddddddddd /////////////////');
    
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      throw new Error("You must be logged in to create a service");
    }
  
    // Get the seller profile for the user
    const seller = await prisma.seller.findFirst({
      where: {
        profile: {
          id: user.id,
        },
      },
    });
  
    if (!seller) {
      throw new Error("Seller profile not found");
    }
  
    
    return  'hello'
    
  };
// njib feha ll index.ts
