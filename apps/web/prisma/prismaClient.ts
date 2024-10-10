import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma Client
const prismaConnection = new PrismaClient();

// Function to connect to the database
export const connectToDatabase = async () => {
    try {
        await prismaConnection.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

// Function to disconnect from the database
export const disconnectFromDatabase = async () => {
    try {
        await prismaConnection.$disconnect();
        console.log("Disconnected from the database successfully.");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
};

// Export the Prisma connection instance
export default prismaConnection;
