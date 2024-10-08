"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

type MenuItem = {
    name: string;
    subCategories: {
        name: string;
        items: string[];
    }[];
};

const menuItems: MenuItem[] = [
    {
        name: "Graphisme & Design",
        subCategories: [
            {
                name: "Logo et identité visuelle",
                items: [
                    "Design de logo",
                    "Charte graphique",
                    "Cartes de visite et print",
                    "Polices et typographie",
                    "Outil de création de logo",
                ],
            },
            {
                name: "Art et illustration",
                items: [
                    "Illustrations",
                    "Artistes en IA",
                    "Avatar IA",
                    "Illustrations de livres pour enfants",
                    "Portraits et caricatures",
                ],
            },
            {
                name: "Webdesign et mobile design",
                items: [
                    "Webdesign",
                    "Mobile design",
                    "UX Design",
                    "Design de landing page",
                    "Icônes et pictogrammes",
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subCategories: [
            {
                name: "Logo et identité visuelle",
                items: [
                    "Design de logo",
                    "Charte graphique",
                    "Cartes de visite et print",
                    "Polices et typographie",
                    "Outil de création de logo",
                ],
            },
            {
                name: "Art et illustration",
                items: [
                    "Illustrations",
                    "Artistes en IA",
                    "Avatar IA",
                    "Illustrations de livres pour enfants",
                    "Portraits et caricatures",
                ],
            },
            {
                name: "Webdesign et mobile design",
                items: [
                    "Webdesign",
                    "Mobile design",
                    "UX Design",
                    "Design de landing page",
                    "Icônes et pictogrammes",
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subCategories: [
            {
                name: "Logo et identité visuelle",
                items: [
                    "Design de logo",
                    "Charte graphique",
                    "Cartes de visite et print",
                    "Polices et typographie",
                    "Outil de création de logo",
                ],
            },
            {
                name: "Art et illustration",
                items: [
                    "Illustrations",
                    "Artistes en IA",
                    "Avatar IA",
                    "Illustrations de livres pour enfants",
                    "Portraits et caricatures",
                ],
            },
            {
                name: "Webdesign et mobile design",
                items: [
                    "Webdesign",
                    "Mobile design",
                    "UX Design",
                    "Design de landing page",
                    "Icônes et pictogrammes",
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subCategories: [
            {
                name: "Logo et identité visuelle",
                items: [
                    "Design de logo",
                    "Charte graphique",
                    "Cartes de visite et print",
                    "Polices et typographie",
                    "Outil de création de logo",
                ],
            },
            {
                name: "Art et illustration",
                items: [
                    "Illustrations",
                    "Artistes en IA",
                    "Avatar IA",
                    "Illustrations de livres pour enfants",
                    "Portraits et caricatures",
                ],
            },
            {
                name: "Webdesign et mobile design",
                items: [
                    "Webdesign",
                    "Mobile design",
                    "UX Design",
                    "Design de landing page",
                    "Icônes et pictogrammes",
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subCategories: [
            {
                name: "Logo et identité visuelle",
                items: [
                    "Design de logo",
                    "Charte graphique",
                    "Cartes de visite et print",
                    "Polices et typographie",
                    "Outil de création de logo",
                ],
            },
            {
                name: "Art et illustration",
                items: [
                    "Illustrations",
                    "Artistes en IA",
                    "Avatar IA",
                    "Illustrations de livres pour enfants",
                    "Portraits et caricatures",
                ],
            },
            {
                name: "Webdesign et mobile design",
                items: [
                    "Webdesign",
                    "Mobile design",
                    "UX Design",
                    "Design de landing page",
                    "Icônes et pictogrammes",
                ],
            },
        ],
    },
    {
        name: "Graphisme & Design",
        subCategories: [
            {
                name: "Logo et identité visuelle",
                items: [
                    "Design de logo",
                    "Charte graphique",
                    "Cartes de visite et print",
                    "Polices et typographie",
                    "Outil de création de logo",
                ],
            },
            {
                name: "Art et illustration",
                items: [
                    "Illustrations",
                    "Artistes en IA",
                    "Avatar IA",
                    "Illustrations de livres pour enfants",
                    "Portraits et caricatures",
                ],
            },
            {
                name: "Webdesign et mobile design",
                items: [
                    "Webdesign",
                    "Mobile design",
                    "UX Design",
                    "Design de landing page",
                    "Icônes et pictogrammes",
                ],
            },
        ],
    },
    {
        name: "Programmation & Tech",
        subCategories: [
            {
                name: "Développement web",
                items: [
                    "Sites web",
                    "E-commerce",
                    "Applications web",
                    "Landing pages",
                    "API",
                ],
            },
            {
                name: "Développement mobile",
                items: [
                    "Applications iOS",
                    "Applications Android",
                    "Applications cross-platform",
                    "Jeux mobiles",
                ],
            },
        ],
    },
    {
        name: "Programmation & Tech",
        subCategories: [
            {
                name: "Développement web",
                items: [
                    "Sites web",
                    "E-commerce",
                    "Applications web",
                    "Landing pages",
                    "API",
                ],
            },
            {
                name: "Développement mobile",
                items: [
                    "Applications iOS",
                    "Applications Android",
                    "Applications cross-platform",
                    "Jeux mobiles",
                ],
            },
        ],
    },
    {
        name: "Programmation & Tech",
        subCategories: [
            {
                name: "Développement web",
                items: [
                    "Sites web",
                    "E-commerce",
                    "Applications web",
                    "Landing pages",
                    "API",
                ],
            },
            {
                name: "Développement mobile",
                items: [
                    "Applications iOS",
                    "Applications Android",
                    "Applications cross-platform",
                    "Jeux mobiles",
                ],
            },
        ],
    },
    {
        name: "Programmation & Tech",
        subCategories: [
            {
                name: "Développement web",
                items: [
                    "Sites web",
                    "E-commerce",
                    "Applications web",
                    "Landing pages",
                    "API",
                ],
            },
            {
                name: "Développement mobile",
                items: [
                    "Applications iOS",
                    "Applications Android",
                    "Applications cross-platform",
                    "Jeux mobiles",
                ],
            },
        ],
    },
    {
        name: "Marketing digital",
        subCategories: [
            {
                name: "SEO",
                items: [
                    "Audit SEO",
                    "Optimisation on-page",
                    "Linkbuilding",
                    "SEO local",
                ],
            },
            {
                name: "Réseaux sociaux",
                items: [
                    "Gestion de réseaux sociaux",
                    "Publicité sur réseaux sociaux",
                    "Stratégie de contenu",
                ],
            },
        ],
    },
    {
        name: "Vidéo & Animastion",
        subCategories: [
            {
                name: "Production vidéo",
                items: [
                    "Montage vidéo",
                    "Animation 2D et 3D",
                    "Effets spéciaux",
                    "Motion design",
                ],
            },
            {
                name: "Voix off",
                items: [
                    "Voix off en français",
                    "Voix off en anglais",
                    "Doublage",
                    "Sous-titrage",
                ],
            },
        ],
    },
    {
        name: "Rédaction & Traduction",
        subCategories: [
            {
                name: "Rédaction",
                items: [
                    "Articles de blog",
                    "Copywriting",
                    "Rédaction SEO",
                    "Relecture et correction",
                ],
            },
            {
                name: "Traduction",
                items: [
                    "Traduction français-anglais",
                    "Traduction anglais-français",
                    "Traduction technique",
                    "Localisation",
                ],
            },
        ],
    },
    {
        name: "Rédaction & Traductions",
        subCategories: [
            {
                name: "Rédaction",
                items: [
                    "Articles de blog",
                    "Copywriting",
                    "Rédaction SEO",
                    "Relecture et correction",
                ],
            },
            {
                name: "Traduction",
                items: [
                    "Traduction français-anglais",
                    "Traduction anglais-français",
                    "Traduction technique",
                    "Localisation",
                ],
            },
        ],
    },
    {
        name: "Rédaction & Traduction",
        subCategories: [
            {
                name: "Rédaction",
                items: [
                    "Articles de blog",
                    "Copywriting",
                    "Rédaction SEO",
                    "Relecture et correction",
                ],
            },
            {
                name: "Traduction",
                items: [
                    "Traduction français-anglais",
                    "Traduction anglais-français",
                    "Traduction technique",
                    "Localisation",
                ],
            },
        ],
    },
    {
        name: "Rédaction & Traduction",
        subCategories: [
            {
                name: "Rédaction",
                items: [
                    "Articles de blog",
                    "Copywriting",
                    "Rédaction SEO",
                    "Relecture et correction",
                ],
            },
            {
                name: "Traduction",
                items: [
                    "Traduction français-anglais",
                    "Traduction anglais-français",
                    "Traduction technique",
                    "Localisation",
                ],
            },
        ],
    },
];

const SubCategoryColumn: React.FC<{
    subCategories: { name: string; items: string[] }[];
}> = ({ subCategories }) => (
    <div className="space-y-4 bg-white">
        {subCategories.map((subCategory, index) => (
            <div key={index}>
                <h3 className="mb-2 font-medium text-gray-900">
                    {subCategory.name}
                </h3>
                <ul className="space-y-1">
                    {subCategory.items.map((item, itemIndex) => (
                        <li
                            key={itemIndex}
                            className="text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

const MainCategory: React.FC<{ category: MenuItem }> = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const submenuRef = useRef<HTMLDivElement>(null);

    const leftColumnSubCategories = useMemo(
        () =>
            category.subCategories.slice(
                0,
                Math.ceil(category.subCategories.length / 2),
            ),
        [category.subCategories],
    );

    const rightColumnSubCategories = useMemo(
        () =>
            category.subCategories.slice(
                Math.ceil(category.subCategories.length / 2),
            ),
        [category.subCategories],
    );

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    useEffect(() => {
        if (isHovered && buttonRef.current && submenuRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            submenuRef.current.style.left = `${rect.left + rect.width / 2}px`;
            submenuRef.current.style.top = `${rect.bottom}px`;
        }
    }, [isHovered]);

    return (
        <div
            className="inline-block "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                ref={buttonRef}
                className="z-50 px-4 text-gray-800 dark:text-white hover:text-gray-900 focus:outline-none"
            >
                {category.name}
                <ChevronDown className="inline-block w-4 h-4 ml-1" />
            </button>
            {isHovered &&
                createPortal(
                    <div
                        ref={submenuRef}
                        className="absolute z-50 max-h-full text-white bg-white rounded-lg shadow-lg"
                    >
                        <div className="grid grid-cols-2 gap-8 p-8 ">
                            <SubCategoryColumn
                                subCategories={leftColumnSubCategories}
                            />
                            <SubCategoryColumn
                                subCategories={rightColumnSubCategories}
                            />
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
};

export default function MultiLevelMenu() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtonsVisibility = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        }
    }, []);

    useEffect(() => {
        updateScrollButtonsVisibility();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtonsVisibility);
        }
        return () => {
            if (container) {
                container.removeEventListener(
                    "scroll",
                    updateScrollButtonsVisibility,
                );
            }
        };
    }, [updateScrollButtonsVisibility]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="relative">
            {/* Left Scroll Button */}
            {canScrollLeft && (
                <button
                    className="absolute top-0 bottom-0 left-0 z-10 px-2 text-primary bg-gradient-to-r from-background to-transparent focus:outline-none"
                    onClick={scrollLeft}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}
            {/* Right Scroll Button */}
            {canScrollRight && (
                <button
                    className="absolute top-0 bottom-0 right-0 z-10 px-2 py-0 text-primary bg-gradient-to-l from-background to-transparent focus:outline-none"
                    onClick={scrollRight}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}

            <div
                className="overflow-x-hidden whitespace-nowrap"
                ref={scrollContainerRef}
            >
                <div className="flex px-4 text-white dark:text-white">
                    {menuItems.map((category, index) => (
                        <MainCategory
                            key={index}
                            category={category}
                        />
                    ))}
                </div>
            </div>

            {/* Fade effect on the left */}
            {canScrollLeft && (
                <div className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-background to-transparent"></div>
            )}
            {/* Fade effect on the right */}
            {canScrollRight && (
                <div className="absolute top-0 bottom-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-background to-transparent"></div>
            )}
        </nav>
    );
}
