import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCategoryByName } from "@/server.actions/category/category-pages.actions";
import { getFilteredServices } from "@/server.actions/services.actions";
import { Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import FilterForm from "./FilterForm";

interface PageProps {
  params: {
    dynamicCategory: string;
    subCategory: string;
  };
  searchParams: {
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    deliveryTime?: string;
  };
}

export default async function SubCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const category = await getCategoryByName(params.subCategory);

  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const minPrice = searchParams.minPrice
    ? parseFloat(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice)
    : undefined;
  const deliveryTime = searchParams.deliveryTime
    ? parseInt(searchParams.deliveryTime)
    : undefined;

  const { services, pagination } = await getFilteredServices({
    categoryId: category.id,
    minPrice,
    maxPrice,
    deliveryTime,
    sortBy: searchParams.sort as any,
    page,
  });

  const hasActiveFilters = !!(
    minPrice ||
    maxPrice ||
    deliveryTime ||
    searchParams.sort
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Section Héros */}
      <div className="p-4 m-4 mt-6 border-b bg-muted/30 rounded-3xl ">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-3 text-4xl font-bold">{category.name}</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filtres pour bureau */}
          <aside className="hidden space-y-6 lg:block">
            <div className="sticky top-4">
              <div className="p-6 rounded-lg shadow-sm bg-card">
                <h2 className="flex items-center mb-6 text-lg font-semibold">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtres
                </h2>
                <FilterForm
                  initialValues={{
                    minPrice,
                    maxPrice,
                    deliveryTime,
                    sort: searchParams.sort,
                  }}
                />
              </div>
            </div>
          </aside>

          {/* Filtres pour mobile */}
          <div className="mb-6 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtres et Tri
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="py-4">
                  <h2 className="flex items-center mb-6 text-lg font-semibold">
                    <Filter className="w-5 h-5 mr-2" />
                    Filtres
                  </h2>
                  <FilterForm
                    initialValues={{
                      minPrice,
                      maxPrice,
                      deliveryTime,
                      sort: searchParams.sort,
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Section des services */}
          <div className="lg:col-span-3">
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between p-4 mb-6 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm text-muted-foreground">
                  Affichage de{" "}
                  <span className="font-medium text-foreground">
                    {pagination.total}
                  </span>{" "}
                  services
                </p>
                {hasActiveFilters && (
                  <div className="flex gap-2 mt-2">
                    <Link
                      href={`/categories/${params.dynamicCategory}/${params.subCategory}`}
                      className="text-xs text-primary hover:underline"
                    >
                      Effacer tous les filtres
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Grille des services */}
            {services.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="mb-2 text-lg font-semibold">
                    Aucun service trouvé
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Essayez de modifier vos filtres ou critères de recherche
                    pour trouver ce que vous cherchez.
                  </p>
                  <Button variant="outline" asChild>
                    <Link
                      href={`/categories/${params.dynamicCategory}/${params.subCategory}`}
                    >
                      Effacer tous les filtres
                    </Link>
                  </Button>
                </div>
              </Card>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  asChild
                >
                  <Link
                    href={{
                      pathname: `/categories/${params.dynamicCategory}/${params.subCategory}`,
                      query: {
                        ...searchParams,
                        page: page - 1,
                      },
                    }}
                  >
                    Précédent
                  </Link>
                </Button>

                {Array.from({ length: pagination.pages }, (_, i) => (
                  <Button
                    key={i}
                    variant={
                      pagination.currentPage === i + 1 ? "default" : "outline"
                    }
                    size="sm"
                    asChild
                  >
                    <Link
                      href={{
                        pathname: `/categories/${params.dynamicCategory}/${params.subCategory}`,
                        query: {
                          ...searchParams,
                          page: i + 1,
                        },
                      }}
                    >
                      {i + 1}
                    </Link>
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === pagination.pages}
                  asChild
                >
                  <Link
                    href={{
                      pathname: `/categories/${params.dynamicCategory}/${params.subCategory}`,
                      query: {
                        ...searchParams,
                        page: page + 1,
                      },
                    }}
                  >
                    Suivant
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
