import { MessageBox } from "@/components/MessageBox";
import { Button } from "@/components/ui/button";
import {
  getServiceById,
  getRelatedServices,
} from "@/server.actions/services.actions";
import { Check, Clock, RefreshCcw, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceReviews from "@/app/pages/review/ServiceReviews";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Service, Package } from "@/types/FeaturedServices";

interface ServiceMedia {
  images?: string[];
  videos?: string[];
}

interface ServiceWithRelations {
  id: string;
  name: string;
  description: string | null;
  medias: ServiceMedia | null;
  tags: string[];
  creator: {
    id: string;
    profile: {
      firstName: string | null;
      lastName: string | null;
      profilePic: string | null;
    };
  };
  ratings: {
    id: string;
    rating: number;
    review: string | null;
    createdAt: Date;
    rater: {
      firstName: string | null;
      lastName: string | null;
      profilePic: string | null;
    };
  }[];
  packages: {
    id: string;
    name: string | null;
    description: string | null;
    deliveryTime: number | null;
    price: string | null;
    revisions: number | null;
    features: string[];
  }[];
}

interface ServicePageProps {
  params: { id: string };
}

const formatPrice = (price: string) => {
  return parseFloat(price).toFixed(2);
};

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service = (await getServiceById(params.id)) as ServiceWithRelations;

  if (!service) {
    notFound();
  }

  const relatedServices = (await getRelatedServices(service.id)) as Service[];

  // Calculate average rating
  const averageRating =
    service.ratings.length > 0
      ? service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
        service.ratings.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
            <div className="flex items-center mb-4">
              <img
                src={service.creator.profile.profilePic ?? "/placeholder.svg"}
                alt={service.creator.profile.firstName ?? ""}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="font-semibold">
                  {service.creator.profile.firstName}{" "}
                  {service.creator.profile.lastName}
                </h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>
                    {averageRating.toFixed(1)} ({service.ratings.length}{" "}
                    reviews)
                  </span>
                </div>
              </div>
            </div>
            <Suspense fallback={<Loading />}>
              <div className="mb-8">
                <ImageCarousel images={service.medias?.images || []} />
              </div>
            </Suspense>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About This Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {service.ratings.length > 0 ? (
                  service.ratings.map((rating) => (
                    <div key={rating.id} className="mb-6 pb-4 border-b">
                      <div className="flex items-center mb-2">
                        <img
                          src={rating.rater.profilePic || "/placeholder.svg"}
                          alt={`${rating.rater.firstName} ${rating.rater.lastName}`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-semibold">{`${rating.rater.firstName} ${rating.rater.lastName}`}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{rating.review}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </CardContent>

              <ServiceReviews
                ratings={service.ratings}
                serviceId={service.id}
              />
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Related Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedServices.map((relatedService) => (
                    <Link
                      href={`/service/${relatedService.id}`}
                      key={relatedService.id}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">
                            {relatedService.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <img
                            src={
                              relatedService.medias?.images?.[0] ||
                              "/placeholder.svg"
                            }
                            alt={relatedService.name}
                            className="w-full h-32 object-cover"
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-4">
              <Tabs
                defaultValue={
                  service.packages[0]?.name?.toLowerCase() ?? "basic"
                }
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  {service.packages.map((pkg) => (
                    <TabsTrigger
                      key={pkg.id}
                      value={pkg.name?.toLowerCase() ?? "package"}
                    >
                      {pkg.name ?? "Package"}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {service.packages.map((pkg) => (
                  <TabsContent
                    key={pkg.id}
                    value={pkg.name?.toLowerCase() ?? "package"}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{pkg.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold mb-4">
                          ${formatPrice(pkg.price ?? "0")}
                        </p>
                        <p className="text-sm mb-4">{pkg.description}</p>
                        <div className="flex justify-between text-sm mb-4">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />{" "}
                            {pkg.deliveryTime} days delivery
                          </span>
                          <span className="flex items-center">
                            <RefreshCcw className="w-4 h-4 mr-2" />{" "}
                            {pkg.revisions} revisions
                          </span>
                        </div>
                        <ul className="mb-4">
                          {pkg.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm mb-2"
                            >
                              <Check className="w-4 h-4 mr-2 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full">
                          Continue (${formatPrice(pkg.price ?? "0")})
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
              <div className="mt-6">
                <MessageBox
                  receiverId={service.creator.id}
                  receiverName={`${service.creator.profile.firstName} ${service.creator.profile.lastName}`}
                  receiverProfilePic={
                    service.creator.profile.profilePic || "/placeholder.svg"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
