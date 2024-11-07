"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  if (!mounted) return null;

  return (
    <section className="py-14 ">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">
            Ils nous font{" "}
            <span className="px-2 py-1 text-white bg-primary">confiance</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Des partenaires de confiance qui soutiennent notre vision
          </p>
        </motion.div>

        <div className="grid max-w-4xl grid-cols-1 gap-12 mx-auto md:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center h-24 group"
            >
              <div className="relative w-[200px] h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-all duration-500 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
