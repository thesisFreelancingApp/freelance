import { PrismaClient, DisputeStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const seedDisputes = async () => {
  try {
    console.log("----- Seeding Disputes: Starting cleanup...");
    await prisma.disputeMessage.deleteMany();
    await prisma.disputeParticipant.deleteMany();
    await prisma.dispute.deleteMany();
    console.log("----- Existing disputes cleared.");

    // Get all orders with their related data
    const orders = await prisma.order.findMany({
      include: {
        buyer: true,
        seller: true,
        service: true,
      },
    });

    // Create disputes for ~10% of orders
    const ordersWithDisputes = faker.helpers.arrayElements(
      orders,
      Math.floor(orders.length * 0.1),
    );

    for (const order of ordersWithDisputes) {
      try {
        // Create dispute
        const dispute = await prisma.dispute.create({
          data: {
            serviceId: order.serviceId,
            initiatorBuyerId: order.buyerId,
            initiatorSellerId: order.sellerId,
            description: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement(Object.values(DisputeStatus)),
            createdAt: faker.date.past({ years: 0.5 }),
            updatedAt: faker.date.recent(),
          },
        });

        // Add participants
        await prisma.disputeParticipant.create({
          data: {
            disputeId: dispute.id,
            participantBuyerId: order.buyerId,
            participantSellerId: order.sellerId,
            role: "participant",
          },
        });

        // Add 3-8 messages to the dispute
        const numberOfMessages = random(3, 8);
        for (let i = 0; i < numberOfMessages; i++) {
          const isBuyerMessage = faker.datatype.boolean();
          await prisma.disputeMessage.create({
            data: {
              disputeId: dispute.id,
              senderBuyerId: isBuyerMessage ? order.buyerId : null,
              senderSellerId: isBuyerMessage ? null : order.sellerId,
              content: faker.lorem.paragraph(),
              createdAt: faker.date.recent(),
              isRead: faker.datatype.boolean(),
            },
          });
        }

        console.log(
          `Created dispute for order ${order.id} with ${numberOfMessages} messages`,
        );
      } catch (error) {
        console.error(`Failed to create dispute for order ${order.id}:`, error);
      }
    }
    console.log("----- Disputes seeding completed successfully");
  } catch (error) {
    console.error("Error seeding disputes:", error);
    throw error;
  }
};
