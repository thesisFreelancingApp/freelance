"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const talents = [
  {
    title: "Artisanat Digital",
    image: "/categories/tunisian-digital-craft.jpg",
    description: "Design moderne inspiré par notre riche patrimoine",
    link: "/categories/digital-craft",
  },
  {
    title: "Tech & Innovation",
    image: "/categories/tunisian-tech.jpg",
    description: "Solutions technologiques à la pointe",
    link: "/categories/tech",
  },
  {
    title: "Marketing Local",
    image: "/categories/tunisian-marketing.jpg",
    description: "Stratégies adaptées au marché tunisien",
    link: "/categories/marketing",
  },
  {
    title: "Création de Contenu",
    image: "/categories/tunisian-content.jpg",
    description: "Contenu authentique et engageant",
    link: "/categories/content",
  },
];

export default function TunisianTalents() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Talents Tunisiens d'Exception
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'excellence tunisienne dans le digital, de l'artisanat
            traditionnel réinventé aux solutions tech innovantes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {talents.map((talent, index) => (
            <Link href={talent.link} key={talent.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <Image
                    src={talent.image}
                    alt={talent.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {talent.title}
                    </h3>
                    <p className="text-sm text-white/80">
                      {talent.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
