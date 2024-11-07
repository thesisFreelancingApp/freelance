import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import Image from "next/image";

type Freelancer = {
  image: string;
  title: string;
  name: string;
  profilePic: string;
  badge: string;
  description: string;
  rating: string;
  reviews: string;
  price: string;
};

function FreelancerCard({ freelancer }: { freelancer: Freelancer }) {
  return (
    <Card className="w-[280px] hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-shadow">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={freelancer.image}
            alt={freelancer.title}
            width={300}
            height={160}
            className="object-cover rounded-t-lg"
            priority
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute p-2 rounded-full top-2 right-2 bg-black/60 hover:bg-black/80"
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4 text-white" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex items-center mb-3 space-x-3">
          <Image
            src={freelancer.profilePic}
            alt=""
            width={32}
            height={32}
            className="border border-gray-300 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {freelancer.name}
            </p>
            <span className="text-xs text-gray-500">{freelancer.badge}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">{freelancer.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 border-t border-gray-200">
        <div className="flex items-center text-sm font-medium text-primary">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
              fill="currentColor"
            ></path>
          </svg>
          <span>{freelancer.rating}</span>
          <span className="ml-1 text-gray-500">({freelancer.reviews})</span>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          À partir de {freelancer.price} TND
        </p>
      </CardFooter>
    </Card>
  );
}

export default function RecommendedFreelancers() {
  const freelancers: Freelancer[] = [
    {
      image:
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/123669750/original/398ffb7db080e35d50a19857c235552bd5882c82/write-engaging-content-for-your-blog-or-website.png",
      title: "Rédaction d'Articles de Blog",
      name: "Bhavik C",
      profilePic:
        "https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/9e75fb50f317938266f2a33a4c792731-1636860741742/2c4cd922-d240-4a6b-b879-4841f7765d51.png",
      badge: "Top Noté",
      description:
        "Je vais rédiger des articles de blog engageants et optimisés pour le SEO",
      rating: "4.9",
      reviews: "1k+",
      price: "55",
    },
    {
      image:
        "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/385145048/original/c4aceb83739d55e54207cc2bc7047bbfe8678778/do-website-development-as-full-stack-web-developer-php-laravel-html-css-react.jpg",
      title: "Développement de Site Web",
      name: "Louis Key",
      profilePic:
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/56b6ddceebc5558e2f2d7ff152eb30b4-1721889478501/a5978288-d87f-4495-a240-87e4dc0fecc4.jpg",
      badge: "Pro",
      description:
        "Je vais créer un site web moderne et responsive pour votre entreprise",
      rating: "4.8",
      reviews: "1k+",
      price: "200",
    },
    {
      image:
        "https://fiverr-res.cloudinary.com/video/upload/so_0.0,t_gig_cards_web/nhibqglblhcrv0ojopdq.png",
      title: "Montage Vidéo Professionnel",
      name: "Sophia M",
      profilePic:
        "https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/fcb833a0508c69365a5e687c5fe2a9fb-1549116634136/a269d06a-5917-46f9-ad02-ddae200782a1.jpg",
      badge: "Expert",
      description:
        "Je propose un montage vidéo dynamique et professionnel pour vos projets",
      rating: "4.7",
      reviews: "800+",
      price: "120",
    },
    {
      image:
        "https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/259023897/original/b9fb2b672dfaf4cee034a7ca5a92f9fd8c8edce8.png",
      title: "Gestion des Réseaux Sociaux",
      name: "Alex P",
      profilePic:
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/263c7d7ecf9dc52fb50790ee49d093a8-1654373524848/dc6ee14d-216b-4f4c-94ae-3a7ded748f5b.jpg",
      badge: "Top Noté",
      description:
        "Je vais gérer vos réseaux sociaux et améliorer votre visibilité en ligne",
      rating: "4.9",
      reviews: "1.2k+",
      price: "75",
    },
    {
      image:
        "https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/180504508/original/9acff6ab242d8c9926bd3f960896905fae90c2b7.jpg",
      title: "Traduction Professionnelle",
      name: "Emma R",
      profilePic:
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/cdc4a6972b974d079e6ff213b8dde6a9-1688074210269/ebfa4d71-7ed2-460c-9044-feda5d6ac80c.jpg",
      badge: "Pro",
      description:
        "Je propose un service de traduction précis et naturel entre l'anglais et le français",
      rating: "4.6",
      reviews: "900+",
      price: "60",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-12">
      <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">
        En fonction de votre historique de navigation
      </h2>
      <ScrollArea className="w-full mx-auto overflow-x-auto rounded-md max-w-7xl whitespace-nowrap">
        <div className="flex p-4 mx-auto space-x-4 w-max">
          {freelancers.map((freelancer, index) => (
            <FreelancerCard key={index} freelancer={freelancer} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
