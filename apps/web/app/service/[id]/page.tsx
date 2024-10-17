import { getServiceById } from "@/server.actions/services.actions";
import { Button } from "@/components/ui/button";
import { MessageBox } from "@/components/MessageBox";
import { Star, Clock, RefreshCcw, Check } from "lucide-react";

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const service = await getServiceById(parseInt(params.id));
  console.log("service==================>", typeof service?.userId);

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

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
            <div className="flex items-center mb-4">
              <img
                src={
                  service.user?.profilePic ||
                  "/placeholder.svg?height=50&width=50"
                }
                alt="Seller"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="font-semibold">{`${service.user?.firstName} ${service.user?.lastName}`}</h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>
                    {averageRating} ({service.ratings?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden mb-8">
              <img
                src={
                  service.images?.[0] || "/placeholder.svg?height=400&width=600"
                }
                alt="Service preview"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">About This Service</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside">
                {service.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
              {service.ratings && service.ratings.length > 0 ? (
                service.ratings.map((rating, index) => (
                  <div key={index} className="mb-6 border-b pb-4">
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
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg h-fit sticky top-4">
            <h3 className="text-2xl font-bold mb-4">{service.price}</h3>
            <p className="mb-4 text-gray-600">{service.name}</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2" /> {service.deliveryTime} day
                delivery
              </li>
              <li className="flex items-center">
                <RefreshCcw className="w-4 h-4 mr-2" /> {service.revisions}{" "}
                Revisions
              </li>
            </ul>
            <Button className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-300 mb-4">
              Continue ({service.price})
            </Button>
            <div className="space-y-4">
              <MessageBox
                receiverId={service.user?.id || ""} // Assuming service.user is the AuthUser
                receiverName={`${service.user?.firstName} ${service.user?.lastName}`}
                receiverProfilePic={
                  service.user?.profilePic ||
                  "/placeholder.svg?height=40&width=40"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
