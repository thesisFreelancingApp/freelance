import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const seedChats = async () => {
  try {
    console.log("----- Seeding Chats: Starting cleanup...");
    await prisma.message.deleteMany();
    await prisma.chatRoomParticipant.deleteMany();
    await prisma.chatRoom.deleteMany();
    console.log("----- Existing chats cleared.");

    // Get all profiles
    const profiles = await prisma.personalProfile.findMany();

    // Create 10-20 chat rooms
    const numberOfChatRooms = random(10, 20);

    for (let i = 0; i < numberOfChatRooms; i++) {
      // Select two random profiles for each chat
      const [profile1, profile2] = faker.helpers.arrayElements(profiles, 2);

      try {
        // Create chat room
        const chatRoom = await prisma.chatRoom.create({
          data: {
            title: faker.lorem.words(3),
            createdAt: faker.date.past({ years: 1 }),
            participants: {
              create: [
                {
                  participantId: profile1.id,
                  role: "member",
                },
                {
                  participantId: profile2.id,
                  role: "member",
                },
              ],
            },
          },
        });

        // Add 5-15 messages to each chat room
        const numberOfMessages = random(5, 15);
        for (let j = 0; j < numberOfMessages; j++) {
          const sender = faker.helpers.arrayElement([profile1, profile2]);
          await prisma.message.create({
            data: {
              chatRoomId: chatRoom.id,
              senderId: sender.id,
              content: faker.lorem.paragraph(),
              createdAt: faker.date.recent(),
              isRead: faker.datatype.boolean(),
            },
          });
        }

        console.log(`Created chat room with ${numberOfMessages} messages`);
      } catch (error) {
        console.error("Failed to create chat room:", error);
      }
    }
    console.log("----- Chats seeding completed successfully");
  } catch (error) {
    console.error("Error seeding chats:", error);
    throw error;
  }
};
