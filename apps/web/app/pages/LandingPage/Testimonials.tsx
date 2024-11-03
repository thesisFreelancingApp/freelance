"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Entrepreneur",
    avatar: "/testimonials/avatar1.jpg",
    content:
      "J'ai trouvé le développeur parfait pour mon projet. Le processus était simple et le résultat excellent.",
    rating: 5,
  },
  {
    name: "Thomas Dubois",
    role: "Directeur Marketing",
    avatar: "/testimonials/avatar2.jpg",
    content:
      "La qualité des freelances sur cette plateforme est impressionnante. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Marie Laurent",
    role: "Designer",
    avatar: "/testimonials/avatar3.jpg",
    content:
      "Une expérience client exceptionnelle. J'ai pu développer mon activité grâce à la plateforme.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground">
            Découvrez les expériences de ceux qui nous font confiance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-muted-foreground">
                  {testimonial.content}
                </p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
