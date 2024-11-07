"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const categories = [
  {
    name: "Tech & Développement",
    image:
      "https://f.hellowork.com/obs-static-images/seo/ObsJob/developpeur-web.jpg",

    count: "2,500+",
    color: "bg-blue-500",
    slug: "tech-development",
  },
  {
    name: "Design & Créatifs",
    image:
      "https://storage.letudiant.fr/mediatheque/letudiant/2/4/2743224-le-graphiste-est-un-specialiste-de-la-communication-visuelle-original.jpg",
    count: "1,800+",
    color: "bg-purple-500",
    slug: "design-creative",
  },
  {
    name: "Marketing Digital",
    image:
      "https://mundocontact.com/wp-content/uploads/2024/10/marketing-digital.jpg",
    count: "1,500+",
    color: "bg-green-500",
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
    <section className="py-20 ">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center text-foreground">
          Découvrez nos talents
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="block h-full group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/9]">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" />
                      <Badge
                        className={`absolute text-white top-4 left-4 ${category.color}`}
                      >
                        {category.count} services
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-2xl font-semibold transition-colors text-foreground group-hover:text-primary">
                        {category.name}
                      </h3>
                      <p className="flex items-center transition-colors text-muted-foreground group-hover:text-foreground">
                        Explorer la catégorie
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
