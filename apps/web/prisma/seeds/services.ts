import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample service data
const allServices = [
  {
    name: "Logo Design",
    description: "Professional logo design services.",
    categoryId: 1,
    creatorId: "1",
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/121170297/original/2d6d889017332322b0410161b4e0acf9b1a4c512/design-unique-logo-and-brand-identity.jpg",
    ],
    tags: ["logo", "branding", "design"],
    packages: [
      {
        name: "Basic",
        description: "Simple logo design with 2 concepts and basic files.",
        price: 50,
        deliveryTime: 3,
        revisions: 2,
        features: ["2 concepts", "Vector file", "Printable file"],
      },
      {
        name: "Standard",
        description:
          "Advanced logo design with more concepts and source files.",
        price: 100,
        deliveryTime: 5,
        revisions: 3,
        features: [
          "4 concepts",
          "Vector file",
          "Printable file",
          "Source file",
        ],
      },
      {
        name: "Premium",
        description:
          "Comprehensive logo design package with branding guidelines.",
        price: 200,
        deliveryTime: 7,
        revisions: 5,
        features: [
          "6 concepts",
          "Vector file",
          "Printable file",
          "Source file",
          "Brand guidelines",
        ],
      },
    ],
  },
  {
    name: "Content Writing",
    description: "High-quality content writing for various needs.",
    categoryId: 2,
    creatorId: "2",
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/320438420/original/8d502b9bb8867f660f1d499adc98b6c7617b7bde/do-seo-article-writing-blog-post-writing-website-content-writing-copywriting.jpg",
    ],
    tags: ["writing", "content", "seo"],
    packages: [
      {
        name: "Basic",
        description: "SEO-optimized 500-word article with proofreading.",
        price: 30,
        deliveryTime: 2,
        revisions: 1,
        features: ["SEO optimized", "500 words", "Proofread"],
      },
      {
        name: "Standard",
        description:
          "1000-word article with SEO optimization and plagiarism check.",
        price: 60,
        deliveryTime: 3,
        revisions: 2,
        features: [
          "SEO optimized",
          "1000 words",
          "Proofread",
          "Plagiarism check",
        ],
      },
      {
        name: "Premium",
        description:
          "Comprehensive 2000-word article with topic research and all premium features.",
        price: 120,
        deliveryTime: 5,
        revisions: 3,
        features: [
          "SEO optimized",
          "2000 words",
          "Proofread",
          "Plagiarism check",
          "Topic research",
        ],
      },
    ],
  },
  {
    name: "Web Development",
    description:
      "Custom web development services for businesses and individuals.",
    categoryId: 2,
    creatorId: "3",
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/357751985/original/4340994604005aa845f31876133596fc77d5bfb8/do-wordpress-website-development-design-redesign-duplicate-wordpress-website.jpg",
    ],
    tags: ["web development", "frontend", "backend"],
    packages: [
      {
        name: "Basic",
        description: "Single page website",
        price: 200,
        deliveryTime: 7,
        revisions: 2,
        features: ["HTML/CSS", "Responsive design", "1 page"],
      },
      {
        name: "Standard",
        description: "Multi-page website",
        price: 500,
        deliveryTime: 14,
        revisions: 3,
        features: [
          "HTML/CSS",
          "JavaScript",
          "Responsive design",
          "Up to 5 pages",
        ],
      },
      {
        name: "Premium",
        description: "Full website with CMS",
        price: 1000,
        deliveryTime: 30,
        revisions: 5,
        features: [
          "HTML/CSS",
          "JavaScript",
          "PHP",
          "CMS integration",
          "Up to 10 pages",
        ],
      },
    ],
  },
  {
    name: "Social Media Marketing",
    description:
      "Comprehensive social media marketing services to boost your online presence.",
    categoryId: 3,
    creatorId: "1",
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/255873889/original/658c74fc56c682f5e4e24d8cab87ffb8dcf7c89e/do-seo-and-social-media-or-digital-marketing-expert-service.png",
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/255873889/original/713d6411c39c5ee93eac2c0f24952c696de4e248/do-seo-and-social-media-or-digital-marketing-expert-service.png",
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/255873889/original/512cad894f1f82cdb5cab0c464cb6026e9a4dfd1/do-seo-and-social-media-or-digital-marketing-expert-service.png",
    ],
    tags: ["social media", "marketing", "digital marketing"],
    packages: [
      {
        name: "Basic",
        description: "Social media setup",
        price: 100,
        deliveryTime: 3,
        revisions: 1,
        features: ["Profile setup", "1 platform", "Content calendar"],
      },
      {
        name: "Standard",
        description: "Social media management",
        price: 300,
        deliveryTime: 7,
        revisions: 2,
        features: [
          "Profile management",
          "2 platforms",
          "Content creation",
          "Weekly posts",
        ],
      },
      {
        name: "Premium",
        description: "Full social media strategy",
        price: 800,
        deliveryTime: 14,
        revisions: 3,
        features: [
          "Profile management",
          "3 platforms",
          "Content creation",
          "Daily posts",
          "Analytics report",
        ],
      },
    ],
  },
  {
    name: "Video Editing",
    description:
      "Professional video editing services for various types of content.",
    categoryId: 4,
    creatorId: "2",
    images: [
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/309821334/original/4e86794acd42956f34a3c974a29f47faae03131c/edit-viral-tiktok-instagram-youtube-reels-with-captions.png",
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/289213291/original/cab40eb7567465c82d59f2c6d7395e78734317d2/do-professional-creative-video-edit-for-facebook-and-youtube.png",
    ],
    tags: ["video editing", "post-production", "YouTube"],
    packages: [
      {
        name: "Basic",
        description: "Simple video edit",
        price: 50,
        deliveryTime: 2,
        revisions: 1,
        features: ["Trimming", "Basic transitions", "Up to 5 minutes"],
      },
      {
        name: "Standard",
        description: "Advanced video edit",
        price: 150,
        deliveryTime: 4,
        revisions: 2,
        features: [
          "Color correction",
          "Sound design",
          "Motion graphics",
          "Up to 15 minutes",
        ],
      },
      {
        name: "Premium",
        description: "Professional video production",
        price: 500,
        deliveryTime: 7,
        revisions: 3,
        features: [
          "4K editing",
          "Advanced VFX",
          "Custom animations",
          "Up to 30 minutes",
        ],
      },
    ],
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
          description: service.description,
          images: service.images,
          tags: service.tags,
          creator: { connect: { id: service.creatorId } },
          category: { connect: { id: service.categoryId } },
          packages: {
            create: service.packages.map((pkg) => ({
              name: pkg.name,
              description: pkg.description,
              price: Number(pkg.price), // Convert to number here
              deliveryTime: pkg.deliveryTime,
              revisions: pkg.revisions,
              features: pkg.features,
            })),
          },
        },
      });
      console.log(`Created service: ${service.name}`);
    } catch (error) {
      console.error(`Error creating service ${service.name}:`, error);
    }
  }

  console.log("----- Seeding Services: process completed successfully.");
};
