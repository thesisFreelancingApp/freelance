"use client";
import { encodeHelper } from "@/hooks/use-Url";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getProfileCompletionStatus from "@/server.actions/userInfo/infoUser.actions";

// Définition des types
interface SubCategory {
  name: string;
  children?: SubCategory[];
  slug: string;
}

interface Category {
  name: string;
  children: SubCategory[];
  slug: string;
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
                    href={`/categories/${encodeHelper(subcategory.slug)}/${encodeHelper(subSub.slug)}`}
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
  const [isSeller, setIsSeller] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const HOVER_DELAY = 300; // Constante pour le délai de survol

  useEffect(() => {
    const checkUserStatus = async () => {
      const profileStatus = await getProfileCompletionStatus();
      setIsSeller(profileStatus?.seller || false);
    };
    checkUserStatus();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Scroll to the left
  const scrollLeft = () => {
    menuRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  // Scroll to the right
  const scrollRight = () => {
    menuRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Delay constant for displaying the submenu
  const SUBMENU_DELAY = 300; // Adjust as needed

  // Handle mouse enter for a category with submenu delay
  const handleMouseEnter = (index: number) => {
    // Clear any existing timeout to prevent multiple triggers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set a new timeout to display the submenu after a short delay
    timeoutRef.current = window.setTimeout(() => {
      setActiveCategory(index);
      setIsHovering(true);
    }, SUBMENU_DELAY);
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

  return isSeller ? null : (
    <div className="relative">
      {/* Left Chevron */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-20 p-2 transform -translate-y-1/2 rounded-full top-1/2"
        aria-label="Scroll left"
      >
        <FaChevronLeft />
      </button>

      {/* Left gradient overlay */}
      <div className="absolute left-0 z-10 w-8 h-full pointer-events-none bg-gradient-to-r from-background to-transparent"></div>

      {/* Main Menu */}
      <ul
        className="flex p-4 space-x-6 overflow-x-auto scrollbar-hide"
        style={{ margin: "0 2rem" }}
        ref={menuRef}
      >
        {allCategories.map((category: Category, index: number) => (
          <Link
            key={category.name}
            href={`/categories/${encodeHelper(category.slug)}`}
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
        className="absolute right-0 z-20 p-2 -translate-y-1/2 rounded-full top-1/2"
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
