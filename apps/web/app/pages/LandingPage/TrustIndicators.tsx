"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const partners = [
  { name: "Konnect", logo: "/partners/konnect.svg" },
  { name: "Rbk", logo: "/partners/rbk.svg" },
  { name: "Flat6Labs", logo: "/partners/flat6.webp" },
];

export default function TrustIndicators() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground">
            Des partenaires de confiance qui soutiennent notre vision
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative w-[160px] h-[60px] flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
