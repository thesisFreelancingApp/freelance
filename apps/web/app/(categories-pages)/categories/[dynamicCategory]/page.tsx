import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCategoryByName } from "@/server.actions/category/category-pages.actions";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = async ({
  params,
}: {
  params: { dynamicCategory: string };
}) => {
  const category = await getCategoryByName(params.dynamicCategory);

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[300px] mb-12">
        <Image
          src={category.imageUrl || "/defaults/category-banner.jpg"}
          alt={category.name}
          fill
          className="object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl max-w-2xl mx-auto">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {category.children?.map((subCat) => (
          <div key={subCat.name} className="flex flex-col">
            {/* Non-clickable image section */}
            <div className="relative w-full h-48 rounded-t-lg overflow-hidden mb-4">
              <Image
                src={subCat.imageUrl || "/default-subcategory.jpg"}
                alt={subCat.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Category title */}
            <h3 className="text-xl font-semibold mb-4">{subCat.name}</h3>

            {/*  subcategories list */}
            {subCat.children && (
              <ul className="space-y-3">
                {subCat.children.map((child) => (
                  <li key={child.name}>
                    <Link
                      href={`/categories/${subCat.slug}/${child.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {child.name}
                      </span>
                    </Link>
                  </li>
                ))}
                {subCat.children.length > 5 && (
                  <li>
                    <Link
                      href={`/categories/${subCat.slug}`}
                      className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
                    >
                      See all {subCat.children.length} services →
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
