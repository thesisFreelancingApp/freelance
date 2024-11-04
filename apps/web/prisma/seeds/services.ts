import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Helper function to generate random number within range
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to get random element from array
const randomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

// Common features for packages
const packageFeatures = {
  webDev: [
    "Responsive Design",
    "SEO Optimization",
    "Cross-browser Compatible",
    "Mobile-first Approach",
    "Performance Optimization",
    "Security Features",
    "API Integration",
    "Database Setup",
    "User Authentication",
    "Custom Functionality",
    "Code Documentation",
    "Source Files",
  ],
  design: [
    "High Resolution Files",
    "Source Files",
    "Commercial Use",
    "3D Mockups",
    "Social Media Kit",
    "Print-ready Files",
    "Vector Files",
    "Brand Guidelines",
    "Multiple Revisions",
    "Express Delivery",
    "Logo Variations",
    "Stationery Design",
  ],
  marketing: [
    "Keyword Research",
    "Competitor Analysis",
    "Content Strategy",
    "Social Media Setup",
    "Analytics Report",
    "Monthly Report",
    "Ad Campaign Setup",
    "Target Audience Analysis",
    "Performance Tracking",
    "Content Calendar",
    "Engagement Strategy",
    "Brand Voice Development",
  ],
  writing: [
    "SEO Optimization",
    "Topic Research",
    "Plagiarism Check",
    "Proofreading",
    "Content Strategy",
    "Keyword Optimization",
    "Meta Description",
    "Content Format",
    "Editorial Calendar",
    "Style Guide",
    "Target Audience Research",
    "Content Distribution",
  ],
  video: [
    "HD Quality",
    "Color Correction",
    "Sound Design",
    "Background Music",
    "Basic Animation",
    "Video Transitions",
    "Subtitles",
    "Multiple Formats",
    "Storyboard",
    "Voice Over",
    "Stock Footage",
    "Motion Graphics",
  ],
};

export const seedServices = async () => {
  try {
    console.log("----- Seeding Services: Starting cleanup...");
    await prisma.servicePackage.deleteMany();
    await prisma.service.deleteMany();
    console.log("----- Existing services and packages cleared.");

    // Get all sellers
    const sellers = await prisma.seller.findMany({
      select: {
        id: true,
      },
    });

    if (sellers.length === 0) {
      throw new Error("No sellers found. Please seed users first.");
    }

    console.log(`Found ${sellers.length} sellers`);

    // Get all categories
    const categories = await prisma.mainCategories.findMany();
    if (categories.length === 0) {
      throw new Error("No categories found. Please seed categories first.");
    }

    // Generate services for each seller
    for (const seller of sellers) {
      // Create 1-3 services per seller
      const numServices = random(1, 3);

      for (let i = 0; i < numServices; i++) {
        const category = randomElement(categories);
        const categoryType = getCategoryType(category.name);

        try {
          const service = await prisma.service.create({
            data: {
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              medias: {
                images: Array.from({ length: random(3, 5) }, () =>
                  faker.image.urlLoremFlickr({
                    category: categoryType,
                    width: 800,
                    height: 600,
                  }),
                ),
              },
              tags: Array.from({ length: random(3, 6) }, () =>
                faker.helpers.arrayElement([
                  "responsive",
                  "modern",
                  "professional",
                  "creative",
                  "innovative",
                  "custom",
                  "premium",
                  "fast-delivery",
                  "high-quality",
                  "mobile-friendly",
                  "seo-optimized",
                  "user-friendly",
                  "unique",
                  "trending",
                  "best-seller",
                ]),
              ),
              creator: {
                connect: { id: seller.id },
              },
              category: {
                connect: { id: category.id },
              },
              isPublic: true,
            },
          });

          // Create packages for the service
          const packages = ["Basic", "Standard", "Premium"];
          for (const tier of packages) {
            const basePrice =
              tier === "Basic" ? 50 : tier === "Standard" ? 100 : 200;
            const baseDelivery =
              tier === "Basic" ? 3 : tier === "Standard" ? 5 : 7;
            const numFeatures =
              tier === "Basic" ? 3 : tier === "Standard" ? 5 : 7;

            await prisma.servicePackage.create({
              data: {
                serviceId: service.id,
                name: tier,
                description: faker.commerce.productDescription(),
                deliveryTime: random(baseDelivery, baseDelivery + 7),
                price: random(basePrice, basePrice * 2),
                revisions: tier === "Basic" ? 1 : tier === "Standard" ? 3 : 5,
                features: faker.helpers.arrayElements(
                  packageFeatures[categoryType],
                  numFeatures,
                ),
              },
            });
          }

          console.log(`Created service for seller ${seller.id}`);
        } catch (error) {
          console.error(
            `Failed to create service for seller ${seller.id}:`,
            error,
          );
        }
      }
    }

    console.log("----- Services seeding completed successfully");
  } catch (error) {
    console.error("Error seeding services:", error);
    throw error;
  }
};

// Helper function to map category name to type
function getCategoryType(categoryName: string): keyof typeof packageFeatures {
  const name = categoryName.toLowerCase();
  if (name.includes("web") || name.includes("dev")) return "webDev";
  if (name.includes("design")) return "design";
  if (name.includes("market")) return "marketing";
  if (name.includes("writ")) return "writing";
  if (name.includes("video")) return "video";
  return "webDev"; // Default fallback
}
