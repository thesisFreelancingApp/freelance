import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  {
    name: "Professional Web Development",
    description:
      "Full-stack web development services using modern technologies",
    medias: {
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
      ],
      videos: [],
    },
    tags: ["web development", "frontend", "backend", "full-stack"],
    categoryId: 24, // Web Development category
    creatorId: "2-seller", // Jane Smith's seller ID
    packages: [
      {
        name: "Basic",
        description: "Simple landing page development",
        deliveryTime: 7,
        price: "499.99",
        revisions: 2,
        features: ["1 page", "Responsive design", "Basic SEO", "Contact form"],
      },
      {
        name: "Standard",
        description: "Multi-page website development",
        deliveryTime: 14,
        price: "999.99",
        revisions: 3,
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Advanced SEO",
          "Contact form",
          "CMS integration",
        ],
      },
      {
        name: "Premium",
        description: "Full-featured web application",
        deliveryTime: 30,
        price: "2499.99",
        revisions: 5,
        features: [
          "Custom web application",
          "Database integration",
          "User authentication",
          "Admin dashboard",
          "API development",
          "Advanced security",
        ],
      },
    ],
  },
  {
    name: "Modern Logo Design",
    description: "Professional and creative logo design services",
    medias: {
      images: [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d",
        "https://images.unsplash.com/photo-1632882765546-0ee880c0bd0d",
        "https://images.unsplash.com/photo-1629429408209-1f912961dbd8",
      ],
      videos: [],
    },
    tags: ["logo design", "branding", "graphic design"],
    categoryId: 13, // Logo Design category
    creatorId: "3-seller", // Mike Johnson's seller ID
    packages: [
      {
        name: "Basic",
        description: "Simple logo design",
        deliveryTime: 3,
        price: "99.99",
        revisions: 2,
        features: ["2 concepts", "Vector file", "PNG file", "Basic revisions"],
      },
      {
        name: "Professional",
        description: "Professional logo design with branding",
        deliveryTime: 5,
        price: "199.99",
        revisions: 5,
        features: [
          "4 concepts",
          "All source files",
          "Social media kit",
          "Brand guidelines",
          "Unlimited revisions",
        ],
      },
    ],
  },
  {
    name: "Social Media Management",
    description: "Complete social media management and strategy",
    medias: {
      images: [
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1",
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
      ],
      videos: [],
    },
    tags: ["social media", "marketing", "content creation"],
    categoryId: 35, // Social Media category
    creatorId: "2-seller", // Jane Smith's seller ID
    packages: [
      {
        name: "Starter",
        description: "Basic social media management",
        deliveryTime: 30,
        price: "299.99",
        revisions: 2,
        features: [
          "3 posts per week",
          "Basic analytics",
          "2 platforms",
          "Content calendar",
        ],
      },
      {
        name: "Business",
        description: "Comprehensive social media management",
        deliveryTime: 30,
        price: "599.99",
        revisions: 4,
        features: [
          "Daily posts",
          "Advanced analytics",
          "4 platforms",
          "Content calendar",
          "Community management",
          "Monthly report",
        ],
      },
    ],
  },
];

export async function seedServices() {
  try {
    console.log("----- Seeding Services: cleanup process is starting...");
    await prisma.servicePackage.deleteMany();
    await prisma.service.deleteMany();
    console.log("----- Existing services and packages cleared.");

    for (const service of services) {
      // Create the service first
      const createdService = await prisma.service.create({
        data: {
          name: service.name,
          description: service.description,
          medias: service.medias,
          tags: service.tags,
          categoryId: service.categoryId,
          creatorId: service.creatorId,
        },
      });

      // Then create all packages for this service
      for (const pkg of service.packages) {
        await prisma.servicePackage.create({
          data: {
            serviceId: createdService.id,
            name: pkg.name,
            description: pkg.description,
            deliveryTime: pkg.deliveryTime,
            price: pkg.price,
            revisions: pkg.revisions,
            features: pkg.features,
          },
        });
      }

      console.log(`Created service: ${service.name} with packages`);
    }

    console.log("Services seeded successfully");
  } catch (error) {
    console.error("Error seeding services:", error);
    throw error;
  }
}
