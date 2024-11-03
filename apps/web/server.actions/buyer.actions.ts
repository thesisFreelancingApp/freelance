"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
// Get buyer overview data with all relations
export const getBuyerData = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to access buyer data");
  }
  const buyer = await prisma.buyer.findFirst({
    where: {
      profile: {
        id: user.id,
      },
    },
    include: {
      profile: {
        include: {
          wallet: true,
          messages: true,
          notifications: true,
          chatRooms: true,
          ratingsGiven: true,
          ratingsReceived: true,
          createdProjects: true,
          participantIn: true,
        }
      },
      professionalProfile: true,
      purchasedServices: {
        include: {
          packages: true,
          ratings: true,
        }
      },
      Dispute: {
        include: {
          participants: true,
          messages: true,
        }
      },
      Order: {
        include: {
          service: true,
          project: true,
          transaction: true,
          paymentTransaction: true,
          dispute: true,
        }
      },
    },
  });
  if (!buyer) {
    throw new Error("Buyer profile not found");
  }
  return buyer;
};
// Get buyer orders with detailed information
export const getBuyerOrders = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to access orders");
  }
  const orders = await prisma.order.findMany({
    where: {
      buyer: {
        profile: {
          id: user.id,
        },
      },
    },
    include: {
      service: true,
      project: true,
      seller: {
        include: {
          profile: true,
        },
      },
      transaction: true,
      paymentTransaction: true,
      dispute: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return orders;
};
// Get buyer disputes
export const getBuyerDisputes = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to access disputes");
  }
  const disputes = await prisma.dispute.findMany({
    where: {
      OR: [
        { initiatorBuyer: { profile: { id: user.id } } },
        { participants: { some: { participantBuyer: { profile: { id: user.id } } } } },
      ],
    },
    include: {
      service: true,
      project: true,
      participants: {
        include: {
          participantBuyer: {
            include: {
              profile: true,
            },
          },
          participantSeller: {
            include: {
              profile: true,
            },
          },
        },
      },
      messages: {
        include: {
          senderBuyer: {
            include: {
              profile: true,
            },
          },
          senderSeller: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return disputes;
};
// Create a new order as a buyer
export const createBuyerOrder = async ({
  serviceId,
  projectId,
  sellerId,
  amount,
  description,
  paymentMethod,
}: {
  serviceId?: string;
  projectId?: string;
  sellerId: string;
  amount: number;
  description: string;
  paymentMethod: "WALLET" | "EXTERNAL";
}) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to create an order");
  }
  const buyer = await prisma.buyer.findFirst({
    where: {
      profile: {
        id: user.id,
      },
    },
    include: {
      profile: {
        include: {
          wallet: true,
        },
      },
    },
  });
  if (!buyer) {
    throw new Error("Buyer profile not found");
  }
  // Create the order
  const order = await prisma.order.create({
    data: {
      totalAmount: amount,
      description,
      paymentMethod,
      buyerId: buyer.id,
      sellerId,
      serviceId,
      projectId,
    },
  });
  revalidatePath("/dashboard/buyer/orders");
  return order;
};
// Rate a service or project
export const createBuyerRating = async ({
  serviceId,
  projectId,
  rating,
  review,
  rateeId,
}: {
  serviceId?: string;
  projectId?: string;
  rating: number;
  review?: string;
  rateeId: string;
}) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to create a rating");
  }
  const newRating = await prisma.rating.create({
    data: {
      rating,
      review,
      raterId: user.id,
      rateeId,
      serviceId,
      projectsId: projectId,
    },
  });
  revalidatePath("/dashboard/buyer/orders");
  return newRating;
};
// Create a dispute
export const createBuyerDispute = async ({
  serviceId,
  projectId,
  description,
}: {
  serviceId?: string;
  projectId?: string;
  description: string;
}) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to create a dispute");
  }
  const buyer = await prisma.buyer.findFirst({
    where: {
      profile: {
        id: user.id,
      },
    },
  });
  if (!buyer) {
    throw new Error("Buyer profile not found");
  }
  const dispute = await prisma.dispute.create({
    data: {
      description,
      serviceId,
      projectId,
      initiatorBuyerId: buyer.id,
    },
  });
  revalidatePath("/dashboard/buyer/disputes");
  return dispute;
};
// Get buyer projects
export const getBuyerProjects = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to access projects");
  }
  const projects = await prisma.projects.findMany({
    where: {
      OR: [
        { creatorId: user.id },
        { participants: { some: { id: user.id } } },
      ],
    },
    include: {
      participants: true,
      // participantRequests: true,
      // Rating: true,
      // CustomServiceParticipant: true,
      Dispute: true,
      Order: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return projects;
};
// Get buyer wallet transactions
export const getBuyerWalletTransactions = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to access wallet transactions");
  }
  const wallet = await prisma.wallet.findFirst({
    where: {
      owner: {
        id: user.id,
      },
    },
    include: {
      transactions: {
        include: {
          payment: true,
          Order: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  return wallet;
};