"use server";
import prisma from "@/lib/prismaClient";

export type DisputeType = {
  id: string;
  initiator: string | null;
  respondent: string | null;
  relatedItem: string | null;
  status: string;
  createdAt: string;
};

export const getDisputes = async (page: number = 1, limit: number = 10, searchTerm: string, statusFilter: string): Promise<DisputeType[]> => {
  try {
    const skip = (page - 1) * limit; // Calculate the number of records to skip based on the current page

    // Fetch disputes with pagination
    const disputes = await prisma.dispute.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        Order: {
          select: {
            service: {
              select: {
                name: true,
              },
            },
          },
        },
        initiatorSeller: {
          select: {
            profile: {
              select: {
                firstName: true,
              },
            },
          },
        },
        initiatorBuyer: {
          select: {
            profile: {
              select: {
                firstName: true,
              },
            },
          },
        },
        status: true,
        createdAt: true,
      },
    });

    const formattedDisputes: DisputeType[] = disputes.map((dispute) => ({
      id: dispute.id,
      initiator: dispute.initiatorSeller
        ? dispute.initiatorSeller.profile?.firstName
        : dispute.initiatorBuyer?.profile?.firstName || null,
      status: dispute.status, // Add your status logic here
      respondent: dispute.initiatorBuyer
        ? dispute.initiatorBuyer.profile?.firstName
        : dispute.initiatorSeller?.profile?.firstName || null,
      relatedItem: dispute.Order[0]?.service?.name || "Unknown",
      createdAt: dispute.createdAt.toISOString().split("T")[0],
    }));

    return formattedDisputes;
  } catch (error) {
    console.error("Error fetching disputes data:", error);
    return [];
  }
};
