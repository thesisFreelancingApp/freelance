"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createServiceWithCategoryAndPackage } from "@/server.actions/sellers/services.actions";
import { Category, Packages, ServiceData, SubCategory } from "@/types";
import { Prisma } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2CategorySelection from "./Step2CategorySelection";
import Step3PackageInfo from "./Step3PackageInfo";
import Step4UploadImages from "./Step4UploadImages";
import Step5Review from "./Step5Review";
export default function FormulaireCreationService({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nombreEtapes = 5;
  const etapeInitiale = parseInt(searchParams.get("step") || "1", 10);
  const [etapeCourante, setEtapeCourante] = useState<number>(
    Math.min(etapeInitiale, nombreEtapes),
  );
  const progression = (etapeCourante / nombreEtapes) * 100;

  const [donneesService, setDonneesService] = useState<ServiceData>({
    name: "",
    description: "",
    tags: [],
    medias: [],
  });
  const [forfaits, setForfaits] = useState<Packages[]>([
    {
      name: "",
      description: "",
      price: new Prisma.Decimal(0), // Utilisation de number ici
      deliveryTime: 0,
      revisions: 0,
      features: [],
    },
  ]);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState<{
    main: Category | null;
    sub: SubCategory | null;
    child: SubCategory | null;
  }>({
    main: null,
    sub: null,
    child: null,
  });

  useEffect(() => {
    // Mettre à jour l'URL en fonction de l'étape actuelle
    router.replace(`${window.location.pathname}?step=${etapeCourante}`);
  }, [etapeCourante]);

  const handleSubmit = async () => {
    if (categorieSelectionnee.child) {
      try {
        // Convertir medias pour correspondre au format InputJsonValue de Prisma
        const formattedServiceData = {
          ...donneesService,
          medias: JSON.parse(JSON.stringify(donneesService.medias)), // Conversion en JSON compatible Prisma
        };

        await createServiceWithCategoryAndPackage(
          formattedServiceData,
          categorieSelectionnee.child.id,
          forfaits,
        );
        alert("Service créé avec succès !");
        setEtapeCourante(nombreEtapes);
      } catch (error) {
        console.error("Erreur lors de la création du service :", error);
      }
    } else {
      alert("Veuillez sélectionner une sous-catégorie.");
    }
  };

  const etapeSuivante = () => {
    setEtapeCourante((prev) => Math.min(prev + 1, nombreEtapes));
  };

  const etapePrecedente = () => {
    setEtapeCourante((prev) => Math.max(prev - 1, 1));
  };

  const afficherEtape = () => {
    switch (etapeCourante) {
      case 1:
        return (
          <Step1BasicInfo
            serviceData={donneesService}
            setServiceData={setDonneesService}
          />
        );
      case 2:
        return (
          <Step2CategorySelection
            selectedCategory={categorieSelectionnee}
            setSelectedCategory={setCategorieSelectionnee}
            categories={categories}
          />
        );
      case 3:
        return (
          <Step3PackageInfo packages={forfaits} setPackages={setForfaits} />
        );
      case 4:
        return (
          <Step4UploadImages
            serviceData={donneesService}
            setServiceData={setDonneesService}
          />
        );
      case 5:
        return (
          <Step5Review
            serviceData={donneesService}
            packages={forfaits}
            selectedCategory={categorieSelectionnee}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardHeader>
        <div className="flex justify-center mb-4 space-x-4">
          {[...Array(nombreEtapes)].map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
                etapeCourante === index + 1 ? "bg-primary" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <CardTitle className="text-3xl font-bold">Détails du Service</CardTitle>
        <Progress value={progression} className="w-full mb-6" />
        <CardDescription>
          Veuillez compléter les détails du service.
        </CardDescription>
      </CardHeader>

      <CardContent>{afficherEtape()}</CardContent>
      <CardFooter className="flex justify-between">
        {etapeCourante > 1 && (
          <Button variant="outline" onClick={etapePrecedente}>
            Précédent
          </Button>
        )}
        {etapeCourante < nombreEtapes ? (
          <Button onClick={etapeSuivante}>Suivant</Button>
        ) : (
          <Button onClick={handleSubmit}>Confirmer et Créer le Service</Button>
        )}
      </CardFooter>
    </Card>
  );
}
