// components/FeaturedServices.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/types/FeaturedServices";
import { Clock, Star, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FeaturedServicesProps {
  services: Service[];
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
  services,
}) => {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold">Services Recommandés</h2>
          <p className="mt-2 text-muted-foreground">
            Découvrez nos services les mieux notés par la communauté
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Link href={`/service/${service.id}`} key={service.id}>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                {/* Image Container */}
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={service.medias?.images?.[0] || "/placeholder.svg"}
                    alt={service.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  {/* Service Title and Seller Info in same section */}
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-8 h-8 border-2 border-background shrink-0">
                      <AvatarImage
                        src={
                          service.creator?.profile?.profilePic ||
                          "/placeholder.svg"
                        }
                        alt={service.creator?.profile?.firstName || "Seller"}
                      />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {service.creator?.profile?.firstName}{" "}
                          {service.creator?.profile?.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-muted-foreground ml-0.5">
                            {service.ratings && service.ratings.length > 0
                              ? (
                                  service.ratings.reduce(
                                    (acc, rating) => acc + rating.rating,
                                    0,
                                  ) / service.ratings.length
                                ).toFixed(1)
                              : "Nouveau"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs px-2 py-0.5 bg-secondary/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">
                        {service.packages?.[0]?.deliveryTime || "N/A"} jours
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">
                        À partir de
                      </span>
                      <p className="font-semibold text-primary">
                        {service.packages?.[0]?.price
                          ? `$${parseFloat(service.packages[0].price).toFixed(2)}`
                          : "Prix sur demande"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/services">
            <Button variant="outline" className="group">
              Voir tous les services
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
