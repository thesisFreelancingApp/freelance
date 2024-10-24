import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const allUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "johndoe@example.com",

    role: Role.user, // Utilisation de l'enum 'Role'

    languages: JSON.stringify(["English", "French"]),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "janesmith@example.com",

    role: Role.user, // Utilisation de l'enum 'Role'

    languages: JSON.stringify(["English", "German"]),
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "mikejohnson@example.com",

    role: Role.user, // Utilisation de l'enum 'Role'

    languages: JSON.stringify(["English", "German"]),
  },
];

export const seedUsers = async () => {
  console.log("----- Seeding Users: cleanup process is starting...");

  await prisma.authUser.deleteMany();
  await prisma.profile.deleteMany();
  console.log(
    "----- The AuthUser and Profile tables have been successfully cleared.",
  );

  console.log("----- Seeding Users: process is starting...");

  for (const user of allUsers) {
    await prisma.authUser.create({
      data: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        profile: {
          create: {
            firstName: user.firstName,
            lastName: user.lastName,
            profilePic: user.profilePic,

            role: user.role,

            userEmail: user.email,
            username: user.firstName + user.lastName,
          },
        },
      },
    });
  }

  console.log("----- Seeding Users: process completed successfully.");
};
