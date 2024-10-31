"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Prêt à réaliser vos projets ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Rejoignez notre communauté de freelances et clients satisfaits dès
              aujourd'hui.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground 
                transition-all duration-300 ease-in-out"
              asChild
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                Commencer Maintenant
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group border-2 hover:bg-accent hover:text-accent-foreground
                transition-all duration-300 ease-in-out"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Nous Contacter
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
