"use server";

import prisma from "@/lib/prismaClient";

export async function getServices(page = 1, pageSize = 10) {
  try {
    // Calculate the number of items to skip based on the current page and page size
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch services with pagination and related data, including the creator field
    const services = await prisma.service.findMany({
      skip,
      take,
      include: {
        category: true,         // Includes category details
        creator: {              // Includes creator details (Seller)
          include: {
            profile: true,      // Includes profile of the creator (Seller's PersonalProfile)
            professionalProfile: true, // Includes professionalProfile if available
          },
        },
        buyers: true,           // Includes buyers who purchased the service
        ratings: true,          // Includes ratings associated with the service
        packages: true,         // Includes service packages
        Dispute: true,          // Includes any disputes related to the service
        Order: true,            // Includes orders related to the service
      },
    });

    // Fetch the total count of services to calculate the total number of pages
    const totalServices = await prisma.service.count();
    const totalPages = Math.ceil(totalServices / pageSize);

    // Return the fetched services with pagination metadata
    return {
      services,
      totalPages,
      currentPage: page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching services:", JSON.stringify(error, null, 2));
    throw error;
  }
}





export async function deleteService(serviceId: string) {
  try {
    // Ensure the service exists before attempting to delete it
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new Error("Service not found");
    }

    // Delete related ServicePackages first
    await prisma.servicePackage.deleteMany({
      where: { serviceId },
    });

    // Then delete the service
    await prisma.service.delete({
      where: { id: serviceId },
    });

    return {
      message: "Service deleted successfully",
      serviceId,
    };
  } catch (error) {
    console.error("Error deleting service:", JSON.stringify(error, null, 2));
    throw error;
  }
}
