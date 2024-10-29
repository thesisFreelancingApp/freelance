import { Card } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    medias: {
      images: string[];
    } | null;
    creator: {
      profile: {
        firstName: string | null;
        lastName: string | null;
        profilePic: string | null;
      };
    };
    packages: {
      price: string;
      deliveryTime?: number;
      revisions?: number;
    }[];
    ratings?: {
      rating: number;
    }[];
    tags: string[];
    averageRating?: number;
    lowestPrice?: number;
    fastestDelivery?: number;
  };
  featured?: boolean;
}

export default function ServiceCard({
  service,
  featured = false,
}: ServiceCardProps) {
  const lowestPackage = service.packages[0];
  const averageRating =
    service.averageRating?.toFixed(1) ||
    (service.ratings && service.ratings.length > 0
      ? (
          service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        ).toFixed(1)
      : "New");

  const firstImage = service.medias?.images?.[0] || "/placeholder.svg";

  return (
    <Link href={`/service/${service.id}`} className="block h-full">
      <Card className="flex flex-col h-full group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        {/* Image Container */}
        <div className="relative w-full pt-[56.25%] overflow-hidden bg-muted">
          <Image
            src={firstImage}
            alt={service.name}
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {featured && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-grow p-4">
          {/* Service Title and Seller Info */}
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="w-8 h-8 border-2 border-background shrink-0">
              <AvatarImage
                src={service.creator.profile.profilePic || "/placeholder.svg"}
                alt={service.creator.profile.firstName || "Seller"}
              />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-grow">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs text-muted-foreground truncate">
                  {service.creator.profile.firstName}{" "}
                  {service.creator.profile.lastName}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <div className="flex items-center shrink-0">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-muted-foreground ml-0.5">
                    {averageRating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="h-6 flex flex-wrap gap-1 overflow-hidden mb-3">
            {service.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 bg-secondary/50 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t mt-auto">
            <div className="text-xs text-muted-foreground">
              {lowestPackage.deliveryTime} days delivery
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">
                Starting at
              </span>
              <p className="font-semibold text-primary">
                ${parseFloat(lowestPackage.price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
