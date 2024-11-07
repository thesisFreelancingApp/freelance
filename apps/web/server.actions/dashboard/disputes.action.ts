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

export const getDisputes = async (): Promise<DisputeType[]> => {
  try {
    const disputes = await prisma.dispute.findMany({
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
      status: dispute.status, // TODO: ???????
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
