"use client";
import { CheckCircle } from "lucide-react";

const benefits = [
  { text: "Vérification de l'identité", icon: <CheckCircle size={32} /> },
  { text: "Support 24/7", icon: <CheckCircle size={32} /> },
  { text: "Garantie de satisfaction", icon: <CheckCircle size={32} /> },
  { text: "Paiements sécurisés", icon: <CheckCircle size={32} /> },
];

export const WhyChooseUs = () => {
  return (
    <div className="py-16">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">
          Pourquoi choisir Waia
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-4 text-primary">
                {benefit.icon}
              </div>
              <h3 className="mb-2 font-bold">{benefit.text}</h3>
              <p className="text-muted-foreground">
                Un détail court sur ce bénéfice.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
