"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    title: "Créez votre profil",
    description: "Mettez en avant vos compétences et votre expérience",
    image: "/how-it-works/profile.jpg",
    features: [
      "Portfolio personnalisé",
      "Badges de compétences",
      "Recommandations",
    ],
  },
  {
    title: "Trouvez des projets",
    description: "Parcourez des opportunités adaptées à vos compétences",
    image: "/how-it-works/projects.jpg",
    features: ["Projets vérifiés", "Paiement sécurisé", "Support dédié"],
  },
  {
    title: "Commencez à travailler",
    description: "Collaborez efficacement et développez votre activité",
    image: "/how-it-works/work.jpg",
    features: [
      "Outils de collaboration",
      "Suivi de projet",
      "Paiements rapides",
    ],
  },
];

export default function InteractiveHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comment ça marche ?</h2>
          <p className="text-xl text-muted-foreground">
            Trois étapes simples pour réussir en tant que freelance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps Navigation */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all ${
                  activeStep === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/5 hover:bg-secondary/10"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Interactive Image */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[600px] rounded-2xl overflow-hidden"
          >
            <Image
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
