import { MessageBox } from "@/components/MessageBox";
import { Button } from "@/components/ui/button";
import { getServiceById } from "@/server.actions/services.actions";
import { Check, Clock, RefreshCcw, Star } from "lucide-react";

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const service = await getServiceById(parseInt(params.id));
  // console.log("service==================>", service);

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
    <div className="container relative px-4 py-8 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-4 text-3xl font-bold">{service.name}</h1>
            <div className="flex items-center mb-4">
              <img
                src={
                  service.user?.profilePic ||
                  "/placeholder.svg?height=50&width=50"
                }
                alt="Seller"
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{`${service.user?.firstName} ${service.user?.lastName}`}</h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  <span>
                    {averageRating} ({service.ratings?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-8 overflow-hidden rounded-lg bg-muted">
              <img
                src={
                  service.images?.[0] || "/placeholder.svg?height=400&width=600"
                }
                alt="Service preview"
                className="object-cover w-full h-64"
              />
            </div>
            <div className="mb-8">
              <h3 className="mb-2 text-xl font-semibold">About This Service</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
            <div className="mb-8">
              <h3 className="mb-2 text-xl font-semibold">Features</h3>
              <ul className="list-disc list-inside">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <h3 className="mb-4 text-2xl font-semibold">Reviews</h3>
              {service.ratings && service.ratings.length > 0 ? (
                service.ratings.map((rating, index) => (
                  <div key={index} className="pb-4 mb-6 border-b">
                    <div className="flex items-center mb-2">
                      <img
                        src={
                          rating.buyer.profilePic ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt={`${rating.buyer.firstName} ${rating.buyer.lastName}`}
                        className="w-10 h-10 mr-3 rounded-full"
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

          <div className="sticky p-6 rounded-lg bg-muted h-fit top-4">
            <h3 className="mb-4 text-2xl font-bold">{service.price}</h3>
            <p className="mb-4 text-gray-600">{service.name}</p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2" /> {service.deliveryTime} day
                delivery
              </li>
              <li className="flex items-center">
                <RefreshCcw className="w-4 h-4 mr-2" /> {service.revisions}{" "}
                Revisions
              </li>
            </ul>
            <Button className="w-full px-4 py-2 mb-4 font-bold transition duration-300 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              Continue ({service.price})
            </Button>
            <div className="space-y-4">
              <MessageBox
                receiverId={service.userId}
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
