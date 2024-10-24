import { notFound } from "next/navigation";
import {
  getCategoryByName,
  getServicesByCategory,
} from "@/server.actions/category.actions";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import FilterSortBar from "@/components/FilterSortBar";
import Pagination from "@/components/Pagination";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
  searchParams,
}: {
  params: { name: string };
  searchParams: { page?: string; sort?: string; priceRange?: string };
}) {
  const decodedName = decodeURIComponent(params.name);
  const category = await getCategoryByName(decodedName);
  if (!category) notFound();

  const page = parseInt(searchParams.page || "1");
  const { services, totalPages } = await getServicesByCategory(
    category.id,
    page,
    searchParams.sort,
    searchParams.priceRange,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-sm mb-6"
      >
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{category.name}</span>
      </nav>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{category.name} Services</CardTitle>
        </CardHeader>
        <CardContent>
          {category.description && (
            <p className="text-muted-foreground">{category.description}</p>
          )}
        </CardContent>
      </Card>

      {category.children && category.children.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Explore Subcategories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category.children.map((subcat) => (
                <Link
                  key={subcat.id}
                  href={`/categories/${encodeURIComponent(subcat.name)}`}
                >
                  <Badge
                    variant="secondary"
                    className="hover:bg-secondary/80 cursor-pointer"
                  >
                    {subcat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-muted-foreground font-medium">
          {services.length} services available
        </p>
        <FilterSortBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <p className="text-2xl font-semibold text-muted-foreground mb-4">
                No services found
              </p>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or check back later for new services.
              </p>
              <Button
                onClick={() =>
                  (window.location.href = window.location.pathname)
                }
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}

      <Separator className="my-8" />
    </div>
  );
}
