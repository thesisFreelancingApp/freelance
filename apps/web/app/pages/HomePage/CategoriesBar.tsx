"use client";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Icônes de chevron

interface SubCategory {
    name: string;
    subcategories?: SubCategory[];
}

interface Category {
    name: string;
    subcategories: SubCategory[];
}

const categories: Category[] = [
    {
        name: "Graphisme & Design1",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design2",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design3",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration4",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subcategories: [
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Logo & identité visuelle",
                subcategories: [
                    { name: "Design de logo" },
                    { name: "Charte graphique" },
                    { name: "Cartes de visite et print" },
                ],
            },
            {
                name: "Art et illustration",
                subcategories: [
                    { name: "Illustrations" },
                    { name: "Artistes en IA" },
                ],
            },
        ],
    },
    // Ajoutez d'autres catégories ici...
];

// Sous-menu indépendant
const SubMenu: React.FC<{ subcategories: SubCategory[]; visible: boolean }> = ({
    subcategories,
    visible,
}) => {
    if (!visible) return null;

    return (
        <div className="absolute left-0 z-10 grid w-full grid-cols-4 gap-4 p-4 bg-white shadow-lg top-full">
            {subcategories.map((subcategory) => (
                <div
                    key={subcategory.name}
                    className="pb-2 border-b"
                >
                    <h4 className="font-bold">{subcategory.name}</h4>
                    {subcategory.subcategories && (
                        <ul className="mt-2 space-y-1 list-none">
                            {subcategory.subcategories.map((subSub) => (
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

const Menu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const timeoutRef = useRef<number | null>(null);

    // Fonction pour faire défiler vers la gauche
    const scrollLeft = () => {
        if (menuRef.current) {
            menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    // Fonction pour faire défiler vers la droite
    const scrollRight = () => {
        if (menuRef.current) {
            menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    // Gestion de l'entrée dans le menu
    const handleMouseEnter = (index: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Annule tout délai en cours
        }
        setActiveCategory(index);
        setIsHovering(true);
    };

    // Gestion de la sortie du menu avec délai
    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            setActiveCategory(null);
            setIsHovering(false);
        }, 300); // Délai avant de cacher le menu (300 ms)
    };

    // Empêche la sortie tant que la souris est sur le sous-menu
    const handleSubMenuMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsHovering(true);
    };

    const handleSubMenuMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            setActiveCategory(null);
            setIsHovering(false);
        }, 300);
    };

    return (
        <div className="relative ">
            {/* Chevron gauche */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 z-20 p-2 text-black transform -translate-y-1/2 bg-white rounded-md shadow-xl top-1/2 shadow-white SH"
            >
                <FaChevronLeft />
            </button>

            {/* Dégradation à gauche */}
            <div className="absolute top-0 left-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

            {/* Menu principal avec défilement horizontal */}
            <ul
                ref={menuRef}
                className="relative flex p-4 mx-8 space-x-6 overflow-x-hidden bg-white scrollbar-hide"
            >
                {categories.map((category, index) => (
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

            {/* Dégradation à droite */}
            <div className="absolute top-0 right-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

            {/* Chevron droit */}
            <button
                onClick={scrollRight}
                className="absolute right-0 z-10 p-2 text-black transform -translate-y-1/2 bg-white rounded-md shadow-xl top-1/2 shadow-white SH"
            >
                <FaChevronRight />
            </button>

            {/* Boîte (Sous-menu) */}
            {activeCategory !== null && (
                <div
                    className="relative"
                    onMouseEnter={handleSubMenuMouseEnter}
                    onMouseLeave={handleSubMenuMouseLeave}
                >
                    {categories.map((category, index) => (
                        <SubMenu
                            key={category.name}
                            subcategories={category.subcategories}
                            visible={activeCategory === index && isHovering}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
