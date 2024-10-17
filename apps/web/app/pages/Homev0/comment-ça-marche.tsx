import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: '🔍',
      title: 'Recherche simple',
      description: 'Utilisez la barre de recherche ou trouvez les catégories du menu de navigation pour trouver votre service.'
    },
    {
      icon: '📋',
      title: 'Sélection simple',
      description: 'Choisissez un service en fonction des évaluations, du niveau et des avis, ou utilisez des filtres tels que « Freelance parlant français ».'
    },
    {
      icon: '💳',
      title: 'Paiement facile',
      description: 'Embauchez votre freelance facilement et en toute sécurité - paiements sécurisés, communication directe et livraisons dans les délais.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 inline-block">
        <h2 className="text-xl font-semibold text-gray-800">WAIA, comment ça marche ?</h2>
        <div className="h-[1px] bg-gray-300 w-full mt-1"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-4">
            <div className="text-3xl mb-3">{step.icon}</div>
            <h3 className="text-base font-semibold mb-2">{step.title}</h3>
            <CardContent className="p-0">
              <p className="text-xs text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8 text-gray-600 text-xs">
        Vous avez des questions ? Rendez-vous{' '}
        <Button variant="link" className="text-blue-500 p-0 text-xs">
          ici
        </Button>{' '}
        pour en savoir plus.
      </div>
    </div>
  );
};

export default HowItWorks;
