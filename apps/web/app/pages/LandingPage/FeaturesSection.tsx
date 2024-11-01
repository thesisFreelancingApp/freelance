"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Sparkles, Target } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Paiements Sécurisés",
    description: "Transactions protégées et garanties pour votre tranquillité",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Livraison Rapide",
    description: "Des délais respectés et un suivi en temps réel",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Qualité Premium",
    description: "Des freelances vérifiés et hautement qualifiés",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Support 24/7",
    description: "Une équipe à votre écoute pour vous accompagner",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px]"
          >
            <Image
              src="/landing/features-image.webp"
              alt="Features"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl" />
          </motion.div>

          {/* Content Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi choisir notre plateforme ?
              </h2>
              <p className="text-muted-foreground">
                Nous réunissons les meilleurs talents pour concrétiser vos
                projets
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
