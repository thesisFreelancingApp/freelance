"use server";
import prisma from "@/lib/prismaClient";

export type DisputeType = {
  id: string;
  order: string | "Unknown";
  disputeBy: string | null;
  status: string;
  date: string;
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
      order: dispute.Order[0]?.service?.name || "Unknown", // TODO: fix this
      disputeBy: dispute.initiatorSeller
        ? dispute.initiatorSeller.profile?.firstName
        : dispute.initiatorBuyer?.profile?.firstName || null,
      status: dispute.status,
      date: dispute.createdAt.toISOString().split("T")[0],
    }));

    return formattedDisputes;
  } catch (error) {
    console.error("Error fetching disputes data:", error);
    return [];
  }
};
