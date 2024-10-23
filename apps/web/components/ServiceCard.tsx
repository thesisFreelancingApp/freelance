import Link from "next/link";
import { Star, Clock, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    images: string[];
    creator: {
      firstName: string | null;
      lastName: string | null;
      profilePic: string | null;
      sellerRating: number | null;
    };
    packages: { price: string; deliveryTime?: number; revisions?: number }[];
    averageRating?: number;
    tags?: string[];
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const lowestPackage = service.packages[0];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/service/${service.id}`}>
        <div className="relative h-48">
          <img
            src={service.images[0] || "/placeholder.jpg"}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/80 text-black">
              From ${lowestPackage.price}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={service.creator.profilePic || undefined} />
              <AvatarFallback>
                {service.creator.firstName?.[0]}
                {service.creator.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {service.creator.firstName} {service.creator.lastName}
              </p>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                <span className="text-xs">
                  {service.creator.sellerRating?.toFixed(1) || "New"}
                </span>
              </div>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {service.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>Delivery in {lowestPackage.deliveryTime} days</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <RefreshCcw className="h-4 w-4 mr-1" />
            <span>{lowestPackage.revisions} revisions</span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="px-4 py-2 bg-secondary/10">
        <div className="flex flex-wrap gap-1">
          {service.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
