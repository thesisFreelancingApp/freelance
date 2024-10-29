"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
// import { Service } from "@/types/FeaturedServices";
import { Decimal } from "@prisma/client/runtime/library";

// // Récupérer un service par ID
// export const getServiceById = async (id: number) => {
//   const service = await prisma.service.findUnique({
//     where: { id },
//     include: {
//       ratings: {
//         include: {
//           buyer: {
//             select: {
//               firstName: true,
//               lastName: true,
//               profilePic: true,
//             },
//           },
//         },
//       },
//       category: true,
//       creator: {
//         select: {
//           id: true,
//           firstName: true,
//           lastName: true,
//           profilePic: true,
//           sellerRating: true,
//         },
//       },
//       buyers: {
//         select: {
//           id: true,
//           firstName: true,
//           lastName: true,
//         },
//       },
//       packages: true,
//     },
//   });
//   return service;
// };

// Créer un nouveau service
// export const createService = async (data: {
//   name: string;
//   description: string;
//   categoryId: number;
//   images: string[];
//   tags: string[];
//   packages: {
//     basic: {
//       name: string;
//       description: string;
//       price: number;
//       deliveryTime: number;
//       revisions: number;
//       features: string[];
//     };
//     standard: {
//       name: string;
//       description: string;
//       price: number;
//       deliveryTime: number;
//       revisions: number;
//       features: string[];
//     };
//     premium: {
//       name: string;
//       description: string;
//       price: number;
//       deliveryTime: number;
//       revisions: number;
//       features: string[];
//     };
//   };
// }) => {
//   const supabase = createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     throw new Error("You must be logged in to create a service");
//   }

//   const service = await prisma.service.create({
//     data: {
//       name: data.name,
//       description: data.description,
//       categoryId: data.categoryId,
//       creatorId: user.id,
//       images: data.images,
//       tags: data.tags,
//       packages: {
//         create: [
//           { ...data.packages.basic },
//           { ...data.packages.standard },
//           { ...data.packages.premium },
//         ],
//       },
//     },
//     include: {
//       packages: true,
//     },
//   });
//   return service;
// };

// Mettre à jour un service
// export const updateService = async (
//   id: number,
//   data: Partial<{
//     name: string;
//     description: string;
//     categoryId: number;
//     images: string[];
//     tags: string[];
//   }>,
// ) => {
//   const service = await prisma.service.update({
//     where: { id },
//     data,
//   });
//   return service;
// };

// // Supprimer un service
// export const deleteService = async (id: number) => {
//   const service = await prisma.service.delete({
//     where: { id },
//   });
//   return service;
// };

// // Récupérer les services en vedette
// Récupérer les services en vedette
export const getFeaturedServices = async (limit = 3) => {
  const services = await prisma.service.findMany({
    take: limit,
    include: {
      ratings: {
        include: {
          rater: {
            select: {
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
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
      packages: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return services.map((service) => ({
    ...service,
    creator: {
      ...service.creator,
      name: `${service.creator.profile.firstName} ${service.creator.profile.lastName}`,
      profilePic: service.creator.profile.profilePic,
    },
    packages: service.packages.map((pkg) => ({
      ...pkg,
      price: pkg.price.toString(),
    })),
    rating:
      service.ratings.length > 0
        ? service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        : 0,
  }));
};

// Create a new service
export const createService = async (data: {
  name: string;
  description: string;
  images: string[];
  tags: string[];
  packages: {
    basic: {
      name: string;
      description: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      features: string[];
    };
    standard: {
      name: string;
      description: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      features: string[];
    };
    premium: {
      name: string;
      description: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      features: string[];
    };
  };
}) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a service");
  }

  // Get the seller profile for the user
  const seller = await prisma.seller.findFirst({
    where: {
      profile: {
        id: user.id,
      },
    },
  });

  if (!seller) {
    throw new Error("Seller profile not found");
  }

  const service = await prisma.service.create({
    data: {
      name: data.name,
      description: data.description,
      creatorId: seller.id,
      images: data.images,
      tags: data.tags,
      packages: {
        create: [
          {
            ...data.packages.basic,
            price: new Decimal(data.packages.basic.price),
          },
          {
            ...data.packages.standard,
            price: new Decimal(data.packages.standard.price),
          },
          {
            ...data.packages.premium,
            price: new Decimal(data.packages.premium.price),
          },
        ],
      },
    },
    include: {
      packages: true,
    },
  });

  return {
    ...service,
    packages: service.packages.map((pkg) => ({
      ...pkg,
      price: pkg.price.toString(),
    })),
  };
};
export async function getServiceById(id: string) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      ratings: {
        include: {
          rater: {
            select: {
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
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
      packages: true,
    },
  });

  if (!service) return null;

  return {
    ...service,
    creator: {
      ...service.creator,
      name: `${service.creator.profile.firstName} ${service.creator.profile.lastName}`,
      profilePic: service.creator.profile.profilePic,
    },
    packages: service.packages.map((pkg) => ({
      ...pkg,
      price: pkg.price.toString(),
    })),
    rating:
      service.ratings.length > 0
        ? service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        : 0,
  };
}

export async function getRelatedServices(serviceId: string, limit = 3) {
  const services = await prisma.service.findMany({
    where: {
      id: { not: serviceId },
    },
    take: limit,
    include: {
      ratings: {
        include: {
          rater: {
            select: {
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
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
      packages: true,
    },
  });

  return services.map((service) => ({
    ...service,
    creator: {
      ...service.creator,
      name: `${service.creator.profile.firstName} ${service.creator.profile.lastName}`,
      profilePic: service.creator.profile.profilePic,
    },
    packages: service.packages.map((pkg) => ({
      ...pkg,
      price: pkg.price.toString(),
    })),
    rating:
      service.ratings.length > 0
        ? service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        : 0,
  }));
}
interface FilterOptions {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "delivery_time";
  deliveryTime?: number;
  page?: number;
  limit?: number;
}

export async function getFilteredServices({
  categoryId,
  minPrice,
  maxPrice,
  sortBy = "rating",
  deliveryTime,
  page = 1,
  limit = 12,
}: FilterOptions) {
  try {
    const where: any = {};

    // Add category filter
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Add price range and delivery time filters
    if (minPrice || maxPrice || deliveryTime) {
      where.packages = {
        some: {
          AND: [
            minPrice ? { price: { gte: new Decimal(minPrice) } } : {},
            maxPrice ? { price: { lte: new Decimal(maxPrice) } } : {},
            deliveryTime ? { deliveryTime: { lte: deliveryTime } } : {},
          ],
        },
      };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch services without sorting first
    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          creator: {
            include: {
              profile: true,
            },
          },
          ratings: true,
          packages: true,
          category: true,
        },
        skip,
        take: limit,
      }),
      prisma.service.count({ where }),
    ]);

    // Format and sort services after fetching
    let formattedServices = services.map((service) => {
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

    // Sort based on different criteria
    switch (sortBy) {
      case "price_asc":
        formattedServices.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case "price_desc":
        formattedServices.sort((a, b) => b.lowestPrice - a.lowestPrice);
        break;
      case "delivery_time":
        formattedServices.sort((a, b) => a.fastestDelivery - b.fastestDelivery);
        break;
      case "rating":
        formattedServices.sort((a, b) => b.averageRating - a.averageRating);
        break;
      default:
        // Default sorting by creation date
        formattedServices.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return {
      services: formattedServices,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error fetching filtered services:", error);
    throw new Error("Failed to fetch services");
  }
}
