import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const reviewTemplates = {
  positive: {
    templates: [
      "Excellent service! {detail}",
      "Outstanding work! {detail}",
      "Highly professional! {detail}",
      "Amazing experience! {detail}",
      "Fantastic service! {detail}",
    ],
    details: [
      "Delivered ahead of schedule.",
      "Communication was perfect.",
      "Exceeded my expectations.",
      "Very attentive to requirements.",
      "Would definitely work with again.",
    ],
  },
  neutral: {
    templates: [
      "Good service overall. {detail}",
      "Decent work. {detail}",
      "Satisfactory results. {detail}",
      "Met expectations. {detail}",
    ],
    details: [
      "Minor revisions needed.",
      "Communication was okay.",
      "Delivered on time.",
      "Met basic requirements.",
    ],
  },
  negative: {
    templates: [
      "Could be better. {detail}",
      "Not entirely satisfied. {detail}",
      "Had some issues. {detail}",
    ],
    details: [
      "Delivery was delayed.",
      "Communication could improve.",
      "Needed multiple revisions.",
      "Not exactly what I expected.",
    ],
  },
};

export const seedRatings = async () => {
  try {
    console.log("----- Seeding Ratings: Starting cleanup...");
    await prisma.rating.deleteMany();
    console.log("----- Existing ratings cleared.");

    // Get all completed orders with their related data
    const orders = await prisma.order.findMany({
      where: {
        status: "COMPLETED",
      },
      include: {
        service: true,
        buyer: {
          include: {
            profile: true,
          },
        },
        seller: {
          include: {
            profile: true,
          },
        },
      },
    });

    console.log(`Found ${orders.length} completed orders to rate`);

    // Create ratings for completed orders
    for (const order of orders) {
      // 80% chance of getting a rating
      if (faker.datatype.boolean({ probability: 0.8 })) {
        // Skew towards positive ratings (3-5 stars)
        const rating = faker.number.int({ min: 3, max: 5 });
        const reviewType =
          rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative";

        // Generate review
        const template = faker.helpers.arrayElement(
          reviewTemplates[reviewType].templates,
        );
        const detail = faker.helpers.arrayElement(
          reviewTemplates[reviewType].details,
        );
        const review = template.replace("{detail}", detail);

        try {
          await prisma.rating.create({
            data: {
              rating,
              review,
              service: {
                connect: { id: order.serviceId },
              },
              rater: {
                connect: { id: order.buyer.profile.id },
              },
              ratee: {
                connect: { id: order.seller.profile.id },
              },
              createdAt: faker.date.between({
                from: order.createdAt,
                to: new Date(),
              }),
            },
          });

          console.log(`Created rating for order ${order.id}`);
        } catch (err) {
          console.error(`Failed to create rating for order ${order.id}:`, err);
        }
      }
    }

    console.log("----- Ratings seeding completed successfully");
  } catch (error) {
    console.error("Error seeding ratings:", error);
    throw error;
  }
};
