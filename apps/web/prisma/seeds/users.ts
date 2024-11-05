import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to generate random numbers
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate realistic user data
const users = [
  // Web Developers
  ...Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `dev-${i + 1}`,
      email: `dev.${i + 1}@example.com`,
      username: `webdev_${i + 1}`,
      name: `Web Developer ${i + 1}`,
      role: "USER",
      profile: {
        firstName: `John${i + 1}`,
        lastName: "Developer",
        profilePic: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`,
        title: "Full Stack Developer",
        bio: "Experienced web developer specializing in modern web technologies",
        phoneNumber: `+1234567${i.toString().padStart(4, "0")}`,
        address: `${random(100, 999)} Tech Street`,
        birthDate: new Date(random(1980, 2000), random(0, 11), random(1, 28)),
        seller: {
          totalEarnings: random(1000, 50000),
          sellerRating: random(35, 50) / 10,
        },
        buyer: {
          totalSpent: random(100, 5000),
        },
      },
      account: {
        lastProvider: "google",
        providers: ["google", "github"],
        providerAccountId: `google${i + 1}`,
        accessToken: `access${i + 1}`,
        refreshToken: `refresh${i + 1}`,
        expiresAt: 1735689600,
      },
    })),

  // Designers
  ...Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `designer-${i + 1}`,
      email: `designer.${i + 1}@example.com`,
      username: `designer_${i + 1}`,
      name: `Designer ${i + 1}`,
      role: "USER",
      profile: {
        firstName: `Sarah${i + 1}`,
        lastName: "Designer",
        profilePic: `https://randomuser.me/api/portraits/women/${i + 1}.jpg`,
        title: "UI/UX Designer",
        bio: "Creative designer with a passion for user experience",
        phoneNumber: `+1234567${(i + 10).toString().padStart(4, "0")}`,
        address: `${random(100, 999)} Design Avenue`,
        birthDate: new Date(random(1980, 2000), random(0, 11), random(1, 28)),
        seller: {
          totalEarnings: random(1000, 50000),
          sellerRating: random(35, 50) / 10,
        },
      },
      account: {
        lastProvider: "google",
        providers: ["google"],
        providerAccountId: `google_designer${i + 1}`,
        accessToken: `access_designer${i + 1}`,
        refreshToken: `refresh_designer${i + 1}`,
        expiresAt: 1735689600,
      },
    })),
];

export async function seedUsers() {
  try {
    console.log("----- Seeding Users: Starting cleanup...");
    await prisma.authUser.deleteMany();
    await prisma.personalProfile.deleteMany();
    await prisma.account.deleteMany();
    console.log("----- Existing users cleared.");

    for (const userData of users) {
      try {
        const user = await prisma.authUser.create({
          data: {
            id: userData.id,
            email: userData.email,
            username: userData.username,
            name: userData.name,
            role: userData.role,
            preferences: {
              create: {
                theme: "SYSTEM",
                view: "Seller",
                notifications: true,
                language: "en",
                showOnlineStatus: true,
                notificationFrequency: "INSTANT",
              },
            },
            account: {
              create: userData.account,
            },
            profile: {
              create: {
                firstName: userData.profile.firstName,
                lastName: userData.profile.lastName,
                profilePic: userData.profile.profilePic,
                title: userData.profile.title,
                bio: userData.profile.bio,
                phoneNumber: userData.profile.phoneNumber,
                address: userData.profile.address,
                birthDate: userData.profile.birthDate,
                userEmail: userData.email,
                ...(userData.profile.seller && {
                  seller: {
                    create: {
                      id: `${userData.id}-seller`,
                      totalEarnings: userData.profile.seller.totalEarnings,
                      sellerRating: userData.profile.seller.sellerRating,
                    },
                  },
                }),
                ...(userData.profile.buyer && {
                  buyer: {
                    create: {
                      id: `${userData.id}-buyer`,
                      totalSpent: userData.profile.buyer.totalSpent,
                    },
                  },
                }),
              },
            },
          },
        });
        console.log(`Created user: ${userData.name}`);
      } catch (error) {
        console.error(`Error creating user ${userData.name}:`, error);
      }
    }

    console.log(`----- Created ${users.length} users successfully.`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}
