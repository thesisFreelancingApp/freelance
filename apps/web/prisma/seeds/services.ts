// freelance/apps/web/prisma/seeds/services.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const images = [
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/30695ea7d254c467e40d4934c93ef2149cbd4521.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/a4956b53a65f7004eaf3c82515b3d40b.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/affiche-graphiste-dessinee-main_23-2150428116.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/brochure-flyer-poster-logo-designer-500x500.webp",    
  
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/conception-plate-du-modele-bulletin-information-entreprise_23-2151846852.avif", 
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/freelance-digital-marketing-services-design-template-9c48f89169530ac722339dc89c40e2cc_screen.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/freelance-outsoursing-concept-people-working-remotely-through-internet-idea-jop-independency-free-schedule-time-management-work-efficiency-vector-flat-illustration_613284-1216.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/freelance-services-design-template-18fe71b5e0bdbb916320ab12d97e03a1_screen.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/graphic-designer-ads-template-566c724272d79cabb233f45947148e52.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/graphic-designer-advertisement-template-5a19347d20e545f55afdd0b5a6523395_screen%20(1).jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/graphic-designer-advertisement-template-5a19347d20e545f55afdd0b5a6523395_screen.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/graphics-designer-services-ad-template-45bcf2d06b010f46b98750a5d4fbadfe_screen.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/images%20(1).png",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/images.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/images.png",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/modele-affiche-dossier-presse-minimal_23-2150281119.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/modele-affiche-studio-design-design-plat_23-2150425381.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/modele-graphiste-design-plat_23-2150428401.avif" ,
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/modele-graphiste-design-plat_23-2150508672.avif" ,
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/new-product-500x500.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/printing-and-branding-services-design-template-bf10795692efd7c6f2087f42acbf89e1_screen.jpg" , 
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/print-on-demand-guide-revenus-passifs.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/Tunetoo-1024x862.webp",
"https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/Untitled%20folder/web-design-and-internet-business-idea-development-business-or-freelance-service-poster-vector-website-technology-user-files-icons-on-laptop-computer-2EHTMT3.jpg" ]


const imglogo = [
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/6.png',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/capture-d-ecran-2024-02-26-002323-65dbda204e1bd.png',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/il_570xN.3498195588_99r1.webp',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/il_570xN.4506716555_tfhu.webp',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/images%20(1).jpg',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/les-meilleurs-sites-pour-creer-votre-logo.jpg',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/logaster-picture.webp',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/Logo-Design-LP_Hero_FR.jpg',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/logo.webp',
  'https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/unnamed.png' 
]
const imgdevper = [
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/creation-de-site-web-l-importance-de-l-interface-graphique.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/dessin-esquisse-mise-page-developpement-site-web_53876-124188.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/importance-interface-graphique-1024x579.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/interface-de-la-page-awwards.png",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/interface-web-FB.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/modele-conception-site-web-vectoriel-equipe-affaires-travaille-ensemble-concepts-page-atterrissage-pour-developpement-sites-web-mobiles-illustration-plate-moderne_88813-4085.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/modele-page-destination-cms-plat-dessine-main_23-2148828089.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/page-destination-du-projet-creativite-design-plat_23-2150711407.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/site-web-developpement-web-ingenierie-programmation-codage-ecrans-interface-realite-augmentee-logiciel-programmation-ingenieur-projet-developpeur-conception-application-illustration-dessin-anime_.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/webcom-website-builder.jpg",
];
const imgpub = [
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/1478714215582363679f438.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/AdobeStock_647452152_Editorial_Use_Only-scaled.jpeg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/cover-picture.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/idees-contenus-reseaux-sociaux-1200x628.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/large_Banner_Reseaux_sociaux_643a9dd102.png",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/pourquoi-faire-publicite-reseaux-sociaux.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/publicite-et-reseaux-sociaux-jpg.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/publicite-reseaux-sociaux-1024x682.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/RESEAU-SOCIAUX_Plan-de-travail-1-scaled.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets4/tik-tok-le-nouveau-reseau-social-512560.webp",
];
const imgeffet = [
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/benj-dubbing-stage-shanghai-china-orig-002-6527e3cde1d4e.jpgv",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/cover-image-for-ambisonic-sound-effects.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/creating-sound-effects.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/il_300x300.5867679113_tfo8.avif",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/images%20(1).jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/images.jpg",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/max-at-keyboard-716x477.png",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets3/interface-de-la-page-awwards.png",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/tonies-01-0059-figurine-pour-enfant.webp",
  "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets5/trouver-effets-sonores.webp",
];

const servicesData = [
  {
    name: "Effets Sonores pour Films 1",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[8]],
      videos: ["https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets2/graphic-design-services-video-ad-template-2e6fc0d5559fbab6a8f84dfbca7c50ec_screen.mp4"],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-1-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 2",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[1]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 3",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[2]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 4",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[3]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 5",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[4]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 6",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[5]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 7",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[6]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 8",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[7]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 9",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[8]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },
  {
    name: "Effets Sonores pour Films 10",
    description: "Création d'effets sonores personnalisés pour vos projets cinématographiques.",
    medias: {
      images: [imgeffet[9]],
      videos: [],
    },
    tags: ["effets sonores", "cinéma", "audio"],
    categoryId: 130,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Basique",
        description: "Effets sonores simples pour courts métrages.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["10 effets", "Mixage basique", "Format WAV"],
      },
      {
        name: "Standard",
        description: "Effets sonores pour films de moyenne durée.",
        deliveryTime: 14,
        price: "399.99",
        revisions: 3,
        features: ["20 effets", "Mixage avancé", "Format WAV et MP3"],
      },
      {
        name: "Premium",
        description: "Effets sonores complets pour longs métrages.",
        deliveryTime: 30,
        price: "799.99",
        revisions: 5,
        features: ["50 effets", "Mixage professionnel", "Consultation personnalisée"],
      },
    ],
  },

  {
    name: "Publicité sur les Réseaux Sociaux 1",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[0]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 2",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[1]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-2-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 3",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[2]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 4",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[3]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-4-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 5",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[4]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 6",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[5]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 7",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[6]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-7-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 8",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[7]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-8-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 9",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[8]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-9-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Publicité sur les Réseaux Sociaux 10",
    description: "Campagne publicitaire ciblée pour augmenter votre visibilité en ligne.",
    medias: {
      images: [imgpub[9]],
      videos: [],
    },
    tags: ["publicité", "réseaux sociaux", "marketing"],
    categoryId: 88,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Basique",
        description: "Campagne publicitaire simple sur un réseau social.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 2,
        features: ["1 plateforme", "Analyse de base", "Rapport de performance"],
      },
      {
        name: "Standard",
        description: "Campagne publicitaire sur plusieurs réseaux sociaux.",
        deliveryTime: 10,
        price: "599.99",
        revisions: 3,
        features: ["3 plateformes", "Analyse avancée", "Rapport détaillé"],
      },
      {
        name: "Premium",
        description: "Campagne publicitaire complète avec stratégie personnalisée.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 5,
        features: ["5 plateformes", "Stratégie personnalisée", "Support continu"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 1",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[0]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-1-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 2",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[1]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 3",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[2]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 4",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[3]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 5",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[4]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 6",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[5]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 7",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[6]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 8",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[7]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 9",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[8]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Développement de Site Web Personnalisé 10",
    description: "Création de sites web sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [imgdevper[9]],
      videos: [],
    },
    tags: ["développement web", "site personnalisé", "design"],
    categoryId: 75,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Basique",
        description: "Site web simple avec design personnalisé.",
        deliveryTime: 10,
        price: "799.99",
        revisions: 2,
        features: ["3 pages", "Design réactif", "SEO basique"],
      },
      {
        name: "Standard",
        description: "Site web multi-pages avec fonctionnalités avancées.",
        deliveryTime: 20,
        price: "1499.99",
        revisions: 3,
        features: ["Jusqu'à 10 pages", "Intégration CMS", "SEO avancé"],
      },
      {
        name: "Premium",
        description: "Site web complet avec intégration e-commerce.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 5,
        features: ["E-commerce", "Tableau de bord", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 1",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[0]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 2",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[1]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-2-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 3",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[2]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 4",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[3]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-4-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 5",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
          images: [imglogo[4]],
          videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 6",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
          images: [imglogo[5]],
          videos: [],
        },
        tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 7",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[6]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-7-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 8",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[7]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-8-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 9",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[8]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-9-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Création de Logo Personnalisé 10",
    description: "Design de logo unique et sur mesure pour votre marque.",
    medias: {
      images: [imglogo[9]],
      videos: [],
    },
    tags: ["logo", "design", "branding"],
    categoryId: 61,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 2,
        features: ["2 concepts", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Standard",
        description: "Design de logo avec options avancées.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 3,
        features: ["4 concepts", "Fichiers source", "Kit de réseaux sociaux"],
      },
      {
        name: "Premium",
        description: "Design de logo complet avec branding.",
        deliveryTime: 15,
        price: "599.99",
        revisions: 5,
        features: ["6 concepts", "Guide de marque", "Révisions illimitées"],
      },
    ],
  },
  {
    name: "Design de Logo Moderne",
    description: "Services de design de logo professionnel et créatif.",
    medias: {
      images: [
        images[3], images[4], images[5]
      ],
      videos: [],
    },
    tags: ["design de logo", "branding", "design graphique"],
    categoryId: 62,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 3,
        price: "99.99",
        revisions: 2,
        features: ["2 concepts", "Fichier vectoriel", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Professionnel",
        description: "Design de logo professionnel avec branding.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 5,
        features: [
          "4 concepts",
          "Tous les fichiers sources",
          "Kit pour réseaux sociaux",
          "Guide de marque",
          "Révisions illimitées",
        ],
      },
    ],
  },
  {
    name: "Gestion des Réseaux Sociaux",
    description: "Gestion complète des réseaux sociaux et stratégie.",
    medias: {
      images: [
        images[6], images[7], images[8]
      ],
      videos: [],
    },
    tags: ["réseaux sociaux", "marketing", "création de contenu"],
    categoryId: 99,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Starter",
        description: "Gestion basique des réseaux sociaux.",
        deliveryTime: 30,
        price: "299.99",
        revisions: 2,
        features: [
          "3 posts par semaine",
          "Analytique basique",
          "2 plateformes",
          "Calendrier de contenu",
        ],
      },
      {
        name: "Business",
        description: "Gestion complète des réseaux sociaux.",
        deliveryTime: 30,
        price: "599.99",
        revisions: 4,
        features: [
          "Posts quotidiens",
          "Analytique avancée",
          "4 plateformes",
          "Calendrier de contenu",
          "Gestion de communauté",
          "Rapport mensuel",
        ],
      },
    ],
  },
  {
    name: "Consultation en Marketing Digital",
    description: "Stratégies de marketing digital pour booster votre entreprise.",
    medias: {
      images: [
        images[9], images[10], images[11]
      ],
      videos: [],
    },
    tags: ["marketing digital", "consultation", "stratégie"],
    categoryId: 63,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Analyse de Base",
        description: "Analyse de votre présence en ligne actuelle.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Rapport d'analyse", "Recommandations"],
      },
      {
        name: "Stratégie Complète",
        description: "Plan de marketing digital sur mesure.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 3,
        features: ["Rapport d'analyse", "Plan stratégique", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu Vidéo",
    description: "Production de vidéos professionnelles pour votre marque.",
    medias: {
      images: [
        images[12], images[13], images[14]
      ],
      videos: [],
    },
    tags: ["vidéo", "production", "contenu"],
    categoryId: 64,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Vidéo Courte",
        description: "Vidéo promotionnelle de 30 secondes.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["30 secondes", "Montage basique", "Musique de fond"],
      },
      {
        name: "Vidéo Longue",
        description: "Vidéo d'entreprise de 2 minutes.",
        deliveryTime: 14,
        price: "799.99",
        revisions: 3,
        features: ["2 minutes", "Montage avancé", "Effets spéciaux"],
      },
    ],
  },
  {
    name: "Traduction Professionnelle",
    description: "Services de traduction précis et rapides pour tous vos documents.",
    medias: {
      images: [
        images[15], images[16], images[17]
      ],
      videos: [],
    },
    tags: ["traduction", "langues", "documents"],
    categoryId: 65,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Traduction de Base",
        description: "Traduction de documents jusqu'à 1000 mots.",
        deliveryTime: 3,
        price: "49.99",
        revisions: 1,
        features: ["1000 mots", "Révision incluse"],
      },
      {
        name: "Traduction Avancée",
        description: "Traduction de documents jusqu'à 5000 mots.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["5000 mots", "Révision incluse", "Livraison rapide"],
      },
    ],
  },
  {
    name: "Photographie de Produit",
    description: "Photographie professionnelle pour mettre en valeur vos produits.",
    medias: {
      images: [
        images[18], images[19], images[20]
      ],
      videos: [],
    },
    tags: ["photographie", "produit", "professionnel"],
    categoryId: 66,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Pack Basique",
        description: "Photographie de 5 produits.",
        deliveryTime: 5,
        price: "149.99",
        revisions: 1,
        features: ["5 produits", "Retouche basique"],
      },
      {
        name: "Pack Avancé",
        description: "Photographie de 10 produits.",
        deliveryTime: 10,
        price: "299.99",
        revisions: 2,
        features: ["10 produits", "Retouche avancée", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Développement d'Applications Mobiles",
    description: "Création d'applications mobiles sur mesure pour Android et iOS.",
    medias: {
      images: [
        images[8], images[3], images[16]
      ],
      videos: [],
    },
    tags: ["applications mobiles", "Android", "iOS"],
    categoryId: 67,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Application Simple",
        description: "Développement d'une application mobile simple.",
        deliveryTime: 30,
        price: "1999.99",
        revisions: 3,
        features: ["Application simple", "Design personnalisé"],
      },
      {
        name: "Application Complexe",
        description: "Développement d'une application mobile complexe.",
        deliveryTime: 60,
        price: "4999.99",
        revisions: 5,
        features: ["Application complexe", "Fonctionnalités avancées", "Support multi-plateforme"],
      },
    ],
  },
  {
    name: "SEO et Optimisation de Site Web",
    description: "Améliorez la visibilité de votre site web avec nos services SEO.",
    medias: {
      images: [
        images[2], images[5], images[6]
      ],
      videos: [],
    },
    tags: ["SEO", "optimisation", "site web"],
    categoryId: 68,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "SEO Basique",
        description: "Optimisation SEO de base pour votre site web.",
        deliveryTime: 10,
        price: "299.99",
        revisions: 2,
        features: ["Audit SEO", "Optimisation des mots-clés"],
      },
      {
        name: "SEO Avancé",
        description: "Optimisation SEO avancée pour votre site web.",
        deliveryTime: 20,
        price: "599.99",
        revisions: 3,
        features: ["Audit SEO complet", "Optimisation des mots-clés", "Rapport de performance"],
      },
    ],
  },
  {
    name: "Création de Sites E-commerce",
    description: "Développement de sites e-commerce performants et sécurisés.",
    medias: {
      images: [
        images[2], images[3], images[8]
      ],
      videos: [],
    },
    tags: ["e-commerce", "site web", "développement"],
    categoryId: 69,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Boutique en Ligne Basique",
        description: "Création d'une boutique en ligne simple.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 2,
        features: ["Boutique simple", "Paiement sécurisé"],
      },
      {
        name: "Boutique en Ligne Avancée",
        description: "Création d'une boutique en ligne avancée.",
        deliveryTime: 40,
        price: "1999.99",
        revisions: 4,
        features: ["Boutique avancée", "Fonctionnalités personnalisées", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Consultation en Stratégie d'Entreprise",
    description: "Conseils stratégiques pour améliorer la performance de votre entreprise.",
    medias: {
      images: [
        images[15]
      ],
      videos: [],
    },
    tags: ["stratégie", "entreprise", "consultation"],
    categoryId: 70,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse initiale de votre stratégie d'entreprise.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse stratégique", "Recommandations"],
      },
      {
        name: "Plan Stratégique Complet",
        description: "Développement d'un plan stratégique complet.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse stratégique", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Blog",
    description: "Rédaction de contenu engageant pour votre blog.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["blog", "contenu", "rédaction"],
    categoryId: 71,
    creatorId: "designer-2-seller",
    packages: [
      {
        name: "Article Court",
        description: "Rédaction d'un article de blog de 500 mots.",
        deliveryTime: 3,
        price: "49.99",
        revisions: 1,
        features: ["500 mots", "SEO optimisé"],
      },
      {
        name: "Article Long",
        description: "Rédaction d'un article de blog de 1500 mots.",
        deliveryTime: 7,
        price: "149.99",
        revisions: 2,
        features: ["1500 mots", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Design Graphique pour Médias Sociaux",
    description: "Création de visuels attrayants pour vos réseaux sociaux.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["design graphique", "médias sociaux", "visuels"],
    categoryId: 72,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Pack Basique",
        description: "Création de 5 visuels pour médias sociaux.",
        deliveryTime: 5,
        price: "99.99",
        revisions: 1,
        features: ["5 visuels", "Design personnalisé"],
      },
      {
        name: "Pack Avancé",
        description: "Création de 10 visuels pour médias sociaux.",
        deliveryTime: 10,
        price: "199.99",
        revisions: 2,
        features: ["10 visuels", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Développement de Logiciels Personnalisés",
    description: "Création de logiciels sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["développement logiciel", "personnalisé", "sur mesure"],
    categoryId: 73,
    creatorId: "designer-4-seller",
    packages: [
      {
        name: "Logiciel Simple",
        description: "Développement d'un logiciel simple.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 3,
        features: ["Logiciel simple", "Interface utilisateur"],
      },
      {
        name: "Logiciel Complexe",
        description: "Développement d'un logiciel complexe.",
        deliveryTime: 60,
        price: "5999.99",
        revisions: 5,
        features: ["Logiciel complexe", "Fonctionnalités avancées", "Support multi-plateforme"],
      },
    ],
  },
  {
    name: "Formation en Ligne sur le Marketing",
    description: "Cours en ligne pour maîtriser les techniques de marketing moderne.",
    medias: {
      images: [
        images[15]
      ],
      videos: [],
    },
    tags: ["formation", "marketing", "en ligne"],
    categoryId: 74,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Cours de Base",
        description: "Introduction aux concepts de base du marketing.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 1,
        features: ["Cours vidéo", "Matériel téléchargeable"],
      },
      {
        name: "Cours Avancé",
        description: "Techniques avancées de marketing digital.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 2,
        features: ["Cours vidéo", "Matériel téléchargeable", "Accès à vie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de Projet",
    description: "Optimisez vos projets avec nos services de gestion de projet.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["gestion de projet", "consultation", "optimisation"],
    categoryId: 75,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de projet actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de projet", "Recommandations"],
      },
      {
        name: "Plan de Gestion Complet",
        description: "Développement d'un plan de gestion de projet complet.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de projet", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web Responsifs",
    description: "Développement de sites web adaptatifs pour tous les appareils.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["site web", "responsif", "développement"],
    categoryId: 76,
    creatorId: "designer-7-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple et responsif.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design responsif"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé et responsif.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design responsif", "Fonctionnalités personnalisées"],
      },
    ],
  },
  {
    name: "Design d'Intérieur Virtuel",
    description: "Conception d'espaces intérieurs en 3D pour visualiser vos projets.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["design d'intérieur", "3D", "virtuel"],
    categoryId: 77,
    creatorId: "designer-8-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Conception d'un espace intérieur simple.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["Design 3D", "Visualisation"],
      },
      {
        name: "Design Complet",
        description: "Conception d'un espace intérieur complet.",
        deliveryTime: 14,
        price: "599.99",
        revisions: 3,
        features: ["Design 3D", "Visualisation", "Plan détaillé"],
      },
    ],
  },
  {
    name: "Consultation en Finances Personnelles",
    description: "Optimisez vos finances avec nos conseils personnalisés.",
    medias: {
      images: [
        images[15]
      ],
      videos: [],
    },
    tags: ["finances", "personnelles", "consultation"],
    categoryId: 78,
    creatorId: "designer-9-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre situation financière actuelle.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Analyse financière", "Recommandations"],
      },
      {
        name: "Plan Financier Complet",
        description: "Développement d'un plan financier personnalisé.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Analyse financière", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Présentations Professionnelles",
    description: "Conception de présentations percutantes pour vos réunions.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["présentation", "professionnelle", "conception"],
    categoryId: 79,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Présentation Basique",
        description: "Création d'une présentation de 10 diapositives.",
        deliveryTime: 3,
        price: "99.99",
        revisions: 1,
        features: ["10 diapositives", "Design personnalisé"],
      },
      {
        name: "Présentation Avancée",
        description: "Création d'une présentation de 20 diapositives.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["20 diapositives", "Design personnalisé", "Animations"],
      },
    ],
  },
  {
    name: "Développement de Jeux Vidéo",
    description: "Création de jeux vidéo captivants pour toutes les plateformes.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["jeux vidéo", "développement", "plateformes"],
    categoryId: 80,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Jeu Simple",
        description: "Développement d'un jeu vidéo simple.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 3,
        features: ["Jeu simple", "Graphismes basiques"],
      },
      {
        name: "Jeu Complexe",
        description: "Développement d'un jeu vidéo complexe.",
        deliveryTime: 60,
        price: "5999.99",
        revisions: 5,
        features: ["Jeu complexe", "Graphismes avancés", "Multijoueur"],
      },
    ],
  },
  {
    name: "Consultation en Développement Personnel",
    description: "Atteignez vos objectifs personnels avec nos conseils experts.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["développement personnel", "consultation", "objectifs"],
    categoryId: 81,
    creatorId: "dev-1-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de vos objectifs personnels actuels.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Analyse personnelle", "Recommandations"],
      },
      {
        name: "Plan de Développement Complet",
        description: "Développement d'un plan de développement personnel.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Analyse personnelle", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Artistes",
    description: "Développement de sites web personnalisés pour artistes.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["site web", "artistes", "personnalisé"],
    categoryId: 82,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour artistes.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour artistes.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Galerie d'art"],
      },
    ],
  },
  {
    name: "Design de Mode et Stylisme",
    description: "Création de designs de mode uniques et conseils en stylisme.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["design de mode", "stylisme", "création"],
    categoryId: 83,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de mode.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["3 designs", "Conseils en stylisme"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de mode.",
        deliveryTime: 14,
        price: "599.99",
        revisions: 3,
        features: ["6 designs", "Conseils en stylisme", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Nutrition et Bien-être",
    description: "Améliorez votre santé avec nos conseils en nutrition.",
    medias: {
      images: [
        images[20]
      ],
      videos: [],
    },
    tags: ["nutrition", "bien-être", "consultation"],
    categoryId: 84,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre régime alimentaire actuel.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Analyse nutritionnelle", "Recommandations"],
      },
      {
        name: "Plan Nutritionnel Complet",
        description: "Développement d'un plan nutritionnel personnalisé.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Analyse nutritionnelle", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Podcasts",
    description: "Production de contenu engageant pour vos podcasts.",
    medias: {
      images: [
        images[5]
      ],
      videos: [],
    },
    tags: ["podcasts", "contenu", "production"],
    categoryId: 85,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Épisode Court",
        description: "Production d'un épisode de podcast de 15 minutes.",
        deliveryTime: 3,
        price: "99.99",
        revisions: 1,
        features: ["15 minutes", "Montage audio"],
      },
      {
        name: "Épisode Long",
        description: "Production d'un épisode de podcast de 45 minutes.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["45 minutes", "Montage audio", "Musique de fond"],
      },
    ],
  },
  {
    name: "Consultation en Développement Durable",
    description: "Stratégies pour intégrer le développement durable dans votre entreprise.",
    medias: {
      images: [
        images[7]
      ],
      videos: [],
    },
    tags: ["développement durable", "consultation", "stratégies"],
    categoryId: 86,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre impact environnemental actuel.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse environnementale", "Recommandations"],
      },
      {
        name: "Plan de Développement Durable",
        description: "Développement d'un plan de développement durable.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse environnementale", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Événements",
    description: "Développement de sites web pour promouvoir vos événements.",
    medias: {
      images: [
        images[19]
      ],
      videos: [],
    },
    tags: ["site web", "événements", "promotion"],
    categoryId: 87,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour événements.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour événements.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Calendrier d'événements"],
      },
    ],
  },
  {
    name: "Design de Packaging",
    description: "Création de designs de packaging innovants pour vos produits.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["design", "packaging", "produits"],
    categoryId: 88,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de packaging.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de packaging.",
        deliveryTime: 14,
        price: "599.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Sécurité Informatique",
    description: "Protégez vos données avec nos services de sécurité informatique.",
    medias: {
      images: [
        images[8]
      ],
      videos: [],
    },
    tags: ["sécurité informatique", "consultation", "protection"],
    categoryId: 89,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "Audit de Sécurité",
        description: "Analyse de la sécurité de votre infrastructure informatique.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Audit de sécurité", "Recommandations"],
      },
      {
        name: "Plan de Sécurité Complet",
        description: "Développement d'un plan de sécurité informatique.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Audit de sécurité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Réseaux Sociaux",
    description: "Production de contenu engageant pour vos réseaux sociaux.",
    medias: {
      images: [
        images[9]
      ],
      videos: [],
    },
    tags: ["réseaux sociaux", "contenu", "production"],
      categoryId: 90,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Pack Basique",
        description: "Création de 5 posts pour réseaux sociaux.",
        deliveryTime: 5,
        price: "99.99",
        revisions: 1,
        features: ["5 posts", "Design personnalisé"],
      },
      {
        name: "Pack Avancé",
        description: "Création de 10 posts pour réseaux sociaux.",
        deliveryTime: 10,
        price: "199.99",
        revisions: 2,
        features: ["10 posts", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  // {
  //   name: "Consultation en Gestion du Temps",
  //   description: "Optimisez votre emploi du temps avec nos conseils en gestion du temps.",
  //   medias: {
  //     images: [
  //       images[10]
  //     ],
  //     videos: [],
  //   },
  //   tags: ["gestion du temps", "consultation", "optimisation"],
  //   categoryId: 128,
  //   creatorId: "dev-10-seller ",
  //   packages: [
  //     {
  //       name: "Consultation Initiale",
  //       description: "Analyse de votre gestion du temps actuelle.",
  //       deliveryTime: 5,
  //       price: "199.99",
  //       revisions: 1,
  //       features: ["Analyse de temps", "Recommandations"],
  //     },
  //     {
  //       name: "Plan de Gestion du Temps",
  //       description: "Développement d'un plan de gestion du temps.",
  //       deliveryTime: 10,
  //       price: "499.99",
  //       revisions: 2,
  //       features: ["Analyse de temps", "Plan complet", "Suivi mensuel"],
  //     },
  //   ],
  // },
  {
    name: "Création de Sites Web pour Restaurants",
    description: "Développement de sites web pour promouvoir votre restaurant.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["site web", "restaurants", "promotion"],
    categoryId: 91,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour restaurants.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour restaurants.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Menu en ligne"],
      },
    ],
  },
  {
    name: "Design de Cartes de Visite",
    description: "Création de designs de cartes de visite professionnels.",
    medias: {
      images: [
        images[0]
      ],
      videos: [],
    },
    tags: ["design", "cartes de visite", "professionnel"],
    categoryId: 92,
    creatorId: "designer-2-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de cartes de visite.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de cartes de visite.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
  name: "Développement Web Professionnel",
  description: "Services de développement web full-stack utilisant des technologies modernes.",
  medias: {
    images: [ images[0], images[1], images[2] ],
    videos: [],
  },
  tags: ["développement web", "frontend", "backend", "full-stack"],
  categoryId: 93,
  creatorId: "dev-1-seller",
  packages: [
    {
      name: "Basique",
      description: "Développement de page d'accueil simple.",
      deliveryTime: 7,
      price: "499.99",
      revisions: 2,
      features: ["1 page", "Design réactif", "SEO basique", "Formulaire de contact"],
    },
    {
      name: "Standard",
      description: "Développement de site web multi-pages.",
      deliveryTime: 14,
      price: "999.99",
      revisions: 3,
      features: [
        "Jusqu'à 5 pages",
        "Design réactif",
        "SEO avancé",
        "Formulaire de contact",
        "Intégration CMS",
      ],
    },
    {
      name: "Premium",
      description: "Application web complète.",
      deliveryTime: 30,
      price: "2499.99",
      revisions: 5,
      features: [
        "Application web personnalisée",
        "Intégration de base de données",
        "Authentification utilisateur",
        "Tableau de bord administrateur",
        "Développement API",
        "Sécurité avancée",
      ],
    },
  ],
},
{
  name: "Design de Logo Moderne",
  description: "Services de design de logo professionnel et créatif.",
  medias: {
    images: [
      images[3], images[4], images[5]
    ],
    videos: [],
  },
  tags: ["design de logo", "branding", "design graphique"],
  categoryId: 94,
  creatorId: "dev-2-seller",
  packages: [
    {
      name: "Basique",
      description: "Design de logo simple.",
      deliveryTime: 3,
      price: "99.99",
      revisions: 2,
      features: ["2 concepts", "Fichier vectoriel", "Fichier PNG", "Révisions basiques"],
    },
    {
      name: "Professionnel",
      description: "Design de logo professionnel avec branding.",
      deliveryTime: 5,
      price: "199.99",
      revisions: 5,
      features: [
        "4 concepts",
        "Tous les fichiers sources",
        "Kit pour réseaux sociaux",
        "Guide de marque",
        "Révisions illimitées",
      ],
    },
  ],
},
{
  name: "Gestion des Réseaux Sociaux",
  description: "Gestion complète des réseaux sociaux et stratégie.",
  medias: {
    images: [
      images[6], images[7], images[8]
    ],
    videos: [],
  },
  tags: ["réseaux sociaux", "marketing", "création de contenu"],
  categoryId: 95,
  creatorId: "dev-3-seller",
  packages: [
    {
      name: "Starter",
      description: "Gestion basique des réseaux sociaux.",
      deliveryTime: 30,
      price: "299.99",
      revisions: 2,
      features: [
        "3 posts par semaine",
        "Analytique basique",
        "2 plateformes",
        "Calendrier de contenu",
      ],
    },
    {
      name: "Business",
      description: "Gestion complète des réseaux sociaux.",
      deliveryTime: 30,
      price: "599.99",
      revisions: 4,
      features: [
        "Posts quotidiens",
        "Analytique avancée",
        "4 plateformes",
        "Calendrier de contenu",
        "Gestion de communauté",
        "Rapport mensuel",
      ],
    },
  ],
},
{
  name: "Consultation en Marketing Digital",
  description: "Stratégies de marketing digital pour booster votre entreprise.",
  medias: {
    images: [
      images[9], images[10], images[11]
    ],
    videos: [],
  },
  tags: ["marketing digital", "consultation", "stratégie"],
  categoryId: 96,
  creatorId: "dev-4-seller",
  packages: [
    {
      name: "Analyse de Base",
      description: "Analyse de votre présence en ligne actuelle.",
      deliveryTime: 5,
      price: "199.99",
      revisions: 1,
      features: ["Rapport d'analyse", "Recommandations"],
    },
    {
      name: "Stratégie Complète",
      description: "Plan de marketing digital sur mesure.",
      deliveryTime: 10,
      price: "499.99",
      revisions: 3,
      features: ["Rapport d'analyse", "Plan stratégique", "Suivi mensuel"],
    },
  ],
},
  {
    name: "Développement Web Professionnel",
    description: "Services de développement web full-stack utilisant des technologies modernes.",
    medias: {
      images: [ images[0], images[1], images[2] ],
      videos: [],
    },
    tags: ["développement web", "frontend", "backend", "full-stack"],
    categoryId: 97,
    creatorId: "dev-1-seller",
    packages: [
      {
        name: "Basique",
        description: "Développement de page d'accueil simple.",
        deliveryTime: 7,
        price: "499.99",
        revisions: 2,
        features: ["1 page", "Design réactif", "SEO basique", "Formulaire de contact"],
      },
      {
        name: "Standard",
        description: "Développement de site web multi-pages.",
        deliveryTime: 14,
        price: "999.99",
        revisions: 3,
        features: [
          "Jusqu'à 5 pages",
          "Design réactif",
          "SEO avancé",
          "Formulaire de contact",
          "Intégration CMS",
        ],
      },
      {
        name: "Premium",
        description: "Application web complète.",
        deliveryTime: 30,
        price: "2499.99",
        revisions: 5,
        features: [
          "Application web personnalisée",
          "Intégration de base de données",
          "Authentification utilisateur",
          "Tableau de bord administrateur",
          "Développement API",
          "Sécurité avancée",
        ],
      },
    ],
  },
  {
    name: "Design de Logo Moderne",
    description: "Services de design de logo professionnel et créatif.",
    medias: {
      images: [
        images[3], images[4], images[5]
      ],
      videos: [],
    },
    tags: ["design de logo", "branding", "design graphique"],
    categoryId: 98,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Basique",
        description: "Design de logo simple.",
        deliveryTime: 3,
        price: "99.99",
        revisions: 2,
        features: ["2 concepts", "Fichier vectoriel", "Fichier PNG", "Révisions basiques"],
      },
      {
        name: "Professionnel",
        description: "Design de logo professionnel avec branding.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 5,
        features: [
          "4 concepts",
          "Tous les fichiers sources",
          "Kit pour réseaux sociaux",
          "Guide de marque",
          "Révisions illimitées",
        ],
      },
    ],
  },
  {
    name: "Gestion des Réseaux Sociaux",
    description: "Gestion complète des réseaux sociaux et stratégie.",
    medias: {
      images: [
        images[6], images[7], images[8]
      ],
      videos: [],
    },
    tags: ["réseaux sociaux", "marketing", "création de contenu"],
    categoryId: 99,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Starter",
        description: "Gestion basique des réseaux sociaux.",
        deliveryTime: 30,
        price: "299.99",
        revisions: 2,
        features: [
          "3 posts par semaine",
          "Analytique basique",
          "2 plateformes",
          "Calendrier de contenu",
        ],
      },
      {
        name: "Business",
        description: "Gestion complète des réseaux sociaux.",
        deliveryTime: 30,
        price: "599.99",
        revisions: 4,
        features: [
          "Posts quotidiens",
          "Analytique avancée",
          "4 plateformes",
          "Calendrier de contenu",
          "Gestion de communauté",
          "Rapport mensuel",
        ],
      },
    ],
  },
  {
    name: "Consultation en Marketing Digital",
    description: "Stratégies de marketing digital pour booster votre entreprise.",
    medias: {
      images: [
        images[9], images[10], images[11]
      ],
      videos: [],
    },
    tags: ["marketing digital", "consultation", "stratégie"],
    categoryId: 100,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Analyse de Base",
        description: "Analyse de votre présence en ligne actuelle.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Rapport d'analyse", "Recommandations"],
      },
      {
        name: "Stratégie Complète",
        description: "Plan de marketing digital sur mesure.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 3,
        features: ["Rapport d'analyse", "Plan stratégique", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu Vidéo",
    description: "Production de vidéos professionnelles pour votre marque.",
    medias: {
      images: [
        images[12], images[13], images[14]
      ],
      videos: [],
    },
    tags: ["vidéo", "production", "contenu"],
    categoryId: 101,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Vidéo Courte",
        description: "Vidéo promotionnelle de 30 secondes.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["30 secondes", "Montage basique", "Musique de fond"],
      },
      {
        name: "Vidéo Longue",
        description: "Vidéo d'entreprise de 2 minutes.",
        deliveryTime: 14,
        price: "799.99",
        revisions: 3,
        features: ["2 minutes", "Montage avancé", "Effets spéciaux"],
      },
    ],
  },
  {
    name: "Traduction Professionnelle",
    description: "Services de traduction précis et rapides pour tous vos documents.",
    medias: {
      images: [
        images[15], images[16], images[17]
      ],
      videos: [],
    },
    tags: ["traduction", "langues", "documents"],
    categoryId: 102,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Traduction de Base",
        description: "Traduction de documents jusqu'à 1000 mots.",
        deliveryTime: 3,
        price: "49.99",
        revisions: 1,
        features: ["1000 mots", "Révision incluse"],
      },
      {
        name: "Traduction Avancée",
        description: "Traduction de documents jusqu'à 5000 mots.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["5000 mots", "Révision incluse", "Livraison rapide"],
      },
    ],
  },
  {
    name: "Photographie de Produit",
    description: "Photographie professionnelle pour mettre en valeur vos produits.",
    medias: {
      images: [
        images[18], images[19], images[20]
      ],
      videos: [],
    },
    tags: ["photographie", "produit", "professionnel"],
    categoryId: 103,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Pack Basique",
        description: "Photographie de 5 produits.",
        deliveryTime: 5,
        price: "149.99",
        revisions: 1,
        features: ["5 produits", "Retouche basique"],
      },
      {
        name: "Pack Avancé",
        description: "Photographie de 10 produits.",
        deliveryTime: 10,
        price: "299.99",
        revisions: 2,
        features: ["10 produits", "Retouche avancée", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Développement d'Applications Mobiles",
    description: "Création d'applications mobiles sur mesure pour Android et iOS.",
    medias: {
      images: [
        images[8], images[3], images[16]
      ],
      videos: [],
    },
    tags: ["applications mobiles", "Android", "iOS"],
    categoryId: 104,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Application Simple",
        description: "Développement d'une application mobile simple.",
        deliveryTime: 30,
        price: "1999.99",
        revisions: 3,
        features: ["Application simple", "Design personnalisé"],
      },
      {
        name: "Application Complexe",
        description: "Développement d'une application mobile complexe.",
        deliveryTime: 60,
        price: "4999.99",
        revisions: 5,
        features: ["Application complexe", "Fonctionnalités avancées", "Support multi-plateforme"],
      },
    ],
  },
  {
    name: "SEO et Optimisation de Site Web",
    description: "Améliorez la visibilité de votre site web avec nos services SEO.",
    medias: {
      images: [
        images[2], images[5], images[6]
      ],
      videos: [],
    },
    tags: ["SEO", "optimisation", "site web"],
    categoryId: 105,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "SEO Basique",
        description: "Optimisation SEO de base pour votre site web.",
        deliveryTime: 10,
        price: "299.99",
        revisions: 2,
        features: ["Audit SEO", "Optimisation des mots-clés"],
      },
      {
        name: "SEO Avancé",
        description: "Optimisation SEO avancée pour votre site web.",
        deliveryTime: 20,
        price: "599.99",
        revisions: 3,
        features: ["Audit SEO complet", "Optimisation des mots-clés", "Rapport de performance"],
      },
    ],
  },
  {
    name: "Création de Sites E-commerce",
    description: "Développement de sites e-commerce performants et sécurisés.",
    medias: {
      images: [
        images[2], images[3], images[8]
      ],
      videos: [],
    },
    tags: ["e-commerce", "site web", "développement"],
    categoryId: 106,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Boutique en Ligne Basique",
        description: "Création d'une boutique en ligne simple.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 2,
        features: ["Boutique simple", "Paiement sécurisé"],
      },
      {
        name: "Boutique en Ligne Avancée",
        description: "Création d'une boutique en ligne avancée.",
        deliveryTime: 40,
        price: "1999.99",
        revisions: 4,
        features: ["Boutique avancée", "Fonctionnalités personnalisées", "Support multi-langue"],
      },
    ],
  },
  {
    name: "Consultation en Stratégie d'Entreprise",
    description: "Conseils stratégiques pour améliorer la performance de votre entreprise.",
    medias: {
      images: [
        images[15]
      ],
      videos: [],
    },
    tags: ["stratégie", "entreprise", "consultation"],
    categoryId: 107,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse initiale de votre stratégie d'entreprise.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse stratégique", "Recommandations"],
      },
      {
        name: "Plan Stratégique Complet",
        description: "Développement d'un plan stratégique complet.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse stratégique", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Blog",
    description: "Rédaction de contenu engageant pour votre blog.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["blog", "contenu", "rédaction"],
    categoryId: 108,
    creatorId: "designer-2-seller",
    packages: [
      {
        name: "Article Court",
        description: "Rédaction d'un article de blog de 500 mots.",
        deliveryTime: 3,
        price: "49.99",
        revisions: 1,
        features: ["500 mots", "SEO optimisé"],
      },
      {
        name: "Article Long",
        description: "Rédaction d'un article de blog de 1500 mots.",
        deliveryTime: 7,
        price: "149.99",
        revisions: 2,
        features: ["1500 mots", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Design Graphique pour Médias Sociaux",
    description: "Création de visuels attrayants pour vos réseaux sociaux.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["design graphique", "médias sociaux", "visuels"],
    categoryId: 109,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Pack Basique",
        description: "Création de 5 visuels pour médias sociaux.",
        deliveryTime: 5,
        price: "99.99",
        revisions: 1,
        features: ["5 visuels", "Design personnalisé"],
      },
      {
        name: "Pack Avancé",
        description: "Création de 10 visuels pour médias sociaux.",
        deliveryTime: 10,
        price: "199.99",
        revisions: 2,
        features: ["10 visuels", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Développement de Logiciels Personnalisés",
    description: "Création de logiciels sur mesure pour répondre à vos besoins spécifiques.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["développement logiciel", "personnalisé", "sur mesure"],
    categoryId: 110,
    creatorId: "designer-4-seller",
    packages: [
      {
        name: "Logiciel Simple",
        description: "Développement d'un logiciel simple.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 3,
        features: ["Logiciel simple", "Interface utilisateur"],
      },
      {
        name: "Logiciel Complexe",
        description: "Développement d'un logiciel complexe.",
        deliveryTime: 60,
        price: "5999.99",
        revisions: 5,
        features: ["Logiciel complexe", "Fonctionnalités avancées", "Support multi-plateforme"],
      },
    ],
  },
  {
    name: "Formation en Ligne sur le Marketing",
    description: "Cours en ligne pour maîtriser les techniques de marketing moderne.",
    medias: {
      images: [
        images[15]
      ],
      videos: [],
    },
    tags: ["formation", "marketing", "en ligne"],
    categoryId: 111,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Cours de Base",
        description: "Introduction aux concepts de base du marketing.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 1,
        features: ["Cours vidéo", "Matériel téléchargeable"],
      },
      {
        name: "Cours Avancé",
        description: "Techniques avancées de marketing digital.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 2,
        features: ["Cours vidéo", "Matériel téléchargeable", "Accès à vie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de Projet",
    description: "Optimisez vos projets avec nos services de gestion de projet.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["gestion de projet", "consultation", "optimisation"],
    categoryId: 112,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de projet actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de projet", "Recommandations"],
      },
      {
        name: "Plan de Gestion Complet",
        description: "Développement d'un plan de gestion de projet complet.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de projet", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web Responsifs",
    description: "Développement de sites web adaptatifs pour tous les appareils.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["site web", "responsif", "développement"],
    categoryId: 113,
    creatorId: "designer-7-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple et responsif.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design responsif"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé et responsif.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design responsif", "Fonctionnalités personnalisées"],
      },
    ],
  },
  {
    name: "Design d'Intérieur Virtuel",
    description: "Conception d'espaces intérieurs en 3D pour visualiser vos projets.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["design d'intérieur", "3D", "virtuel"],
    categoryId: 114,
    creatorId: "designer-8-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Conception d'un espace intérieur simple.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["Design 3D", "Visualisation"],
      },
      {
        name: "Design Complet",
        description: "Conception d'un espace intérieur complet.",
        deliveryTime: 14,
        price: "599.99",
        revisions: 3,
        features: ["Design 3D", "Visualisation", "Plan détaillé"],
      },
    ],
  },
  {
    name: "Consultation en Finances Personnelles",
    description: "Optimisez vos finances avec nos conseils personnalisés.",
    medias: {
      images: [
        images[15]
      ],
      videos: [],
    },
    tags: ["finances", "personnelles", "consultation"],
    categoryId: 115,
    creatorId: "designer-9-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre situation financière actuelle.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Analyse financière", "Recommandations"],
      },
      {
        name: "Plan Financier Complet",
        description: "Développement d'un plan financier personnalisé.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Analyse financière", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Présentations Professionnelles",
    description: "Conception de présentations percutantes pour vos réunions.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["présentation", "professionnelle", "conception"],
    categoryId: 116,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Présentation Basique",
        description: "Création d'une présentation de 10 diapositives.",
        deliveryTime: 3,
        price: "99.99",
        revisions: 1,
        features: ["10 diapositives", "Design personnalisé"],
      },
      {
        name: "Présentation Avancée",
        description: "Création d'une présentation de 20 diapositives.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["20 diapositives", "Design personnalisé", "Animations"],
      },
    ],
  },
  {
    name: "Développement de Jeux Vidéo",
    description: "Création de jeux vidéo captivants pour toutes les plateformes.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["jeux vidéo", "développement", "plateformes"],
    categoryId: 117,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Jeu Simple",
        description: "Développement d'un jeu vidéo simple.",
        deliveryTime: 30,
        price: "2999.99",
        revisions: 3,
        features: ["Jeu simple", "Graphismes basiques"],
      },
      {
        name: "Jeu Complexe",
        description: "Développement d'un jeu vidéo complexe.",
        deliveryTime: 60,
        price: "5999.99",
        revisions: 5,
        features: ["Jeu complexe", "Graphismes avancés", "Multijoueur"],
      },
    ],
  },
  {
    name: "Consultation en Développement Personnel",
    description: "Atteignez vos objectifs personnels avec nos conseils experts.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["développement personnel", "consultation", "objectifs"],
    categoryId: 118,
    creatorId: "dev-1-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de vos objectifs personnels actuels.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Analyse personnelle", "Recommandations"],
      },
      {
        name: "Plan de Développement Complet",
        description: "Développement d'un plan de développement personnel.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Analyse personnelle", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Artistes",
    description: "Développement de sites web personnalisés pour artistes.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["site web", "artistes", "personnalisé"],
    categoryId: 119,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour artistes.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour artistes.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Galerie d'art"],
      },
    ],
  },
  {
    name: "Design de Mode et Stylisme",
    description: "Création de designs de mode uniques et conseils en stylisme.",
    medias: {
      images: [
        images[18]
      ],
      videos: [],
    },
    tags: ["design de mode", "stylisme", "création"],
    categoryId: 120,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de mode.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["3 designs", "Conseils en stylisme"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de mode.",
        deliveryTime: 14,
        price: "599.99",
        revisions: 3,
        features: ["6 designs", "Conseils en stylisme", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Nutrition et Bien-être",
    description: "Améliorez votre santé avec nos conseils en nutrition.",
    medias: {
      images: [
        images[20]
      ],
      videos: [],
    },
    tags: ["nutrition", "bien-être", "consultation"],
    categoryId: 121,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre régime alimentaire actuel.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["Analyse nutritionnelle", "Recommandations"],
      },
      {
        name: "Plan Nutritionnel Complet",
        description: "Développement d'un plan nutritionnel personnalisé.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Analyse nutritionnelle", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Podcasts",
    description: "Production de contenu engageant pour vos podcasts.",
    medias: {
      images: [
        images[5]
      ],
      videos: [],
    },
    tags: ["podcasts", "contenu", "production"],
    categoryId: 122,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Épisode Court",
        description: "Production d'un épisode de podcast de 15 minutes.",
        deliveryTime: 3,
        price: "99.99",
        revisions: 1,
        features: ["15 minutes", "Montage audio"],
      },
      {
        name: "Épisode Long",
        description: "Production d'un épisode de podcast de 45 minutes.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["45 minutes", "Montage audio", "Musique de fond"],
      },
    ],
  },
  {
    name: "Consultation en Développement Durable",
    description: "Stratégies pour intégrer le développement durable dans votre entreprise.",
    medias: {
      images: [
        images[7]
      ],
      videos: [],
    },
    tags: ["développement durable", "consultation", "stratégies"],
    categoryId: 123,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre impact environnemental actuel.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse environnementale", "Recommandations"],
      },
      {
        name: "Plan de Développement Durable",
        description: "Développement d'un plan de développement durable.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse environnementale", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Événements",
    description: "Développement de sites web pour promouvoir vos événements.",
    medias: {
      images: [
        images[19]
      ],
      videos: [],
    },
    tags: ["site web", "événements", "promotion"],
    categoryId: 124,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour événements.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour événements.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Calendrier d'événements"],
      },
    ],
  },
  {
    name: "Design de Packaging",
    description: "Création de designs de packaging innovants pour vos produits.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["design", "packaging", "produits"],
    categoryId: 125,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de packaging.",
        deliveryTime: 7,
        price: "299.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de packaging.",
        deliveryTime: 14,
        price: "599.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Sécurité Informatique",
    description: "Protégez vos données avec nos services de sécurité informatique.",
    medias: {
      images: [
        images[8]
      ],
      videos: [],
    },
    tags: ["sécurité informatique", "consultation", "protection"],
    categoryId: 126,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "Audit de Sécurité",
        description: "Analyse de la sécurité de votre infrastructure informatique.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Audit de sécurité", "Recommandations"],
      },
      {
        name: "Plan de Sécurité Complet",
        description: "Développement d'un plan de sécurité informatique.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Audit de sécurité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Réseaux Sociaux",
    description: "Production de contenu engageant pour vos réseaux sociaux.",
    medias: {
      images: [
        images[9]
      ],
      videos: [],
    },
    tags: ["réseaux sociaux", "contenu", "production"],
    categoryId: 127,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Pack Basique",
        description: "Création de 5 posts pour réseaux sociaux.",
        deliveryTime: 5,
        price: "99.99",
        revisions: 1,
        features: ["5 posts", "Design personnalisé"],
      },
      {
        name: "Pack Avancé",
        description: "Création de 10 posts pour réseaux sociaux.",
        deliveryTime: 10,
        price: "199.99",
        revisions: 2,
        features: ["10 posts", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  // {
  //   name: "Consultation en Gestion du Temps",
  //   description: "Optimisez votre emploi du temps avec nos conseils en gestion du temps.",
  //   medias: {
  //     images: [
  //       images[10]
  //     ],
  //     videos: [],
  //   },
  //   tags: ["gestion du temps", "consultation", "optimisation"],
  //   categoryId: 128,
  //   creatorId: "dev-10-seller ",
  //   packages: [
  //     {
  //       name: "Consultation Initiale",
  //       description: "Analyse de votre gestion du temps actuelle.",
  //       deliveryTime: 5,
  //       price: "199.99",
  //       revisions: 1,
  //       features: ["Analyse de temps", "Recommandations"],
  //     },
  //     {
  //       name: "Plan de Gestion du Temps",
  //       description: "Développement d'un plan de gestion du temps.",
  //       deliveryTime: 10,
  //       price: "499.99",
  //       revisions: 2,
  //       features: ["Analyse de temps", "Plan complet", "Suivi mensuel"],
  //     },
  //   ],
  // },
  {
    name: "Création de Sites Web pour Restaurants",
    description: "Développement de sites web pour promouvoir votre restaurant.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["site web", "restaurants", "promotion"],
    categoryId: 128,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour restaurants.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour restaurants.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Menu en ligne"],
      },
    ],
  },
 
  {
    name: "Consultation en Gestion des Ressources Humaines",
    description: "Optimisez la gestion de vos ressources humaines avec nos conseils.",
    medias: {
      images: [
        images[22]
      ],
      videos: [],
    },
    tags: ["ressources humaines", "consultation", "gestion"],
    categoryId: 131,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion des ressources humaines actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse RH", "Recommandations"],
      },
      {
        name: "Plan de Gestion RH",
        description: "Développement d'un plan de gestion des ressources humaines.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse RH", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  // {
  //   name: "Création de Contenu pour Newsletters",
  //   description: "Production de contenu engageant pour vos newsletters.",
  //   medias: {
  //     images: [
  //       images[24]
  //     ],
  //     videos: [],
  //   },
  //   tags: ["newsletters", "contenu", "production"],
  //   categoryId: 132,
  //   creatorId: "designer-4-seller",
  //   packages: [
  //     {
  //       name: "Newsletter Courte",
  //       description: "Création d'une newsletter de 500 mots.",
  //       deliveryTime: 3,
  //       price: "49.99",
  //       revisions: 1,
  //       features: ["500 mots", "Design personnalisé"],
  //     },
  //     {
  //       name: "Newsletter Longue",
  //       description: "Création d'une newsletter de 1500 mots.",
  //       deliveryTime: 7,
  //       price: "149.99",
  //       revisions: 2,
  //       features: ["1500 mots", "Design personnalisé", "SEO optimisé"],
  //     },
  //   ],
  // },
  {
    name: "Consultation en Gestion de la Chaîne d'Approvisionnement",
    description: "Optimisez votre chaîne d'approvisionnement avec nos conseils.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["chaîne d'approvisionnement", "consultation", "gestion"],
    categoryId: 133,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre chaîne d'approvisionnement actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de chaîne", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Chaîne",
        description: "Développement d'un plan de gestion de la chaîne d'approvisionnement.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de chaîne", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Écoles",
    description: "Développement de sites web pour promouvoir votre école.",
    medias: {
      images: [
        images[21]
      ],
      videos: [],
    },
    tags: ["site web", "écoles", "promotion"],
    categoryId: 134,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour écoles.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour écoles.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Calendrier scolaire"],
      },
    ],
  },
  {
    name: "Design de Flyers Publicitaires",
    description: "Création de designs de flyers publicitaires percutants.",
    medias: {
      images: [
        images[7]
      ],
      videos: [],
    },
    tags: ["design", "flyers", "publicitaires"],
    categoryId: 135,
    creatorId: "designer-7-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de flyers.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de flyers.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Qualité",
    description: "Améliorez la qualité de vos produits avec nos conseils.",
    medias: {
      images: [
        images[19]
      ],
      videos: [],
    },
    tags: ["gestion de la qualité", "consultation", "amélioration"],
    categoryId: 136,
    creatorId: "designer-8-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la qualité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de qualité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Qualité",
        description: "Développement d'un plan de gestion de la qualité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de qualité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites Web",
    description: "Production de contenu engageant pour votre site web.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["site web", "contenu", "production"],
    categoryId: 137,
    creatorId: "designer-9-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site web.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site web.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de l'Innovation",
    description: "Stimulez l'innovation dans votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[21]
      ],
      videos: [],
    },
    tags: ["gestion de l'innovation", "consultation", "stimulation"],
    categoryId: 138,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de l'innovation actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse d'innovation", "Recommandations"],
      },
      {
        name: "Plan de Gestion de l'Innovation",
        description: "Développement d'un plan de gestion de l'innovation.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse d'innovation", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  // {
  //   name: "Création de Sites Web pour ONG",
  //   description: "Développement de sites web pour promouvoir votre ONG.",
  //   medias: {
  //     images: [
  //       images[7]
  //     ],
  //     videos: [],
  //   },
  //   tags: ["site web", "ONG", "promotion"],
  //   categoryId: 139,
  //   creatorId: "dev-1-seller  ",
  //   packages: [
  //     {
  //       name: "Site Basique",
  //       description: "Création d'un site web simple pour ONG.",
  //       deliveryTime: 10,
  //       price: "499.99",
  //       revisions: 2,
  //       features: ["Site simple", "Design personnalisé"],
  //     },
  //     {
  //       name: "Site Avancé",
  //       description: "Création d'un site web avancé pour ONG.",
  //       deliveryTime: 20,
  //       price: "999.99",
  //       revisions: 3,
  //       features: ["Site avancé", "Design personnalisé", "Calendrier d'événements"],
  //     },
  //   ],
  // },
  {
    name: "Design de Brochures",
    description: "Création de designs de brochures informatives et attrayantes.",
    medias: {
      images: [
        images[19]
      ],
      videos: [],
    },
    tags: ["design", "brochures", "informative"],
    categoryId: 140,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de brochures.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de brochures.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion des Risques",
    description: "Identifiez et gérez les risques dans votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[21]
      ],
      videos: [],
    },
    tags: ["gestion des risques", "consultation", "identification"],
    categoryId: 141,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion des risques actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de risques", "Recommandations"],
      },
      {
        name: "Plan de Gestion des Risques",
        description: "Développement d'un plan de gestion des risques.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de risques", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Vidéos YouTube",
    description: "Production de contenu engageant pour votre chaîne YouTube.",
    medias: {
      images: [
        images[7]
      ],
      videos: [],
    },
    tags: ["YouTube", "contenu", "production"],
    categoryId: 142,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Vidéo Courte",
        description: "Production d'une vidéo de 5 minutes.",
        deliveryTime: 3,
        price: "99.99",
        revisions: 1,
        features: ["5 minutes", "Montage vidéo"],
      },
      {
        name: "Vidéo Longue",
        description: "Production d'une vidéo de 15 minutes.",
        deliveryTime: 7,
        price: "199.99",
        revisions: 2,
        features: ["15 minutes", "Montage vidéo", "Musique de fond"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Relation Client",
    description: "Améliorez la relation avec vos clients grâce à nos conseils.",
    medias: {
      images: [
        images[19]
      ],
      videos: [],
    },
    tags: ["relation client", "consultation", "amélioration"],
    categoryId: 143,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la relation client actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de relation", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Relation Client",
        description: "Développement d'un plan de gestion de la relation client.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de relation", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Startups",
    description: "Développement de sites web pour promouvoir votre startup.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["site web", "startups", "promotion"],
    categoryId: 144,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour startups.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour startups.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Fonctionnalités personnalisées"],
      },
    ],
  },
  {
    name: "Design de Logos pour Entreprises",
    description: "Création de designs de logos uniques pour votre entreprise.",
    medias: {
      images: [
        images[21]
      ],
      videos: [],
    },
    tags: ["design", "logos", "entreprises"],
    categoryId: 145,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de logos.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de logos.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Performance",
    description: "Améliorez la performance de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[7]
      ],
      videos: [],
    },
    tags: ["gestion de la performance", "consultation", "amélioration"],
    categoryId: 146,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la performance actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de performance", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Performance",
        description: "Développement d'un plan de gestion de la performance.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de performance", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Livres Électroniques",
    description: "Production de contenu engageant pour vos livres électroniques.",
    medias: {
      images: [
        images[9]
      ],
      videos: [],
    },
    tags: ["livres électroniques", "contenu", "production"],
    categoryId: 147,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "Livre Court",
        description: "Création d'un livre électronique de 5000 mots.",
        deliveryTime: 10,
        price: "299.99",
        revisions: 1,
        features: ["5000 mots", "Design personnalisé"],
      },
      {
        name: "Livre Long",
        description: "Création d'un livre électronique de 15000 mots.",
        deliveryTime: 20,
        price: "599.99",
        revisions: 2,
        features: ["15000 mots", "Design personnalisé", "SEO optimisé"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Changement",
    description: "Gérez efficacement le changement dans votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[10]
      ],
      videos: [],
    },
    tags: ["gestion du changement", "consultation", "efficacité"],
    categoryId: 148,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion du changement actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de changement", "Recommandations"],
      },
      {
        name: "Plan de Gestion du Changement",
        description: "Développement d'un plan de gestion du changement.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de changement", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Photographes",
    description: "Développement de sites web pour promouvoir votre portfolio de photographie.",
    medias: {
      images: [
        images[21]
      ],
      videos: [],
    },
    tags: ["site web", "photographes", "portfolio"],
    categoryId: 149,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour photographes.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour photographes.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Galerie de photos"],
      },
    ],
  },
  {
    name: "Design de T-Shirts Personnalisés",
    description: "Création de designs uniques pour vos t-shirts personnalisés.",
    medias: {
      images: [
        images[7]
      ],
      videos: [],
    },
    tags: ["design", "t-shirts", "personnalisés"],
    categoryId: 150,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de t-shirts.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de t-shirts.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Conformité",
    description: "Assurez la conformité de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["gestion de la conformité", "consultation", "assurance"],
    categoryId: 151,
    creatorId: "designer-2-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la conformité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de conformité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Conformité",
        description: "Développement d'un plan de gestion de la conformité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de conformité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Magazines",
    description: "Production de contenu engageant pour vos magazines.",
    medias: {
      images: [
        images[4 ]
      ],
      videos: [],
    },
    tags: ["magazines", "contenu", "production"],
    categoryId: 152,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Article Court",
        description: "Rédaction d'un article de magazine de 500 mots.",
        deliveryTime: 3,
        price: "49.99",
        revisions: 1,
        features: ["500 mots", "SEO optimisé"],
      },
      {
        name: "Article Long",
        description: "Rédaction d'un article de magazine de 1500 mots.",
        deliveryTime: 7,
        price: "149.99",
        revisions: 2,
        features: ["1500 mots", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Diversité",
    description: "Favorisez la diversité dans votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[11]
      ],
      videos: [],
    },
    tags: ["gestion de la diversité", "consultation", "favorisation"],
    categoryId: 153,
    creatorId: "designer-4-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la diversité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de diversité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Diversité",
        description: "Développement d'un plan de gestion de la diversité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de diversité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Artisans",
    description: "Développement de sites web pour promouvoir votre artisanat.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["site web", "artisans", "promotion"],
    categoryId: 154,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour artisans.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour artisans.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Galerie de produits"],
      },
    ],
  },
  {
    name: "Design de Bannières Publicitaires",
    description: "Création de designs de bannières publicitaires attrayantes.",
    medias: {
      images: [
        images[4]
      ],
      videos: [],
    },
    tags: ["design", "bannières", "publicitaires"],
    categoryId: 155,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de bannières.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de bannières.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Communication",
    description: "Améliorez la communication dans votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[16]
      ],
      videos: [],
    },
    tags: ["gestion de la communication", "consultation", "amélioration"],
    categoryId: 156,  
    creatorId: "designer-7-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la communication actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de communication", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Communication",
        description: "Développement d'un plan de gestion de la communication.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de communication", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites de Commerce Électronique",
    description: "Production de contenu engageant pour votre site de commerce électronique.",
    medias: {
      images: [
        images[11]
      ],
      videos: [],
    },
    tags: ["commerce électronique", "contenu", "production"],
    categoryId: 157,
    creatorId: "designer-8-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site de commerce électronique.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site de commerce électronique.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Logistique",
    description: "Optimisez votre logistique avec nos conseils.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["gestion de la logistique", "consultation", "optimisation"],
    categoryId: 158,
    creatorId: "designer-9-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la logistique actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de logistique", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Logistique",
        description: "Développement d'un plan de gestion de la logistique.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de logistique", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Consultants",
    description: "Développement de sites web pour promouvoir vos services de consultation.",
    medias: {
      images: [
        images[4]
      ],
      videos: [],
    },
    tags: ["site web", "consultants", "promotion"],
    categoryId: 159,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour consultants.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour consultants.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Fonctionnalités personnalisées"],
      },
    ],
  },
  {
    name: "Design de Cartes de Noël",
    description: "Création de designs de cartes de Noël festives.",
    medias: {
      images: [
        images[16]
      ],
      videos: [],
    },
    tags: ["design", "cartes de Noël", "festives"],
    categoryId: 160,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de cartes de Noël.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de cartes de Noël.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Croissance",
    description: "Accélérez la croissance de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[11]
      ],
      videos: [],
    },
    tags: ["gestion de la croissance", "consultation", "accélération"],
    categoryId: 161,
    creatorId: "dev-1-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la croissance actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de croissance", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Croissance",
        description: "Développement d'un plan de gestion de la croissance.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de croissance", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites de Voyage",
    description: "Production de contenu engageant pour votre site de voyage.",
    medias: {
      images: [
        images[12]
      ],
      videos: [],
    },
    tags: ["voyage", "contenu", "production"],
    categoryId: 162,
    creatorId: "dev-2-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site de voyage.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site de voyage.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Qualité",
    description: "Améliorez la qualité de vos produits avec nos conseils.",
    medias: {
      images: [
        images[23]
      ],
      videos: [],
    },
    tags: ["gestion de la qualité", "consultation", "amélioration"],
    categoryId: 163,
    creatorId: "dev-3-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la qualité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de qualité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Qualité",
        description: "Développement d'un plan de gestion de la qualité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de qualité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Artistes",
    description: "Développement de sites web pour promouvoir vos œuvres artistiques.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["site web", "artistes", "promotion"],
    categoryId: 164,
    creatorId: "dev-4-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour artistes.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour artistes.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Galerie d'œuvres"],
      },
    ],
  },
  {
    name: "Design de Cartes de Visite",
    description: "Création de designs de cartes de visite professionnelles.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["design", "cartes de visite", "professionnelles"],
    categoryId: 165,
    creatorId: "dev-5-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de cartes de visite.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de cartes de visite.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Sécurité",
    description: "Améliorez la sécurité de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["gestion de la sécurité", "consultation", "amélioration"],
    categoryId: 166,
    creatorId: "dev-6-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la sécurité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de sécurité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Sécurité",
        description: "Développement d'un plan de gestion de la sécurité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de sécurité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Blogs",
    description: "Production de contenu engageant pour votre blog.",
    medias: {
      images: [
        images[22]
      ],
      videos: [],
    },
    tags: ["blog", "contenu", "production"],
    categoryId: 167,
    creatorId: "dev-7-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 articles de blog.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 articles", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 articles de blog.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 articles", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Durabilité",
    description: "Rendez votre entreprise plus durable avec nos conseils.",
    medias: {
      images: [
        images[16]
      ],
      videos: [],
    },
    tags: ["gestion de la durabilité", "consultation", "durabilité"],
    categoryId: 168,
    creatorId: "dev-8-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la durabilité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de durabilité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Durabilité",
        description: "Développement d'un plan de gestion de la durabilité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de durabilité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Écrivains",
    description: "Développement de sites web pour promouvoir vos œuvres littéraires.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["site web", "écrivains", "promotion"],
    categoryId: 169,
    creatorId: "dev-9-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour écrivains.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour écrivains.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Bibliothèque d'œuvres"],
      },
    ],
  },
  {
    name: "Design de Flyers Publicitaires",
    description: "Création de designs de flyers publicitaires attrayants.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["design", "flyers", "publicitaires"],
    categoryId: 170,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de flyers.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de flyers.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Chaîne d'Approvisionnement",
    description: "Optimisez votre chaîne d'approvisionnement avec nos conseils.",
    medias: {
      images: [
        images[22]
      ],
      videos: [],
    },
    tags: ["gestion de la chaîne d'approvisionnement", "consultation", "optimisation"],
    categoryId: 171,
    creatorId: "dev-10-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la chaîne d'approvisionnement actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de chaîne d'approvisionnement", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Chaîne d'Approvisionnement",
        description: "Développement d'un plan de gestion de la chaîne d'approvisionnement.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de chaîne d'approvisionnement", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites de Mode",
    description: "Production de contenu engageant pour votre site de mode.",
    medias: {
      images: [
        images[16]
      ],
      videos: [],
    },
    tags: ["mode", "contenu", "production"],
    categoryId: 172,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site de mode.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site de mode.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Performance",
    description: "Améliorez la performance de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["gestion de la performance", "consultation", "amélioration"],
    categoryId: 173,
    creatorId: "designer-2-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la performance actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de performance", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Performance",
        description: "Développement d'un plan de gestion de la performance.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de performance", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Photographes",
    description: "Développement de sites web pour promouvoir vos photographies.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["site web", "photographes", "promotion"],
    categoryId: 174,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour photographes.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour photographes.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Galerie de photos"],
      },
    ],
  },
  {
    name: "Design de Brochures Publicitaires",
    description: "Création de designs de brochures publicitaires attrayantes.",
    medias: {
      images: [
        images[22]
      ],
      videos: [],
    },
    tags: ["design", "brochures", "publicitaires"],
    categoryId: 175,
    creatorId: "designer-4-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de brochures.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de brochures.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Relation Client",
    description: "Améliorez la relation avec vos clients avec nos conseils.",
    medias: {
      images: [
        images[11]
      ],
      videos: [],
    },
    tags: ["gestion de la relation client", "consultation", "amélioration"],
    categoryId: 176,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la relation client actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de relation client", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Relation Client",
        description: "Développement d'un plan de gestion de la relation client.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de relation client", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites de Technologie",
    description: "Production de contenu engageant pour votre site de technologie.",
    medias: {
      images: [
        images[3]
      ],
      videos: [],
    },
    tags: ["technologie", "contenu", "production"],
    categoryId: 177,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site de technologie.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site de technologie.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Transformation Digitale",
    description: "Transformez votre entreprise avec nos conseils digitaux.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["gestion de la transformation digitale", "consultation", "transformation"],
    categoryId: 178,
    creatorId: "designer-7-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la transformation digitale actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de transformation digitale", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Transformation Digitale",
        description: "Développement d'un plan de gestion de la transformation digitale.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de transformation digitale", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Musiciens",
    description: "Développement de sites web pour promouvoir votre musique.",
    medias: {
      images: [
        images[2]
      ],
      videos: [],
    },
    tags: ["site web", "musiciens", "promotion"],
    categoryId: 179,
    creatorId: "designer-8-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour musiciens.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour musiciens.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Galerie de musique"],
      },
    ],
  },
  {
    name: "Design de Menus de Restaurant",
    description: "Création de designs de menus de restaurant attrayants.",
    medias: {
      images: [
        images[1]
      ],
      videos: [],
    },
    tags: ["design", "menus", "restaurant"],
    categoryId: 180,
    creatorId: "designer-9-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de menus.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de menus.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Stratégie",
    description: "Développez une stratégie gagnante avec nos conseils.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["gestion de la stratégie", "consultation", "développement"],
    categoryId: 181,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la stratégie actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de stratégie", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Stratégie",
        description: "Développement d'un plan de gestion de la stratégie.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de stratégie", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites de Santé",
    description: "Production de contenu engageant pour votre site de santé.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["santé", "contenu", "production"],
    categoryId: 182,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site de santé.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site de santé.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Conformité",
    description: "Assurez la conformité de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[0]
      ],
      videos: [],
    },
    tags: ["gestion de la conformité", "consultation", "assurance"],
    categoryId: 183,
    creatorId: "designer-10-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la conformité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de conformité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Conformité",
        description: "Développement d'un plan de gestion de la conformité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de conformité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Écoles",
    description: "Développement de sites web pour promouvoir votre école.",
    medias: {
      images: [
        images[16]
      ],
      videos: [],
    },
    tags: ["site web", "écoles", "promotion"],
    categoryId: 184,
    creatorId: "dev-1-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour écoles.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour écoles.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Portail étudiant"],
      },
    ],
  },
  {
    name: "Design de Cartes de Vœux",
    description: "Création de designs de cartes de vœux festives.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["design", "cartes de vœux", "festives"],
    categoryId: 185,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de cartes de vœux.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de cartes de vœux.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Diversité",
    description: "Favorisez la diversité dans votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["gestion de la diversité", "consultation", "favorisation"],
    categoryId: 186,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la diversité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de diversité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Diversité",
        description: "Développement d'un plan de gestion de la diversité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de diversité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites de Sport",
    description: "Production de contenu engageant pour votre site de sport.",
    medias: {
      images: [
        images[22]
      ],
      videos: [],
    },
    tags: ["sport", "contenu", "production"],
    categoryId: 187,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site de sport.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site de sport.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Responsabilité Sociale",
    description: "Améliorez votre responsabilité sociale avec nos conseils.",
    medias: {
      images: [
        images[16]
      ],
      videos: [],
    },
    tags: ["gestion de la responsabilité sociale", "consultation", "amélioration"],
    categoryId: 188,
    creatorId: "designer-1-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la responsabilité sociale actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de responsabilité sociale", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Responsabilité Sociale",
        description: "Développement d'un plan de gestion de la responsabilité sociale.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de responsabilité sociale", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour ONG",
    description: "Développement de sites web pour promouvoir votre ONG.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["site web", "ONG", "promotion"],
    categoryId: 189,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour ONG.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour ONG.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Portail de dons"],
      },
    ],
  },
  {
    name: "Design de T-shirts Personnalisés",
    description: "Création de designs de t-shirts personnalisés.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["design", "t-shirts", "personnalisés"],
    categoryId: 190,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de t-shirts.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de t-shirts.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Mobilité",
    description: "Optimisez la mobilité de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[20]
      ],
      videos: [],
    },
    tags: ["gestion de la mobilité", "consultation", "optimisation"],
    categoryId: 191,
    creatorId: "designer-3-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la mobilité actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de mobilité", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Mobilité",
        description: "Développement d'un plan de gestion de la mobilité.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de mobilité", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Contenu pour Sites de Voyage",
    description: "Production de contenu engageant pour votre site de voyage.",
    medias: {
      images: [
        images[16]
      ],
      videos: [],
    },
    tags: ["voyage", "contenu", "production"],
    categoryId: 192,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Contenu de Base",
        description: "Création de 5 pages de contenu pour site de voyage.",
        deliveryTime: 5,
        price: "199.99",
        revisions: 1,
        features: ["5 pages", "SEO optimisé"],
      },
      {
        name: "Contenu Complet",
        description: "Création de 10 pages de contenu pour site de voyage.",
        deliveryTime: 10,
        price: "399.99",
        revisions: 2,
        features: ["10 pages", "SEO optimisé", "Recherche approfondie"],
      },
    ],
  },
  {
    name: "Consultation en Gestion de la Croissance",
    description: "Accélérez la croissance de votre entreprise avec nos conseils.",
    medias: {
      images: [
        images[13]
      ],
      videos: [],
    },
    tags: ["gestion de la croissance", "consultation", "accélération"],
    categoryId: 193,
    creatorId: "designer-5-seller",
    packages: [
      {
        name: "Consultation Initiale",
        description: "Analyse de votre gestion de la croissance actuelle.",
        deliveryTime: 5,
        price: "299.99",
        revisions: 1,
        features: ["Analyse de croissance", "Recommandations"],
      },
      {
        name: "Plan de Gestion de la Croissance",
        description: "Développement d'un plan de gestion de la croissance.",
        deliveryTime: 15,
        price: "999.99",
        revisions: 3,
        features: ["Analyse de croissance", "Plan complet", "Suivi mensuel"],
      },
    ],
  },
  {
    name: "Création de Sites Web pour Consultants",
    description: "Développement de sites web pour promouvoir vos services de consultation.",
    medias: {
      images: [
        images[14]
      ],
      videos: [],
    },
    tags: ["site web", "consultants", "promotion"],
    categoryId: 194,  
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Site Basique",
        description: "Création d'un site web simple pour consultants.",
        deliveryTime: 10,
        price: "499.99",
        revisions: 2,
        features: ["Site simple", "Design personnalisé"],
      },
      {
        name: "Site Avancé",
        description: "Création d'un site web avancé pour consultants.",
        deliveryTime: 20,
        price: "999.99",
        revisions: 3,
        features: ["Site avancé", "Design personnalisé", "Fonctionnalités personnalisées"],
      },
    ],
  },
  {
    name: "Design de Cartes de Noël",
    description: "Création de designs de cartes de Noël festives.",
    medias: {
      images: [
        images[20]
      ],
      videos: [],
    },
    tags: ["design", "cartes de Noël", "festives"],
    categoryId: 195,
    creatorId: "designer-6-seller",
    packages: [
      {
        name: "Design de Base",
        description: "Création de 3 designs de cartes de Noël.",
        deliveryTime: 7,
        price: "99.99",
        revisions: 2,
        features: ["3 designs", "Design personnalisé"],
      },
      {
        name: "Design Complet",
        description: "Création de 6 designs de cartes de Noël.",
        deliveryTime: 14,
        price: "199.99",
        revisions: 3,
        features: ["6 designs", "Design personnalisé", "Livraison numérique"],
      },
    ],
  },
  {
  name: "Développement Web Professionnel",
  description: "Services de développement web full-stack utilisant des technologies modernes.",
  medias: {
    images: [ images[0], images[1], images[2] ],
    videos: [],
  },
  tags: ["développement web", "frontend", "backend", "full-stack"],
  categoryId: 196,
  creatorId: "dev-1-seller",
  packages: [
    {
      name: "Basique",
      description: "Développement de page d'accueil simple.",
      deliveryTime: 7,
      price: "499.99",
      revisions: 2,
      features: ["1 page", "Design réactif", "SEO basique", "Formulaire de contact"],
    },
    {
      name: "Standard",
      description: "Développement de site web multi-pages.",
      deliveryTime: 14,
      price: "999.99",
      revisions: 3,
      features: [
        "Jusqu'à 5 pages",
        "Design réactif",
        "SEO avancé",
        "Formulaire de contact",
        "Intégration CMS",
      ],
    },
    {
      name: "Premium",
      description: "Application web complète.",
      deliveryTime: 30,
      price: "2499.99",
      revisions: 5,
      features: [
        "Application web personnalisée",
        "Intégration de base de données",
        "Authentification utilisateur",
        "Tableau de bord administrateur",
        "Développement API",
        "Sécurité avancée",
      ],
    },
  ],
},
{
  name: "Design de Logo Moderne",
  description: "Services de design de logo professionnel et créatif.",
  medias: {
    images: [
      images[3], images[4], images[5]
    ],
    videos: [],
  },
  tags: ["design de logo", "branding", "design graphique"],
  categoryId: 196,
  creatorId: "dev-2-seller",
  packages: [
    {
      name: "Basique",
      description: "Design de logo simple.",
      deliveryTime: 3,
      price: "99.99",
      revisions: 2,
      features: ["2 concepts", "Fichier vectoriel", "Fichier PNG", "Révisions basiques"],
    },
    {
      name: "Professionnel",
      description: "Design de logo professionnel avec branding.",
      deliveryTime: 5,
      price: "199.99",
      revisions: 5,
      features: [
        "4 concepts",
        "Tous les fichiers sources",
        "Kit pour réseaux sociaux",
        "Guide de marque",
        "Révisions illimitées",
      ],
    },
  ],
},
{
  name: "Gestion des Réseaux Sociaux",
  description: "Gestion complète des réseaux sociaux et stratégie.",
  medias: {
    images: [
      images[6], images[7], images[8]
    ],
    videos: [],
  },
  tags: ["réseaux sociaux", "marketing", "création de contenu"],
  categoryId: 198,
  creatorId: "dev-3-seller",
  packages: [
    {
      name: "Starter",
      description: "Gestion basique des réseaux sociaux.",
      deliveryTime: 30,
      price: "299.99",
      revisions: 2,
      features: [
        "3 posts par semaine",
        "Analytique basique",
        "2 plateformes",
        "Calendrier de contenu",
      ],
    },
    {
      name: "Business",
      description: "Gestion complète des réseaux sociaux.",
      deliveryTime: 30,
      price: "599.99",
      revisions: 4,
      features: [
        "Posts quotidiens",
        "Analytique avancée",
        "4 plateformes",
        "Calendrier de contenu",
        "Gestion de communauté",
        "Rapport mensuel",
      ],
    },
  ],
},
{
  name: "Consultation en Marketing Digital",
  description: "Stratégies de marketing digital pour booster votre entreprise.",
  medias: {
    images: [
      images[9], images[10], images[11]
    ],
    videos: [],
  },
  tags: ["marketing digital", "consultation", "stratégie"],
  categoryId: 199,
  creatorId: "dev-4-seller",
  packages: [
    {
      name: "Analyse de Base",
      description: "Analyse de votre présence en ligne actuelle.",
      deliveryTime: 5,
      price: "199.99",
      revisions: 1,
      features: ["Rapport d'analyse", "Recommandations"],
    },
    {
      name: "Stratégie Complète",
      description: "Plan de marketing digital sur mesure.",
      deliveryTime: 10,
      price: "499.99",
      revisions: 3,
      features: ["Rapport d'analyse", "Plan stratégique", "Suivi mensuel"],
    },
  ],
},
{
  name: "Développement Web Professionnel",
  description: "Services de développement web full-stack utilisant des technologies modernes.",
  medias: {
    images: [ images[0], images[1], images[2] ],
    videos: [],
  },
  tags: ["développement web", "frontend", "backend", "full-stack"],
  categoryId: 200,
  creatorId: "dev-1-seller",
  packages: [
    {
      name: "Basique",
      description: "Développement de page d'accueil simple.",
      deliveryTime: 7,
      price: "499.99",
      revisions: 2,
      features: ["1 page", "Design réactif", "SEO basique", "Formulaire de contact"],
    },
    {
      name: "Standard",
      description: "Développement de site web multi-pages.",
      deliveryTime: 14,
      price: "999.99",
      revisions: 3,
      features: [
        "Jusqu'à 5 pages",
        "Design réactif",
        "SEO avancé",
        "Formulaire de contact",
        "Intégration CMS",
      ],
    },
    {
      name: "Premium",
      description: "Application web complète.",
      deliveryTime: 30,
      price: "2499.99",
      revisions: 5,
      features: [
        "Application web personnalisée",
        "Intégration de base de données",
        "Authentification utilisateur",
        "Tableau de bord administrateur",
        "Développement API",
        "Sécurité avancée",
      ],
    },
  ],
},
{
  name: "Design de Logo Moderne",
  description: "Services de design de logo professionnel et créatif.",
  medias: {
    images: [
      images[3], images[4], images[5]
    ],
    videos: [],
  },
  tags: ["design de logo", "branding", "design graphique"],
  categoryId: 201,
  creatorId: "dev-2-seller",
  packages: [
    {
      name: "Basique",
      description: "Design de logo simple.",
      deliveryTime: 3,
      price: "99.99",
      revisions: 2,
      features: ["2 concepts", "Fichier vectoriel", "Fichier PNG", "Révisions basiques"],
    },
    {
      name: "Professionnel",
      description: "Design de logo professionnel avec branding.",
      deliveryTime: 5,
      price: "199.99",
      revisions: 5,
      features: [
        "4 concepts",
        "Tous les fichiers sources",
        "Kit pour réseaux sociaux",
        "Guide de marque",
        "Révisions illimitées",
      ],
    },
  ],
},
{
  name: "Gestion des Réseaux Sociaux",
  description: "Gestion complète des réseaux sociaux et stratégie.",
  medias: {
    images: [
      images[6], images[7], images[8]
    ],
    videos: [],
  },
  tags: ["réseaux sociaux", "marketing", "création de contenu"],
  categoryId: 202,
  creatorId: "dev-3-seller",
  packages: [
    {
      name: "Starter",
      description: "Gestion basique des réseaux sociaux.",
      deliveryTime: 30,
      price: "299.99",
      revisions: 2,
      features: [
        "3 posts par semaine",
        "Analytique basique",
        "2 plateformes",
        "Calendrier de contenu",
      ],
    },
    {
      name: "Business",
      description: "Gestion complète des réseaux sociaux.",
      deliveryTime: 30,
      price: "599.99",
      revisions: 4,
      features: [
        "Posts quotidiens",
        "Analytique avancée",
        "4 plateformes",
        "Calendrier de contenu",
        "Gestion de communauté",
        "Rapport mensuel",
      ],
    },
  ],
},
{
  name: "Consultation en Marketing Digital",
  description: "Stratégies de marketing digital pour booster votre entreprise.",
  medias: {
    images: [
      images[9], images[10], images[11]
    ],
    videos: [],
  },
  tags: ["marketing digital", "consultation", "stratégie"],
  categoryId: 203,
  creatorId: "dev-4-seller",
  packages: [
    {
      name: "Analyse de Base",
      description: "Analyse de votre présence en ligne actuelle.",
      deliveryTime: 5,
      price: "199.99",
      revisions: 1,
      features: ["Rapport d'analyse", "Recommandations"],
    },
    {
      name: "Stratégie Complète",
      description: "Plan de marketing digital sur mesure.",
      deliveryTime: 10,
      price: "499.99",
      revisions: 3,
      features: ["Rapport d'analyse", "Plan stratégique", "Suivi mensuel"],
    },
  ],
},
{
  
  name: "Développement Web Professionnel",
  description: "Services de développement web full-stack utilisant des technologies modernes.",
  medias: {
    images: [ images[0], images[1], images[2] ],
    videos: [],
  },
  tags: ["développement web", "frontend", "backend", "full-stack"],
  categoryId: 204,
  creatorId: "dev-1-seller",
  packages: [
    {
      name: "Basique",
      description: "Développement de page d'accueil simple.",
      deliveryTime: 7,
      price: "499.99",
      revisions: 2,
      features: ["1 page", "Design réactif", "SEO basique", "Formulaire de contact"],
    },
    {
      name: "Standard",
      description: "Développement de site web multi-pages.",
      deliveryTime: 14,
      price: "999.99",
      revisions: 3,
      features: [
        "Jusqu'à 5 pages",
        "Design réactif",
        "SEO avancé",
        "Formulaire de contact",
        "Intégration CMS",
      ],
    },
    {
      name: "Premium",
      description: "Application web complète.",
      deliveryTime: 30,
      price: "2499.99",
      revisions: 5,
      features: [
        "Application web personnalisée",
        "Intégration de base de données",
        "Authentification utilisateur",
        "Tableau de bord administrateur",
        "Développement API",
        "Sécurité avancée",
      ],
    },
  ],
},


  
  // {
  //   name: "Consultation en Gestion de la Communication",
  //   description: "Améliorez la communication dans votre entreprise avec nos conseils.",
  //   medias: {
  //     images: [
  //       images[16]
  //     ],
  //     videos: [],
  //   },
  //   tags: ["gestion de la communication", "consultation", "amélioration"],
  //   categoryId: 196,
  //   creatorId: "designer-7-seller ",
  //   packages: [
  //     {
  //       name: "Consultation Initiale",
  //       description: "Analyse de votre gestion de la communication actuelle.",
  //       deliveryTime: 5,
  //       price: "299.99",
  //       revisions: 1,
  //       features: ["Analyse de communication", "Recommandations"],
  //     },
  //     {
  //       name: "Plan de Gestion de la Communication",
  //       description: "Développement d'un plan de gestion de la communication.",
  //       deliveryTime: 15,
  //       price: "999.99",
  //       revisions: 3,
  //       features: ["Analyse de communication", "Plan complet", "Suivi mensuel"],
  //     },
  //   ],
  // },
];

export async function seedServices() {
  console.log("----- Seeding: création de nouveaux services...");

  for (const serviceData of servicesData) {
    console.log(`Seeding service: ${serviceData.name}, Category ID: ${serviceData.categoryId}, Creator ID: ${serviceData.creatorId}`);
    await prisma.service.create({
      data: {
        name: serviceData.name,
        description: serviceData.description,
        medias: serviceData.medias,
        tags: serviceData.tags,
        categoryId: serviceData.categoryId,
        creatorId: serviceData.creatorId,
        packages: {
          create: serviceData.packages.map((pkg) => ({
            name: pkg.name,
            description: pkg.description,
            deliveryTime: pkg.deliveryTime,
            price: pkg.price,
            revisions: pkg.revisions,
            features: pkg.features,
          })),
        },
      },
    });
  }

  console.log("----- Services créés avec succès.");
}