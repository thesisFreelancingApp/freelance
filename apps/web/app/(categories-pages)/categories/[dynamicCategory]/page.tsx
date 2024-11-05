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
    <div className="container px-4 py-8 mx-auto">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[300px] mb-12">
        <Image
          src={
            // category.imageUrl ||
            "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Sans%20titre-1.webp"
          }
          alt={category.name}
          fill
          className="object-cover rounded-xl"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
          <div className="text-center text-white">
            <h1 className="mb-4 text-4xl font-bold">{category.name}</h1>
            <p className="max-w-2xl mx-auto text-xl">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.children?.map((subCat) => (
          <div key={subCat.name} className="flex flex-col">
            {/* Non-clickable image section */}
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-t-lg">
              <Image
                src={subCat.imageUrl || "/default-subcategory.jpg"}
                alt={subCat.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Category title */}
            <h3 className="mb-4 text-xl font-semibold">{subCat.name}</h3>

            {/*  subcategories list */}
            {subCat.children && (
              <ul className="space-y-3">
                {subCat.children.map((child) => (
                  <li key={child.name}>
                    <Link
                      href={`/categories/${subCat.slug}/${child.slug}`}
                      className="flex items-center transition-colors duration-200 text-muted-foreground hover:text-primary group"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {child.name}
                      </span>
                    </Link>
                  </li>
                ))}
                {subCat.children.length > 5 && (
                  <li>
                    <Link
                      href={`/categories/${subCat.slug}`}
                      className="text-sm font-medium transition-colors duration-200 text-primary hover:text-primary/80"
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
