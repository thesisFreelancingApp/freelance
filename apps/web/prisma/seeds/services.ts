import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  {
    name: "Développement Web Professionnel",
    description:
      "Services de développement web full-stack utilisant les technologies modernes",
    medias: {
      images: [
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&auto=format&fit=crop",
      ],
    },
    tags: [
      "développement web",
      "frontend",
      "backend",
      "full-stack",
      "react",
      "node.js",
    ],
    categoryId: 24,
    creatorId: "2-seller",
    packages: [
      {
        name: "Basique",
        description: "Développement d'une landing page simple",
        deliveryTime: 7,
        price: "499.99",
        revisions: 2,
        features: [
          "1 page",
          "Design responsive",
          "SEO de base",
          "Formulaire de contact",
          "Hébergement inclus",
        ],
      },
      {
        name: "Standard",
        description: "Développement d'un site web multi-pages",
        deliveryTime: 14,
        price: "999.99",
        revisions: 3,
        features: [
          "Jusqu'à 5 pages",
          "Design responsive",
          "SEO avancé",
          "Intégration CMS",
          "Support technique 1 mois",
          "Formulaire de contact avancé",
        ],
      },
      {
        name: "Premium",
        description: "Application web complète",
        deliveryTime: 30,
        price: "2499.99",
        revisions: 5,
        features: [
          "Application web personnalisée",
          "Base de données",
          "Authentification utilisateur",
          "Tableau de bord admin",
          "API RESTful",
          "Sécurité avancée",
          "Support 6 mois",
        ],
      },
    ],
  },
  {
    name: "Design de Logo Moderne",
    description:
      "Création de logos professionnels et créatifs pour votre marque",
    medias: {
      images: [
        "https://images.unsplash.com/photo-1626785774625-8a0b6e5db499?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1632882765546-0ee880c0bd0d?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=800&auto=format&fit=crop",
      ],
    },
    tags: [
      "design de logo",
      "branding",
      "identité visuelle",
      "création graphique",
    ],
    categoryId: 13,
    creatorId: "3-seller",
    packages: [
      {
        name: "Essentiel",
        description: "Design de logo simple et efficace",
        deliveryTime: 3,
        price: "99.99",
        revisions: 2,
        features: [
          "2 propositions",
          "Fichier vectoriel",
          "Fichier PNG haute résolution",
          "Révisions basiques",
        ],
      },
      {
        name: "Professionnel",
        description: "Design de logo professionnel avec charte graphique",
        deliveryTime: 5,
        price: "199.99",
        revisions: 5,
        features: [
          "4 propositions",
          "Tous les fichiers sources",
          "Kit réseaux sociaux",
          "Charte graphique",
          "Révisions illimitées",
        ],
      },
    ],
  },
  {
    name: "Gestion des Réseaux Sociaux",
    description: "Gestion complète et stratégie pour vos réseaux sociaux",
    medias: {
      images: [
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop",
      ],
    },
    tags: [
      "réseaux sociaux",
      "marketing digital",
      "création de contenu",
      "community management",
    ],
    categoryId: 35,
    creatorId: "2-seller",
    packages: [
      {
        name: "Démarrage",
        description: "Gestion basique des réseaux sociaux",
        deliveryTime: 30,
        price: "299.99",
        revisions: 2,
        features: [
          "3 publications par semaine",
          "Analyses basiques",
          "2 plateformes",
          "Calendrier éditorial",
          "Réponses aux commentaires",
        ],
      },
      {
        name: "Business",
        description: "Gestion complète des réseaux sociaux",
        deliveryTime: 30,
        price: "599.99",
        revisions: 4,
        features: [
          "Publications quotidiennes",
          "Analyses avancées",
          "4 plateformes",
          "Calendrier éditorial",
          "Community management",
          "Rapport mensuel",
          "Stratégie personnalisée",
        ],
      },
    ],
  },
  {
    name: "Développement d'Applications Mobiles",
    description: "Création d'applications mobiles natives et cross-platform",
    medias: {
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?w=800&auto=format&fit=crop",
      ],
    },
    tags: [
      "développement mobile",
      "iOS",
      "Android",
      "React Native",
      "applications",
    ],
    categoryId: 28,
    creatorId: "2-seller",
    packages: [
      {
        name: "MVP",
        description: "Application mobile minimale viable",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 3,
        features: [
          "Une plateforme (iOS ou Android)",
          "Design UI/UX basique",
          "Fonctionnalités essentielles",
          "Tests de base",
          "Publication sur le store",
        ],
      },
      {
        name: "Pro",
        description: "Application mobile professionnelle complète",
        deliveryTime: 60,
        price: "5999.99",
        revisions: 5,
        features: [
          "iOS et Android",
          "Design UI/UX premium",
          "Backend inclus",
          "Tests complets",
          "Analytics",
          "Support 3 mois",
          "Publication sur les stores",
        ],
      },
    ],
  },
];

export const seedServices = async () => {
  try {
    console.log("----- Seeding Services: Starting cleanup...");
    await prisma.servicePackage.deleteMany();
    await prisma.service.deleteMany();
    console.log("----- Existing services and packages cleared.");

    for (const service of services) {
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

    console.log("----- Services seeding completed successfully");
  } catch (error) {
    console.error("Error seeding services:", error);
    throw error;
  }
};
