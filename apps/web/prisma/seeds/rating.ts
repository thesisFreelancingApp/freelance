import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allRatings = [
    {
        rating: 5,
        review: "Excellent service! Highly recommended.",
        buyerId: "3", // ID du profil de l'acheteur Mike Johnson
        sellerId: "2", // ID du profil du vendeur Jane Smith
        serviceId: 1, // ID d'un service (e.g., Logo Design)
    },
    {
        rating: 3,
        review: "Average service, nothing special.",
        buyerId: "1", // ID du profil de l'acheteur John Doe
        sellerId: "3", // ID du profil du vendeur Mike Johnson
        serviceId: 3, // ID d'un service (e.g., Web Development)
    },
    {
        rating: 4,
        review: "Good quality, would hire again.",
        buyerId: "2", // ID du profil de l'acheteur Jane Smith
        sellerId: "1", // ID du profil du vendeur John Doe
        serviceId: 4, // ID d'un service (e.g., Social Media Marketing)
    },
];

export const seedRatings = async () => {
    console.log("----- Seeding Ratings: cleanup process is starting...");

    // Clean up existing data
    await prisma.rating.deleteMany();
    console.log("----- The rating table has been successfully cleared.");

    console.log("----- Seeding Ratings: process is starting...");

    // Seed ratings
    for (const rating of allRatings) {
        await prisma.rating.create({
            data: {
                rating: rating.rating,
                review: rating.review,
                buyer: {
                    connect: { id: rating.buyerId }, // Connect to existing buyer profile
                },
                seller: {
                    connect: { id: rating.sellerId }, // Connect to existing seller profile
                },
                service: {
                    connect: { id: rating.serviceId }, // Connect to existing service
                },
            },
        });
    }

    console.log("----- Seeding Ratings: process completed successfully.");
};
