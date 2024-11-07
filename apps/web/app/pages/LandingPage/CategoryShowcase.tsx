"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const categories = [
  {
    name: "Tech & Développement",
    image:
      "https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/webdev.webp?w=3840&q=75",
    count: "2,500+",
    color: "from-blue-500/20",
    slug: "tech-development",
  },
  {
    name: "Design & Créatifs",
    image: "/categories/design.jpg",
    count: "1,800+",
    color: "from-purple-500/20",
    slug: "design-creative",
  },
  {
    name: "Marketing Digital",
    image: "/categories/marketing.jpg",
    count: "1,500+",
    color: "from-green-500/20",
    slug: "digital-marketing",
  },
];

export default function CategoryShowcase() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer group"
            >
              <Link href={`/categories/${category.slug}`}>
                <div className="relative h-[300px] rounded-2xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="mb-4 text-white/80">
                      {category.count} services
                    </p>
                    <Button variant="secondary" className="w-full">
                      Explorer
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
