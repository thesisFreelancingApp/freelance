"use server";
import prisma from "@/lib/prismaClient";

export type ServiceType = {
  id: string;
  name: string;
  category: string;
  status: string;
  price: string;
  rating: number;
};

export const getServices = async () => {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        ratings: true,
      },
    });

    const formattedServices: ServiceType[] = services.map((service) => ({
      id: service.id,
      name: service.name,
      category: service.category.name,
      status: "", // TODO: get status somehow (Active / Pending Review)
      price: `$0`, // TODO: get price somehow
      rating: service.ratings.length,
    }));

    return formattedServices;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
};
