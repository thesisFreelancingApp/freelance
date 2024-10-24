"use client";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { encodeHelper } from "@/hooks/use-Url";
// import Link from "next/link";

// Définition des types
interface SubCategory {
  name: string;
  children?: SubCategory[];
}

interface Category {
  name: string;
  children: SubCategory[];
}

interface SubMenuProps {
  subCategories: SubCategory[];
}

interface CategoryBarProps {
  allCategories: Category[];
}

// SubMenu Component
const SubMenu: React.FC<SubMenuProps> = ({ subCategories }) => {
  const router = useRouter();

  // const handleNavigation = (subSubName: string) => {
  //   router.push(`/categories/${subSubName}`);
  // };
  return (
    <div className="absolute left-0 z-10 grid w-full grid-cols-4 gap-4 p-4 shadow-lg bg-background top-full">
      {subCategories.map((subcategory: SubCategory) => (
        <div key={subcategory.name} className="pb-2 border-b">
          <h4 className="font-bold">{subcategory.name}</h4>
          {subcategory.children && (
            <ul className="mt-2 space-y-1 list-none">
              {subcategory.children.map((subSub: SubCategory) => (
                <li className="flex items-center">
                  <Link
                    key={subSub.name}
                    href={`/categories/${encodeHelper(subcategory.name)}/${encodeHelper(subSub.name)}`}
                    className="flex items-center pl-2 group hover:cursor-pointer"
                  >
                    <span>{subSub.name}</span>
                    <ArrowRight
                      className="hidden ml-2 transition duration-150 ease-in-out text-primary group-hover:inline-block"
                      size={16}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

// Menu Component
export default function CategoryBar({ allCategories }: CategoryBarProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const HOVER_DELAY = 300; // Constante pour le délai de survol

  // Scroll to the left
  const scrollLeft = () => {
    menuRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  // Scroll to the right
  const scrollRight = () => {
    menuRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Handle mouse enter for a category
  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(index);
    setIsHovering(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveCategory(null);
      setIsHovering(false);
    }, HOVER_DELAY);
  };

  // Handle sub-menu hover
  const handleSubMenuMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
  };

  const handleSubMenuMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveCategory(null);
      setIsHovering(false);
    }, HOVER_DELAY);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Left Chevron */}
      <button
        onClick={scrollLeft}
        className="absolute z-20 flex justify-start -translate-y-1/2 rounded-full left-2 top-1/2"
        aria-label="Scroll left"
      >
        <FaChevronLeft />
      </button>

      {/* Left gradient overlay */}
      <div className="absolute top-0 left-0 z-10 w-8 h-full pointer-events-none bg-gradient-to-r from-background to-transparent"></div>

      {/* Main Menu */}
      <ul
        className="flex p-4 space-x-6 overflow-x-auto scrollbar-hide"
        style={{ margin: "0 2rem" }}
        ref={menuRef}
      >
        {allCategories.map((category: Category, index: number) => (
          <Link
            key={category.name}
            href={`/categories/${encodeHelper(category.name)}`}
          >
            <li
              key={category.name}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`relative cursor-pointer whitespace-nowrap pb-1 ${
                activeCategory === index
                  ? "border-b-2 border-primary"
                  : "border-b-2 border-transparent"
              }`}
            >
              <span className="px-1">{category.name}</span>
            </li>
          </Link>
        ))}
      </ul>

      {/* Right gradient overlay */}
      <div className="absolute top-0 right-0 z-10 w-8 h-full pointer-events-none bg-gradient-to-l from-background to-transparent"></div>

      {/* Right Chevron */}
      <button
        onClick={scrollRight}
        className="absolute z-20 p-2 -translate-y-1/2 rounded-full right-2 top-1/2"
        aria-label="Scroll right"
      >
        <FaChevronRight />
      </button>

      {/* Submenu */}
      {activeCategory !== null && isHovering && (
        <div
          className="relative"
          onMouseEnter={handleSubMenuMouseEnter}
          onMouseLeave={handleSubMenuMouseLeave}
        >
          <SubMenu subCategories={allCategories[activeCategory].children} />
        </div>
      )}
    </div>
  );
}
