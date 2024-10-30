"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Prêt à réaliser vos projets ?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Rejoignez notre communauté de freelances et clients satisfaits dès
            aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-primary hover:text-primary"
              asChild
            >
              <Link href="/sign-up">Commencer Maintenant</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Nous Contacter</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
