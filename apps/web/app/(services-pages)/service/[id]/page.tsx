import Loading from "@/app/loading";
import ServiceReviews from "@/app/pages/review/ServiceReviews";
import ImageCarousel from "@/components/ImageCarousel";
import { MessageBox } from "@/components/MessageBox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getRelatedServices,
  getServiceById,
} from "@/server.actions/services.actions";
import { Service } from "@/types/FeaturedServices";
import { Check, Clock, RefreshCcw, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import VideoPlayer from "@/components/VideoPlayer";

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
    <div className="container px-4 py-8 mx-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-4 text-3xl font-bold">{service.name}</h1>
            <div className="flex items-center mb-4">
              <img
                src={service.creator.profile.profilePic ?? "/placeholder.svg"}
                alt={service.creator.profile.firstName ?? ""}
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <h2 className="font-semibold">
                  {service.creator.profile.firstName}{" "}
                  {service.creator.profile.lastName}
                </h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  <span>
                    {averageRating.toFixed(1)} ({service.ratings.length}{" "}
                    reviews)
                  </span>
                </div>
              </div>
            </div>
            <Suspense fallback={<Loading />}>
            <div className="mb-8">
  {service.medias?.videos && service.medias.videos.length > 0 ? (
    service.medias.videos.map((videoSrc, index) => (
      <div key={index} className="relative w-full h-64 max-w-md mx-auto overflow-hidden">
        <VideoPlayer 
          src={videoSrc} 
          alt={`Video ${index + 1} for ${service.name}`}
        />
      </div>
    ))
  ) : (
    <ImageCarousel images={service.medias?.images || []} />
              )}
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
                    <div key={rating.id} className="pb-4 mb-6 border-b">
                      <div className="flex items-center mb-2">
                        <img
                          src={rating.rater.profilePic || "/placeholder.svg"}
                          alt={`${rating.rater.firstName} ${rating.rater.lastName}`}
                          className="w-10 h-10 mr-3 rounded-full"
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                            className="object-cover w-full h-32"
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
                        <p className="mb-4 text-2xl font-bold">
                          ${formatPrice(pkg.price ?? "0")}
                        </p>
                        <p className="mb-4 text-sm">{pkg.description}</p>
                        <div className="flex justify-between mb-4 text-sm">
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
                              className="flex items-center mb-2 text-sm"
                            >
                              <Check className="w-4 h-4 mr-2 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link href={`/service/${params.id}/${pkg.id}`}>
                          <Button className="w-full">
                            Continue (${formatPrice(pkg.price ?? "0")})
                          </Button>
                        </Link>
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
