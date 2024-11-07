import { getFilteredServices } from "@/server.actions/services.actions";
import { getCategoryByName } from "@/server.actions/category/category-pages.actions";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FilterForm from "./FilterForm";
import Link from "next/link";

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
    return <div>Category not found</div>;
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
  // console.log("services /////////////////////////////////", services);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-3">{category.name}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-4">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="font-semibold mb-6 flex items-center text-lg">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
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

          {/* Mobile Filters */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters & Sorting
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="py-4">
                  <h2 className="font-semibold mb-6 flex items-center text-lg">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
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

          {/* Services Section */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6 bg-muted/30 p-4 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
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
                      Clear all filters
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Services Grid */}
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">
                    No services found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search criteria to find what
                    you're looking for.
                  </p>
                  <Button variant="outline" asChild>
                    <Link
                      href={`/categories/${params.dynamicCategory}/${params.subCategory}`}
                    >
                      Clear all filters
                    </Link>
                  </Button>
                </div>
              </Card>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
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
                    Previous
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
                    Next
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
