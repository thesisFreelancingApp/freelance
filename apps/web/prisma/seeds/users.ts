import { PrismaClient }from "@prisma/client";

const prisma = new PrismaClient();

const usersData = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "johndoe@example.com",
    username: "john_doe",

    isBuyer: true,
    isSeller: false,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "janesmith@example.com",
    username: "jane_smith",

    isBuyer: false,
    isSeller: true,
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "mikejohnson@example.com",
    username: "mike_johnson",

    isBuyer: true,
    isSeller: true,
  },
];

export async function seedUsers() {
  console.log("----- Seeding: clearing existing data...");
  await prisma.authUser.deleteMany();
  await prisma.personalProfile.deleteMany();
  console.log("----- Seeding: creating new users...");

  for (const userData of usersData) {
    await prisma.authUser.create({
      data: {
        id: userData.id,
        email: userData.email,
        username: userData.username,

        name: `${userData.firstName} ${userData.lastName}`,
        profile: {
          create: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            profilePic: userData.profilePic,
            userEmail: userData.email,
            bio: "This is a sample bio",
            birthDate: new Date("1990-01-01"),
            phoneNumber: "1234567890",
            address: "123 Main St",
            ...(userData.isBuyer && {
              buyer: {
                create: {
                  id: `${userData.id}-buyer`, // Unique ID for Buyer
                  totalSpent: 0.0,
                },
              },
            }),
            ...(userData.isSeller && {
              seller: {
                create: {
                  id: `${userData.id}-seller`, // Unique ID for Seller

                  totalEarnings: 0.0,
                  sellerRating: 4.5,
                },
              },
            }),
          },
        },
      },
    });
  }

  console.log("----- Seeding: users created successfully.");
}
