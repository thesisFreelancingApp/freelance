"use client";

import { useRouter } from "next/navigation";
import { Category } from "@/types";

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (id: number) => {
    router.push(`/gigs/?category_id=${id}`);
  };

  return (
    <div className="py-16">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Catégories populaires
        </h2>
        <div className="grid grid-cols-2 gap-6 select-none md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="text-center transition duration-300 cursor-pointer hover:scale-105"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="mb-2 text-4xl">💻</div>
              <p className="font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
