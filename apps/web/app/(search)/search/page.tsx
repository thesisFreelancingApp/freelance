import { searchServices } from "@/server.actions/services.actions";
import ServiceCard from "@/components/ServiceCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FilterForm from "@/app/(categories-pages)/categories/[dynamicCategory]/[subCategory]/FilterForm";
import { Service } from "@/types/FeaturedServices";

interface SearchPageProps {
  searchParams: {
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    deliveryTime?: string;
    sort?: string;
  };
}

interface FormattedService extends Service {
  averageRating: number;
  lowestPrice: number;
  fastestDelivery: number;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const minPrice = searchParams.minPrice
    ? parseFloat(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice)
    : undefined;
  const deliveryTime = searchParams.deliveryTime
    ? parseInt(searchParams.deliveryTime)
    : undefined;

  const services = (await searchServices(query)) as FormattedService[];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-3">Résultats pour "{query}"</h1>
          <p className="text-muted-foreground text-lg">
            {services.length} services trouvés
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <FilterForm
              initialValues={{
                minPrice,
                maxPrice,
                deliveryTime,
                sort: searchParams.sort,
              }}
            />
          </aside>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={{
                      id: service.id,
                      name: service.name,
                      medias: service.medias,
                      creator: service.creator,
                      packages: service.packages,
                      ratings: service.ratings,
                      tags: service.tags,
                      averageRating: service.averageRating,
                      lowestPrice: service.lowestPrice,
                      fastestDelivery: service.fastestDelivery,
                    }}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">
                    Aucun service trouvé
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Essayez avec d'autres mots-clés ou parcourez nos catégories.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/">Retour à l'accueil</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/categories">Parcourir les catégories</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
