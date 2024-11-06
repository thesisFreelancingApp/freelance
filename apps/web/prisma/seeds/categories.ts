import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update the interface for categories
interface CategorySeed {
  id: number;
  name: string;
  level: number;
  description: string;
  parent_id?: number;
  imageUrl?: string;
  iconUrl?: string;
  slug?: string;
}

// Example of updated category data
const allCategories: CategorySeed[] = [
  {
    id: 1,
    name: "Graphisme & Design",
    level: 1,
    description:
      "Services de conception graphique et de design pour divers besoins visuels.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/grfx.webp",
    iconUrl: "/categories/design/icon.svg",
    slug: "graphisme-design",
  },
  {
    id: 2,
    name: "Programmation & Tech",
    level: 1,
    description: "Services de développement logiciel, web et technologique.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/tech.webp",
    iconUrl: "/categories/programming/icon.svg",
    slug: "programmation-tech",
  },
  {
    id: 3,
    name: "Marketing digital",
    level: 1,
    description:
      "Stratégies et services de marketing en ligne pour promouvoir les entreprises.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/grfx.webp",
    iconUrl: "/categories/marketing/icon.svg",
    slug: "marketing-digital",
  },
  {
    id: 4,
    name: "Vidéo & Animation",
    level: 1,
    description:
      "Services de production vidéo et d'animation pour divers projets.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/video.webp",
    iconUrl: "/categories/video/icon.svg",
    slug: "video-animation",
  },
  {
    id: 5,
    name: "Rédaction & Traduction",
    level: 1,
    description:
      "Services d'écriture, de rédaction et de traduction dans diverses langues.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/redact.webp",
    iconUrl: "/categories/writing/icon.svg",
    slug: "redaction-traduction",
  },
  {
    id: 6,
    name: "Musique & Audio",
    level: 1,
    description:
      "Services liés à la production musicale et au traitement audio.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/audio.webp",
    iconUrl: "/categories/music/icon.svg",
    slug: "musique-audio",
  },
  {
    id: 7,
    name: "Business",
    level: 1,
    description: "Services de conseil et de soutien aux entreprises.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/business.webp",
    iconUrl: "/categories/business/icon.svg",
    slug: "business",
  },
  {
    id: 8,
    name: "Finance",
    level: 1,
    description:
      "Services financiers et de comptabilité pour particuliers et entreprises.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/finnn.webp",
    iconUrl: "/categories/finance/icon.svg",
    slug: "finance",
  },
  {
    id: 9,
    name: "Services d'IA",
    level: 1,
    description:
      "Services utilisant l'intelligence artificielle pour diverses applications.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/ia.webp",
    iconUrl: "/categories/ai/icon.svg",
    slug: "services-ia",
  },
  {
    id: 10,
    name: "Croissance personnelle",
    level: 1,
    description: "Services de développement personnel et de bien-être.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/croissance.webp",
    iconUrl: "/categories/personal-growth/icon.svg",
    slug: "croissance-personnelle",
  },
  {
    id: 11,
    name: "Consultations",
    level: 1,
    description: "Services de conseil dans divers domaines d'expertise.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/croissan.webp",
    iconUrl: "/categories/consulting/icon.svg",
    slug: "consultations",
  },
  {
    id: 12,
    name: "Photographie",
    level: 1,
    description:
      "Services de photographie professionnelle pour différents besoins.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/photoo.webp",
    iconUrl: "/categories/photography/icon.svg",
    slug: "photographie",
  },

  // Sous-catégories pour "Graphisme & Design"
  {
    id: 13,
    name: "Conception de logo et identité visuelle",
    level: 2,
    parent_id: 1,
    description: "Création de logos et d'identités visuelles pour les marques.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/logoachart.webp",
    iconUrl: "/categories/design/logo/icon.svg",
    slug: "logo-identite-visuelle",
  },
  {
    id: 14,
    name: "Art et illustration",
    level: 2,
    parent_id: 1,
    description: "Création d'œuvres d'art et d'illustrations personnalisées.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/illustration.webp",
    iconUrl: "/categories/design/illustration/icon.svg",
    slug: "art-illustration",
  },
  {
    id: 15,
    name: "Design UX/UI",
    level: 2,
    parent_id: 1,
    description:
      "Conception d'interfaces pour sites web et applications mobiles.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/uxui.webp",
    iconUrl: "/categories/design/web-mobile/icon.svg",
    slug: "webdesign-mobile-design",
  },
  {
    id: 16,
    name: "Infographie & impression",
    level: 2,
    parent_id: 1,
    description: "Design de produits et d'éléments pour les jeux vidéo.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/impornsss.webp",
    iconUrl: "/categories/design/gaming/icon.svg",
    slug: "produit-gaming",
  },
  /////////////////////////

  ///////////////////////////
  {
    id: 17,
    name: "Développement web",
    level: 2,
    parent_id: 2,
    description: "Création de sites et applications web.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/webdev.webp",
    iconUrl: "/categories/design/printing/icon.svg",
    slug: "design-impression",
  },
  {
    id: 18,
    name: "Développement mobile",
    level: 2,
    parent_id: 2,
    description: "Conception d'applications pour smartphones.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/mobile.webp",
    iconUrl: "/categories/design/printing/icon.svg",
    slug: "design-impression",
  },
  {
    id: 19,
    name: "Cybersécurité",
    level: 2,
    parent_id: 2,
    description: "Services de sécurité et protection de données.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/cyber.webp",
    iconUrl: "/categories/design/printing/icon.svg",
    slug: "design-impression",
  },
  {
    id: 20,
    name: "Développement de logiciels",
    level: 2,
    parent_id: 2,
    description: "Création de logiciels sur mesure.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/logicile.webp",
    iconUrl: "/categories/design/printing/icon.svg",
    slug: "design-impression",
  },
  //////////////////////////
  //////////////////////////
  // Sous-catégories pour "Marketing digital"
  {
    id: 21,
    name: "SEO & Référencement",
    level: 2,
    parent_id: 3,
    description:
      "Optimisation pour les moteurs de recherche afin d'améliorer la visibilité en ligne.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/seo.webp",
    iconUrl: "/categories/marketing/seo/icon.svg",
    slug: "seo-referencement",
  },
  {
    id: 22,
    name: "Publicité en ligne",
    level: 2,
    parent_id: 3,
    description:
      "Création et gestion de campagnes publicitaires sur les plateformes numériques.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/puben.webp",
    iconUrl: "/categories/marketing/ads/icon.svg",
    slug: "publicite-en-ligne",
  },
  {
    id: 23,
    name: "Réseaux sociaux",
    level: 2,
    parent_id: 3,
    description:
      "Stratégie de contenu et gestion de communauté sur les réseaux sociaux.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/rss.webp",
    iconUrl: "/categories/marketing/social-media/icon.svg",
    slug: "reseaux-sociaux",
  },
  {
    id: 24,
    name: "Marketing de contenu",
    level: 2,
    parent_id: 3,
    description:
      "Création et diffusion de contenu pour engager et informer les clients.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/marketi.webp",
    iconUrl: "/categories/marketing/content/icon.svg",
    slug: "marketing-de-contenu",
  },

  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////
  // Sous-catégories pour "Vidéo & Animation"
  {
    id: 25,
    name: "Montage vidéo",
    level: 2,
    parent_id: 4,
    description:
      "Édition et montage de vidéos pour une production de haute qualité.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/motage%20copie.webp",
    iconUrl: "/categories/video/editing/icon.svg",
    slug: "montage-video",
  },
  {
    id: 26,
    name: "Animation 2D/3D",
    level: 2,
    parent_id: 4,
    description:
      "Création d'animations en 2D et 3D pour divers projets visuels.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/3d.webp",
    iconUrl: "/categories/video/animation/icon.svg",
    slug: "animation-2d-3d",
  },
  {
    id: 27,
    name: "Effets visuels (VFX)",
    level: 2,
    parent_id: 4,
    description:
      "Intégration d'effets spéciaux pour améliorer la qualité visuelle.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/vfx.webp",
    iconUrl: "/categories/video/vfx/icon.svg",
    slug: "effets-visuels",
  },
  {
    id: 28,
    name: "Scénarisation",
    level: 2,
    parent_id: 4,
    description: "Écriture et conception de scripts pour des projets vidéo.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/scenrio.webp",
    iconUrl: "/categories/video/script/icon.svg",
    slug: "scenarisation",
  },
  ///////////////////////////////////÷
  ///////////////////////////////////÷
  ///////////////////////////////////÷
  // Sous-catégories pour "Rédaction & Traduction"
  {
    id: 29,
    name: "Rédaction de contenu",
    level: 2,
    parent_id: 5,
    description:
      "Création de contenu écrit pour divers types de communication.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/crcontn.webp",
    iconUrl: "/categories/writing/content/icon.svg",
    slug: "redaction-de-contenu",
  },
  {
    id: 30,
    name: "Traduction multilingue",
    level: 2,
    parent_id: 5,
    description: "Traduction professionnelle dans plusieurs langues.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/traduciton.webp",
    iconUrl: "/categories/writing/translation/icon.svg",
    slug: "traduction-multilingue",
  },
  {
    id: 31,
    name: "Correction et révision",
    level: 2,
    parent_id: 5,
    description: "Vérification et amélioration de la qualité des textes.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/crcontn.webp",
    iconUrl: "/categories/writing/proofreading/icon.svg",
    slug: "correction-revision",
  },
  {
    id: 32,
    name: "Rédaction SEO",
    level: 2,
    parent_id: 5,
    description:
      "Rédaction optimisée pour le référencement sur les moteurs de recherche.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/secooosad.webp",
    iconUrl: "/categories/writing/seo/icon.svg",
    slug: "redaction-seo",
  },
  //////////////////
  ///////////////////////
  // Sous-catégories pour "Musique & Audio"
  {
    id: 33,
    name: "Production musicale",
    level: 2,
    parent_id: 6,
    description: "Création de musiques originales pour divers projets.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/prodmus.webp",
    iconUrl: "/categories/music/production/icon.svg",
    slug: "production-musicale",
  },
  {
    id: 34,
    name: "Mixage et mastering",
    level: 2,
    parent_id: 6,
    description:
      "Amélioration et finalisation de la qualité sonore des enregistrements.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/mixah.webp",
    iconUrl: "/categories/music/mixing/icon.svg",
    slug: "mixage-mastering",
  },
  {
    id: 35,
    name: "Enregistrement vocal",
    level: 2,
    parent_id: 6,
    description:
      "Enregistrement de voix pour chansons, doublages, et autres applications.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/voix%20offf.webp",
    iconUrl: "/categories/music/vocals/icon.svg",
    slug: "enregistrement-vocal",
  },
  {
    id: 36,
    name: "Création d'effets sonores",
    level: 2,
    parent_id: 6,
    description:
      "Production d'effets sonores pour films, jeux et autres médias.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/soudn.webp",
    iconUrl: "/categories/music/sound-effects/icon.svg",
    slug: "effets-sonores",
  },
  ///////////////////////////////////
  ////////////////////////////////
  // Sous-catégories pour "Business"
  {
    id: 37,
    name: "Consulting en stratégie",
    level: 2,
    parent_id: 7,
    description:
      "Conseils stratégiques pour améliorer les performances de l'entreprise.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Fundraising.jpeg",
    iconUrl: "/categories/business/strategy/icon.svg",
    slug: "consulting-strategie",
  },
  {
    id: 38,
    name: "Gestion de projet",
    level: 2,
    parent_id: 7,
    description: "Services de planification et de coordination de projets.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Financial%20Planning%20_%20Analysis.jpeg",
    iconUrl: "/categories/business/project-management/icon.svg",
    slug: "gestion-de-projet",
  },
  {
    id: 39,
    name: "Stratégie de marque",
    level: 2,
    parent_id: 7,
    description: "Développement et gestion de l'image de marque.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Leisure%20_%20Hobbies%20Bucket.png",
    iconUrl: "/categories/business/branding/icon.svg",
    slug: "strategie-de-marque",
  },
  {
    id: 40,
    name: "Planification d'affaires",
    level: 2,
    parent_id: 7,
    description:
      "Aide à la création de plans d'affaires pour les startups et entreprises.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Corporate%20Finance.png",
    iconUrl: "/categories/business/business-planning/icon.svg",
    slug: "planification-affaires",
  },
  //////////////////////////////////////////
  //////////////////////////////////////
  // Sous-catégories pour "Finance"
  {
    id: 41,
    name: "Comptabilité",
    level: 2,
    parent_id: 8,
    description:
      "Services de comptabilité pour les particuliers et les entreprises.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Business%20Formation.jpg",
    iconUrl: "/categories/finance/accounting/icon.svg",
    slug: "comptabilite",
  },
  {
    id: 42,
    name: "Conseil fiscal",
    level: 2,
    parent_id: 8,
    description:
      "Optimisation des impôts et conseils fiscaux pour particuliers et entreprises.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Legal%20Consulting%20.jpg",
    iconUrl: "/categories/finance/tax/icon.svg",
    slug: "conseil-fiscal",
  },
  {
    id: 43,
    name: "Analyse financière",
    level: 2,
    parent_id: 8,
    description: "Évaluation de la santé financière et prévisions.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Personal%20Finance%20_%20Wealth%20Management.png",
    iconUrl: "/categories/finance/financial-analysis/icon.svg",
    slug: "analyse-financiere",
  },
  {
    id: 44,
    name: "Gestion des investissements",
    level: 2,
    parent_id: 8,
    description:
      "Conseils et gestion d'investissements pour maximiser les rendements.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Tax%20Consulting.png",
    iconUrl: "/categories/finance/investments/icon.svg",
    slug: "gestion-investissements",
  },
  /////////////////////////////////////

  /////////////////////////////////////
  // Sous-catégories pour "Services d'IA"
  {
    id: 45,
    name: "Analyse de données",
    level: 2,
    parent_id: 9,
    description:
      "Utilisation de l'IA pour extraire des insights à partir de grands ensembles de données.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/analyssss.webp",
    iconUrl: "/categories/ai/data-analysis/icon.svg",
    slug: "analyse-donnees",
  },
  {
    id: 46,
    name: "Automatisation de processus",
    level: 2,
    parent_id: 9,
    description:
      "Automatisation de tâches et de workflows à l'aide de solutions d'IA.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/autoo.webp",
    iconUrl: "/categories/ai/automation/icon.svg",
    slug: "automatisation-processus",
  },
  {
    id: 47,
    name: "Reconnaissance d'image",
    level: 2,
    parent_id: 9,
    description:
      "Analyse visuelle et reconnaissance d'images pour divers usages.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/recnn.webp",
    iconUrl: "/categories/ai/image-recognition/icon.svg",
    slug: "reconnaissance-image",
  },
  {
    id: 48,
    name: "Développement de chatbots",
    level: 2,
    parent_id: 9,
    description:
      "Création de chatbots intelligents pour améliorer le support client.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/chatbox.webp",
    iconUrl: "/categories/ai/chatbots/icon.svg",
    slug: "developpement-chatbots",
  },
  /////////////////////////////////////////
  /////////////////////////////////////////
  // Sous-catégories pour "Croissance personnelle"
  {
    id: 49,
    name: "Coaching de vie",
    level: 2,
    parent_id: 10,
    description:
      "Accompagnement pour atteindre des objectifs personnels et améliorer la qualité de vie.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/assets_1269a57212df4631b866219ba2013fa8_442107d7f8a947fb82b7ea076016892d%20(1).png",
    iconUrl: "/categories/personal-growth/life-coaching/icon.svg",
    slug: "coaching-de-vie",
  },
  {
    id: 50,
    name: "Méditation et bien-être",
    level: 2,
    parent_id: 10,
    description:
      "Techniques de méditation et bien-être pour le développement personnel.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/mediatt.webp",
    iconUrl: "/categories/personal-growth/meditation/icon.svg",
    slug: "meditation-bien-etre",
  },
  {
    id: 51,
    name: "Amélioration de la productivité",
    level: 2,
    parent_id: 10,
    description:
      "Conseils et stratégies pour une meilleure gestion du temps et de la productivité.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/assets_1269a57212df4631b866219ba2013fa8_c2395641a36d46d582a5b2628a6c5afc.png",
    iconUrl: "/categories/personal-growth/productivity/icon.svg",
    slug: "amelioration-productivite",
  },
  {
    id: 52,
    name: "Conseils en santé mentale",
    level: 2,
    parent_id: 10,
    description: "Soutien et conseils pour le bien-être mental et émotionnel.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Miscellaneous%20Bucket%20(1).png",
    iconUrl: "/categories/personal-growth/mental-health/icon.svg",
    slug: "conseils-sante-mentale",
  },
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  // Sous-catégories pour "Consultations"
  {
    id: 53,
    name: "Consultation juridique",
    level: 2,
    parent_id: 11,
    description:
      "Assistance et conseils en matière de droit pour particuliers et entreprises.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/jurdiqu.webp",
    iconUrl: "/categories/consulting/legal/icon.svg",
    slug: "consultation-juridique",
  },
  {
    id: 54,
    name: "Consultation en marketing",
    level: 2,
    parent_id: 11,
    description:
      "Stratégies et conseils pour améliorer la visibilité et les ventes.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/assets_1269a57212df4631b866219ba2013fa8_cdff0fe7e82149dda184c9f771ded575.png",
    iconUrl: "/categories/consulting/marketing/icon.svg",
    slug: "consultation-marketing",
  },
  {
    id: 55,
    name: "Consultation en technologie",
    level: 2,
    parent_id: 11,
    description:
      "Conseils en innovation technologique pour optimiser les opérations.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/techhhin.webp?t=2024-11-06T13%3A34%3A59.273Z",
    iconUrl: "/categories/consulting/technology/icon.svg",
    slug: "consultation-technologie",
  },
  {
    id: 56,
    name: "Consultation en ressources humaines",
    level: 2,
    parent_id: 11,
    description:
      "Assistance en gestion des talents et en développement des équipes.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/resss.webp",
    iconUrl: "/categories/consulting/hr/icon.svg",
    slug: "consultation-ressources-humaines",
  },
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  // Sous-catégories pour "Photographie"
  {
    id: 57,
    name: "Photographie de portrait",
    level: 2,
    parent_id: 12,
    description:
      "Photographies de portrait pour particuliers, familles et professionnels.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/People%20(1).jpg",
    iconUrl: "/categories/photography/portrait/icon.svg",
    slug: "photographie-portrait",
  },
  {
    id: 58,
    name: "Photographie de produit",
    level: 2,
    parent_id: 12,
    description:
      "Images professionnelles de produits pour le e-commerce et la publicité.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Product%20(1).jpg",
    iconUrl: "/categories/photography/product/icon.svg",
    slug: "photographie-produit",
  },
  {
    id: 59,
    name: "Photographie événementielle",
    level: 2,
    parent_id: 12,
    description:
      "Couverture photographique d'événements comme les mariages et conférences.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Fashion%20_%20Style%20bucket%20(1).png",
    iconUrl: "/categories/photography/event/icon.svg",
    slug: "photographie-evenementielle",
  },
  {
    id: 60,
    name: "Édition et retouche photo",
    level: 2,
    parent_id: 12,
    description: "Amélioration et retouche professionnelle de photos.",
    imageUrl:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Misc%20(1).jpg",
    iconUrl: "/categories/photography/editing/icon.svg",
    slug: "edition-retouche-photo",
  },
  // //////////////////////////////////////////
  // //////////////////////////////////////////
  // //////////////////////////////////////////
  // Sous-catégories pour "Conception de logo et identité visuelle"
  {
    id: 61,
    name: "Création de logo personnalisé",
    level: 3,
    parent_id: 13,
    description:
      "Conception de logos uniques et sur mesure pour les entreprises.",
    imageUrl: "/categories/design/logo/custom-logo/banner.jpg",
    iconUrl: "/categories/design/logo/custom-logo/icon.svg",
    slug: "creation-logo-personnalise",
  },
  {
    id: 62,
    name: "Développement de charte graphique",
    level: 3,
    parent_id: 13,
    description:
      "Élaboration de chartes graphiques pour une identité visuelle cohérente.",
    imageUrl: "/categories/design/logo/brand-guidelines/banner.jpg",
    iconUrl: "/categories/design/logo/brand-guidelines/icon.svg",
    slug: "developpement-charte-graphique",
  },
  {
    id: 63,
    name: "Rafraîchissement de logo",
    level: 3,
    parent_id: 13,
    description: "Modernisation et amélioration de logos existants.",
    imageUrl: "/categories/design/logo/logo-refresh/banner.jpg",
    iconUrl: "/categories/design/logo/logo-refresh/icon.svg",
    slug: "rafraichissement-logo",
  },
  // Sous-catégories pour "Art et illustration"
  {
    id: 64,
    name: "Illustration numérique",
    level: 3,
    parent_id: 14,
    description: "Création d'illustrations numériques pour divers projets.",
    imageUrl: "/categories/design/illustration/digital/banner.jpg",
    iconUrl: "/categories/design/illustration/digital/icon.svg",
    slug: "illustration-numerique",
  },
  {
    id: 65,
    name: "Illustration de livre",
    level: 3,
    parent_id: 14,
    description: "Illustrations personnalisées pour livres et couvertures.",
    imageUrl: "/categories/design/illustration/book/banner.jpg",
    iconUrl: "/categories/design/illustration/book/icon.svg",
    slug: "illustration-livre",
  },
  {
    id: 66,
    name: "Concept art",
    level: 3,
    parent_id: 14,
    description:
      "Création de concept art pour jeux vidéo, films et projets créatifs.",
    imageUrl: "/categories/design/illustration/concept/banner.jpg",
    iconUrl: "/categories/design/illustration/concept/icon.svg",
    slug: "concept-art",
  },
  // Sous-catégories pour "Design UX/UI"
  {
    id: 67,
    name: "Conception d'interface utilisateur",
    level: 3,
    parent_id: 15,
    description:
      "Création d'interfaces utilisateur intuitives pour applications web et mobiles.",
    imageUrl: "/categories/design/web-mobile/ui-design/banner.jpg",
    iconUrl: "/categories/design/web-mobile/ui-design/icon.svg",
    slug: "conception-interface-utilisateur",
  },
  {
    id: 68,
    name: "Prototypage interactif",
    level: 3,
    parent_id: 15,
    description:
      "Création de prototypes interactifs pour tester l'expérience utilisateur.",
    imageUrl: "/categories/design/web-mobile/prototyping/banner.jpg",
    iconUrl: "/categories/design/web-mobile/prototyping/icon.svg",
    slug: "prototypage-interactif",
  },
  {
    id: 69,
    name: "Recherche utilisateur",
    level: 3,
    parent_id: 15,
    description:
      "Études et analyses pour comprendre les besoins des utilisateurs.",
    imageUrl: "/categories/design/web-mobile/user-research/banner.jpg",
    iconUrl: "/categories/design/web-mobile/user-research/icon.svg",
    slug: "recherche-utilisateur",
  },
  // Sous-catégories pour "Infographie & impression"
  {
    id: 70,
    name: "Design d'affiches",
    level: 3,
    parent_id: 16,
    description:
      "Création d'affiches personnalisées pour événements et promotions.",
    imageUrl: "/categories/design/printing/posters/banner.jpg",
    iconUrl: "/categories/design/printing/posters/icon.svg",
    slug: "design-affiches",
  },
  {
    id: 71,
    name: "Création de brochures",
    level: 3,
    parent_id: 16,
    description:
      "Conception de brochures informatives pour entreprises et produits.",
    imageUrl: "/categories/design/printing/brochures/banner.jpg",
    iconUrl: "/categories/design/printing/brochures/icon.svg",
    slug: "creation-brochures",
  },
  {
    id: 72,
    name: "Infographie pour supports imprimés",
    level: 3,
    parent_id: 16,
    description:
      "Réalisation d'infographies pour affichage, brochures et autres supports.",
    imageUrl: "/categories/design/printing/infographics/banner.jpg",
    iconUrl: "/categories/design/printing/infographics/icon.svg",
    slug: "infographie-supports-imprimes",
  },
  // Sous-catégories pour "Développement web"
  {
    id: 73,
    name: "Développement de sites vitrine",
    level: 3,
    parent_id: 17,
    description:
      "Création de sites vitrine pour présenter des entreprises et services.",
    imageUrl: "/categories/programming/web-development/showcase/banner.jpg",
    iconUrl: "/categories/programming/web-development/showcase/icon.svg",
    slug: "developpement-sites-vitrine",
  },
  {
    id: 74,
    name: "Développement de e-commerce",
    level: 3,
    parent_id: 17,
    description:
      "Conception de sites de commerce en ligne pour vente de produits et services.",
    imageUrl: "/categories/programming/web-development/ecommerce/banner.jpg",
    iconUrl: "/categories/programming/web-development/ecommerce/icon.svg",
    slug: "developpement-ecommerce",
  },
  {
    id: 75,
    name: "Développement de sites web personnalisés",
    level: 3,
    parent_id: 17,
    description:
      "Création de sites web sur mesure pour répondre aux besoins spécifiques des clients.",
    imageUrl: "/categories/programming/web-development/custom/banner.jpg",
    iconUrl: "/categories/programming/web-development/custom/icon.svg",
    slug: "developpement-sites-personnalises",
  },
  // Sous-catégories pour "Développement mobile"
  {
    id: 76,
    name: "Applications iOS",
    level: 3,
    parent_id: 18,
    description: "Développement d'applications mobiles natives pour iOS.",
    imageUrl: "/categories/programming/mobile-development/ios/banner.jpg",
    iconUrl: "/categories/programming/mobile-development/ios/icon.svg",
    slug: "applications-ios",
  },
  {
    id: 77,
    name: "Applications Android",
    level: 3,
    parent_id: 18,
    description: "Développement d'applications mobiles natives pour Android.",
    imageUrl: "/categories/programming/mobile-development/android/banner.jpg",
    iconUrl: "/categories/programming/mobile-development/android/icon.svg",
    slug: "applications-android",
  },
  {
    id: 78,
    name: "Applications multiplateformes",
    level: 3,
    parent_id: 18,
    description:
      "Développement d'applications compatibles avec plusieurs plateformes.",
    imageUrl:
      "/categories/programming/mobile-development/cross-platform/banner.jpg",
    iconUrl:
      "/categories/programming/mobile-development/cross-platform/icon.svg",
    slug: "applications-multiplateformes",
  },
  // Sous-catégories pour "Cybersécurité"
  {
    id: 79,
    name: "Audit de sécurité",
    level: 3,
    parent_id: 19,
    description: "Évaluation complète de la sécurité des systèmes et réseaux.",
    imageUrl: "/categories/programming/cybersecurity/audit/banner.jpg",
    iconUrl: "/categories/programming/cybersecurity/audit/icon.svg",
    slug: "audit-securite",
  },
  {
    id: 80,
    name: "Tests de pénétration",
    level: 3,
    parent_id: 19,
    description: "Simulation d'attaques pour identifier les vulnérabilités.",
    imageUrl:
      "/categories/programming/cybersecurity/penetration-testing/banner.jpg",
    iconUrl:
      "/categories/programming/cybersecurity/penetration-testing/icon.svg",
    slug: "tests-penetration",
  },
  {
    id: 81,
    name: "Surveillance de la sécurité",
    level: 3,
    parent_id: 19,
    description:
      "Surveillance proactive pour détecter et répondre aux menaces.",
    imageUrl:
      "/categories/programming/cybersecurity/security-monitoring/banner.jpg",
    iconUrl:
      "/categories/programming/cybersecurity/security-monitoring/icon.svg",
    slug: "surveillance-securite",
  },
  // Sous-catégories pour "Développement de logiciels"
  {
    id: 82,
    name: "Logiciels sur mesure",
    level: 3,
    parent_id: 20,
    description:
      "Développement de logiciels personnalisés adaptés aux besoins spécifiques des clients.",
    imageUrl: "/categories/programming/software-development/custom/banner.jpg",
    iconUrl: "/categories/programming/software-development/custom/icon.svg",
    slug: "logiciels-sur-mesure",
  },
  {
    id: 83,
    name: "Applications de bureau",
    level: 3,
    parent_id: 20,
    description:
      "Conception d'applications de bureau pour Windows, macOS et Linux.",
    imageUrl: "/categories/programming/software-development/desktop/banner.jpg",
    iconUrl: "/categories/programming/software-development/desktop/icon.svg",
    slug: "applications-de-bureau",
  },
  {
    id: 84,
    name: "Automatisation de processus",
    level: 3,
    parent_id: 20,
    description:
      "Développement de logiciels pour automatiser les tâches et processus.",
    imageUrl:
      "/categories/programming/software-development/automation/banner.jpg",
    iconUrl: "/categories/programming/software-development/automation/icon.svg",
    slug: "automatisation-processus",
  },
  // Sous-catégories pour "SEO & Référencement"
  {
    id: 85,
    name: "Audit SEO",
    level: 3,
    parent_id: 21,
    description:
      "Analyse complète du site pour identifier les opportunités d'amélioration SEO.",
    imageUrl: "/categories/marketing/seo/audit/banner.jpg",
    iconUrl: "/categories/marketing/seo/audit/icon.svg",
    slug: "audit-seo",
  },
  {
    id: 86,
    name: "Optimisation de contenu",
    level: 3,
    parent_id: 21,
    description:
      "Amélioration des contenus pour un meilleur classement dans les moteurs de recherche.",
    imageUrl: "/categories/marketing/seo/content-optimization/banner.jpg",
    iconUrl: "/categories/marketing/seo/content-optimization/icon.svg",
    slug: "optimisation-contenu",
  },
  {
    id: 87,
    name: "SEO technique",
    level: 3,
    parent_id: 21,
    description:
      "Optimisation de l'infrastructure du site pour le SEO (vitesse, indexabilité, etc.).",
    imageUrl: "/categories/marketing/seo/technical-seo/banner.jpg",
    iconUrl: "/categories/marketing/seo/technical-seo/icon.svg",
    slug: "seo-technique",
  },

  // Sous-catégories pour "Publicité en ligne"
  {
    id: 88,
    name: "Publicité sur les réseaux sociaux",
    level: 3,
    parent_id: 22,
    description:
      "Création et gestion de campagnes publicitaires sur les réseaux sociaux.",
    imageUrl: "/categories/marketing/ads/social-media/banner.jpg",
    iconUrl: "/categories/marketing/ads/social-media/icon.svg",
    slug: "publicite-reseaux-sociaux",
  },
  {
    id: 89,
    name: "Publicité sur Google Ads",
    level: 3,
    parent_id: 22,
    description:
      "Gestion de campagnes publicitaires sur Google pour maximiser la visibilité.",
    imageUrl: "/categories/marketing/ads/google/banner.jpg",
    iconUrl: "/categories/marketing/ads/google/icon.svg",
    slug: "publicite-google-ads",
  },
  {
    id: 90,
    name: "Remarketing",
    level: 3,
    parent_id: 22,
    description:
      "Stratégies de remarketing pour cibler les utilisateurs ayant visité le site.",
    imageUrl: "/categories/marketing/ads/remarketing/banner.jpg",
    iconUrl: "/categories/marketing/ads/remarketing/icon.svg",
    slug: "remarketing",
  },
  // Sous-catégories pour "Réseaux sociaux"
  {
    id: 91,
    name: "Gestion de communauté",
    level: 3,
    parent_id: 23,
    description:
      "Gestion et animation des communautés sur les réseaux sociaux.",
    imageUrl:
      "/categories/marketing/social-media/community-management/banner.jpg",
    iconUrl: "/categories/marketing/social-media/community-management/icon.svg",
    slug: "gestion-communaute",
  },
  {
    id: 92,
    name: "Création de contenu social",
    level: 3,
    parent_id: 23,
    description:
      "Création de contenus visuels et textuels pour les réseaux sociaux.",
    imageUrl: "/categories/marketing/social-media/content-creation/banner.jpg",
    iconUrl: "/categories/marketing/social-media/content-creation/icon.svg",
    slug: "creation-contenu-social",
  },
  {
    id: 93,
    name: "Publicité sur réseaux sociaux",
    level: 3,
    parent_id: 23,
    description:
      "Mise en place de campagnes publicitaires sur les principales plateformes sociales.",
    imageUrl: "/categories/marketing/social-media/social-ads/banner.jpg",
    iconUrl: "/categories/marketing/social-media/social-ads/icon.svg",
    slug: "publicite-reseaux-sociaux",
  },
  // Sous-catégories pour "Marketing de contenu"
  {
    id: 94,
    name: "Stratégie de contenu",
    level: 3,
    parent_id: 24,
    description:
      "Développement de stratégies de contenu pour attirer et engager le public cible.",
    imageUrl: "/categories/marketing/content/strategy/banner.jpg",
    iconUrl: "/categories/marketing/content/strategy/icon.svg",
    slug: "strategie-de-contenu",
  },
  {
    id: 95,
    name: "Rédaction de blogs",
    level: 3,
    parent_id: 24,
    description:
      "Création d'articles de blog optimisés pour le SEO et pertinents pour les lecteurs.",
    imageUrl: "/categories/marketing/content/blog-writing/banner.jpg",
    iconUrl: "/categories/marketing/content/blog-writing/icon.svg",
    slug: "redaction-de-blogs",
  },
  {
    id: 96,
    name: "Content Marketing visuel",
    level: 3,
    parent_id: 24,
    description:
      "Création de visuels et d'infographies pour enrichir le contenu.",
    imageUrl: "/categories/marketing/content/visual-content/banner.jpg",
    iconUrl: "/categories/marketing/content/visual-content/icon.svg",
    slug: "content-marketing-visuel",
  },
  {
    id: 97,
    name: "Montage pour réseaux sociaux",
    level: 3,
    parent_id: 25,
    description: "Montage de vidéos optimisées pour les plateformes sociales.",
    imageUrl: "/categories/video/editing/social-media/banner.jpg",
    iconUrl: "/categories/video/editing/social-media/icon.svg",
    slug: "montage-reseaux-sociaux",
  },
  {
    id: 98,
    name: "Montage de vidéos publicitaires",
    level: 3,
    parent_id: 25,
    description: "Montage spécialisé pour les publicités et annonces vidéo.",
    imageUrl: "/categories/video/editing/ads/banner.jpg",
    iconUrl: "/categories/video/editing/ads/icon.svg",
    slug: "montage-videos-publicitaires",
  },
  {
    id: 99,
    name: "Montage documentaire",
    level: 3,
    parent_id: 25,
    description:
      "Édition et montage de documentaires pour une narration immersive.",
    imageUrl: "/categories/video/editing/documentary/banner.jpg",
    iconUrl: "/categories/video/editing/documentary/icon.svg",
    slug: "montage-documentaire",
  },
  {
    id: 100,
    name: "Animation de personnages",
    level: 3,
    parent_id: 26,
    description: "Création d'animations pour personnages en 2D et 3D.",
    imageUrl: "/categories/video/animation/character/banner.jpg",
    iconUrl: "/categories/video/animation/character/icon.svg",
    slug: "animation-personnages",
  },
  {
    id: 101,
    name: "Animation de logos",
    level: 3,
    parent_id: 26,
    description: "Animation de logos pour un branding dynamique.",
    imageUrl: "/categories/video/animation/logo/banner.jpg",
    iconUrl: "/categories/video/animation/logo/icon.svg",
    slug: "animation-logos",
  },
  {
    id: 102,
    name: "Animation explicative",
    level: 3,
    parent_id: 26,
    description: "Animations explicatives pour simplifier les idées complexes.",
    imageUrl: "/categories/video/animation/explainer/banner.jpg",
    iconUrl: "/categories/video/animation/explainer/icon.svg",
    slug: "animation-explicative",
  },
  {
    id: 103,
    name: "Effets spéciaux pour films",
    level: 3,
    parent_id: 27,
    description: "Effets visuels avancés pour les films et vidéos.",
    imageUrl: "/categories/video/vfx/film-effects/banner.jpg",
    iconUrl: "/categories/video/vfx/film-effects/icon.svg",
    slug: "effets-speciaux-films",
  },
  {
    id: 104,
    name: "Suppression d’arrière-plan",
    level: 3,
    parent_id: 27,
    description: "Élimination ou remplacement d’arrière-plans dans les vidéos.",
    imageUrl: "/categories/video/vfx/background-removal/banner.jpg",
    iconUrl: "/categories/video/vfx/background-removal/icon.svg",
    slug: "suppression-arriere-plan",
  },
  {
    id: 105,
    name: "Composition et incrustation",
    level: 3,
    parent_id: 27,
    description:
      "Incrustation d’éléments pour une composition visuelle impressionnante.",
    imageUrl: "/categories/video/vfx/compositing/banner.jpg",
    iconUrl: "/categories/video/vfx/compositing/icon.svg",
    slug: "composition-incrustation",
  },
  {
    id: 106,
    name: "Scénarios publicitaires",
    level: 3,
    parent_id: 28,
    description: "Rédaction de scripts publicitaires pour captiver l’audience.",
    imageUrl: "/categories/video/script/advertising/banner.jpg",
    iconUrl: "/categories/video/script/advertising/icon.svg",
    slug: "scenarios-publicitaires",
  },
  {
    id: 107,
    name: "Scénarisation pour vidéos explicatives",
    level: 3,
    parent_id: 28,
    description: "Écriture de scénarios pour vidéos explicatives éducatives.",
    imageUrl: "/categories/video/script/explainer/banner.jpg",
    iconUrl: "/categories/video/script/explainer/icon.svg",
    slug: "scenarisation-videos-explicatives",
  },
  {
    id: 108,
    name: "Écriture de dialogues",
    level: 3,
    parent_id: 28,
    description:
      "Création de dialogues captivants pour les personnages et récits.",
    imageUrl: "/categories/video/script/dialogue-writing/banner.jpg",
    iconUrl: "/categories/video/script/dialogue-writing/icon.svg",
    slug: "ecriture-de-dialogues",
  },
  {
    id: 109,
    name: "Rédaction d'articles",
    level: 3,
    parent_id: 29,
    description:
      "Création d'articles informatifs et engageants pour divers sujets.",
    imageUrl: "/categories/writing/content/articles/banner.jpg",
    iconUrl: "/categories/writing/content/articles/icon.svg",
    slug: "redaction-articles",
  },
  {
    id: 110,
    name: "Rédaction de contenu pour réseaux sociaux",
    level: 3,
    parent_id: 29,
    description: "Création de contenu écrit pour les plateformes sociales.",
    imageUrl: "/categories/writing/content/social-media/banner.jpg",
    iconUrl: "/categories/writing/content/social-media/icon.svg",
    slug: "contenu-reseaux-sociaux",
  },
  {
    id: 111,
    name: "Rédaction de contenu marketing",
    level: 3,
    parent_id: 29,
    description: "Contenu écrit pour promouvoir des produits ou services.",
    imageUrl: "/categories/writing/content/marketing/banner.jpg",
    iconUrl: "/categories/writing/content/marketing/icon.svg",
    slug: "contenu-marketing",
  },
  {
    id: 112,
    name: "Traduction de documents",
    level: 3,
    parent_id: 30,
    description: "Traduction de documents professionnels et académiques.",
    imageUrl: "/categories/writing/translation/documents/banner.jpg",
    iconUrl: "/categories/writing/translation/documents/icon.svg",
    slug: "traduction-documents",
  },
  {
    id: 113,
    name: "Traduction de sites web",
    level: 3,
    parent_id: 30,
    description:
      "Traduction complète de sites web pour atteindre un public international.",
    imageUrl: "/categories/writing/translation/websites/banner.jpg",
    iconUrl: "/categories/writing/translation/websites/icon.svg",
    slug: "traduction-sites-web",
  },
  {
    id: 114,
    name: "Localisation de contenu",
    level: 3,
    parent_id: 30,
    description: "Adaptation du contenu pour le rendre pertinent localement.",
    imageUrl: "/categories/writing/translation/localization/banner.jpg",
    iconUrl: "/categories/writing/translation/localization/icon.svg",
    slug: "localisation-contenu",
  },
  {
    id: 115,
    name: "Correction orthographique et grammaticale",
    level: 3,
    parent_id: 31,
    description:
      "Vérification et correction des erreurs de grammaire et d'orthographe.",
    imageUrl: "/categories/writing/proofreading/spelling-grammar/banner.jpg",
    iconUrl: "/categories/writing/proofreading/spelling-grammar/icon.svg",
    slug: "correction-orthographe-grammaire",
  },
  {
    id: 116,
    name: "Révision de style",
    level: 3,
    parent_id: 31,
    description: "Amélioration du style et de la fluidité du texte.",
    imageUrl: "/categories/writing/proofreading/style/banner.jpg",
    iconUrl: "/categories/writing/proofreading/style/icon.svg",
    slug: "revision-style",
  },
  {
    id: 117,
    name: "Correction de contenu académique",
    level: 3,
    parent_id: 31,
    description:
      "Révision spécialisée pour les articles et documents académiques.",
    imageUrl: "/categories/writing/proofreading/academic/banner.jpg",
    iconUrl: "/categories/writing/proofreading/academic/icon.svg",
    slug: "correction-academique",
  },
  {
    id: 118,
    name: "Rédaction d'articles SEO",
    level: 3,
    parent_id: 32,
    description: "Rédaction optimisée pour le SEO, avec mots-clés pertinents.",
    imageUrl: "/categories/writing/seo/articles/banner.jpg",
    iconUrl: "/categories/writing/seo/articles/icon.svg",
    slug: "redaction-articles-seo",
  },
  {
    id: 119,
    name: "Optimisation de contenu existant",
    level: 3,
    parent_id: 32,
    description:
      "Amélioration du contenu existant pour un meilleur référencement.",
    imageUrl: "/categories/writing/seo/content-optimization/banner.jpg",
    iconUrl: "/categories/writing/seo/content-optimization/icon.svg",
    slug: "optimisation-contenu-seo",
  },
  {
    id: 120,
    name: "Rédaction de fiches produits",
    level: 3,
    parent_id: 32,
    description: "Création de descriptions de produits optimisées pour le SEO.",
    imageUrl: "/categories/writing/seo/product-descriptions/banner.jpg",
    iconUrl: "/categories/writing/seo/product-descriptions/icon.svg",
    slug: "redaction-fiches-produits",
  },
  {
    id: 121,
    name: "Composition musicale sur mesure",
    level: 3,
    parent_id: 33,
    description:
      "Création de compositions musicales uniques pour des projets spécifiques.",
    imageUrl: "/categories/music/production/custom-composition/banner.jpg",
    iconUrl: "/categories/music/production/custom-composition/icon.svg",
    slug: "composition-musicale-sur-mesure",
  },
  {
    id: 122,
    name: "Musique de fond pour vidéos",
    level: 3,
    parent_id: 33,
    description:
      "Production de musique d'ambiance pour accompagner des vidéos.",
    imageUrl: "/categories/music/production/background-music/banner.jpg",
    iconUrl: "/categories/music/production/background-music/icon.svg",
    slug: "musique-fond-videos",
  },
  {
    id: 123,
    name: "Jingles publicitaires",
    level: 3,
    parent_id: 33,
    description:
      "Création de jingles courts et accrocheurs pour les publicités.",
    imageUrl: "/categories/music/production/jingles/banner.jpg",
    iconUrl: "/categories/music/production/jingles/icon.svg",
    slug: "jingles-publicitaires",
  },
  {
    id: 124,
    name: "Mixage audio",
    level: 3,
    parent_id: 34,
    description: "Mixage des pistes audio pour une balance sonore optimale.",
    imageUrl: "/categories/music/mixing/audio-mixing/banner.jpg",
    iconUrl: "/categories/music/mixing/audio-mixing/icon.svg",
    slug: "mixage-audio",
  },
  {
    id: 125,
    name: "Mastering pour distribution",
    level: 3,
    parent_id: 34,
    description:
      "Mastering de pistes prêtes pour la diffusion sur plateformes.",
    imageUrl: "/categories/music/mixing/mastering/banner.jpg",
    iconUrl: "/categories/music/mixing/mastering/icon.svg",
    slug: "mastering-distribution",
  },
  {
    id: 126,
    name: "Restoration audio",
    level: 3,
    parent_id: 34,
    description:
      "Amélioration de la qualité audio et réduction des bruits indésirables.",
    imageUrl: "/categories/music/mixing/audio-restoration/banner.jpg",
    iconUrl: "/categories/music/mixing/audio-restoration/icon.svg",
    slug: "restauration-audio",
  },
  {
    id: 127,
    name: "Enregistrement de voix-off",
    level: 3,
    parent_id: 35,
    description:
      "Enregistrement de voix-off pour vidéos, publicités et présentations.",
    imageUrl: "/categories/music/vocals/voiceover/banner.jpg",
    iconUrl: "/categories/music/vocals/voiceover/icon.svg",
    slug: "enregistrement-voix-off",
  },
  {
    id: 128,
    name: "Enregistrement de chant",
    level: 3,
    parent_id: 35,
    description:
      "Enregistrement de performances vocales pour chansons et projets musicaux.",
    imageUrl: "/categories/music/vocals/singing/banner.jpg",
    iconUrl: "/categories/music/vocals/singing/icon.svg",
    slug: "enregistrement-chant",
  },
  {
    id: 129,
    name: "Doublage",
    level: 3,
    parent_id: 35,
    description:
      "Enregistrement de voix pour le doublage de films, séries et animations.",
    imageUrl: "/categories/music/vocals/dubbing/banner.jpg",
    iconUrl: "/categories/music/vocals/dubbing/icon.svg",
    slug: "doublage",
  },
  {
    id: 130,
    name: "Effets sonores pour films",
    level: 3,
    parent_id: 36,
    description:
      "Création d'effets sonores pour les productions cinématographiques.",
    imageUrl: "/categories/music/sound-effects/film/banner.jpg",
    iconUrl: "/categories/music/sound-effects/film/icon.svg",
    slug: "effets-sonores-films",
  },
  {
    id: 131,
    name: "Effets sonores pour jeux vidéo",
    level: 3,
    parent_id: 36,
    description: "Production d'effets sonores immersifs pour jeux vidéo.",
    imageUrl: "/categories/music/sound-effects/games/banner.jpg",
    iconUrl: "/categories/music/sound-effects/games/icon.svg",
    slug: "effets-sonores-jeux-video",
  },
  {
    id: 132,
    name: "Effets de transition audio",
    level: 3,
    parent_id: 36,
    description:
      "Création d'effets sonores pour les transitions et les scènes.",
    imageUrl: "/categories/music/sound-effects/transitions/banner.jpg",
    iconUrl: "/categories/music/sound-effects/transitions/icon.svg",
    slug: "effets-transition-audio",
  },

  {
    id: 133,
    name: "Stratégie de croissance",
    level: 3,
    parent_id: 37,
    description: "Développement de stratégies pour la croissance à long terme.",
    imageUrl: "/categories/business/strategy/growth/banner.jpg",
    iconUrl: "/categories/business/strategy/growth/icon.svg",
    slug: "strategie-de-croissance",
  },
  {
    id: 134,
    name: "Analyse concurrentielle",
    level: 3,
    parent_id: 37,
    description: "Évaluation des forces et faiblesses de la concurrence.",
    imageUrl: "/categories/business/strategy/competitive-analysis/banner.jpg",
    iconUrl: "/categories/business/strategy/competitive-analysis/icon.svg",
    slug: "analyse-concurrentielle",
  },
  {
    id: 135,
    name: "Optimisation des opérations",
    level: 3,
    parent_id: 37,
    description: "Conseils pour améliorer l'efficacité opérationnelle.",
    imageUrl:
      "/categories/business/strategy/operations-optimization/banner.jpg",
    iconUrl: "/categories/business/strategy/operations-optimization/icon.svg",
    slug: "optimisation-operations",
  },

  {
    id: 136,
    name: "Gestion de projet agile",
    level: 3,
    parent_id: 38,
    description: "Méthodologies agiles pour une gestion de projet efficace.",
    imageUrl: "/categories/business/project-management/agile/banner.jpg",
    iconUrl: "/categories/business/project-management/agile/icon.svg",
    slug: "gestion-projet-agile",
  },
  {
    id: 137,
    name: "Gestion de projet pour IT",
    level: 3,
    parent_id: 38,
    description:
      "Gestion spécialisée pour les projets technologiques et informatiques.",
    imageUrl: "/categories/business/project-management/it/banner.jpg",
    iconUrl: "/categories/business/project-management/it/icon.svg",
    slug: "gestion-projet-it",
  },
  {
    id: 138,
    name: "Planification et suivi",
    level: 3,
    parent_id: 38,
    description:
      "Services de planification et suivi de projet pour atteindre les objectifs.",
    imageUrl: "/categories/business/project-management/planning/banner.jpg",
    iconUrl: "/categories/business/project-management/planning/icon.svg",
    slug: "planification-suivi",
  },

  {
    id: 139,
    name: "Positionnement de marque",
    level: 3,
    parent_id: 39,
    description:
      "Développement d'un positionnement unique pour différencier la marque.",
    imageUrl: "/categories/business/branding/positioning/banner.jpg",
    iconUrl: "/categories/business/branding/positioning/icon.svg",
    slug: "positionnement-marque",
  },
  {
    id: 140,
    name: "Identité visuelle de la marque",
    level: 3,
    parent_id: 39,
    description:
      "Création de l'identité visuelle pour renforcer la présence de la marque.",
    imageUrl: "/categories/business/branding/visual-identity/banner.jpg",
    iconUrl: "/categories/business/branding/visual-identity/icon.svg",
    slug: "identite-visuelle-marque",
  },
  {
    id: 141,
    name: "Stratégie de communication de marque",
    level: 3,
    parent_id: 39,
    description:
      "Élaboration de stratégies de communication cohérentes pour la marque.",
    imageUrl: "/categories/business/branding/communication/banner.jpg",
    iconUrl: "/categories/business/branding/communication/icon.svg",
    slug: "strategie-communication-marque",
  },

  {
    id: 142,
    name: "Étude de marché",
    level: 3,
    parent_id: 40,
    description:
      "Recherche et analyse de marché pour évaluer les opportunités.",
    imageUrl:
      "/categories/business/business-planning/market-research/banner.jpg",
    iconUrl: "/categories/business/business-planning/market-research/icon.svg",
    slug: "etude-de-marche",
  },
  {
    id: 143,
    name: "Prévision financière",
    level: 3,
    parent_id: 40,
    description:
      "Prévisions financières pour planifier et assurer la rentabilité.",
    imageUrl:
      "/categories/business/business-planning/financial-forecast/banner.jpg",
    iconUrl:
      "/categories/business/business-planning/financial-forecast/icon.svg",
    slug: "prevision-financiere",
  },
  {
    id: 144,
    name: "Rédaction de business plan",
    level: 3,
    parent_id: 40,
    description:
      "Création de business plans détaillés pour guider le développement.",
    imageUrl:
      "/categories/business/business-planning/business-plan-writing/banner.jpg",
    iconUrl:
      "/categories/business/business-planning/business-plan-writing/icon.svg",
    slug: "redaction-business-plan",
  },

  {
    id: 145,
    name: "Comptabilité générale",
    level: 3,
    parent_id: 41,
    description:
      "Services de comptabilité de base pour les petites entreprises et particuliers.",
    imageUrl: "/categories/finance/accounting/general/banner.jpg",
    iconUrl: "/categories/finance/accounting/general/icon.svg",
    slug: "comptabilite-generale",
  },
  {
    id: 146,
    name: "Comptabilité analytique",
    level: 3,
    parent_id: 41,
    description:
      "Analyse des coûts et rentabilité pour aider à la prise de décision.",
    imageUrl: "/categories/finance/accounting/analytical/banner.jpg",
    iconUrl: "/categories/finance/accounting/analytical/icon.svg",
    slug: "comptabilite-analytique",
  },
  {
    id: 147,
    name: "Préparation des états financiers",
    level: 3,
    parent_id: 41,
    description:
      "Élaboration des bilans et comptes de résultats pour les entreprises.",
    imageUrl: "/categories/finance/accounting/financial-statements/banner.jpg",
    iconUrl: "/categories/finance/accounting/financial-statements/icon.svg",
    slug: "preparation-etats-financiers",
  },

  {
    id: 148,
    name: "Planification fiscale",
    level: 3,
    parent_id: 42,
    description:
      "Stratégies de planification fiscale pour minimiser les impôts.",
    imageUrl: "/categories/finance/tax/planning/banner.jpg",
    iconUrl: "/categories/finance/tax/planning/icon.svg",
    slug: "planification-fiscale",
  },
  {
    id: 149,
    name: "Déclaration fiscale",
    level: 3,
    parent_id: 42,
    description:
      "Assistance pour la préparation et la soumission des déclarations fiscales.",
    imageUrl: "/categories/finance/tax/filing/banner.jpg",
    iconUrl: "/categories/finance/tax/filing/icon.svg",
    slug: "declaration-fiscale",
  },
  {
    id: 150,
    name: "Audit fiscal",
    level: 3,
    parent_id: 42,
    description: "Vérification des comptes pour assurer la conformité fiscale.",
    imageUrl: "/categories/finance/tax/audit/banner.jpg",
    iconUrl: "/categories/finance/tax/audit/icon.svg",
    slug: "audit-fiscal",
  },

  {
    id: 151,
    name: "Analyse des ratios financiers",
    level: 3,
    parent_id: 43,
    description:
      "Évaluation de la performance financière à travers des ratios clés.",
    imageUrl: "/categories/finance/financial-analysis/ratios/banner.jpg",
    iconUrl: "/categories/finance/financial-analysis/ratios/icon.svg",
    slug: "analyse-ratios-financiers",
  },
  {
    id: 152,
    name: "Prévision de trésorerie",
    level: 3,
    parent_id: 43,
    description: "Prévisions des flux de trésorerie pour une gestion optimale.",
    imageUrl: "/categories/finance/financial-analysis/cash-flow/banner.jpg",
    iconUrl: "/categories/finance/financial-analysis/cash-flow/icon.svg",
    slug: "prevision-tresorerie",
  },
  {
    id: 153,
    name: "Analyse de rentabilité",
    level: 3,
    parent_id: 43,
    description: "Évaluation de la rentabilité des projets et investissements.",
    imageUrl: "/categories/finance/financial-analysis/profitability/banner.jpg",
    iconUrl: "/categories/finance/financial-analysis/profitability/icon.svg",
    slug: "analyse-rentabilite",
  },
  {
    id: 154,
    name: "Conseil en investissement",
    level: 3,
    parent_id: 44,
    description:
      "Conseils pour sélectionner des investissements adaptés aux objectifs.",
    imageUrl: "/categories/finance/investments/advisory/banner.jpg",
    iconUrl: "/categories/finance/investments/advisory/icon.svg",
    slug: "conseil-investissement",
  },
  {
    id: 155,
    name: "Gestion de portefeuille",
    level: 3,
    parent_id: 44,
    description:
      "Gestion active de portefeuilles pour maximiser les rendements.",
    imageUrl: "/categories/finance/investments/portfolio-management/banner.jpg",
    iconUrl: "/categories/finance/investments/portfolio-management/icon.svg",
    slug: "gestion-portefeuille",
  },
  {
    id: 156,
    name: "Évaluation des risques",
    level: 3,
    parent_id: 44,
    description: "Analyse et gestion des risques liés aux investissements.",
    imageUrl: "/categories/finance/investments/risk-assessment/banner.jpg",
    iconUrl: "/categories/finance/investments/risk-assessment/icon.svg",
    slug: "evaluation-risques",
  },

  {
    id: 157,
    name: "Analyse prédictive",
    level: 3,
    parent_id: 45,
    description:
      "Utilisation de modèles prédictifs pour anticiper les tendances futures.",
    imageUrl: "/categories/ai/data-analysis/predictive/banner.jpg",
    iconUrl: "/categories/ai/data-analysis/predictive/icon.svg",
    slug: "analyse-predictive",
  },
  {
    id: 158,
    name: "Visualisation de données",
    level: 3,
    parent_id: 45,
    description:
      "Création de visualisations pour interpréter et présenter les données.",
    imageUrl: "/categories/ai/data-analysis/visualization/banner.jpg",
    iconUrl: "/categories/ai/data-analysis/visualization/icon.svg",
    slug: "visualisation-donnees",
  },
  {
    id: 159,
    name: "Analyse de big data",
    level: 3,
    parent_id: 45,
    description:
      "Traitement et analyse de grandes quantités de données pour extraire des informations.",
    imageUrl: "/categories/ai/data-analysis/big-data/banner.jpg",
    iconUrl: "/categories/ai/data-analysis/big-data/icon.svg",
    slug: "analyse-big-data",
  },

  {
    id: 160,
    name: "Automatisation des flux de travail",
    level: 3,
    parent_id: 46,
    description:
      "Automatisation de tâches répétitives pour optimiser les flux de travail.",
    imageUrl: "/categories/ai/automation/workflows/banner.jpg",
    iconUrl: "/categories/ai/automation/workflows/icon.svg",
    slug: "automatisation-flux-travail",
  },
  {
    id: 161,
    name: "Automatisation des e-mails",
    level: 3,
    parent_id: 46,
    description:
      "Configuration de l'automatisation des e-mails pour l'engagement client.",
    imageUrl: "/categories/ai/automation/email/banner.jpg",
    iconUrl: "/categories/ai/automation/email/icon.svg",
    slug: "automatisation-emails",
  },
  {
    id: 162,
    name: "Automatisation de la gestion de données",
    level: 3,
    parent_id: 46,
    description:
      "Utilisation de l'IA pour automatiser la collecte et l'analyse des données.",
    imageUrl: "/categories/ai/automation/data-management/banner.jpg",
    iconUrl: "/categories/ai/automation/data-management/icon.svg",
    slug: "automatisation-gestion-donnees",
  },

  {
    id: 163,
    name: "Détection d'objets",
    level: 3,
    parent_id: 47,
    description:
      "Utilisation de l'IA pour détecter et identifier des objets dans des images.",
    imageUrl: "/categories/ai/image-recognition/object-detection/banner.jpg",
    iconUrl: "/categories/ai/image-recognition/object-detection/icon.svg",
    slug: "detection-objets",
  },
  {
    id: 164,
    name: "Reconnaissance faciale",
    level: 3,
    parent_id: 47,
    description: "Identification et reconnaissance de visages dans des images.",
    imageUrl: "/categories/ai/image-recognition/facial-recognition/banner.jpg",
    iconUrl: "/categories/ai/image-recognition/facial-recognition/icon.svg",
    slug: "reconnaissance-faciale",
  },
  {
    id: 165,
    name: "Classification d'images",
    level: 3,
    parent_id: 47,
    description: "Catégorisation des images en fonction de leur contenu.",
    imageUrl: "/categories/ai/image-recognition/classification/banner.jpg",
    iconUrl: "/categories/ai/image-recognition/classification/icon.svg",
    slug: "classification-images",
  },

  {
    id: 166,
    name: "Chatbots pour e-commerce",
    level: 3,
    parent_id: 48,
    description:
      "Développement de chatbots pour aider les utilisateurs à acheter des produits.",
    imageUrl: "/categories/ai/chatbots/ecommerce/banner.jpg",
    iconUrl: "/categories/ai/chatbots/ecommerce/icon.svg",
    slug: "chatbots-ecommerce",
  },
  {
    id: 167,
    name: "Chatbots pour support client",
    level: 3,
    parent_id: 48,
    description:
      "Chatbots pour répondre aux questions et fournir un support client.",
    imageUrl: "/categories/ai/chatbots/customer-support/banner.jpg",
    iconUrl: "/categories/ai/chatbots/customer-support/icon.svg",
    slug: "chatbots-support-client",
  },
  {
    id: 168,
    name: "Chatbots pour automatisation des tâches",
    level: 3,
    parent_id: 48,
    description:
      "Chatbots pour automatiser des tâches simples et gérer les demandes.",
    imageUrl: "/categories/ai/chatbots/task-automation/banner.jpg",
    iconUrl: "/categories/ai/chatbots/task-automation/icon.svg",
    slug: "chatbots-automatisation-taches",
  },

  {
    id: 169,
    name: "Coaching de développement personnel",
    level: 3,
    parent_id: 49,
    description:
      "Accompagnement pour favoriser le développement personnel et atteindre ses objectifs.",
    imageUrl:
      "/categories/personal-growth/life-coaching/personal-development/banner.jpg",
    iconUrl:
      "/categories/personal-growth/life-coaching/personal-development/icon.svg",
    slug: "coaching-developpement-personnel",
  },
  {
    id: 170,
    name: "Coaching de gestion du stress",
    level: 3,
    parent_id: 49,
    description:
      "Coaching pour mieux gérer le stress et améliorer la qualité de vie.",
    imageUrl:
      "/categories/personal-growth/life-coaching/stress-management/banner.jpg",
    iconUrl:
      "/categories/personal-growth/life-coaching/stress-management/icon.svg",
    slug: "coaching-gestion-stress",
  },
  {
    id: 171,
    name: "Coaching de relations personnelles",
    level: 3,
    parent_id: 49,
    description:
      "Accompagnement pour améliorer les relations interpersonnelles.",
    imageUrl:
      "/categories/personal-growth/life-coaching/relationship/banner.jpg",
    iconUrl: "/categories/personal-growth/life-coaching/relationship/icon.svg",
    slug: "coaching-relations-personnelles",
  },

  {
    id: 172,
    name: "Techniques de méditation guidée",
    level: 3,
    parent_id: 50,
    description:
      "Séances de méditation guidée pour la relaxation et la pleine conscience.",
    imageUrl: "/categories/personal-growth/meditation/guided/banner.jpg",
    iconUrl: "/categories/personal-growth/meditation/guided/icon.svg",
    slug: "meditation-guidee",
  },
  {
    id: 173,
    name: "Méditation pour la gestion du stress",
    level: 3,
    parent_id: 50,
    description:
      "Techniques de méditation spécifiquement pour réduire le stress.",
    imageUrl: "/categories/personal-growth/meditation/stress-relief/banner.jpg",
    iconUrl: "/categories/personal-growth/meditation/stress-relief/icon.svg",
    slug: "meditation-gestion-stress",
  },
  {
    id: 174,
    name: "Techniques de respiration",
    level: 3,
    parent_id: 50,
    description:
      "Exercices de respiration pour favoriser le bien-être mental et physique.",
    imageUrl: "/categories/personal-growth/meditation/breathing/banner.jpg",
    iconUrl: "/categories/personal-growth/meditation/breathing/icon.svg",
    slug: "techniques-respiration",
  },

  {
    id: 175,
    name: "Gestion du temps",
    level: 3,
    parent_id: 51,
    description: "Techniques et stratégies pour une gestion efficace du temps.",
    imageUrl:
      "/categories/personal-growth/productivity/time-management/banner.jpg",
    iconUrl:
      "/categories/personal-growth/productivity/time-management/icon.svg",
    slug: "gestion-temps",
  },
  {
    id: 176,
    name: "Amélioration de la concentration",
    level: 3,
    parent_id: 51,
    description:
      "Stratégies pour améliorer la concentration et la productivité.",
    imageUrl: "/categories/personal-growth/productivity/focus/banner.jpg",
    iconUrl: "/categories/personal-growth/productivity/focus/icon.svg",
    slug: "amelioration-concentration",
  },
  {
    id: 177,
    name: "Gestion des priorités",
    level: 3,
    parent_id: 51,
    description:
      "Conseils pour hiérarchiser les tâches et atteindre les objectifs.",
    imageUrl:
      "/categories/personal-growth/productivity/prioritization/banner.jpg",
    iconUrl: "/categories/personal-growth/productivity/prioritization/icon.svg",
    slug: "gestion-priorites",
  },

  {
    id: 178,
    name: "Support en cas d'anxiété",
    level: 3,
    parent_id: 52,
    description: "Conseils et soutien pour la gestion de l'anxiété.",
    imageUrl:
      "/categories/personal-growth/mental-health/anxiety-support/banner.jpg",
    iconUrl:
      "/categories/personal-growth/mental-health/anxiety-support/icon.svg",
    slug: "support-anxiete",
  },
  {
    id: 179,
    name: "Conseils pour la gestion de la dépression",
    level: 3,
    parent_id: 52,
    description: "Accompagnement pour faire face aux symptômes de dépression.",
    imageUrl:
      "/categories/personal-growth/mental-health/depression-support/banner.jpg",
    iconUrl:
      "/categories/personal-growth/mental-health/depression-support/icon.svg",
    slug: "conseils-gestion-depression",
  },
  {
    id: 180,
    name: "Développement de la résilience",
    level: 3,
    parent_id: 52,
    description:
      "Techniques pour renforcer la résilience face aux défis de la vie.",
    imageUrl: "/categories/personal-growth/mental-health/resilience/banner.jpg",
    iconUrl: "/categories/personal-growth/mental-health/resilience/icon.svg",
    slug: "developpement-resilience",
  },
  {
    id: 181,
    name: "Conseil en droit des affaires",
    level: 3,
    parent_id: 53,
    description: "Assistance juridique spécialisée en droit des affaires.",
    imageUrl: "/categories/consulting/legal/business-law/banner.jpg",
    iconUrl: "/categories/consulting/legal/business-law/icon.svg",
    slug: "conseil-droit-affaires",
  },
  {
    id: 182,
    name: "Conseil en droit du travail",
    level: 3,
    parent_id: 53,
    description: "Assistance juridique pour les questions de droit du travail.",
    imageUrl: "/categories/consulting/legal/employment-law/banner.jpg",
    iconUrl: "/categories/consulting/legal/employment-law/icon.svg",
    slug: "conseil-droit-travail",
  },
  {
    id: 183,
    name: "Conseil en propriété intellectuelle",
    level: 3,
    parent_id: 53,
    description:
      "Assistance pour la protection des droits de propriété intellectuelle.",
    imageUrl: "/categories/consulting/legal/ip-law/banner.jpg",
    iconUrl: "/categories/consulting/legal/ip-law/icon.svg",
    slug: "conseil-propriete-intellectuelle",
  },

  {
    id: 184,
    name: "Stratégie de contenu",
    level: 3,
    parent_id: 54,
    description:
      "Développement de stratégies de contenu pour attirer les clients.",
    imageUrl: "/categories/consulting/marketing/content-strategy/banner.jpg",
    iconUrl: "/categories/consulting/marketing/content-strategy/icon.svg",
    slug: "strategie-contenu",
  },
  {
    id: 185,
    name: "Stratégie de marque",
    level: 3,
    parent_id: 54,
    description: "Création d'une image de marque forte et mémorable.",
    imageUrl: "/categories/consulting/marketing/branding/banner.jpg",
    iconUrl: "/categories/consulting/marketing/branding/icon.svg",
    slug: "strategie-marque",
  },
  {
    id: 186,
    name: "Optimisation des campagnes publicitaires",
    level: 3,
    parent_id: 54,
    description: "Amélioration des performances des campagnes publicitaires.",
    imageUrl: "/categories/consulting/marketing/ad-optimization/banner.jpg",
    iconUrl: "/categories/consulting/marketing/ad-optimization/icon.svg",
    slug: "optimisation-campagnes",
  },

  {
    id: 187,
    name: "Transformation numérique",
    level: 3,
    parent_id: 55,
    description:
      "Conseils pour intégrer des solutions numériques et moderniser l'entreprise.",
    imageUrl:
      "/categories/consulting/technology/digital-transformation/banner.jpg",
    iconUrl:
      "/categories/consulting/technology/digital-transformation/icon.svg",
    slug: "transformation-numerique",
  },
  {
    id: 188,
    name: "Conseil en cybersécurité",
    level: 3,
    parent_id: 55,
    description:
      "Stratégies pour protéger les systèmes et données de l'entreprise.",
    imageUrl: "/categories/consulting/technology/cybersecurity/banner.jpg",
    iconUrl: "/categories/consulting/technology/cybersecurity/icon.svg",
    slug: "conseil-cybersecurite",
  },
  {
    id: 189,
    name: "Gestion de l'innovation",
    level: 3,
    parent_id: 55,
    description:
      "Soutien pour innover et rester compétitif dans le secteur technologique.",
    imageUrl:
      "/categories/consulting/technology/innovation-management/banner.jpg",
    iconUrl: "/categories/consulting/technology/innovation-management/icon.svg",
    slug: "gestion-innovation",
  },

  {
    id: 190,
    name: "Recrutement et sélection",
    level: 3,
    parent_id: 56,
    description:
      "Assistance pour recruter les meilleurs talents pour l'entreprise.",
    imageUrl: "/categories/consulting/hr/recruitment/banner.jpg",
    iconUrl: "/categories/consulting/hr/recruitment/icon.svg",
    slug: "recrutement-selection",
  },
  {
    id: 191,
    name: "Développement des compétences",
    level: 3,
    parent_id: 56,
    description:
      "Programmes de formation pour améliorer les compétences des employés.",
    imageUrl: "/categories/consulting/hr/skills-development/banner.jpg",
    iconUrl: "/categories/consulting/hr/skills-development/icon.svg",
    slug: "developpement-competences",
  },
  {
    id: 192,
    name: "Gestion de la performance",
    level: 3,
    parent_id: 56,
    description:
      "Conseils pour évaluer et améliorer la performance des équipes.",
    imageUrl: "/categories/consulting/hr/performance-management/banner.jpg",
    iconUrl: "/categories/consulting/hr/performance-management/icon.svg",
    slug: "gestion-performance",
  },

  {
    id: 193,
    name: "Portraits individuels",
    level: 3,
    parent_id: 57,
    description:
      "Photographies de portrait pour individus, adaptés à des usages personnels ou professionnels.",
    imageUrl: "/categories/photography/portrait/individual/banner.jpg",
    iconUrl: "/categories/photography/portrait/individual/icon.svg",
    slug: "portraits-individuels",
  },
  {
    id: 194,
    name: "Portraits de famille",
    level: 3,
    parent_id: 57,
    description: "Photographies de groupe pour familles et proches.",
    imageUrl: "/categories/photography/portrait/family/banner.jpg",
    iconUrl: "/categories/photography/portrait/family/icon.svg",
    slug: "portraits-famille",
  },
  {
    id: 195,
    name: "Portraits d'affaires",
    level: 3,
    parent_id: 57,
    description:
      "Portraits professionnels pour cadres, entrepreneurs et entreprises.",
    imageUrl: "/categories/photography/portrait/business/banner.jpg",
    iconUrl: "/categories/photography/portrait/business/icon.svg",
    slug: "portraits-affaires",
  },

  {
    id: 196,
    name: "Photographie de produits e-commerce",
    level: 3,
    parent_id: 58,
    description: "Photographies adaptées pour les sites de vente en ligne.",
    imageUrl: "/categories/photography/product/ecommerce/banner.jpg",
    iconUrl: "/categories/photography/product/ecommerce/icon.svg",
    slug: "photographie-produits-ecommerce",
  },
  {
    id: 197,
    name: "Photographie de produits pour publicité",
    level: 3,
    parent_id: 58,
    description: "Images de haute qualité pour campagnes publicitaires.",
    imageUrl: "/categories/photography/product/advertising/banner.jpg",
    iconUrl: "/categories/photography/product/advertising/icon.svg",
    slug: "photographie-produits-publicite",
  },
  {
    id: 198,
    name: "Photographie culinaire",
    level: 3,
    parent_id: 58,
    description:
      "Photographies de produits alimentaires pour menus et publicités.",
    imageUrl: "/categories/photography/product/food/banner.jpg",
    iconUrl: "/categories/photography/product/food/icon.svg",
    slug: "photographie-culinaire",
  },

  {
    id: 199,
    name: "Photographie de mariage",
    level: 3,
    parent_id: 59,
    description:
      "Couverture photographique complète des mariages et cérémonies.",
    imageUrl: "/categories/photography/event/wedding/banner.jpg",
    iconUrl: "/categories/photography/event/wedding/icon.svg",
    slug: "photographie-mariage",
  },
  {
    id: 200,
    name: "Photographie de conférences",
    level: 3,
    parent_id: 59,
    description:
      "Photographie professionnelle pour conférences et événements d'affaires.",
    imageUrl: "/categories/photography/event/conference/banner.jpg",
    iconUrl: "/categories/photography/event/conference/icon.svg",
    slug: "photographie-conferences",
  },
  {
    id: 201,
    name: "Photographie de soirées",
    level: 3,
    parent_id: 59,
    description:
      "Photographie pour capturer l'ambiance des soirées et événements sociaux.",
    imageUrl: "/categories/photography/event/party/banner.jpg",
    iconUrl: "/categories/photography/event/party/icon.svg",
    slug: "photographie-soirees",
  },

  {
    id: 202,
    name: "Retouche de portrait",
    level: 3,
    parent_id: 60,
    description:
      "Amélioration de portraits avec retouche de peau, ajustement de couleurs, etc.",
    imageUrl: "/categories/photography/editing/portrait/banner.jpg",
    iconUrl: "/categories/photography/editing/portrait/icon.svg",
    slug: "retouche-portrait",
  },
  {
    id: 203,
    name: "Édition de photos de produits",
    level: 3,
    parent_id: 60,
    description: "Retouche de photos de produits pour un rendu plus attractif.",
    imageUrl: "/categories/photography/editing/product/banner.jpg",
    iconUrl: "/categories/photography/editing/product/icon.svg",
    slug: "edition-photos-produits",
  },
  {
    id: 204,
    name: "Restauration de photos",
    level: 3,
    parent_id: 60,
    description: "Réparation et restauration de photos anciennes ou abîmées.",
    imageUrl: "/categories/photography/editing/restoration/banner.jpg",
    iconUrl: "/categories/photography/editing/restoration/icon.svg",
    slug: "restauration-photos",
  },
];

export const seedCategory = async () => {
  console.log("----- Seeding Categories: cleanup process is starting...");
  await prisma.mainCategories.deleteMany();
  console.log(
    "----- The categoryHierarchy table has been successfully cleared.",
  );

  const sortedCategories = allCategories.sort((a, b) => a.level - b.level);
  const categoryMap = new Map();

  for (const category of sortedCategories) {
    try {
      const createdCategory = await prisma.mainCategories.create({
        data: {
          name: category.name,
          level: category.level,
          description: category.description,
          parentId: category.parent_id
            ? categoryMap.get(category.parent_id)
            : null,
          imageUrl: category.imageUrl || null,
          iconUrl: category.iconUrl || null,
          slug:
            category.slug || category.name.toLowerCase().replace(/\s+/g, "-"),
        },
      });
      categoryMap.set(category.id, createdCategory.id);
      console.log(`----- Created category: ${category.name}`);
    } catch (error) {
      console.error(`Error creating category ${category.name}:`, error);
    }
  }

  console.log("----- Seeding Categories: process completed successfully.");
};
