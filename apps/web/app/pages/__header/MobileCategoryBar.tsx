import { encodeHelper } from "@/hooks/use-Url";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// Types
interface SubCategory {
  name: string;
  children?: SubCategory[];
}

interface Category {
  name: string;
  children: SubCategory[];
}

interface CategoryBarProps {
  allCategories: Category[];
}

const CategoryBar: React.FC<CategoryBarProps> = ({ allCategories }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(
    null,
  );

  // Handle main category click
  const handleCategoryClick = (index: number) => {
    setActiveCategoryIndex(index);
  };

  // Handle back button click
  const handleBackClick = () => {
    setActiveCategoryIndex(null);
  };

  return (
    <div className="flex flex-col">
      {activeCategoryIndex === null ? (
        // Show main categories
        <ul className="space-y-2">
          {allCategories.map((category, index) => (
            <li key={category.name} className="cursor-pointer">
              <div
                onClick={() => handleCategoryClick(index)}
                className="font-bold text-primary"
              >
                {category.name}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // Show subcategories and children with back arrow
        <div>
          <button
            onClick={handleBackClick}
            className="flex items-center mb-4 font-bold text-primary"
          >
            <ArrowLeft className="mr-2" />
            Back to Categories
          </button>

          <ul className="space-y-2">
            {allCategories[activeCategoryIndex].children.map((subCategory) => (
              <li key={subCategory.name} className="cursor-pointer">
                {/* Subcategory name */}
                <div className="font-medium text-secondary">
                  {subCategory.name}
                </div>

                {/* Children of subcategory */}
                {subCategory.children && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {subCategory.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          href={`/categories/${encodeHelper(allCategories[activeCategoryIndex].name)}/${encodeHelper(subCategory.name)}/${encodeHelper(child.name)}`}
                          className="flex items-center pl-2 group hover:cursor-pointer"
                        >
                          <span>{child.name}</span>
                          <ArrowRight
                            className="hidden ml-2 transition duration-150 ease-in-out text-primary group-hover:inline-block"
                            size={16}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryBar;
