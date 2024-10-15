import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample service data
const allServices = [
    {
        id: 1,
        name: "Logo Design",
        price: "Starting at $50",
        description: "Professional logo design services.",
        categoryId: 1, // Use 'categoryId' directly
    },
    {
        id: 2,
        name: "Content Writing",
        price: "Starting at $30",
        description: "High-quality content writing for various needs.",
        categoryId: 2,
    },
    {
        id: 3,
        name: "Web Development",
        price: "Starting at $100",
        description: "Custom web development services.",
        categoryId: 3,
    },
    {
        id: 4,
        name: "Social Media Marketing",
        price: "Starting at $80",
        description: "Effective social media marketing strategies.",
        categoryId: 4,
    },
];

export const seedServices = async () => {
    console.log("----- Seeding Services: cleanup process is starting...");

    // Optionally clear the service table before seeding
    await prisma.service.deleteMany();
    console.log("----- The service table has been successfully cleared.");

    console.log("----- Seeding Services: process is starting...");

    // Seeding services and linking them to categories
    for (const service of allServices) {
        await prisma.service.create({
            data: {
                id: service.id,
                name: service.name,
                price: service.price,
                description: service.description,
                categoryId: service.categoryId, // Directly using categoryId
            },
        });
    }

    console.log("----- Seeding Services: process completed successfully.");
};
