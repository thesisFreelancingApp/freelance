"use client";

import { motion } from "framer-motion";
import { Search, FileCheck, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Trouvez le bon freelance",
    description:
      "Parcourez les profils et trouvez le talent qui correspond à vos besoins.",
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Discutez des détails",
    description:
      "Échangez sur votre projet et définissez les termes de la collaboration.",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Lancez votre projet",
    description:
      "Commencez à travailler avec votre freelance et concrétisez vos idées.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground">
            Réalisez vos projets en trois étapes simples
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 text-primary">
                {step.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-[2px] bg-primary/20">
                  <div className="absolute w-2 h-2 -right-1 -top-[3px] rotate-45 bg-primary/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
