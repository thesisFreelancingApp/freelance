import {
  PrismaClient,
  OrderStatus,
  PaymentStatus,
  PaymentMethodType,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const seedOrders = async () => {
  try {
    console.log("----- Seeding Orders: Starting cleanup...");
    await prisma.order.deleteMany();
    console.log("----- Existing orders cleared.");

    // Get all services with their sellers
    const services = await prisma.service.findMany({
      include: {
        creator: true,
        packages: true,
      },
    });

    // Get all buyers
    const buyers = await prisma.buyer.findMany();

    for (const service of services) {
      // Create 2-5 orders per service
      const numberOfOrders = random(2, 5);

      for (let i = 0; i < numberOfOrders; i++) {
        const buyer = faker.helpers.arrayElement(buyers);
        const package_ = faker.helpers.arrayElement(service.packages);
        const status = faker.helpers.arrayElement(Object.values(OrderStatus));
        const paymentMethod = faker.helpers.arrayElement(
          Object.values(PaymentMethodType),
        );
        const amount = Number(package_?.price || random(50, 500));

        try {
          await prisma.order.create({
            data: {
              totalAmount: amount,
              status,
              description: `Order for ${service.name}`,
              paymentMethod,
              paymentStatus: PaymentStatus.COMPLETED,
              buyer: { connect: { id: buyer.id } },
              seller: { connect: { id: service.creator.id } },
              service: { connect: { id: service.id } },
              createdAt: faker.date.past({ years: 1 }),
              updatedAt: faker.date.recent(),
            },
          });
          console.log(`Created order for service ${service.id}`);
        } catch (error) {
          console.error(
            `Failed to create order for service ${service.id}:`,
            error,
          );
        }
      }
    }
    console.log("----- Orders seeding completed successfully");
  } catch (error) {
    console.error("Error seeding orders:", error);
    throw error;
  }
};
