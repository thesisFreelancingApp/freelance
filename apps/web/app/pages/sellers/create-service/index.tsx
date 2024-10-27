"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createServiceWithCategoryAndPackage } from "@/server.actions/sellers/services.actions";
import { Category, Packages, ServiceData, SubCategory } from "@/types";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2CategorySelection from "./Step2CategorySelection";
import Step3PackageInfo from "./Step3PackageInfo";
import Step4UploadImages from "./Step4UploadImages";
import Step5Review from "./Step5Review";

// Définition des catégories avec sous-catégories et enfants

export default function ServiceCreationForm({
  categories,
}: {
  categories: Category[];
}) {
  const [step, setStep] = useState(1);
  const [serviceData, setServiceData] = useState<ServiceData>({
    name: "",
    description: "",
    tags: [],
    images: [],
  });
  const [packages, setPackages] = useState<Packages[]>([
    {
      name: "",
      description: "",
      price: new Prisma.Decimal(0),
      deliveryTime: 0,
      revisions: 0,
      features: [],
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<{
    main: Category | null;
    sub: SubCategory | null;
    child: SubCategory | null;
  }>({
    main: null,
    sub: null,
    child: null,
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (selectedCategory.child) {
      try {
        await createServiceWithCategoryAndPackage(
          serviceData,
          selectedCategory.child.id,
          packages,
        );
        alert("Service created successfully!");
      } catch (error) {
        console.error("Error creating service:", error);
      }
    } else {
      alert("Please select a child category.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1BasicInfo
            serviceData={serviceData}
            setServiceData={setServiceData}
          />
        );
      case 2:
        return (
          <Step2CategorySelection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        );
      case 3:
        return (
          <Step3PackageInfo packages={packages} setPackages={setPackages} />
        );
      case 4:
        return (
          <Step4UploadImages
            serviceData={serviceData}
            setServiceData={setServiceData}
          />
        );
      case 5:
        return (
          <Step5Review
            serviceData={serviceData}
            packages={packages}
            selectedCategory={selectedCategory}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>sdjhlskjdlsk</CardTitle>

        <Progress value={(step / 5) * 100} className="w-full" />
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {step < 5 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Confirm and Create Service</Button>
        )}
      </CardFooter>
    </Card>
  );
}
