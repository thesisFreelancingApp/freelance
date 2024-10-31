"use server";

import prisma from "@/lib/prismaClient";

interface SearchSuggestion {
  text: string;
  type: "completion";
}

// Get search suggestions based on service names, descriptions, and tags
export async function getSearchSuggestions(
  query: string,
): Promise<SearchSuggestion[]> {
  if (!query || query.length < 2) return [];

  try {
    // Get unique words from services
    const services = await prisma.service.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { tags: { hasSome: [query] } },
        ],
      },
      select: {
        name: true,
        description: true,
        tags: true,
      },
    });

    // Extract relevant terms from services
    const terms = new Set<string>();
    services.forEach((service) => {
      // Add relevant words from name
      service.name
        .toLowerCase()
        .split(" ")
        .filter((word) => word.includes(query.toLowerCase()))
        .forEach((word) => terms.add(word));

      // Add matching tags
      service.tags
        .filter((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        .forEach((tag) => terms.add(tag));
    });

    // Convert to suggestions format
    return Array.from(terms)
      .slice(0, 5) // Limit to 5 suggestions
      .map((text) => ({
        text,
        type: "completion",
      }));
  } catch (error) {
    console.error("Error getting search suggestions:", error);
    return [];
  }
}

// Search services
export async function searchServices(query: string) {
  if (!query) return [];

  try {
    const services = await prisma.service.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { tags: { hasSome: [query] } },
        ],
      },
      include: {
        creator: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                profilePic: true,
              },
            },
          },
        },
        ratings: true,
        packages: true,
        category: true,
      },
    });

    // Format services
    return services.map((service) => {
      const avgRating =
        service.ratings.length > 0
          ? Number(
              (
                service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
                service.ratings.length
              ).toFixed(1),
            )
          : 0;

      return {
        ...service,
        averageRating: avgRating,
        lowestPrice: Math.min(
          ...service.packages.map((p) => Number(p.price || 0)),
        ),
        fastestDelivery: Math.min(
          ...service.packages.map((p) => Number(p.deliveryTime || 0)),
        ),
      };
    });
  } catch (error) {
    console.error("Error searching services:", error);
    throw new Error("Failed to search services");
  }
}
