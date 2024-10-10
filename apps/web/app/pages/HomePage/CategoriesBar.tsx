"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Chevron icons

// Définition des types
interface SubCategory {
    name: string;
    children?: SubCategory[];
}

interface Category {
    name: string;
    children: SubCategory[];
}

// SubMenu Component
const SubMenu: React.FC<{ children: SubCategory[]; visible: boolean }> = ({
    children,
    visible,
}) => {
    if (!visible) return null;

    return (
        <div className="absolute left-0 z-10 grid w-full grid-cols-4 gap-4 p-4 bg-white shadow-lg top-full">
            {children.map((subcategory: SubCategory) => (
                <div
                    key={subcategory.name}
                    className="pb-2 border-b"
                >
                    <h4 className="font-bold">{subcategory.name}</h4>
                    {subcategory.children && (
                        <ul className="mt-2 space-y-1 list-none">
                            {subcategory.children.map((subSub: SubCategory) => (
                                <li
                                    key={subSub.name}
                                    className="text-sm"
                                >
                                    {subSub.name}
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
const Menu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const menuRef = useRef<HTMLUListElement>(null);
    const timeoutRef = useRef<number | null>(null);

    // Scroll to the left
    const scrollLeft = () => {
        if (menuRef.current) {
            menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    // Scroll to the right
    const scrollRight = () => {
        if (menuRef.current) {
            menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
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
        }, 300); // 300ms delay before hiding the menu
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
        }, 300);
    };

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data: Category[] = await response.json(); // Assurez-vous que la réponse soit bien du type Category[]
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="relative">
            {/* Left Chevron */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 z-20 p-2 text-black transform -translate-y-1/2 bg-white rounded-md shadow-xl top-1/2 shadow-white"
            >
                <FaChevronLeft />
            </button>

            {/* Left gradient overlay */}
            <div className="absolute top-0 left-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

            {/* Main Menu */}
            <ul
                ref={menuRef}
                className="relative flex p-4 mx-8 space-x-6 overflow-x-hidden bg-white scrollbar-hide"
            >
                {categories.map((category: Category, index: number) => (
                    <li
                        key={category.name}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className={`relative cursor-pointer whitespace-nowrap ${
                            activeCategory === index
                                ? "border-b-4 border-primary"
                                : "border-b-4 border-transparent"
                        }`}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>

            {/* Right gradient overlay */}
            <div className="absolute top-0 right-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

            {/* Right Chevron */}
            <button
                onClick={scrollRight}
                className="absolute right-0 z-10 p-2 text-black transform -translate-y-1/2 bg-white rounded-md shadow-xl top-1/2 shadow-white"
            >
                <FaChevronRight />
            </button>

            {/* Submenu */}
            {activeCategory !== null && (
                <div
                    className="relative"
                    onMouseEnter={handleSubMenuMouseEnter}
                    onMouseLeave={handleSubMenuMouseLeave}
                >
                    {categories.map((category: Category, index: number) => (
                        <SubMenu
                            key={category.name}
                            children={category.children}
                            visible={activeCategory === index && isHovering}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
