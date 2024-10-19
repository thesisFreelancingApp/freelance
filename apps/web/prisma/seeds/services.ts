import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample service data
const allServices = [
  {
    name: "Logo Design",
    price: "Starting at $50",
    description: "Professional logo design services.",
    categoryId: 1,
    userId: "1",
    deliveryTime: 3,
    revisions: 2,
    features: ["2 concepts", "Vector file", "Printable file"],
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/121170297/original/2d6d889017332322b0410161b4e0acf9b1a4c512/design-unique-logo-and-brand-identity.jpg",
    ],
    tags: ["logo", "branding", "design"],
  },
  {
    name: "Content Writing",
    price: "Starting at $30",
    description: "High-quality content writing for various needs.",
    categoryId: 2,
    userId: "2",
    deliveryTime: 2,
    revisions: 1,
    features: ["SEO optimized", "1000 words", "Proofread"],
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/320438420/original/8d502b9bb8867f660f1d499adc98b6c7617b7bde/do-seo-article-writing-blog-post-writing-website-content-writing-copywriting.jpg",
    ],
    tags: ["writing", "content", "seo"],
  },
  {
    name: "Web Development",
    price: "Starting at $100",
    description: "Custom web development services.",
    categoryId: 3,
    userId: "3",
    deliveryTime: 7,
    revisions: 3,
    features: ["Responsive design", "5 pages", "Basic SEO"],
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/340935610/original/8b847044c29cead43d8024e1aaf601c456a3e036/use-openai-to-build-a-stable-ai-saas-or-ai-web-application.png",
    ],
    tags: ["web", "development", "coding"],
  },
  {
    name: "Social Media Marketing",
    price: "Starting at $80",
    description: "Effective social media marketing strategies.",
    categoryId: 4,
    userId: "3",
    deliveryTime: 5,
    revisions: 2,
    features: ["3 platforms", "Content calendar", "Analytics report"],
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/337635656/original/50603dc5d59baba46041b7ad0ec50bed7577ec59/be-your-social-media-manager.png",
    ],
    tags: ["marketing", "social media", "digital"],
  },
];

export const seedServices = async () => {
  console.log("----- Seeding Services: cleanup process is starting...");

  // Optionally clear the service table before seeding
  await prisma.service.deleteMany();
  console.log("----- The service table has been successfully cleared.");

  console.log("----- Seeding Services: process is starting...");

  // Seeding services and linking them to categories
  for (const service of allServices) {
    try {
      await prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          description: service.description,
          deliveryTime: service.deliveryTime,
          revisions: service.revisions,
          features: service.features,
          images: service.images,
          tags: service.tags,
          creator: { connect: { id: service.userId } },
          category: { connect: { id: service.categoryId } },
        },
      });
      console.log(`Created service: ${service.name}`);
    } catch (error) {
      console.error(`Error creating service ${service.name}:`, error);
    }
  }

  console.log("----- Seeding Services: process completed successfully.");
};
