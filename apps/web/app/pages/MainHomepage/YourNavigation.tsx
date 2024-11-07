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
      image: "/images/freelancer1.jpg",
      title: "Modern Minimalist Logo",
      name: "Bhavik C",
      profilePic: "/images/profile1.jpg",
      badge: "Top Rated",
      description: "I will design 3 modern minimalist logos for your business",
      rating: "4.9",
      reviews: "1k+",
      price: "44",
    },
    {
      image: "/images/freelancer2.jpg",
      title: "Timeless Logo Design",
      name: "Louis Key",
      profilePic: "/images/profile2.jpg",
      badge: "Pro",
      description: "I will design a timeless logo for your brand",
      rating: "4.8",
      reviews: "1k+",
      price: "127",
    },
    {
      image: "/images/freelancer2.jpg",
      title: "Timeless Logo Design",
      name: "Louis Key",
      profilePic: "/images/profile2.jpg",
      badge: "Pro",
      description: "I will design a timeless logo for your brand",
      rating: "4.8",
      reviews: "1k+",
      price: "127",
    },
    {
      image: "/images/freelancer2.jpg",
      title: "Timeless Logo Design",
      name: "Louis Key",
      profilePic: "/images/profile2.jpg",
      badge: "Pro",
      description: "I will design a timeless logo for your brand",
      rating: "4.8",
      reviews: "1k+",
      price: "127",
    },
    {
      image: "/images/freelancer2.jpg",
      title: "Timeless Logo Design",
      name: "Louis Key",
      profilePic: "/images/profile2.jpg",
      badge: "Pro",
      description: "I will design a timeless logo for your brand",
      rating: "4.8",
      reviews: "1k+",
      price: "127",
    },
    {
      image: "/images/freelancer2.jpg",
      title: "Timeless Logo Design",
      name: "Louis Key",
      profilePic: "/images/profile2.jpg",
      badge: "Pro",
      description: "I will design a timeless logo for your brand",
      rating: "4.8",
      reviews: "1k+",
      price: "127",
    },
    {
      image: "/images/freelancer2.jpg",
      title: "Timeless Logo Design",
      name: "Louis Key",
      profilePic: "/images/profile2.jpg",
      badge: "Pro",
      description: "I will design a timeless logo for your brand",
      rating: "4.8",
      reviews: "1k+",
      price: "127",
    },
    {
      image: "/images/freelancer2.jpg",
      title: "Timeless Logo Design",
      name: "Louis Key",
      profilePic: "/images/profile2.jpg",
      badge: "Pro",
      description: "I will design a timeless logo for your brand",
      rating: "4.8",
      reviews: "1k+",
      price: "127",
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
