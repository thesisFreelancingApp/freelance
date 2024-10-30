"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "Design & Créatifs",
    image: "/landing/services/design.jpg",
    count: "1,200+ services",
  },
  {
    title: "Développement Web",
    image: "/landing/services/web-dev.jpg",
    count: "2,500+ services",
  },
  {
    title: "Marketing Digital",
    image: "/landing/services/marketing.jpg",
    count: "1,800+ services",
  },
  {
    title: "Rédaction & Traduction",
    image: "/landing/services/writing.jpg",
    count: "1,500+ services",
  },
];

export default function PopularServices() {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Services Populaires
          </h2>
          <p className="text-muted-foreground">
            Découvrez nos catégories les plus demandées
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="mb-1 text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-200">{service.count}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
