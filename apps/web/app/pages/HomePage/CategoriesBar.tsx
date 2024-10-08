"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

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
    <div className="space-y-4">
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

    const leftColumnSubCategories = category.subCategories.slice(
        0,
        Math.ceil(category.subCategories.length / 2),
    );
    const rightColumnSubCategories = category.subCategories.slice(
        Math.ceil(category.subCategories.length / 2),
    );

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                {category.name}
                <ChevronDown className="inline-block w-4 h-4 ml-1" />
            </button>
            {isHovered && (
                <div className="absolute left-0 z-10 w-screen max-w-2xl mt-2 overflow-hidden bg-white rounded-lg shadow-lg">
                    <div className="grid grid-cols-2 gap-8 p-8">
                        <SubCategoryColumn
                            subCategories={leftColumnSubCategories}
                        />
                        <SubCategoryColumn
                            subCategories={rightColumnSubCategories}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function MultiLevelMenu() {
    return (
        <nav className="bg-white shadow-md">
            <div className="px-4 mx-auto ">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {menuItems.slice(0, 4).map((category, index) => (
                            <MainCategory
                                key={index}
                                category={category}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
