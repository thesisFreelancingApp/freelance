import { PrismaClient, Jobs, Plan, Role, Level } from "@prisma/client";

const prisma = new PrismaClient();

const allUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "johndoe@example.com",

    jobs: Jobs.Programmation_Tech, // Utilisation de l'enum 'Jobs'
    plan: Plan.Travail_principal, // Utilisation de l'enum 'Plan'
    role: Role.user, // Utilisation de l'enum 'Role'
    level: Level.advanced, // Utilisation de l'enum 'Level'
    skills: JSON.stringify(["JavaScript", "React", "Node.js"]),
    languages: JSON.stringify(["English", "French"]),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "janesmith@example.com",

    jobs: Jobs.Graphisme_Design, // Utilisation de l'enum 'Jobs'
    plan: Plan.Travail_secondaire, // Utilisation de l'enum 'Plan'
    role: Role.user, // Utilisation de l'enum 'Role'
    level: Level.intermediate, // Utilisation de l'enum 'Level'
    skills: JSON.stringify(["Photoshop", "Illustrator", "Figma"]),
    languages: JSON.stringify(["English", "Spanish"]),
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "mikejohnson@example.com",

    jobs: Jobs.Redaction_Traduction, // Utilisation de l'enum 'Jobs'
    plan: Plan.usage_personnel, // Utilisation de l'enum 'Plan'
    role: Role.user, // Utilisation de l'enum 'Role'
    level: Level.beginner, // Utilisation de l'enum 'Level'
    skills: JSON.stringify(["Content Writing", "SEO", "Copywriting"]),
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
            jobs: user.jobs,
            plan: user.plan,
            role: user.role,
            level: user.level,
            skills: user.skills,
            languages: user.languages,
            userEmail: user.email,
          },
        },
      },
    });
  }

  console.log("----- Seeding Users: process completed successfully.");
};
