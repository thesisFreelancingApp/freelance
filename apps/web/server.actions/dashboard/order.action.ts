"use server";

import prisma from "@/lib/prismaClient";

// Get orders with pagination, related fields, and profiles for buyer and seller
export async function getOrders(page = 1, pageSize = 10) {
  try {
    // Calculate the number of items to skip based on the current page and page size
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch orders with related fields and profiles for buyer and seller
    const orders = await prisma.order.findMany({
      skip,
      take,
      include: {
        buyer: {
          include: {
            profile: true, // Includes buyer's PersonalProfile details
          },
        },
        seller: {
          include: {
            profile: true, // Includes seller's PersonalProfile details
          },
        },
        service: true,            // Includes service details if linked
        // project: true,            // Includes project details if linked
        // transaction: true,        // Includes wallet transaction details
        // paymentTransaction: true, // Includes payment transaction details
        dispute: true,            // Includes dispute details if linked
      },
    });

    // Fetch the total count of orders to calculate the total number of pages
    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / pageSize);

    return {
      orders,
      totalPages,
      currentPage: page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching orders:", JSON.stringify(error, null, 2));
    throw error;
  }
}
