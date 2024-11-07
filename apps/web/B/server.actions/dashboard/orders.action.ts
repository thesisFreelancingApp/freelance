"use server";
import prisma from "@/lib/prismaClient";

export type OrderType = {
  id: string;
  service: string | "Unknown";
  buyer: string | null;
  seller: string | null;
  amount: number;
  status: string;
};

export const getOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        service: {
          select: {
            name: true,
          },
        },
        buyer: {
          select: {
            profile: {
              select: {
                firstName: true,
              },
            },
          },
        },
        seller: {
          select: {
            profile: {
              select: {
                firstName: true,
              },
            },
          },
        },
        totalAmount: true,
        status: true,
      },
    });

    const formattedOrders: OrderType[] = orders.map((order) => ({
      id: order.id,
      service: order.service?.name || "Unknown",
      buyer: order.buyer.profile.firstName,
      seller: order.seller.profile.firstName,
      amount: order.totalAmount as any,
      status: order.status,
    }));

    return formattedOrders;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
};
