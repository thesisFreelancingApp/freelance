import { PrismaClient } from "@prisma/client";
import { seedCategory } from "./seeds/categories";
import { seedUsers } from "./seeds/users";
import { seedServices } from "./seeds/services";

const prisma = new PrismaClient();

async function mainSeed() {
  try {
    console.log("----- Database seeding is currently in progress...");

    // Ensure the database schema is up to date
    console.log("----- Updating database schema...");
    // await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "CategoryHierarchy" (
    //   "id" SERIAL PRIMARY KEY,
    //   "name" TEXT NOT NULL,
    //   "description" TEXT,
    //   "level" INTEGER NOT NULL,
    //   "parentId" INTEGER,
    //   "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //   "updatedAt" TIMESTAMP(3) NOT NULL,
    //   FOREIGN KEY ("parentId") REFERENCES "CategoryHierarchy"("id")
    // )`;
    console.log("----- Database schema updated successfully.");

    console.log("----- Seeding Categories...");
    await seedCategory();

    console.log("----- Seeding Users...");
    await seedUsers();

    console.log("----- Seeding Services...");
    await seedServices();

    // console.log("----- Seeding Rating...");
    // await seedRatings();

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