"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

// Categories with subcategories and sub-subcategories
const categories = [
    {
        name: "Graphisme & Design",
        subcategories: [
            {
                name: "Logo Design",
                subSubcategories: [
                    "Minimalist Logos",
                    "3D Logos",
                    "Vintage Logos",
                    "Vintage Logos",
                    "Vintage Logos",
                    "Vintage Logos",
                    "Vintage Logos",
                ],
            },
            {
                name: "Web Design",
                subSubcategories: [
                    "Responsive Design",
                    "UX/UI Design",
                    "UX/UI Design",
                    "UX/UI Design",
                    "UX/UI Design",
                    "UX/UI Design",
                ],
            },
        ],
    },
    {
        name: "Programmation & Tech",
        subcategories: [
            {
                name: "Web Development",
                subSubcategories: ["Frontend", "Backend", "Full Stack"],
            },
            {
                name: "Mobile Apps",
                subSubcategories: ["iOS", "Android", "Cross-Platform"],
            },
        ],
    },
];

export default function CategoryNavbar() {
    const navRef = useRef<HTMLUListElement>(null);
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
    const [hoveredSubcategory, setHoveredSubcategory] = useState<number | null>(
        null,
    );
    const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });

    const scrollLeft = () => {
        if (navRef.current) {
            navRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (navRef.current) {
            navRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    // Function to calculate the position of the submenu relative to the viewport
    const calculateSubmenuPosition = (event: any) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const top = rect.bottom;
        const left = rect.left;
        setSubmenuPosition({ top, left });
    };

    // Delay function to handle mouse leave
    const handleMouseLeave = () => {
        setTimeout(() => {
            setHoveredCategory(null);
            setHoveredSubcategory(null);
        }, 300); // Small delay to make it smoother
    };

    return (
        <div className="relative w-screen bg-white">
            <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto bg-white">
                {/* Left arrow */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 z-20 p-2"
                    style={{
                        transform: "translateX(-50%)",
                        background: "white",
                    }}
                >
                    <ChevronLeftIcon className="w-6 h-6 text-black" />
                </button>

                {/* Transparent gradient on the left */}
                <div className="absolute top-0 left-0 z-10 w-10 h-full pointer-events-none bg-gradient-to-r from-white/100 to-white/0"></div>

                {/* Navigation bar */}
                <div className="w-full overflow-hidden">
                    <nav className="w-full">
                        <ul
                            ref={navRef}
                            className="flex px-4 py-2 space-x-4 text-black bg-white whitespace-nowrap scroll-smooth"
                            style={{
                                overflowX: "scroll",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className="relative flex items-center px-2 space-x-1"
                                    onMouseEnter={(event) => {
                                        setHoveredCategory(index);
                                        calculateSubmenuPosition(event);
                                    }}
                                >
                                    <Link
                                        href="#"
                                        className="text-sm hover:text-gray-900"
                                    >
                                        {category.name}
                                    </Link>

                                    {/* Subcategories on hover */}
                                    {hoveredCategory === index &&
                                        createPortal(
                                            <ul
                                                className="absolute z-40 w-48 py-2 mt-2 bg-white border rounded-lg shadow-lg"
                                                style={{
                                                    position: "absolute",
                                                    top:
                                                        submenuPosition.top +
                                                        "px",
                                                    left:
                                                        submenuPosition.left +
                                                        "px",
                                                }}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                {category.subcategories.map(
                                                    (subcategory, subIndex) => (
                                                        <li
                                                            key={subIndex}
                                                            className="relative px-4 py-2 hover:bg-gray-100"
                                                            onMouseEnter={() =>
                                                                setHoveredSubcategory(
                                                                    subIndex,
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setHoveredSubcategory(
                                                                    null,
                                                                )
                                                            }
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="text-sm text-black"
                                                            >
                                                                {
                                                                    subcategory.name
                                                                }
                                                            </Link>

                                                            {/* Sub-subcategories listed below */}
                                                            <ul className="mt-1 ml-4">
                                                                {subcategory.subSubcategories.map(
                                                                    (
                                                                        subSubcategory,
                                                                        subSubIndex,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                subSubIndex
                                                                            }
                                                                            className="px-2 py-1 text-xs hover:bg-gray-50"
                                                                        >
                                                                            <Link
                                                                                href="#"
                                                                                className="text-xs text-black"
                                                                            >
                                                                                {
                                                                                    subSubcategory
                                                                                }
                                                                            </Link>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>,
                                            document.body, // Render the dropdown into the body to avoid parent limitations
                                        )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Transparent gradient on the right */}
                <div className="absolute top-0 right-0 z-10 w-10 h-full pointer-events-none bg-gradient-to-l from-white/100 to-white/0"></div>

                {/* Right arrow */}
                <button
                    onClick={scrollRight}
                    className="absolute right-0 z-20 p-2"
                    style={{
                        transform: "translateX(50%)",
                        background: "white",
                    }}
                >
                    <ChevronRightIcon className="w-6 h-6 text-black" />
                </button>
            </div>
        </div>
    );
}
