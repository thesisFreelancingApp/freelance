"use server";
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { Service } from "@/types/FeaturedServices";

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

// // Créer un nouveau service
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

// // Mettre à jour un service
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
export const getFeaturedServices = async (limit = 3): Promise<Service[]> => {
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
export async function getServiceById(id: string): Promise<Service | null> {
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

export async function getRelatedServices(
  serviceId: string,
  limit = 3,
): Promise<Service[]> {
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
