"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

// Get seller overview data
export async function getSellerOverview() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Not authenticated");
  }

  const seller = await prisma.seller.findFirst({
    where: {
      profileId: user.id,
    },
    include: {
      createdServices: {
        include: {
          ratings: true,
          packages: true,
          buyers: true,
        },
      },
      profile: true,
    },
  });

  if (!seller) {
    throw new Error("Seller not found");
  }

  // Calculate total earnings
  const totalEarnings = seller.totalEarnings;

  // Calculate active orders (services with buyers)
  const activeOrders = seller.createdServices.reduce(
    (acc, service) => acc + service.buyers.length,
    0,
  );

  // Calculate average rating
  const allRatings = seller.createdServices.flatMap(
    (service) => service.ratings,
  );
  const averageRating =
    allRatings.length > 0
      ? allRatings.reduce((acc, rating) => acc + rating.rating, 0) /
        allRatings.length
      : 0;

  // Get monthly revenue data
  const monthlyRevenue = await getMonthlyRevenue(seller.id);

  return {
    totalEarnings,
    activeOrders,
    averageRating,
    monthlyRevenue,
    sellerName: `${seller.profile.firstName} ${seller.profile.lastName}`,
    profilePic: seller.profile.profilePic,
  };
}

// Get monthly revenue data
async function getMonthlyRevenue(sellerId: string) {
  // This is a placeholder - you'll need to implement actual revenue tracking
  // For now, returning sample data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((name) => ({
    name,
    total: Math.floor(Math.random() * 3000) + 1000,
  }));
}

// Get seller's services
export async function getSellerServices() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Not authenticated");
  }

  const services = await prisma.service.findMany({
    where: {
      creator: {
        profileId: user.id,
      },
    },
    include: {
      ratings: true,
      packages: true,
      category: true,
      buyers: true,
    },
  });

  return services.map((service) => ({
    id: service.id,
    name: service.name,
    category: service.category.name,
    orders: service.buyers?.length || 0,
    rating:
      service.ratings.length > 0
        ? service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        : 0,
  }));
}

// Get seller's active orders
export async function getActiveOrders() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Not authenticated");
  }

  // Note: You'll need to add an Orders table to your schema
  // For now, using the buyers relation as a simple substitute
  const services = await prisma.service.findMany({
    where: {
      creator: {
        profileId: user.id,
      },
    },
    include: {
      buyers: {
        include: {
          profile: true,
        },
      },
    },
  });

  return services.flatMap((service) =>
    service.buyers.map((buyer) => ({
      id: `${service.id}-${buyer.id}`,
      buyer: `${buyer.profile.firstName} ${buyer.profile.lastName}`,
      service: service.name,
      status: "In Progress", // You'll need to add status tracking to your schema
      dueDate: new Date().toISOString().split("T")[0], // Placeholder
    })),
  );
}

// Get seller's messages
export async function getSellerMessages() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Not authenticated");
  }

  const messages = await prisma.message.findMany({
    where: {
      chatRoom: {
        participants: {
          some: {
            participantId: user.id,
          },
        },
      },
    },
    include: {
      sender: true,
      chatRoom: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return messages.map((message) => ({
    id: message.id,
    from: `${message.sender.firstName} ${message.sender.lastName}`,
    subject: message.chatRoom.title || "No subject",
    preview: message.content.substring(0, 50) + "...",
    time: formatMessageTime(message.createdAt),
  }));
}

function formatMessageTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (days === 1) {
    return "Yesterday";
  } else {
    return `${days} days ago`;
  }
}
