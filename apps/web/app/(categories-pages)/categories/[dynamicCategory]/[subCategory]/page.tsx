// import { decodeHelper } from "@/hooks/use-Url";

// import DynamicBreadc from "@/components/ui/breadcrumpDyn";
// const SubCategoryPage = ({
//   params,
// }: {
//   params: { dynamicCategory: string; subCategory: string };
// }) => {
//   // console.log(params);

//   const dynamic = params.dynamicCategory;
//   const sub = params.subCategory;
//   console.log(decodeHelper(dynamic));
//   return (
//     <>
//       <DynamicBreadc />
//       <div>
//         <h1>Sub-Category Page</h1>
//         <p>Main Category: {decodeHelper(dynamic)}</p>
//         <p>Sub Category: {decodeHelper(sub)}</p>
//       </div>
//     </>
//   );
// };

// export default SubCategoryPage;

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubCategoryByName } from "@/server.actions/category/category-pages.actions";
import Image from "next/image";
import Link from "next/link";

// @ts-ignore
const subCategoryPage = async ({ params }) => {
  const { subCategory } = params;
  console.log(
    subCategory,
    "___________________________________________________________",
  );

  // Fetch category by name (slug)
  const category = await getSubCategoryByName(subCategory);

  if (!category) {
    return <div>Category not found.</div>; // Handle case where the category doesn't exist
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Category Title and Description */}
      <div className="bg-[#313901] text-white p-8 rounded-lg mb-8">
        <h1 className="mb-2 text-3xl font-bold">{category.name}</h1>
        <p className="mb-4">{category.description}</p>
      </div>

      {/* Subcategories Section */}
      {category.children && category.children.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {category.children.map((subCat: any) => (
            <Card key={subCat.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={
                    subCat.image ||
                    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/68011f21cd41c664951df861d9f876ac-1682402649968/Logo%20_%20Brand%20Identity.png"
                  } // Use dynamic image or fallback
                  alt={subCat.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2 text-xl">
                  <Link href={`/categories/${category.id}/${subCat.id}`}>
                    {subCat.name}
                  </Link>
                </CardTitle>
                {/* Sub-Subcategories List */}
                {subCat.children && (
                  <ul className="space-y-1">
                    {subCat.children.map((subSubCat: any) => (
                      <li key={subSubCat.id} className="flex items-center">
                        <Link href={`/categories/${category.id}/${subCat.id}`}>
                          <span className="text-sm text-gray-600">
                            {subSubCat.name}
                          </span>
                        </Link>
                        {subSubCat.isNew && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            NEW
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No subcategories available.</p>
      )}
    </div>
  );
};

export default subCategoryPage;
