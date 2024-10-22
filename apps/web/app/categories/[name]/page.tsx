import { notFound } from "next/navigation";
import {
  getCategoryByName,
  getServicesByCategory,
} from "@/server.actions/category.actions";
import Link from "next/link";
import { Star } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const decodedName = decodeURIComponent(params.name);

  const category = await getCategoryByName(decodedName);
  if (!category) return { title: "Category Not Found" };
  return { title: `${category.name} Services | WAIAHUB` };
}

export default async function CategoryPage({
  params,
}: {
  params: { name: string };
}) {
  const decodedName = decodeURIComponent(params.name);
  const category = await getCategoryByName(decodedName);
  if (!category) notFound();

  const services = await getServicesByCategory(category.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-blue-500 hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500">{category.name}</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-6">{category.name} Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            href={`/service/${service.id}`}
            key={service.id}
            className="block"
          >
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={service.images[0] || "/placeholder.jpg"}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <div className="flex items-center mb-2">
                  <img
                    src={
                      service.creator.profilePic || "/avatar-placeholder.jpg"
                    }
                    alt={`${service.creator.firstName} ${service.creator.lastName}`}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    {service.creator.firstName} {service.creator.lastName}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">
                    {service.creator.sellerRating?.toFixed(1) || "New"}
                  </span>
                </div>
                <p className="text-sm font-semibold">
                  From ${service.packages[0]?.price.toFixed(2) || "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
