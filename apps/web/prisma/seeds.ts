import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Universal seeder function
const seedEntities = async (entityName: string, data: any[]) => {
  try {
    for (const item of data) {
      await (prisma[entityName as keyof PrismaClient] as any).create({
        data: item,
      });
    }
    console.log(`${entityName} inserted successfully.`);
  } catch (error) {
    console.error(`Error inserting ${entityName}:`, error);
  }
};

// Define the structure for category data
interface CategoryData {
  id: number;
  name: string;
  level: number;
  description: string;
  parent_id?: number;
}

interface ServiceData {
  id: number;
  name: string;
  price: string;
  description?: string;
  category_id: number; // Add this to match the Prisma schema

}
interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  email: string;
  password: string;
  profile_pic: string;
  is_seller: boolean;
  is_buyer?: boolean;
  jobs: string;
  plan: string;
  role: string;
  level: string;
  skills: string;
  languages: string;
  category_id: number; // Add this to match the Prisma schema

}

// Seeder for CategoryHierarchy
const seedCategories = async () => {
  const allCategories: CategoryData[] = [
    {
      id: 1,
      name: "Graphisme & Design",
      level: 1,
      description:
        "Services de conception graphique et de design pour divers besoins visuels.",
    },
    {
      id: 2,
      name: "Programmation & Tech",
      level: 1,
      description: "Services de développement logiciel, web et technologique.",
    },
    {
      id: 3,
      name: "Marketing digital",
      level: 1,
      description:
        "Stratégies et services de marketing en ligne pour promouvoir les entreprises.",
    },
    {
      id: 4,
      name: "Vidéo & Animation",
      level: 1,
      description:
        "Services de production vidéo et d'animation pour divers projets.",
    },
    {
      id: 5,
      name: "Rédaction & Traduction",
      level: 1,
      description:
        "Services d'écriture, de rédaction et de traduction dans diverses langues.",
    },
    {
      id: 6,
      name: "Musique & Audio",
      level: 1,
      description:
        "Services liés à la production musicale et au traitement audio.",
    },
    {
      id: 7,
      name: "Business",
      level: 1,
      description: "Services de conseil et de soutien aux entreprises.",
    },
    {
      id: 8,
      name: "Finance",
      level: 1,
      description:
        "Services financiers et de comptabilité pour particuliers et entreprises.",
    },
    {
      id: 9,
      name: "Services d'IA",
      level: 1,
      description:
        "Services utilisant l'intelligence artificielle pour diverses applications.",
    },
    {
      id: 10,
      name: "Croissance personnelle",
      level: 1,
      description: "Services de développement personnel et de bien-être.",
    },
    {
      id: 11,
      name: "Consultations",
      level: 1,
      description: "Services de conseil dans divers domaines d'expertise.",
    },
    {
      id: 12,
      name: "Photographie",
      level: 1,
      description:
        "Services de photographie professionnelle pour différents besoins.",
    },

    // Sous-catégories pour "Graphisme & Design"
    {
      id: 13,
      name: "Logo et identité visuelle",
      level: 2,
      parent_id: 1,
      description:
        "Création de logos et d'identités visuelles pour les marques.",
    },
    {
      id: 14,
      name: "Art et illustration",
      level: 2,
      parent_id: 1,
      description: "Création d'œuvres d'art et d'illustrations personnalisées.",
    },
    {
      id: 15,
      name: "Webdesign et mobile design",
      level: 2,
      parent_id: 1,
      description:
        "Conception d'interfaces pour sites web et applications mobiles.",
    },
    {
      id: 16,
      name: "Produit & Gaming",
      level: 2,
      parent_id: 1,
      description: "Design de produits et d'éléments pour les jeux vidéo.",
    },
    {
      id: 17,
      name: "Design d'impression",
      level: 2,
      parent_id: 1,
      description: "Conception de supports imprimés.",
    },
    {
      id: 18,
      name: "Design visuel",
      level: 2,
      parent_id: 1,
      description: "Création de visuels pour divers supports.",
    },
    {
      id: 19,
      name: "Conception marketing",
      level: 2,
      parent_id: 1,
      description: "Design de supports marketing.",
    },
    {
      id: 20,
      name: "Packaging & Couvertures",
      level: 2,
      parent_id: 1,
      description: "Conception d'emballages et de couvertures.",
    },
    {
      id: 21,
      name: "Architecture et conception de bâtiments",
      level: 2,
      parent_id: 1,
      description: "Services de conception architecturale.",
    },
    {
      id: 22,
      name: "Mode et goodies",
      level: 2,
      parent_id: 1,
      description: "Design de mode et d'objets promotionnels.",
    },
    {
      id: 23,
      name: "3D design",
      level: 2,
      parent_id: 1,
      description: "Conception en 3D pour divers projets.",
    },

    // Sous-catégories pour "Programmation & Tech"
    {
      id: 24,
      name: "Développement de sites web",
      level: 2,
      parent_id: 2,
      description: "Création et développement de sites web.",
    },
    {
      id: 25,
      name: "Développement de l'IA",
      level: 2,
      parent_id: 2,
      description:
        "Développement de solutions basées sur l'intelligence artificielle.",
    },
    {
      id: 26,
      name: "Développement de chatbots",
      level: 2,
      parent_id: 2,
      description: "Création de chatbots intelligents.",
    },
    {
      id: 27,
      name: "Développement de jeux",
      level: 2,
      parent_id: 2,
      description: "Création de jeux vidéo.",
    },
    {
      id: 28,
      name: "Développement d'applications mobiles",
      level: 2,
      parent_id: 2,
      description: "Création d'applications pour smartphones et tablettes.",
    },
    {
      id: 29,
      name: "Cloud et cybersécurité",
      level: 2,
      parent_id: 2,
      description:
        "Services liés au cloud computing et à la sécurité informatique.",
    },
    {
      id: 30,
      name: "Data Science & ML",
      level: 2,
      parent_id: 2,
      description: "Services de data science et de machine learning.",
    },
    {
      id: 31,
      name: "Développement de logiciels",
      level: 2,
      parent_id: 2,
      description: "Création de logiciels sur mesure.",
    },
    {
      id: 32,
      name: "Blockchain et cryptomonnaies",
      level: 2,
      parent_id: 2,
      description: "Développement lié à la blockchain et aux cryptomonnaies.",
    },
    {
      id: 33,
      name: "Divers",
      level: 2,
      parent_id: 2,
      description: "Autres services de programmation et technologie.",
    },

    // Sous-catégories pour "Marketing digital"
    {
      id: 34,
      name: "Référencement",
      level: 2,
      parent_id: 3,
      description: "Optimisation pour les moteurs de recherche.",
    },
    {
      id: 35,
      name: "Réseaux sociaux",
      level: 2,
      parent_id: 3,
      description: "Gestion et stratégie sur les réseaux sociaux.",
    },
    {
      id: 36,
      name: "Méthodes & Techniques",
      level: 2,
      parent_id: 3,
      description: "Diverses méthodes et techniques de marketing digital.",
    },
    {
      id: 37,
      name: "Analyses et stratégie",
      level: 2,
      parent_id: 3,
      description: "Analyse de données et élaboration de stratégies marketing.",
    },
    {
      id: 38,
      name: "Spécifique à la chaîne",
      level: 2,
      parent_id: 3,
      description: "Marketing spécifique à certaines plateformes.",
    },
    {
      id: 39,
      name: "Spécifique à un secteur ou objectif",
      level: 2,
      parent_id: 3,
      description: "Marketing adapté à des secteurs ou objectifs particuliers.",
    },
    {
      id: 40,
      name: "Divers",
      level: 2,
      parent_id: 3,
      description: "Autres services de marketing digital.",
    },

    // Sous-catégories pour "Vidéo & Animation"
    {
      id: 41,
      name: "Édition et post-production",
      level: 2,
      parent_id: 4,
      description: "Services d'édition et de post-production vidéo.",
    },
    {
      id: 42,
      name: "Animation",
      level: 2,
      parent_id: 4,
      description: "Création d'animations pour divers projets.",
    },
    {
      id: 43,
      name: "Production audiovisuelle",
      level: 2,
      parent_id: 4,
      description: "Services de production vidéo.",
    },
    {
      id: 44,
      name: "Vidéos explicatives",
      level: 2,
      parent_id: 4,
      description: "Création de vidéos explicatives et pédagogiques.",
    },
    {
      id: 45,
      name: "Vidéo d'IA",
      level: 2,
      parent_id: 4,
      description: "Création de vidéos utilisant l'intelligence artificielle.",
    },
    {
      id: 46,
      name: "Divers",
      level: 2,
      parent_id: 4,
      description: "Autres services liés à la vidéo et à l'animation.",
    },

    // Sous-catégories pour "Rédaction & Traduction"
    {
      id: 47,
      name: "Rédaction de contenu",
      level: 2,
      parent_id: 5,
      description: "Services de rédaction de contenu divers.",
    },
    {
      id: 48,
      name: "Révision et feedback",
      level: 2,
      parent_id: 5,
      description: "Services de relecture et de feedback sur les textes.",
    },
    {
      id: 49,
      name: "Publication de livres et ebooks",
      level: 2,
      parent_id: 5,
      description: "Services liés à la publication de livres et d'ebooks.",
    },
    {
      id: 50,
      name: "Personal branding",
      level: 2,
      parent_id: 5,
      description: "Services de rédaction pour le personal branding.",
    },
    {
      id: 51,
      name: "Divers",
      level: 2,
      parent_id: 5,
      description: "Autres services de rédaction et traduction.",
    },
    {
      id: 52,
      name: "Rédaction de contenu de ventes et marketing",
      level: 2,
      parent_id: 5,
      description: "Rédaction de contenu orienté ventes et marketing.",
    },
    {
      id: 53,
      name: "Traduction & Transcription",
      level: 2,
      parent_id: 5,
      description: "Services de traduction et de transcription.",
    },
    {
      id: 54,
      name: "Contenu spécifique à l'industrie",
      level: 2,
      parent_id: 5,
      description:
        "Rédaction de contenu spécialisé pour différentes industries.",
    },

    // Sous-catégories pour "Musique & Audio"
    {
      id: 55,
      name: "Production et composition musicale",
      level: 2,
      parent_id: 6,
      description: "Services de production et de composition musicale.",
    },
    {
      id: 56,
      name: "Ingénierie audio et post-production",
      level: 2,
      parent_id: 6,
      description: "Services d'ingénierie audio et de post-production sonore.",
    },
    {
      id: 57,
      name: "Voix off et narration",
      level: 2,
      parent_id: 6,
      description: "Services de voix off et de narration.",
    },
    {
      id: 58,
      name: "Streaming et audio",
      level: 2,
      parent_id: 6,
      description: "Services liés au streaming audio.",
    },
    {
      id: 59,
      name: "DJing",
      level: 2,
      parent_id: 6,
      description: "Services de DJ.",
    },
    {
      id: 60,
      name: "Sound design",
      level: 2,
      parent_id: 6,
      description: "Création de design sonore.",
    },
    {
      id: 61,
      name: "Cours et Transcriptions",
      level: 2,
      parent_id: 6,
      description: "Cours de musique et services de transcription musicale.",
    },

    // Sous-catégories pour "Business"
    {
      id: 62,
      name: "Gestion d'entreprises",
      level: 2,
      parent_id: 7,
      description: "Services de gestion et de conseil aux entreprises.",
    },
    {
      id: 63,
      name: "IA pour les entreprises",
      level: 2,
      parent_id: 7,
      description: "Applications de l'IA dans le monde des affaires.",
    },
    {
      id: 64,
      name: "Services juridiques",
      level: 2,
      parent_id: 7,
      description: "Services juridiques pour les entreprises.",
    },
    {
      id: 65,
      name: "Gestion e-commerce",
      level: 2,
      parent_id: 7,
      description: "Services de gestion pour le commerce électronique.",
    },
    {
      id: 66,
      name: "Data et veille économique",
      level: 2,
      parent_id: 7,
      description: "Services d'analyse de données et de veille économique.",
    },
    {
      id: 67,
      name: "Ventes et service client",
      level: 2,
      parent_id: 7,
      description: "Services liés aux ventes et au service client.",
    },
    {
      id: 68,
      name: "Général & Administratif",
      level: 2,
      parent_id: 7,
      description: "Services administratifs généraux.",
    },
    {
      id: 69,
      name: "Divers",
      level: 2,
      parent_id: 7,
      description: "Autres services liés au business.",
    },

    // Sous-catégories pour "Finance"
    {
      id: 70,
      name: "Services de comptabilité",
      level: 2,
      parent_id: 8,
      description: "Services de comptabilité pour particuliers et entreprises.",
    },
    {
      id: 71,
      name: "Finance d'entreprise",
      level: 2,
      parent_id: 8,
      description: "Services financiers pour les entreprises.",
    },
    {
      id: 72,
      name: "Analyse et planification financières",
      level: 2,
      parent_id: 8,
      description: "Services d'analyse et de planification financière.",
    },
    {
      id: 73,
      name: "Budget personnel et gestion du patrimoine",
      level: 2,
      parent_id: 8,
      description: "Services de gestion financière personnelle.",
    },
    {
      id: 74,
      name: "Collecte de fonds",
      level: 2,
      parent_id: 8,
      description: "Services liés à la collecte de fonds.",
    },

    // Sous-catégories pour "Services d'IA"
    {
      id: 75,
      name: "Développement de l'IA",
      level: 2,
      parent_id: 9,
      description: "Développement de solutions basées sur l'IA.",
    },
    {
      id: 76,
      name: "Data",
      level: 2,
      parent_id: 9,
      description: "Services de gestion et d'analyse de données pour l'IA.",
    },
    {
      id: 77,
      name: "Artistes en IA",
      level: 2,
      parent_id: 9,
      description: "Services artistiques utilisant l'IA.",
    },
    {
      id: 78,
      name: "IA pour les entreprises",
      level: 2,
      parent_id: 9,
      description: "Applications de l'IA dans le monde des affaires.",
    },
    {
      id: 79,
      name: "Vidéo d'IA",
      level: 2,
      parent_id: 9,
      description: "Services de création vidéo utilisant l'IA.",
    },
    {
      id: 80,
      name: "Audio par l'IA",
      level: 2,
      parent_id: 9,
      description: "Services audio utilisant l'IA.",
    },
    {
      id: 81,
      name: "Contenu de l'IA",
      level: 2,
      parent_id: 9,
      description: "Création de contenu assistée par l'IA.",
    },

    // Sous-catégories pour "Croissance personnelle"
    {
      id: 82,
      name: "Développement personnel",
      level: 2,
      parent_id: 10,
      description: "Services de coaching et de développement personnel.",
    },
    {
      id: 83,
      name: "Mode et style",
      level: 2,
      parent_id: 10,
      description: "Conseils en mode et style personnel.",
    },
    {
      id: 84,
      name: "Bien-être et fitness",
      level: 2,
      parent_id: 10,
      description: "Services liés au bien-être et à la forme physique.",
    },
    {
      id: 85,
      name: "Jeux vidéo",
      level: 2,
      parent_id: 10,
      description: "Services liés aux jeux vidéo.",
    },
    {
      id: 86,
      name: "Loisirs & Hobbies",
      level: 2,
      parent_id: 10,
      description: "Services liés aux loisirs et aux hobbies.",
    },
    {
      id: 87,
      name: "Divers",
      level: 2,
      parent_id: 10,
      description: "Autres services de croissance personnelle.",
    },

    // Sous-catégories pour "Consultations"
    {
      id: 88,
      name: "Conseillers d'entreprise",
      level: 2,
      parent_id: 11,
      description: "Services de conseil aux entreprises.",
    },
    {
      id: 89,
      name: "Stratégie marketing",
      level: 2,
      parent_id: 11,
      description: "Services de conseil en marketing.",
    },
    {
      id: 90,
      name: "Accompagnement et conseils",
      level: 2,
      parent_id: 11,
      description: "Services d'accompagnement et de conseil personnalisé.",
    },
    {
      id: 91,
      name: "Conseil en technologie",
      level: 2,
      parent_id: 11,
      description:
        "Services de conseil en technologies et solutions informatiques.",
    },
    {
      id: 92,
      name: "Mentorat",
      level: 2,
      parent_id: 11,
      description: "Services de mentorat dans divers domaines.",
    },

    // Sous-catégories pour "Photographie"
    {
      id: 93,
      name: "Produits et loisirs",
      level: 2,
      parent_id: 12,
      description:
        "Services de photographie de produits et d'activités de loisirs.",
    },
    {
      id: 94,
      name: "Personnes et scènes",
      level: 2,
      parent_id: 12,
      description: "Services de photographie de personnes et de scènes.",
    },
    {
      id: 95,
      name: "Photographies locales",
      level: 2,
      parent_id: 12,
      description:
        "Services de photographie spécifiques à certaines localités.",
    },
    {
      id: 96,
      name: "Divers",
      level: 2,
      parent_id: 12,
      description: "Autres services de photographie.",
    },

    // Niveau 3 pour "Logo et identité visuelle"
    {
      id: 97,
      name: "Design de logo",
      level: 3,
      parent_id: 13,
      description: "Création de logos uniques et mémorables.",
    },
    {
      id: 98,
      name: "Charte graphique",
      level: 3,
      parent_id: 13,
      description: "Développement de chartes graphiques complètes.",
    },
    {
      id: 99,
      name: "Cartes de visite et print",
      level: 3,
      parent_id: 13,
      description:
        "Conception de cartes de visite et autres supports imprimés.",
    },
    {
      id: 100,
      name: "Polices et typographie",
      level: 3,
      parent_id: 13,
      description: "Création et sélection de polices et typographies.",
    },
    {
      id: 101,
      name: "Outil de création de logo",
      level: 3,
      parent_id: 13,
      description: "Outils pour créer des logos personnalisés.",
    },

    // Niveau 3 pour "Art et illustration"
    {
      id: 102,
      name: "Illustrations",
      level: 3,
      parent_id: 14,
      description: "Création d'illustrations personnalisées.",
    },
    {
      id: 103,
      name: "Artistes en IA",
      level: 3,
      parent_id: 14,
      description: "Création artistique assistée par l'IA.",
    },
    {
      id: 104,
      name: "Avatar IA",
      level: 3,
      parent_id: 14,
      description: "Création d'avatars personnalisés avec l'IA.",
    },
    {
      id: 105,
      name: "Illustrations de livres pour enfants",
      level: 3,
      parent_id: 14,
      description: "Illustrations spécialisées pour livres jeunesse.",
    },
    {
      id: 106,
      name: "Portraits et caricatures",
      level: 3,
      parent_id: 14,
      description: "Création de portraits et caricatures personnalisés.",
    },
    {
      id: 107,
      name: "BD et comics",
      level: 3,
      parent_id: 14,
      description: "Création de bandes dessinées et comics.",
    },
    {
      id: 108,
      name: "Création de motifs",
      level: 3,
      parent_id: 14,
      description: "Conception de motifs répétitifs pour divers usages.",
    },
    {
      id: 109,
      name: "Dessin de tatouage",
      level: 3,
      parent_id: 14,
      description: "Création de designs de tatouages personnalisés.",
    },
    {
      id: 110,
      name: "Storyboards",
      level: 3,
      parent_id: 14,
      description: "Création de storyboards pour films et animations.",
    },
    {
      id: 111,
      name: "Art NFT",
      level: 3,
      parent_id: 14,
      description: "Création d'art numérique pour NFT.",
    },

    // Niveau 3 pour "Webdesign et mobile design"
    {
      id: 112,
      name: "Webdesign",
      level: 3,
      parent_id: 15,
      description: "Conception d'interfaces pour sites web.",
    },
    {
      id: 113,
      name: "Mobile design",
      level: 3,
      parent_id: 15,
      description: "Conception d'interfaces pour applications mobiles.",
    },
    {
      id: 114,
      name: "UX Design",
      level: 3,
      parent_id: 15,
      description: "Conception de l'expérience utilisateur.",
    },
    {
      id: 115,
      name: "Design de landing page",
      level: 3,
      parent_id: 15,
      description: "Conception de pages d'atterrissage efficaces.",
    },
    {
      id: 116,
      name: "Icônes et pictogrammes",
      level: 3,
      parent_id: 15,
      description: "Création d'icônes et pictogrammes personnalisés.",
    },

    // Niveau 3 pour "Produit & Gaming"
    {
      id: 117,
      name: "Conception industrielle & de produits",
      level: 3,
      parent_id: 16,
      description: "Design de produits industriels et de consommation.",
    },
    {
      id: 118,
      name: "Modélisation de personnage 3D",
      level: 3,
      parent_id: 16,
      description: "Création de personnages 3D pour jeux et animations.",
    },
    {
      id: 119,
      name: "Game Art",
      level: 3,
      parent_id: 16,
      description: "Création d'art pour jeux vidéo.",
    },
    {
      id: 120,
      name: "Graphisme pour streamers",
      level: 3,
      parent_id: 16,
      description:
        "Création de visuels pour streamers et créateurs de contenu.",
    },

    // Niveau 3 pour "Design d'impression"
    {
      id: 121,
      name: "Flyer",
      level: 3,
      parent_id: 17,
      description: "Conception de flyers promotionnels.",
    },
    {
      id: 122,
      name: "Brochure",
      level: 3,
      parent_id: 17,
      description: "Conception de brochures informatives.",
    },
    {
      id: 123,
      name: "Affiche",
      level: 3,
      parent_id: 17,
      description: "Création d'affiches percutantes.",
    },
    {
      id: 124,
      name: "Conception de catalogue",
      level: 3,
      parent_id: 17,
      description: "Design de catalogues de produits.",
    },
    {
      id: 125,
      name: "Menu",
      level: 3,
      parent_id: 17,
      description: "Conception de menus pour restaurants.",
    },

    // Niveau 3 pour "Design visuel"
    {
      id: 126,
      name: "Retouche d'image",
      level: 3,
      parent_id: 18,
      description: "Services de retouche et d'amélioration d'images.",
    },
    {
      id: 127,
      name: "Traitement d'images par IA",
      level: 3,
      parent_id: 18,
      description: "Retouche et amélioration d'images assistées par l'IA.",
    },
    {
      id: 128,
      name: "Support de présentation",
      level: 3,
      parent_id: 18,
      description: "Création de supports visuels pour présentations.",
    },
    {
      id: 129,
      name: "Suppression de l'arrière-plan",
      level: 3,
      parent_id: 18,
      description: "Suppression professionnelle d'arrière-plans d'images.",
    },
    {
      id: 130,
      name: "Infographie",
      level: 3,
      parent_id: 18,
      description: "Création d'infographies informatives et attrayantes.",
    },
    {
      id: 131,
      name: "Tracé vectoriel",
      level: 3,
      parent_id: 18,
      description: "Conversion d'images en graphiques vectoriels.",
    },
    {
      id: 132,
      name: "Mise en page de CV",
      level: 3,
      parent_id: 18,
      description: "Conception de CV visuellement attrayants.",
    },

    // Niveau 3 pour "Conception marketing"
    {
      id: 133,
      name: "Design pour réseaux sociaux",
      level: 3,
      parent_id: 19,
      description: "Création de visuels pour les réseaux sociaux.",
    },
    {
      id: 134,
      name: "Publications et bannières sociales",
      level: 3,
      parent_id: 19,
      description:
        "Conception de publications et bannières pour médias sociaux.",
    },
    {
      id: 135,
      name: "Design d'e-mail",
      level: 3,
      parent_id: 19,
      description: "Création de designs pour campagnes e-mail.",
    },
    {
      id: 136,
      name: "Bannières web",
      level: 3,
      parent_id: 19,
      description: "Conception de bannières publicitaires pour le web.",
    },
    {
      id: 137,
      name: "Signalétique",
      level: 3,
      parent_id: 19,
      description: "Création de signalétique pour entreprises et événements.",
    },

    // Niveau 3 pour "Packaging & Couvertures"
    {
      id: 138,
      name: "Emballage & Conception d'étiquettes",
      level: 3,
      parent_id: 20,
      description: "Design d'emballages et d'étiquettes de produits.",
    },

    // Niveau 3 pour "Architecture et conception de bâtiments"
    {
      id: 139,
      name: "Architecture & Design d'intérieur",
      level: 3,
      parent_id: 21,
      description: "Services d'architecture et de design d'intérieur.",
    },
    {
      id: 140,
      name: "Aménagement paysager",
      level: 3,
      parent_id: 21,
      description: "Conception d'aménagements paysagers.",
    },
    {
      id: 141,
      name: "Génie civil",
      level: 3,
      parent_id: 21,
      description: "Services de génie civil pour la construction.",
    },

    // Niveau 3 pour "Mode et goodies"
    {
      id: 142,
      name: "T-shirts et goodies",
      level: 3,
      parent_id: 22,
      description: "Conception de t-shirts et d'objets promotionnels.",
    },
    {
      id: 143,
      name: "Stylisme",
      level: 3,
      parent_id: 22,
      description: "Services de stylisme et de conseil en mode.",
    },
    {
      id: 144,
      name: "Création de bijoux",
      level: 3,
      parent_id: 22,
      description: "Conception de bijoux personnalisés.",
    },

    // Niveau 3 pour "3D design"
    {
      id: 145,
      name: "Architecture 3D",
      level: 3,
      parent_id: 23,
      description: "Modélisation 3D pour l'architecture.",
    },
    {
      id: 146,
      name: "Design industriel",
      level: 3,
      parent_id: 23,
      description: "Conception 3D pour le design industriel.",
    },
    {
      id: 147,
      name: "Design textile",
      level: 3,
      parent_id: 23,
      description: "Conception 3D pour l'industrie textile.",
    },
    {
      id: 148,
      name: "Impression 3D de personnages",
      level: 3,
      parent_id: 23,
      description: "Modélisation 3D de personnages pour l'impression.",
    },
    {
      id: 149,
      name: "Paysage en 3D",
      level: 3,
      parent_id: 23,
      description: "Création de paysages en 3D.",
    },
    {
      id: 150,
      name: "Game Art 3D",
      level: 3,
      parent_id: 23,
      description: "Création d'art 3D pour jeux vidéo.",
    },
    {
      id: 151,
      name: "Création de bijoux 3D",
      level: 3,
      parent_id: 23,
      description: "Conception 3D de bijoux.",
    },

    // Niveau 3 pour "Développement de sites web"
    {
      id: 152,
      name: "Sites web d'entreprises",
      level: 3,
      parent_id: 24,
      description: "Création de sites web professionnels pour entreprises.",
    },
    {
      id: 153,
      name: "Développement e-commerce",
      level: 3,
      parent_id: 24,
      description: "Création de boutiques en ligne.",
    },
    {
      id: 154,
      name: "Landing pages",
      level: 3,
      parent_id: 24,
      description: "Développement de pages d'atterrissage efficaces.",
    },
    {
      id: 155,
      name: "Sites web de dropshipping",
      level: 3,
      parent_id: 24,
      description: "Création de sites web pour le dropshipping.",
    },
    {
      id: 156,
      name: "Créer un site web complet",
      level: 3,
      parent_id: 24,
      description: "Développement de sites web de A à Z.",
    },
    {
      id: 157,
      name: "Plateformes web",
      level: 3,
      parent_id: 24,
      description: "Création de plateformes web personnalisées.",
    },
    {
      id: 158,
      name: "WordPress",
      level: 3,
      parent_id: 24,
      description: "Développement de sites WordPress.",
    },
    {
      id: 159,
      name: "Shopify",
      level: 3,
      parent_id: 24,
      description: "Création de boutiques en ligne avec Shopify.",
    },
    {
      id: 160,
      name: "Wix",
      level: 3,
      parent_id: 24,
      description: "Développement de sites web avec Wix.",
    },
    {
      id: 161,
      name: "Sites web personnalisés",
      level: 3,
      parent_id: 24,
      description: "Création de sites web sur mesure.",
    },
    {
      id: 162,
      name: "GoDaddy",
      level: 3,
      parent_id: 24,
      description: "Développement de sites web avec GoDaddy.",
    },
    {
      id: 163,
      name: "Maintenance de site web",
      level: 3,
      parent_id: 24,
      description: "Services de maintenance et mise à jour de sites web.",
    },
    {
      id: 164,
      name: "Personnalisation du site internet",
      level: 3,
      parent_id: 24,
      description: "Personnalisation avancée de sites web existants.",
    },
    {
      id: 165,
      name: "Correction de bugs",
      level: 3,
      parent_id: 24,
      description: "Identification et correction de bugs sur les sites web.",
    },
    {
      id: 166,
      name: "Sauvegarde et migration",
      level: 3,
      parent_id: 24,
      description: "Services de sauvegarde et migration de sites web.",
    },
    {
      id: 167,
      name: "Optimisation de la vitesse",
      level: 3,
      parent_id: 24,
      description: "Amélioration des performances des sites web.",
    },

    // Niveau 3 pour "Développement de l'IA"
    {
      id: 168,
      name: "Chatbots d'IA",
      level: 3,
      parent_id: 25,
      description: "Développement de chatbots intelligents.",
    },
    {
      id: 169,
      name: "Applications d'IA",
      level: 3,
      parent_id: 25,
      description: "Création d'applications basées sur l'IA.",
    },
    {
      id: 170,
      name: "Intégrations IA",
      level: 3,
      parent_id: 25,
      description: "Intégration de solutions d'IA dans des systèmes existants.",
    },
    {
      id: 171,
      name: "Agents intelligents",
      level: 3,
      parent_id: 25,
      description: "Développement d'agents intelligents pour diverses tâches.",
    },
    {
      id: 172,
      name: "Mise au point de l'IA",
      level: 3,
      parent_id: 25,
      description: "Optimisation et mise au point de modèles d'IA.",
    },

    // Niveau 3 pour "Développement de chatbots"
    {
      id: 173,
      name: "Chatbots pour le service client",
      level: 3,
      parent_id: 26,
      description: "Création de chatbots pour l'assistance clientèle.",
    },
    {
      id: 174,
      name: "Chatbots de vente",
      level: 3,
      parent_id: 26,
      description: "Développement de chatbots pour augmenter les ventes.",
    },
    {
      id: 175,
      name: "Chatbots pour les réseaux sociaux",
      level: 3,
      parent_id: 26,
      description: "Création de chatbots pour les plateformes sociales.",
    },

    // Niveau 3 pour "Développement de jeux"
    {
      id: 176,
      name: "Jeux mobiles",
      level: 3,
      parent_id: 27,
      description: "Développement de jeux pour smartphones et tablettes.",
    },
    {
      id: 177,
      name: "Jeux PC",
      level: 3,
      parent_id: 27,
      description: "Création de jeux pour ordinateurs personnels.",
    },
    {
      id: 178,
      name: "Jeux AR/VR",
      level: 3,
      parent_id: 27,
      description: "Développement de jeux en réalité augmentée et virtuelle.",
    },
    {
      id: 179,
      name: "HTML5 Games",
      level: 3,
      parent_id: 27,
      description: "Création de jeux en HTML5 pour navigateurs web.",
    },

    // Niveau 3 pour "Développement d'applications mobiles"
    {
      id: 180,
      name: "Applications iOS",
      level: 3,
      parent_id: 28,
      description: "Développement d'applications pour iOS.",
    },
    {
      id: 181,
      name: "Applications Android",
      level: 3,
      parent_id: 28,
      description: "Création d'applications pour Android.",
    },
    {
      id: 182,
      name: "Applications cross-platform",
      level: 3,
      parent_id: 28,
      description: "Développement d'applications multi-plateformes.",
    },
    {
      id: 183,
      name: "Applications AR/VR",
      level: 3,
      parent_id: 28,
      description: "Création d'applications en réalité augmentée et virtuelle.",
    },

    // Niveau 3 pour "Cloud et cybersécurité"
    {
      id: 184,
      name: "Services cloud",
      level: 3,
      parent_id: 29,
      description: "Implémentation et gestion de services cloud.",
    },
    {
      id: 185,
      name: "Sécurité des applications",
      level: 3,
      parent_id: 29,
      description: "Sécurisation d'applications web et mobiles.",
    },
    {
      id: 186,
      name: "Tests de pénétration",
      level: 3,
      parent_id: 29,
      description: "Réalisation de tests de sécurité et de pénétration.",
    },
    {
      id: 187,
      name: "Gestion des identités",
      level: 3,
      parent_id: 29,
      description: "Mise en place de systèmes de gestion des identités.",
    },

    // Niveau 3 pour "Data Science & ML"
    {
      id: 188,
      name: "Analyse de données",
      level: 3,
      parent_id: 30,
      description: "Analyse approfondie de données pour en tirer des insights.",
    },
    {
      id: 189,
      name: "Machine Learning",
      level: 3,
      parent_id: 30,
      description: "Développement de modèles de machine learning.",
    },
    {
      id: 190,
      name: "Deep Learning",
      level: 3,
      parent_id: 30,
      description: "Création de réseaux de neurones profonds.",
    },
    {
      id: 191,
      name: "NLP",
      level: 3,
      parent_id: 30,
      description: "Traitement du langage naturel.",
    },

    // Niveau 3 pour "Développement de logiciels"
    {
      id: 192,
      name: "Applications de bureau",
      level: 3,
      parent_id: 31,
      description: "Développement d'applications pour ordinateurs de bureau.",
    },
    {
      id: 193,
      name: "Logiciels embarqués",
      level: 3,
      parent_id: 31,
      description: "Création de logiciels pour systèmes embarqués.",
    },
    {
      id: 194,
      name: "Logiciels d'entreprise",
      level: 3,
      parent_id: 31,
      description: "Développement de solutions logicielles pour entreprises.",
    },
    {
      id: 195,
      name: "Intégration de systèmes",
      level: 3,
      parent_id: 31,
      description: "Intégration de différents systèmes logiciels.",
    },

    // Niveau 3 pour "Blockchain et cryptomonnaies"
    {
      id: 196,
      name: "Smart Contracts",
      level: 3,
      parent_id: 32,
      description: "Développement de contrats intelligents.",
    },
    {
      id: 197,
      name: "DApps",
      level: 3,
      parent_id: 32,
      description: "Création d'applications décentralisées.",
    },
    {
      id: 198,
      name: "Tokens et ICO",
      level: 3,
      parent_id: 32,
      description: "Développement de tokens et gestion d'ICO.",
    },
    {
      id: 199,
      name: "Wallets",
      level: 3,
      parent_id: 32,
      description: "Création de portefeuilles pour cryptomonnaies.",
    },

    // Niveau 3 pour "Divers" (Programmation & Tech)
    {
      id: 200,
      name: "Scripts et automatisation",
      level: 3,
      parent_id: 33,
      description: "Création de scripts et automatisation de tâches.",
    },
    {
      id: 201,
      name: "Conversion de fichiers",
      level: 3,
      parent_id: 33,
      description:
        "Services de conversion entre différents formats de fichiers.",
    },
    {
      id: 202,
      name: "Développement de plugins",
      level: 3,
      parent_id: 33,
      description:
        "Création de plugins et extensions pour diverses plateformes.",
    },

    // Niveau 3 pour "Référencement"
    {
      id: 203,
      name: "SEO on-page",
      level: 3,
      parent_id: 34,
      description: "Optimisation du contenu et de la structure des pages web.",
    },
    {
      id: 204,
      name: "SEO off-page",
      level: 3,
      parent_id: 34,
      description: "Stratégies de création de liens et de présence en ligne.",
    },
    {
      id: 205,
      name: "SEO local",
      level: 3,
      parent_id: 34,
      description: "Optimisation pour les recherches locales.",
    },
    {
      id: 206,
      name: "SEO technique",
      level: 3,
      parent_id: 34,
      description:
        "Optimisation technique des sites web pour les moteurs de recherche.",
    },

    // Niveau 3 pour "Réseaux sociaux"
    {
      id: 207,
      name: "Gestion de réseaux sociaux",
      level: 3,
      parent_id: 35,
      description: "Gestion et animation de comptes sur les réseaux sociaux.",
    },
    {
      id: 208,
      name: "Publicité sur les réseaux sociaux",
      level: 3,
      parent_id: 35,
      description:
        "Création et gestion de campagnes publicitaires sur les réseaux sociaux.",
    },
    {
      id: 209,
      name: "Stratégie de contenu",
      level: 3,
      parent_id: 35,
      description:
        "Élaboration de stratégies de contenu pour les réseaux sociaux.",
    },
    {
      id: 210,
      name: "Analyse des médias sociaux",
      level: 3,
      parent_id: 35,
      description:
        "Analyse des performances et des tendances sur les réseaux sociaux.",
    },

    // Niveau 3 pour "Méthodes & Techniques"
    {
      id: 211,
      name: "Marketing par e-mail",
      level: 3,
      parent_id: 36,
      description: "Création et gestion de campagnes de marketing par e-mail.",
    },
    {
      id: 212,
      name: "Marketing de contenu",
      level: 3,
      parent_id: 36,
      description:
        "Stratégies de création et de diffusion de contenu marketing.",
    },
    {
      id: 213,
      name: "Marketing d'affiliation",
      level: 3,
      parent_id: 36,
      description: "Mise en place et gestion de programmes d'affiliation.",
    },
    {
      id: 214,
      name: "Marketing d'influence",
      level: 3,
      parent_id: 36,
      description:
        "Collaboration avec des influenceurs pour promouvoir des produits ou services.",
    },

    // Niveau 3 pour "Analyses et stratégie"
    {
      id: 215,
      name: "Analyse de données marketing",
      level: 3,
      parent_id: 37,
      description:
        "Analyse des données pour optimiser les stratégies marketing.",
    },
    {
      id: 216,
      name: "Planification de campagnes",
      level: 3,
      parent_id: 37,
      description: "Élaboration de plans de campagnes marketing.",
    },
    {
      id: 217,
      name: "Tests A/B",
      level: 3,
      parent_id: 37,
      description:
        "Réalisation de tests A/B pour optimiser les performances marketing.",
    },
    {
      id: 218,
      name: "Études de marché",
      level: 3,
      parent_id: 37,
      description:
        "Conduite d'études de marché pour guider les stratégies marketing.",
    },

    // Niveau 3 pour "Spécifique à la chaîne"
    {
      id: 219,
      name: "Marketing YouTube",
      level: 3,
      parent_id: 38,
      description: "Stratégies de marketing spécifiques à YouTube.",
    },
    {
      id: 220,
      name: "Marketing Instagram",
      level: 3,
      parent_id: 38,
      description: "Techniques de marketing adaptées à Instagram.",
    },
    {
      id: 221,
      name: "Marketing TikTok",
      level: 3,
      parent_id: 38,
      description: "Stratégies de marketing pour TikTok.",
    },
    {
      id: 222,
      name: "Marketing LinkedIn",
      level: 3,
      parent_id: 38,
      description: "Marketing B2B sur LinkedIn.",
    },

    // Niveau 3 pour "Spécifique à un secteur ou objectif"
    {
      id: 223,
      name: "Marketing B2B",
      level: 3,
      parent_id: 39,
      description: "Stratégies marketing pour les entreprises B2B.",
    },
    {
      id: 224,
      name: "Marketing e-commerce",
      level: 3,
      parent_id: 39,
      description: "Techniques de marketing spécifiques au e-commerce.",
    },
    {
      id: 225,
      name: "Marketing local",
      level: 3,
      parent_id: 39,
      description: "Stratégies de marketing pour les entreprises locales.",
    },
    {
      id: 226,
      name: "Marketing mobile",
      level: 3,
      parent_id: 39,
      description: "Techniques de marketing adaptées aux appareils mobiles.",
    },

    // Niveau 3 pour "Divers" (Marketing digital)
    {
      id: 227,
      name: "Copywriting",
      level: 3,
      parent_id: 40,
      description: "Rédaction de textes persuasifs pour le marketing.",
    },
    {
      id: 228,
      name: "Branding",
      level: 3,
      parent_id: 40,
      description: "Développement et gestion de l'image de marque.",
    },
    {
      id: 229,
      name: "Marketing de podcast",
      level: 3,
      parent_id: 40,
      description: "Stratégies de marketing pour les podcasts.",
    },
    {
      id: 230,
      name: "Marketing de croissance",
      level: 3,
      parent_id: 40,
      description:
        "Techniques de growth hacking et de marketing de croissance.",
    },

    // Niveau 3 pour "Édition et post-production"
    {
      id: 231,
      name: "Montage vidéo",
      level: 3,
      parent_id: 41,
      description: "Services de montage et d'édition vidéo.",
    },
    {
      id: 232,
      name: "Correction des couleurs",
      level: 3,
      parent_id: 41,
      description: "Étalonnage et correction des couleurs pour vidéos.",
    },
    {
      id: 233,
      name: "Effets visuels",
      level: 3,
      parent_id: 41,
      description: "Création d'effets visuels pour vidéos.",
    },
    {
      id: 234,
      name: "Sous-titrage",
      level: 3,
      parent_id: 41,
      description: "Ajout de sous-titres et de captions aux vidéos.",
    },

    // Niveau 3 pour "Animation"
    {
      id: 235,
      name: "Animation 2D",
      level: 3,
      parent_id: 42,
      description: "Création d'animations en deux dimensions.",
    },
    {
      id: 236,
      name: "Animation 3D",
      level: 3,
      parent_id: 42,
      description: "Production d'animations en trois dimensions.",
    },
    {
      id: 237,
      name: "Motion graphics",
      level: 3,
      parent_id: 42,
      description: "Création de graphiques animés.",
    },
    {
      id: 238,
      name: "Stop motion",
      level: 3,
      parent_id: 42,
      description: "Réalisation d'animations en stop motion.",
    },

    // Niveau 3 pour "Production audiovisuelle"
    {
      id: 239,
      name: "Réalisation",
      level: 3,
      parent_id: 43,
      description: "Services de réalisation de vidéos.",
    },
    {
      id: 240,
      name: "Prise de vue",
      level: 3,
      parent_id: 43,
      description: "Services de captation vidéo.",
    },
    {
      id: 241,
      name: "Production",
      level: 3,
      parent_id: 43,
      description: "Gestion de la production audiovisuelle.",
    },
    {
      id: 242,
      name: "Scénarisation",
      level: 3,
      parent_id: 43,
      description: "Écriture de scénarios pour productions vidéo.",
    },

    // Niveau 3 pour "Vidéos explicatives"
    {
      id: 243,
      name: "Vidéos explicatives animées",
      level: 3,
      parent_id: 44,
      description: "Création de vidéos explicatives avec animations.",
    },
    {
      id: 244,
      name: "Whiteboard animations",
      level: 3,
      parent_id: 44,
      description: "Réalisation d'animations sur tableau blanc.",
    },
    {
      id: 245,
      name: "Vidéos de formation",
      level: 3,
      parent_id: 44,
      description: "Production de vidéos éducatives et de formation.",
    },
    {
      id: 246,
      name: "Tutoriels vidéo",
      level: 3,
      parent_id: 44,
      description: "Création de tutoriels vidéo étape par étape.",
    },

    // Niveau 3 pour "Vidéo d'IA"
    {
      id: 247,
      name: "Génération de vidéos par IA",
      level: 3,
      parent_id: 45,
      description:
        "Création de vidéos assistée par l'intelligence artificielle.",
    },
    {
      id: 248,
      name: "Édition vidéo par IA",
      level: 3,
      parent_id: 45,
      description: "Utilisation de l'IA pour l'édition et le montage vidéo.",
    },
    {
      id: 249,
      name: "Amélioration vidéo par IA",
      level: 3,
      parent_id: 45,
      description: "Amélioration de la qualité vidéo grâce à l'IA.",
    },
    {
      id: 250,
      name: "Analyse vidéo par IA",
      level: 3,
      parent_id: 45,
      description: "Analyse du contenu vidéo par intelligence artificielle.",
    },

    // Niveau 3 pour "Divers" (Vidéo & Animation)
    {
      id: 251,
      name: "Intros et outros",
      level: 3,
      parent_id: 46,
      description: "Création d'introductions et de conclusions vidéo.",
    },
    {
      id: 252,
      name: "Conversion de formats vidéo",
      level: 3,
      parent_id: 46,
      description: "Services de conversion entre différents formats vidéo.",
    },

    {
      id: 253,
      name: "Restauration vidéo",
      level: 3,
      parent_id: 46,
      description:
        "Services de restauration de vidéos anciennes ou endommagées.",
    },
    {
      id: 254,
      name: "Création de lyric videos",
      level: 3,
      parent_id: 46,
      description: "Production de vidéos avec paroles pour chansons.",
    },

    // Niveau 3 pour "Rédaction de contenu"
    {
      id: 255,
      name: "Articles de blog",
      level: 3,
      parent_id: 47,
      description: "Rédaction d'articles de blog engageants.",
    },
    {
      id: 256,
      name: "Descriptions de produits",
      level: 3,
      parent_id: 47,
      description: "Écriture de descriptions de produits convaincantes.",
    },
    {
      id: 257,
      name: "Rédaction SEO",
      level: 3,
      parent_id: 47,
      description:
        "Création de contenu optimisé pour les moteurs de recherche.",
    },
    {
      id: 258,
      name: "Rédaction technique",
      level: 3,
      parent_id: 47,
      description: "Rédaction de documents techniques et manuels.",
    },

    // Niveau 3 pour "Révision et feedback"
    {
      id: 259,
      name: "Relecture et correction",
      level: 3,
      parent_id: 48,
      description: "Services de relecture et de correction de textes.",
    },
    {
      id: 260,
      name: "Édition de contenu",
      level: 3,
      parent_id: 48,
      description: "Édition et amélioration de contenu existant.",
    },
    {
      id: 261,
      name: "Feedback sur le contenu",
      level: 3,
      parent_id: 48,
      description: "Fourniture de feedback constructif sur le contenu.",
    },
    {
      id: 262,
      name: "Vérification des faits",
      level: 3,
      parent_id: 48,
      description:
        "Vérification de l'exactitude des informations dans le contenu.",
    },

    // Niveau 3 pour "Publication de livres et ebooks"
    {
      id: 263,
      name: "Écriture de livres",
      level: 3,
      parent_id: 49,
      description: "Services d'écriture de livres complets.",
    },
    {
      id: 264,
      name: "Édition de livres",
      level: 3,
      parent_id: 49,
      description: "Services d'édition et de révision de livres.",
    },
    {
      id: 265,
      name: "Formatage d'ebooks",
      level: 3,
      parent_id: 49,
      description: "Mise en forme et formatage d'ebooks.",
    },
    {
      id: 266,
      name: "Conception de couvertures de livres",
      level: 3,
      parent_id: 49,
      description: "Création de couvertures attrayantes pour livres et ebooks.",
    },

    // Niveau 3 pour "Personal branding"
    {
      id: 267,
      name: "Biographies professionnelles",
      level: 3,
      parent_id: 50,
      description: "Rédaction de biographies pour le personal branding.",
    },
    {
      id: 268,
      name: "Profils LinkedIn",
      level: 3,
      parent_id: 50,
      description: "Optimisation de profils LinkedIn.",
    },
    {
      id: 269,
      name: "Déclarations de mission personnelle",
      level: 3,
      parent_id: 50,
      description: "Rédaction de déclarations de mission personnelle.",
    },
    {
      id: 270,
      name: "Storytelling personnel",
      level: 3,
      parent_id: 50,
      description: "Création de récits personnels pour le branding.",
    },

    // Niveau 3 pour "Divers" (Rédaction & Traduction)
    {
      id: 271,
      name: "Transcription",
      level: 3,
      parent_id: 51,
      description: "Services de transcription audio et vidéo.",
    },
    {
      id: 272,
      name: "Rédaction de discours",
      level: 3,
      parent_id: 51,
      description: "Écriture de discours percutants.",
    },
    {
      id: 273,
      name: "Rédaction UX",
      level: 3,
      parent_id: 51,
      description: "Rédaction de contenu pour l'expérience utilisateur.",
    },
    {
      id: 274,
      name: "Rédaction créative",
      level: 3,
      parent_id: 51,
      description: "Services de rédaction créative pour divers projets.",
    },

    // Niveau 3 pour "Rédaction de contenu de ventes et marketing"
    {
      id: 275,
      name: "Copywriting publicitaire",
      level: 3,
      parent_id: 52,
      description: "Rédaction de textes publicitaires percutants.",
    },
    {
      id: 276,
      name: "Rédaction de pages de vente",
      level: 3,
      parent_id: 52,
      description: "Création de pages de vente convaincantes.",
    },
    {
      id: 277,
      name: "Rédaction d'e-mails marketing",
      level: 3,
      parent_id: 52,
      description: "Écriture d'e-mails marketing efficaces.",
    },
    {
      id: 278,
      name: "Scripts de vente",
      level: 3,
      parent_id: 52,
      description: "Rédaction de scripts pour les équipes de vente.",
    },

    // Niveau 3 pour "Traduction & Transcription"
    {
      id: 279,
      name: "Traduction générale",
      level: 3,
      parent_id: 53,
      description: "Services de traduction pour divers types de documents.",
    },
    {
      id: 280,
      name: "Traduction technique",
      level: 3,
      parent_id: 53,
      description: "Traduction de documents techniques et spécialisés.",
    },
    {
      id: 281,
      name: "Traduction juridique",
      level: 3,
      parent_id: 53,
      description: "Traduction de documents juridiques.",
    },
    {
      id: 282,
      name: "Localisation",
      level: 3,
      parent_id: 53,
      description: "Adaptation de contenu pour des marchés spécifiques.",
    },

    // Niveau 3 pour "Contenu spécifique à l'industrie"
    {
      id: 283,
      name: "Contenu médical",
      level: 3,
      parent_id: 54,
      description: "Rédaction de contenu pour l'industrie médicale.",
    },
    {
      id: 284,
      name: "Contenu financier",
      level: 3,
      parent_id: 54,
      description: "Création de contenu pour le secteur financier.",
    },
    {
      id: 285,
      name: "Contenu technologique",
      level: 3,
      parent_id: 54,
      description: "Rédaction de contenu sur les technologies.",
    },
    {
      id: 286,
      name: "Contenu éducatif",
      level: 3,
      parent_id: 54,
      description: "Création de contenu pour le secteur de l'éducation.",
    },

    // Niveau 3 pour "Production et composition musicale"
    {
      id: 287,
      name: "Composition de musique originale",
      level: 3,
      parent_id: 55,
      description: "Création de compositions musicales originales.",
    },
    {
      id: 288,
      name: "Production de beats",
      level: 3,
      parent_id: 55,
      description: "Production de beats pour divers genres musicaux.",
    },
    {
      id: 289,
      name: "Arrangement musical",
      level: 3,
      parent_id: 55,
      description: "Services d'arrangement musical.",
    },
    {
      id: 290,
      name: "Jingles et musique publicitaire",
      level: 3,
      parent_id: 55,
      description: "Création de jingles et de musique pour la publicité.",
    },

    // Niveau 3 pour "Ingénierie audio et post-production"
    {
      id: 291,
      name: "Mixage audio",
      level: 3,
      parent_id: 56,
      description: "Services de mixage audio professionnel.",
    },
    {
      id: 292,
      name: "Mastering",
      level: 3,
      parent_id: 56,
      description:
        "Mastering audio pour obtenir un son de qualité professionnelle.",
    },
    {
      id: 293,
      name: "Restauration audio",
      level: 3,
      parent_id: 56,
      description:
        "Restauration d'enregistrements audio anciens ou endommagés.",
    },
    {
      id: 294,
      name: "Sound design",
      level: 3,
      parent_id: 56,
      description: "Création d'effets sonores et de design sonore.",
    },

    // Niveau 3 pour "Voix off et narration"
    {
      id: 295,
      name: "Voix off commerciale",
      level: 3,
      parent_id: 57,
      description: "Services de voix off pour publicités et présentations.",
    },
    {
      id: 296,
      name: "Narration de livres audio",
      level: 3,
      parent_id: 57,
      description: "Narration professionnelle pour livres audio.",
    },
    {
      id: 297,
      name: "Voix off e-learning",
      level: 3,
      parent_id: 57,
      description: "Voix off pour contenus éducatifs et formations en ligne.",
    },
    {
      id: 298,
      name: "Doublage",
      level: 3,
      parent_id: 57,
      description: "Services de doublage pour films et séries.",
    },

    // Niveau 3 pour "Streaming et audio"
    {
      id: 299,
      name: "Production de podcasts",
      level: 3,
      parent_id: 58,
      description: "Services de production et d'édition de podcasts.",
    },
    {
      id: 300,
      name: "Montage audio pour streaming",
      level: 3,
      parent_id: 58,
      description: "Édition audio pour plateformes de streaming.",
    },
    {
      id: 301,
      name: "Création d'intros/outros pour podcasts",
      level: 3,
      parent_id: 58,
      description: "Création d'introductions et de conclusions pour podcasts.",
    },
    {
      id: 302,
      name: "Optimisation audio pour le streaming",
      level: 3,
      parent_id: 58,
      description:
        "Optimisation de la qualité audio pour le streaming en direct.",
    },

    // Niveau 3 pour "DJing"
    {
      id: 303,
      name: "Mix DJ personnalisé",
      level: 3,
      parent_id: 59,
      description: "Création de mix DJ sur mesure.",
    },
    {
      id: 304,
      name: "Remix et mashups",
      level: 3,
      parent_id: 59,
      description: "Création de remixes et de mashups musicaux.",
    },
    {
      id: 305,
      name: "DJ pour événements virtuels",
      level: 3,
      parent_id: 59,
      description: "Services de DJ pour événements en ligne.",
    },
    {
      id: 306,
      name: "Production de sets DJ",
      level: 3,
      parent_id: 59,
      description: "Production de sets DJ enregistrés.",
    },

    // Niveau 3 pour "Sound design"
    {
      id: 307,
      name: "Sound design pour jeux vidéo",
      level: 3,
      parent_id: 60,
      description: "Création d'effets sonores pour jeux vidéo.",
    },
    {
      id: 308,
      name: "Sound design pour films",
      level: 3,
      parent_id: 60,
      description: "Conception sonore pour productions cinématographiques.",
    },
    {
      id: 309,
      name: "Ambiances sonores",
      level: 3,
      parent_id: 60,
      description: "Création d'ambiances sonores pour divers médias.",
    },
    {
      id: 310,
      name: "Sound design pour applications",
      level: 3,
      parent_id: 60,
      description: "Conception sonore pour applications mobiles et logiciels.",
    },

    // Niveau 3 pour "Cours et Transcriptions"
    {
      id: 311,
      name: "Cours de musique en ligne",
      level: 3,
      parent_id: 61,
      description: "Enseignement musical en ligne.",
    },
    {
      id: 312,
      name: "Transcription de partitions",
      level: 3,
      parent_id: 61,
      description: "Services de transcription musicale.",
    },
    {
      id: 313,
      name: "Cours de production musicale",
      level: 3,
      parent_id: 61,
      description: "Formation en production et ingénierie du son.",
    },
    {
      id: 314,
      name: "Transcription d'accords",
      level: 3,
      parent_id: 61,
      description: "Transcription d'accords pour chansons.",
    },

    // Niveau 3 pour "Gestion d'entreprises"
    {
      id: 315,
      name: "Planification stratégique",
      level: 3,
      parent_id: 62,
      description: "Élaboration de plans stratégiques pour entreprises.",
    },
    {
      id: 316,
      name: "Gestion de projet",
      level: 3,
      parent_id: 62,
      description: "Services de gestion de projets d'entreprise.",
    },
    {
      id: 317,
      name: "Conseil en organisation",
      level: 3,
      parent_id: 62,
      description: "Conseil en organisation et optimisation des processus.",
    },
    {
      id: 318,
      name: "Gestion des ressources humaines",
      level: 3,
      parent_id: 62,
      description: "Services de gestion des ressources humaines.",
    },

    // Niveau 3 pour "IA pour les entreprises"
    {
      id: 319,
      name: "Automatisation des processus",
      level: 3,
      parent_id: 63,
      description: "Automatisation des processus d'entreprise par l'IA.",
    },
    {
      id: 320,
      name: "Analyse prédictive",
      level: 3,
      parent_id: 63,
      description:
        "Utilisation de l'IA pour l'analyse prédictive en entreprise.",
    },
    {
      id: 321,
      name: "Chatbots d'entreprise",
      level: 3,
      parent_id: 63,
      description: "Implémentation de chatbots IA pour les entreprises.",
    },
    {
      id: 322,
      name: "IA pour la prise de décision",
      level: 3,
      parent_id: 63,
      description: "Utilisation de l'IA pour améliorer la prise de décision.",
    },

    // Niveau 3 pour "Services juridiques"
    {
      id: 323,
      name: "Rédaction de contrats",
      level: 3,
      parent_id: 64,
      description: "Services de rédaction et révision de contrats.",
    },
    {
      id: 324,
      name: "Conseil juridique",
      level: 3,
      parent_id: 64,
      description: "Services de conseil juridique pour entreprises.",
    },
    {
      id: 325,
      name: "Propriété intellectuelle",
      level: 3,
      parent_id: 64,
      description: "Gestion de la propriété intellectuelle.",
    },
    {
      id: 326,
      name: "Conformité réglementaire",
      level: 3,
      parent_id: 64,
      description: "Services de conformité aux réglementations.",
    },

    // Niveau 3 pour "Gestion e-commerce"
    {
      id: 327,
      name: "Gestion de boutique en ligne",
      level: 3,
      parent_id: 65,
      description: "Services de gestion de boutiques e-commerce.",
    },
    {
      id: 328,
      name: "Optimisation de la conversion",
      level: 3,
      parent_id: 65,
      description: "Optimisation du taux de conversion pour e-commerce.",
    },
    {
      id: 329,
      name: "Gestion des stocks",
      level: 3,
      parent_id: 65,
      description: "Services de gestion des stocks pour e-commerce.",
    },
    {
      id: 330,
      name: "Service client e-commerce",
      level: 3,
      parent_id: 65,
      description: "Gestion du service client pour boutiques en ligne.",
    },

    // Niveau 3 pour "Data et veille économique"
    {
      id: 331,
      name: "Analyse de données",
      level: 3,
      parent_id: 66,
      description: "Services d'analyse de données d'entreprise.",
    },
    {
      id: 332,
      name: "Veille concurrentielle",
      level: 3,
      parent_id: 66,
      description: "Services de veille concurrentielle.",
    },
    {
      id: 333,
      name: "Études de marché",
      level: 3,
      parent_id: 66,
      description: "Réalisation d'études de marché approfondies.",
    },
    {
      id: 334,
      name: "Tableaux de bord et reporting",
      level: 3,
      parent_id: 66,
      description: "Création de tableaux de bord et rapports d'analyse.",
    },

    // Niveau 3 pour "Ventes et service client"
    {
      id: 335,
      name: "Stratégies de vente",
      level: 3,
      parent_id: 67,
      description: "Élaboration de stratégies de vente efficaces.",
    },
    {
      id: 336,
      name: "Formation des équipes de vente",
      level: 3,
      parent_id: 67,
      description: "Formation et coaching des équipes commerciales.",
    },
    {
      id: 337,
      name: "Gestion de la relation client",
      level: 3,
      parent_id: 67,
      description: "Mise en place et optimisation de systèmes CRM.",
    },
    {
      id: 338,
      name: "Support client",
      level: 3,
      parent_id: 67,
      description: "Services de support client externalisés.",
    },

    // Niveau 3 pour "Général & Administratif"
    {
      id: 339,
      name: "Assistant virtuel",
      level: 3,
      parent_id: 68,
      description: "Services d'assistance virtuelle pour entreprises.",
    },
    {
      id: 340,
      name: "Gestion administrative",
      level: 3,
      parent_id: 68,
      description: "Services de gestion administrative externalisés.",
    },
    {
      id: 341,
      name: "Saisie de données",
      level: 3,
      parent_id: 68,
      description: "Services de saisie et de traitement de données.",
    },
    {
      id: 342,
      name: "Transcription",
      level: 3,
      parent_id: 68,
      description: "Services de transcription audio et vidéo.",
    },

    // Niveau 3 pour "Divers" (Business)
    {
      id: 343,
      name: "Conseil en durabilité",
      level: 3,
      parent_id: 69,
      description: "Conseil en pratiques commerciales durables.",
    },
    {
      id: 344,
      name: "Gestion de la chaîne d'approvisionnement",
      level: 3,
      parent_id: 69,
      description: "Optimisation de la chaîne d'approvisionnement.",
    },
    {
      id: 345,
      name: "Conseil en innovation",
      level: 3,
      parent_id: 69,
      description: "Services de conseil en innovation d'entreprise.",
    },
    {
      id: 346,
      name: "Gestion des risques",
      level: 3,
      parent_id: 69,
      description: "Services de gestion et d'évaluation des risques.",
    },

    // Niveau 3 pour "Services de comptabilité"
    {
      id: 347,
      name: "Tenue de livres",
      level: 3,
      parent_id: 70,
      description: "Services de tenue de livres comptables.",
    },
    {
      id: 348,
      name: "Préparation fiscale",
      level: 3,
      parent_id: 70,
      description: "Services de préparation et de déclaration fiscale.",
    },
    {
      id: 349,
      name: "Audit financier",
      level: 3,
      parent_id: 70,
      description: "Services d'audit financier pour entreprises.",
    },
    {
      id: 350,
      name: "Comptabilité de gestion",
      level: 3,
      parent_id: 70,
      description: "Services de comptabilité analytique et de gestion.",
    },

    // Niveau 3 pour "Finance d'entreprise"
    {
      id: 351,
      name: "Planification financière",
      level: 3,
      parent_id: 71,
      description: "Services de planification financière pour entreprises.",
    },
    {
      id: 352,
      name: "Évaluation d'entreprise",
      level: 3,
      parent_id: 71,
      description: "Services d'évaluation de la valeur des entreprises.",
    },
    {
      id: 353,
      name: "Gestion de trésorerie",
      level: 3,
      parent_id: 71,
      description: "Services de gestion de la trésorerie d'entreprise.",
    },
    {
      id: 354,
      name: "Levée de fonds",
      level: 3,
      parent_id: 71,
      description: "Assistance à la levée de fonds pour entreprises.",
    },

    // Niveau 3 pour "Analyse et planification financières"
    {
      id: 355,
      name: "Modélisation financière",
      level: 3,
      parent_id: 72,
      description: "Création de modèles financiers complexes.",
    },
    {
      id: 356,
      name: "Analyse d'investissement",
      level: 3,
      parent_id: 72,
      description: "Analyse et évaluation d'opportunités d'investissement.",
    },
    {
      id: 357,
      name: "Prévisions financières",
      level: 3,
      parent_id: 72,
      description: "Élaboration de prévisions financières.",
    },
    {
      id: 358,
      name: "Analyse de rentabilité",
      level: 3,
      parent_id: 72,
      description: "Analyse de la rentabilité des projets et activités.",
    },

    // Niveau 3 pour "Budget personnel et gestion du patrimoine"
    {
      id: 359,
      name: "Planification financière personnelle",
      level: 3,
      parent_id: 73,
      description: "Services de planification financière pour particuliers.",
    },
    {
      id: 360,
      name: "Gestion de portefeuille",
      level: 3,
      parent_id: 73,
      description: "Services de gestion de portefeuille d'investissement.",
    },
    {
      id: 361,
      name: "Conseil en retraite",
      level: 3,
      parent_id: 73,
      description: "Conseil en planification de retraite.",
    },
    {
      id: 362,
      name: "Planification successorale",
      level: 3,
      parent_id: 73,
      description: "Services de planification successorale.",
    },

    // Niveau 3 pour "Collecte de fonds"
    {
      id: 363,
      name: "Crowdfunding",
      level: 3,
      parent_id: 74,
      description: "Stratégies et gestion de campagnes de crowdfunding.",
    },
    {
      id: 364,
      name: "Subventions et financements",
      level: 3,
      parent_id: 74,
      description: "Recherche et demande de subventions et financements.",
    },
    {
      id: 365,
      name: "Collecte de fonds pour associations",
      level: 3,
      parent_id: 74,
      description:
        "Stratégies de collecte de fonds pour organisations à but non lucratif.",
    },
    {
      id: 366,
      name: "Événements de collecte de fonds",
      level: 3,
      parent_id: 74,
      description: "Organisation d'événements pour la collecte de fonds.",
    },

    // Niveau 3 pour "Développement de l'IA"
    {
      id: 367,
      name: "Développement d'algorithmes d'IA",
      level: 3,
      parent_id: 75,
      description: "Création d'algorithmes d'intelligence artificielle.",
    },
    {
      id: 368,
      name: "Intégration de l'IA",
      level: 3,
      parent_id: 75,
      description: "Intégration de solutions d'IA dans des systèmes existants.",
    },
    {
      id: 369,
      name: "Développement de chatbots IA",
      level: 3,
      parent_id: 75,
      description: "Création de chatbots intelligents.",
    },
    {
      id: 370,
      name: "IA pour l'analyse prédictive",
      level: 3,
      parent_id: 75,
      description: "Développement de modèles d'IA pour l'analyse prédictive.",
    },

    // Niveau 3 pour "Data"
    {
      id: 371,
      name: "Nettoyage et préparation de données",
      level: 3,
      parent_id: 76,
      description:
        "Services de nettoyage et de préparation de données pour l'IA.",
    },
    {
      id: 372,
      name: "Annotation de données",
      level: 3,
      parent_id: 76,
      description:
        "Services d'annotation de données pour l'entraînement de modèles d'IA.",
    },
    {
      id: 373,
      name: "Analyse de données massives",
      level: 3,
      parent_id: 76,
      description: "Analyse de grands ensembles de données pour l'IA.",
    },
    {
      id: 374,
      name: "Visualisation de données",
      level: 3,
      parent_id: 76,
      description: "Création de visualisations de données pour l'IA.",
    },

    // Niveau 3 pour "Artistes en IA"
    {
      id: 375,
      name: "Génération d'images par IA",
      level: 3,
      parent_id: 77,
      description: "Création d'images uniques à l'aide de l'IA.",
    },
    {
      id: 376,
      name: "Art génératif",
      level: 3,
      parent_id: 77,
      description: "Création d'œuvres d'art génératives avec l'IA.",
    },
    {
      id: 377,
      name: "Style transfer",
      level: 3,
      parent_id: 77,
      description: "Application de styles artistiques à des images via l'IA.",
    },
    {
      id: 378,
      name: "Création de NFT par IA",
      level: 3,
      parent_id: 77,
      description: "Création de NFT uniques à l'aide de l'IA.",
    },

    // Niveau 3 pour "IA pour les entreprises"
    {
      id: 379,
      name: "IA pour l'automatisation des processus",
      level: 3,
      parent_id: 78,
      description:
        "Utilisation de l'IA pour automatiser les processus d'entreprise.",
    },
    {
      id: 380,
      name: "IA pour la prise de décision",
      level: 3,
      parent_id: 78,
      description:
        "Implémentation de l'IA pour améliorer la prise de décision.",
    },
    {
      id: 381,
      name: "IA pour la relation client",
      level: 3,
      parent_id: 78,
      description: "Utilisation de l'IA pour améliorer la relation client.",
    },
    {
      id: 382,
      name: "IA pour l'optimisation des opérations",
      level: 3,
      parent_id: 78,
      description:
        "Application de l'IA pour optimiser les opérations d'entreprise.",
    },

    // Niveau 3 pour "Vidéo d'IA"
    {
      id: 383,
      name: "Génération de vidéos par IA",
      level: 3,
      parent_id: 79,
      description:
        "Création de vidéos à l'aide de l'intelligence artificielle.",
    },
    {
      id: 384,
      name: "Édition vidéo automatisée",
      level: 3,
      parent_id: 79,
      description: "Édition vidéo assistée par l'IA.",
    },
    {
      id: 385,
      name: "Sous-titrage automatique",
      level: 3,
      parent_id: 79,
      description: "Génération automatique de sous-titres par IA.",
    },
    {
      id: 386,
      name: "Analyse vidéo par IA",
      level: 3,
      parent_id: 79,
      description: "Analyse du contenu vidéo à l'aide de l'IA.",
    },

    // Niveau 3 pour "Audio par l'IA"
    {
      id: 387,
      name: "Génération de musique par IA",
      level: 3,
      parent_id: 80,
      description: "Création de compositions musicales à l'aide de l'IA.",
    },
    {
      id: 388,
      name: "Synthèse vocale",
      level: 3,
      parent_id: 80,
      description: "Génération de voix artificielles réalistes.",
    },
    {
      id: 389,
      name: "Transcription audio automatique",
      level: 3,
      parent_id: 80,
      description: "Transcription de fichiers audio en texte par IA.",
    },
    {
      id: 390,
      name: "Amélioration audio par IA",
      level: 3,
      parent_id: 80,
      description: "Amélioration de la qualité audio à l'aide de l'IA.",
    },

    // Niveau 3 pour "Contenu de l'IA"
    {
      id: 391,
      name: "Rédaction de contenu par IA",
      level: 3,
      parent_id: 81,
      description: "Génération de contenu textuel à l'aide de l'IA.",
    },
    {
      id: 392,
      name: "Traduction automatique",
      level: 3,
      parent_id: 81,
      description: "Services de traduction automatique par IA.",
    },
    {
      id: 393,
      name: "Résumé automatique",
      level: 3,
      parent_id: 81,
      description: "Création de résumés de textes par IA.",
    },
    {
      id: 394,
      name: "Génération de titres et slogans",
      level: 3,
      parent_id: 81,
      description: "Création de titres et slogans accrocheurs par IA.",
    },

    // Niveau 3 pour "Développement personnel"
    {
      id: 395,
      name: "Coaching de vie",
      level: 3,
      parent_id: 82,
      description: "Services de coaching pour le développement personnel.",
    },
    {
      id: 396,
      name: "Méditation et pleine conscience",
      level: 3,
      parent_id: 82,
      description: "Guidance en méditation et pratiques de pleine conscience.",
    },
    {
      id: 397,
      name: "Gestion du stress",
      level: 3,
      parent_id: 82,
      description: "Techniques et conseils pour la gestion du stress.",
    },
    {
      id: 398,
      name: "Développement de la confiance en soi",
      level: 3,
      parent_id: 82,
      description: "Coaching pour renforcer la confiance en soi.",
    },

    // Niveau 3 pour "Mode et style"
    {
      id: 399,
      name: "Conseil en image",
      level: 3,
      parent_id: 83,
      description: "Services de conseil en image personnelle.",
    },
    {
      id: 400,
      name: "Stylisme personnel",
      level: 3,
      parent_id: 83,
      description: "Services de stylisme et de conseil vestimentaire.",
    },
    {
      id: 401,
      name: "Conseil en maquillage",
      level: 3,
      parent_id: 83,
      description: "Conseils et techniques de maquillage personnalisés.",
    },
    {
      id: 402,
      name: "Conseil en coiffure",
      level: 3,
      parent_id: 83,
      description: "Conseils pour le choix de coiffures adaptées.",
    },

    // Niveau 3 pour "Bien-être et fitness"
    {
      id: 403,
      name: "Coaching fitness",
      level: 3,
      parent_id: 84,
      description: "Services de coaching pour l'entraînement physique.",
    },
    {
      id: 404,
      name: "Nutrition et diététique",
      level: 3,
      parent_id: 84,
      description: "Conseils en nutrition et plans alimentaires personnalisés.",
    },
    {
      id: 405,
      name: "Yoga et Pilates",
      level: 3,
      parent_id: 84,
      description: "Cours et séances de yoga et Pilates.",
    },
    {
      id: 406,
      name: "Thérapies alternatives",
      level: 3,
      parent_id: 84,
      description: "Services de thérapies alternatives et holistiques.",
    },

    // Niveau 3 pour "Jeux vidéo"
    {
      id: 407,
      name: "Coaching de jeux",
      level: 3,
      parent_id: 85,
      description:
        "Services de coaching pour améliorer les performances dans les jeux vidéo.",
    },
    {
      id: 408,
      name: "Streaming de jeux",
      level: 3,
      parent_id: 85,
      description: "Services liés au streaming de jeux vidéo.",
    },
    {
      id: 409,
      name: "Tests de jeux",
      level: 3,
      parent_id: 85,
      description: "Services de test et d'évaluation de jeux vidéo.",
    },
    {
      id: 410,
      name: "Création de contenu gaming",
      level: 3,
      parent_id: 85,
      description: "Création de contenu lié aux  jeux vidéo.",
    },

    // Niveau 3 pour "Loisirs & Hobbies"
    {
      id: 411,
      name: "Cours de musique",
      level: 3,
      parent_id: 86,
      description: "Leçons de musique pour divers instruments.",
    },
    {
      id: 412,
      name: "Cours d'art",
      level: 3,
      parent_id: 86,
      description: "Cours de dessin, peinture et autres formes d'art.",
    },
    {
      id: 413,
      name: "Cours de photographie",
      level: 3,
      parent_id: 86,
      description: "Formation en photographie pour tous niveaux.",
    },
    {
      id: 414,
      name: "Cours de cuisine",
      level: 3,
      parent_id: 86,
      description: "Leçons de cuisine et de pâtisserie.",
    },

    // Niveau 3 pour "Divers" (Croissance personnelle)
    {
      id: 415,
      name: "Astrologie et tarologie",
      level: 3,
      parent_id: 87,
      description: "Services d'astrologie et de lecture de tarots.",
    },
    {
      id: 416,
      name: "Développement de compétences",
      level: 3,
      parent_id: 87,
      description: "Cours pour développer diverses compétences personnelles.",
    },
    {
      id: 417,
      name: "Coaching relationnel",
      level: 3,
      parent_id: 87,
      description: "Coaching pour améliorer les relations personnelles.",
    },
    {
      id: 418,
      name: "Coaching de carrière",
      level: 3,
      parent_id: 87,
      description: "Services de coaching pour l'évolution professionnelle.",
    },

    // Niveau 3 pour "Conseillers d'entreprise"
    {
      id: 419,
      name: "Conseil en stratégie",
      level: 3,
      parent_id: 88,
      description: "Services de conseil en stratégie d'entreprise.",
    },
    {
      id: 420,
      name: "Conseil en gestion",
      level: 3,
      parent_id: 88,
      description:
        "Conseil en gestion d'entreprise et optimisation des processus.",
    },
    {
      id: 421,
      name: "Conseil en ressources humaines",
      level: 3,
      parent_id: 88,
      description: "Services de conseil en gestion des ressources humaines.",
    },
    {
      id: 422,
      name: "Conseil en transformation digitale",
      level: 3,
      parent_id: 88,
      description:
        "Accompagnement dans la transformation numérique des entreprises.",
    },

    // Niveau 3 pour "Stratégie marketing"
    {
      id: 423,
      name: "Stratégie de marque",
      level: 3,
      parent_id: 89,
      description: "Élaboration de stratégies de marque.",
    },
    {
      id: 424,
      name: "Marketing digital",
      level: 3,
      parent_id: 89,
      description: "Conseil en stratégie de marketing numérique.",
    },
    {
      id: 425,
      name: "Stratégie de contenu",
      level: 3,
      parent_id: 89,
      description: "Développement de stratégies de contenu marketing.",
    },
    {
      id: 426,
      name: "Analyse de marché",
      level: 3,
      parent_id: 89,
      description: "Réalisation d'analyses de marché approfondies.",
    },

    // Niveau 3 pour "Accompagnement et conseils"
    {
      id: 427,
      name: "Coaching d'entreprise",
      level: 3,
      parent_id: 90,
      description: "Services de coaching pour dirigeants et équipes.",
    },
    {
      id: 428,
      name: "Mentorat entrepreneurial",
      level: 3,
      parent_id: 90,
      description: "Mentorat pour entrepreneurs et startups.",
    },
    {
      id: 429,
      name: "Conseil en productivité",
      level: 3,
      parent_id: 90,
      description: "Conseils pour améliorer la productivité en entreprise.",
    },
    {
      id: 430,
      name: "Gestion du changement",
      level: 3,
      parent_id: 90,
      description:
        "Accompagnement dans les processus de changement organisationnel.",
    },

    // Niveau 3 pour "Conseil en technologie"
    {
      id: 431,
      name: "Architecture IT",
      level: 3,
      parent_id: 91,
      description: "Conseil en architecture des systèmes d'information.",
    },
    {
      id: 432,
      name: "Sécurité informatique",
      level: 3,
      parent_id: 91,
      description: "Conseil en cybersécurité et protection des données.",
    },
    {
      id: 433,
      name: "Transformation numérique",
      level: 3,
      parent_id: 91,
      description: "Accompagnement dans la transformation numérique.",
    },
    {
      id: 434,
      name: "Conseil en innovation technologique",
      level: 3,
      parent_id: 91,
      description: "Conseil sur les nouvelles technologies et l'innovation.",
    },

    // Niveau 3 pour "Mentorat"
    {
      id: 435,
      name: "Mentorat en leadership",
      level: 3,
      parent_id: 92,
      description: "Mentorat pour développer les compétences de leadership.",
    },
    {
      id: 436,
      name: "Mentorat en entrepreneuriat",
      level: 3,
      parent_id: 92,
      description: "Accompagnement des entrepreneurs dans leur parcours.",
    },
    {
      id: 437,
      name: "Mentorat de carrière",
      level: 3,
      parent_id: 92,
      description: "Guidance pour l'évolution et la transition de carrière.",
    },
    {
      id: 438,
      name: "Mentorat technique",
      level: 3,
      parent_id: 92,
      description: "Mentorat dans des domaines techniques spécifiques.",
    },

    // Niveau 3 pour "Produits et loisirs"
    {
      id: 439,
      name: "Photographie de produits",
      level: 3,
      parent_id: 93,
      description: "Services de photographie professionnelle de produits.",
    },
    {
      id: 440,
      name: "Photographie culinaire",
      level: 3,
      parent_id: 93,
      description:
        "Photographie spécialisée pour la nourriture et les boissons.",
    },
    {
      id: 441,
      name: "Photographie d'événements",
      level: 3,
      parent_id: 93,
      description: "Services de photographie pour événements et célébrations.",
    },
    {
      id: 442,
      name: "Photographie de mode",
      level: 3,
      parent_id: 93,
      description: "Services de photographie pour la mode et le style.",
    },

    // Niveau 3 pour "Personnes et scènes"
    {
      id: 443,
      name: "Photographie de portrait",
      level: 3,
      parent_id: 94,
      description: "Services de photographie de portraits professionnels.",
    },
    {
      id: 444,
      name: "Photographie de mariage",
      level: 3,
      parent_id: 94,
      description: "Services de photographie spécialisée pour les mariages.",
    },
    {
      id: 445,
      name: "Photographie immobilière",
      level: 3,
      parent_id: 94,
      description: "Services de photographie pour l'immobilier.",
    },
    {
      id: 446,
      name: "Photographes de paysages",
      level: 3,
      parent_id: 94,
      description: "Services de photographie de paysages.",
    },

    // Niveau 3 pour "Photographies locales"
    {
      id: 447,
      name: "Photographie à New York",
      level: 3,
      parent_id: 95,
      description: "Services de photographie à New York.",
    },
    {
      id: 448,
      name: "Photographes à Los Angeles",
      level: 3,
      parent_id: 95,
      description: "Services de photographie à Los Angeles.",
    },
    {
      id: 449,
      name: "Photographes à Londres",
      level: 3,
      parent_id: 95,
      description: "Services de photographie à Londres.",
    },
    {
      id: 450,
      name: "Photographes à Paris",
      level: 3,
      parent_id: 95,
      description: "Services de photographie à Paris.",
    },
    {
      id: 451,
      name: "Toutes les villes",
      level: 3,
      parent_id: 95,
      description: "Services de photographie dans diverses villes.",
    },

    // Niveau 3 pour "Divers" (Photographie)
    {
      id: 452,
      name: "Cours de photographie",
      level: 3,
      parent_id: 96,
      description: "Cours et ateliers de photographie.",
    },
    {
      id: 453,
      name: "Création de préréglages photo",
      level: 3,
      parent_id: 96,
      description: "Création de préréglages pour l'édition photo.",
    },
    {
      id: 454,
      name: "Autres",
      level: 3,
      parent_id: 96,
      description: "Autres services de photographie spécialisés.",
    },
  ];

  try {
    // First, insert all categories
    await seedEntities("categoryHierarchy", allCategories);

    // Then, update parent_id for level 2 and 3 categories
    const categories = await prisma.categoryHierarchy.findMany();
    const categoryMap = new Map(categories.map((c) => [c.name, c.id]));

    for (const category of allCategories) {
      if (category.level > 1 && category.parent_id) {
        const parentCategory = allCategories.find(
          (c) => c.id === category.parent_id
        );
        if (parentCategory) {
          const parentId = categoryMap.get(parentCategory.name);
          if (parentId) {
            await prisma.categoryHierarchy.update({
              where: { id: category.id },
              data: { parent_id: parentId },
            });
          }
        }
      }
    }

    console.log(
      "All categories have been inserted and parent_id relationships have been established."
    );
  } catch (error) {
    console.error("Error in seedCategories:", error);
  }
};




const seedServices = async () => {
  const allServices: ServiceData[] = [
    {
      id: 1,
      name: "Logo Design",
      price: "Starting at $50",
      description: "Professional logo design services.",
      category_id: 1,
    },
    {
      id: 2,
      name: "Content Writing",
      price: "Starting at $30",
      description: "High-quality content writing for various needs.",
      category_id: 2,
    },
    {
      id: 3,
      name: "Web Development",
      price: "Starting at $100",
      description: "Custom web development services.",
      category_id: 3,
    },
    {
      id: 4,
      name: "Social Media Marketing",
      price: "Starting at $80",
      description: "Effective social media marketing strategies.",
      category_id: 4,
    },
  ];

  try {
    await seedEntities("service", allServices);
    console.log("Services inserted successfully.");
  } catch (error) {
    console.error("Error inserting services:", error);
  }
};

// Seeder for Users
const seedUsers = async () => {
  const allUsers: UserData[] = [
    {
      id: "1",
      first_name: "John",
      last_name: "Doe",
      display_name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      profile_pic: "https://randomuser.me/api/portraits/men/1.jpg",
      is_seller: true,
      is_buyer: false,
      jobs: "Programmation_Tech",
      plan: "Travail_principal",
      role: "user",
      level: "advanced",
      skills: JSON.stringify(["JavaScript", "React", "Node.js"]),
      languages: JSON.stringify(["English", "French"]),
      category_id: 3,
    },
    {
      id: "2",
      first_name: "Jane",
      last_name: "Smith",
      display_name: "Jane Smith",
      email: "janesmith@example.com",
      password: "password123",
      profile_pic: "https://randomuser.me/api/portraits/women/2.jpg",
      is_seller: true,
      is_buyer: false,
      jobs: "Graphisme_Design",
      plan: "Travail_secondaire",
      role: "user",
      level: "intermediate",
      skills: JSON.stringify(["Photoshop", "Illustrator", "Figma"]),
      languages: JSON.stringify(["English", "Spanish"]),
      category_id: 1,
    },
    {
      id: "3",
      first_name: "Mike",
      last_name: "Johnson",
      display_name: "Mike Johnson",
      email: "mikejohnson@example.com",
      password: "password123",
      profile_pic: "https://randomuser.me/api/portraits/men/3.jpg",
      is_seller: true,
      is_buyer: false,
      jobs: "Redaction_Traduction",
      plan: "usage_personnel",
      role: "user",
      level: "beginner",
      skills: JSON.stringify(["Content Writing", "SEO", "Copywriting"]),
      languages: JSON.stringify(["English", "German"]),
      category_id: 2,
    },
  ];

  try {
    await seedEntities("user", allUsers);
    console.log("Users inserted successfully.");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

// Seeder for Ratings
const seedRatings = async () => {
  const allRatings = [
    {
      id: 1,
      rating: 5,
      review: "Excellent service! Highly recommended.",
      buyer_id: "3", // Corresponds to John Doe (Buyer ID 1)
      seller_id: "2", // Corresponds to Jane Smith (Seller ID 2)
      service_id: 1, // Corresponds to Logo Design (Service ID 1)
    },
    {
      id: 3,
      rating: 3,
      review: "Average service, nothing special.",
      buyer_id: "1", // Corresponds to John Doe (Buyer ID 1)
      seller_id: "3", // Corresponds to Emily Davis (Seller ID 3)
      service_id: 3, // Corresponds to Web Development (Service ID 3)
    },
    {
      id: 4,
      rating: 4,
      review: "Good quality, would hire again.",
      buyer_id: "2", // Corresponds to Jane Smith (Buyer ID 2)
      seller_id: "1", // Corresponds to John Doe (Seller ID 1)
      service_id: 4, // Corresponds to Social Media Marketing (Service ID 4)
    },
  ];
  
  try {
    await seedEntities("rating", allRatings);
    console.log("Ratings inserted successfully.");
  } catch (error) {
    console.error("Error inserting ratings:", error);
  }
};

// Main seeder function
const runSeeder = async () => {
  try {
    await seedCategories(); // Seed categories first
    await seedServices();   // Seed services
    await seedUsers();      // Seed users
    await seedRatings();    // Seed ratings
  } catch (error) {
    console.error("Error in runSeeder:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seeder
runSeeder().catch((error) => {
  console.error("Error running seeder:", error);
  prisma.$disconnect();
});


