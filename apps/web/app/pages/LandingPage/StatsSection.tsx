"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Award, Globe } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: "50K+",
    label: "Freelances Actifs",
    description: "Talents vérifiés dans divers domaines",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    value: "100K+",
    label: "Projets Réalisés",
    description: "Projets livrés avec succès",
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: "98%",
    label: "Satisfaction Client",
    description: "Retours clients positifs",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: "150+",
    label: "Pays",
    description: "Une communauté internationale",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 text-center bg-background rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <h3 className="mb-2 text-3xl font-bold text-primary">
                {stat.value}
              </h3>
              <p className="mb-2 font-semibold">{stat.label}</p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
