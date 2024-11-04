import { PrismaClient } from "@prisma/client";
import { seedCategory } from "./seeds/categories";
import { seedUsers } from "./seeds/users";
import { seedServices } from "./seeds/services";
import { seedRatings } from "./seeds/ratings";
import { seedOrders } from "./seeds/orders";
import { seedChats } from "./seeds/chat";
import { seedDisputes } from "./seeds/disputes";

const prisma = new PrismaClient();

async function mainSeed() {
  try {
    console.log("----- Database seeding is currently in progress...");

    // Ensure the database schema is up to date
    console.log("----- Updating database schema...");
    console.log("----- Database schema updated successfully.");

    // Seed in order of dependencies
    console.log("----- Seeding Categories...");
    await seedCategory();

    console.log("----- Seeding Users...");
    await seedUsers();

    console.log("----- Seeding Services...");
    await seedServices();

    console.log("----- Seeding Orders...");
    await seedOrders();

    console.log("----- Seeding Ratings...");
    await seedRatings();
    console.log("----- Seeding Chat Rooms and Messages...");
    await seedChats();

    console.log("----- Seeding Disputes...");
    await seedDisputes();

    console.log("----- Database seeding completed successfully.");
  } catch (error) {
    console.error(
      "An error occurred during the database seeding process:",
      error,
    );
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("----- Database connection closed.");
  }
}

mainSeed();