"use client";

import { Category } from "@/types";
import Link from "next/link";

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="py-16">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link href={`/categories/${encodeURIComponent(category.name)}`} key={category.id}>
              <div className="text-center transition duration-300 hover:scale-105">
                <div className="mb-2 text-4xl">💻</div>
                <p className="font-medium">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
