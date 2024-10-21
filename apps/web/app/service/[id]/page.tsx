import { MessageBox } from "@/components/MessageBox";
import { Button } from "@/components/ui/button";
import { getServiceById } from "@/server.actions/services.actions";
import { Check, Clock, RefreshCcw, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Decimal } from "@prisma/client/runtime/library";

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const service = await getServiceById(parseInt(params.id));

  if (!service) {
    return <div>Service not found</div>;
  }

  const averageRating =
    service.ratings && service.ratings.length > 0
      ? (
          service.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
          service.ratings.length
        ).toFixed(1)
      : "N/A";

  // Helper function to format Decimal to string
  const formatPrice = (price: Decimal | number) => {
    return typeof price === "number" ? price.toFixed(2) : price.toString();
  };

  const renderPackage = (pkg: any) => (
    <Card key={pkg.id} className="w-full">
      <CardHeader>
        <CardTitle>{pkg.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-4">${formatPrice(pkg.price)}</p>
        <p className="text-sm mb-4">{pkg.description}</p>
        <div className="flex justify-between text-sm mb-4">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-2" /> {pkg.deliveryTime} days delivery
          </span>
          <span className="flex items-center">
            <RefreshCcw className="w-4 h-4 mr-2" /> {pkg.revisions} revisions
          </span>
        </div>
        <ul className="mb-4">
          {pkg.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm mb-2">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full">Continue (${formatPrice(pkg.price)})</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
            <div className="flex items-center mb-4">
              <img
                src={
                  service.creator?.profilePic ||
                  "/placeholder.svg?height=50&width=50"
                }
                alt="Seller"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="font-semibold">{`${service.creator?.firstName} ${service.creator?.lastName}`}</h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>
                    {averageRating} ({service.ratings?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-8 rounded-lg overflow-hidden bg-muted">
              <img
                src={
                  service.images?.[0] || "/placeholder.svg?height=400&width=600"
                }
                alt="Service preview"
                className="w-full h-64 object-cover"
              />
            </div>
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
                {service.ratings && service.ratings.length > 0 ? (
                  service.ratings.map((rating, index) => (
                    <div key={index} className="mb-6 pb-4 border-b">
                      <div className="flex items-center mb-2">
                        <img
                          src={
                            rating.buyer.profilePic ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={`${rating.buyer.firstName} ${rating.buyer.lastName}`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-semibold">{`${rating.buyer.firstName} ${rating.buyer.lastName}`}</p>
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
            </Card>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                  <TabsTrigger value="premium">Premium</TabsTrigger>
                </TabsList>
                {service.packages.map((pkg) => (
                  <TabsContent key={pkg.id} value={pkg.name.toLowerCase()}>
                    {renderPackage(pkg)}
                  </TabsContent>
                ))}
              </Tabs>
              <div className="mt-6">
                <MessageBox
                  receiverId={service.creator.id || ""}
                  receiverName={`${service.creator.firstName} ${service.creator.lastName}`}
                  receiverProfilePic={
                    service.creator.profilePic ||
                    "/placeholder.svg?height=40&width=40"
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
