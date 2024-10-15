import { seedCategory } from "./seeds/categories";
import { seedRatings } from "./seeds/rating";
import { seedServices } from "./seeds/services";
import { seedUsers } from "./seeds/users";

async function mainSeed() {
  try {
    console.log("----- Database seeding is currently in progress...");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    console.log("----- Seeding Categories...");
    await seedCategory();
    //
    console.log("----- Seeding Services...");
    //
    await seedServices();
    //
    console.log("----- Seeding Users...");
    //
    await seedUsers();
    //
    console.log("----- Seeding Rating...");
    //
    await seedRatings();
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    console.log("----- Database seeding completed successfully.");
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
  } catch (error) {
    console.error(
      "An error occurred during the database seeding process:",
      error
    );
    process.exit(1);
  } finally {
    console.log("----- Database connection closed.");
  }
}

mainSeed();
