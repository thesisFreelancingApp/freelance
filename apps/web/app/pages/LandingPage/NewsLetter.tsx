"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function NewsletterBanner() {
  return (
    <section className="relative flex items-center justify-between w-full px-8 py-16 mb-8 bg-gray-800 rounded-lg max-h-72">
      <div className="relative mr-8 w-72 h-72 md:block">
        <Image
          src="/hero/newsletter.webp" // Replace with the path to your image
          alt="Newsletter Illustration"
          fill
          className="object-contain ml-20 "
        />
      </div>
      <div className="flex flex-col max-w-md text-white">
        <h2 className="mb-4 text-4xl font-bold">
          Restez informé des{" "}
          <span className="italic font-normal">dernières actualités</span>
        </h2>
        <p className="mb-6 text-lg">
          Inscrivez-vous pour recevoir des mises à jour exclusives.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Entrez votre email ..."
            className="w-full sm:w-auto"
          />
          <Button className="w-full bg-primary sm:w-auto">S'inscrire</Button>
        </div>
      </div>
    </section>
  );
}
