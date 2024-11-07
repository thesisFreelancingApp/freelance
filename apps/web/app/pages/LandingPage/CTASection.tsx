"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b ">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8 text-center"
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

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="transition-all duration-300 ease-in-out group bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                Commencer Maintenant
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="transition-all duration-300 ease-in-out border-2 group hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Nous Contacter
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
