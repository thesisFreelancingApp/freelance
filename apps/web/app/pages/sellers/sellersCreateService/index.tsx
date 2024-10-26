"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Step1Overview from "./Step1Overview";
import Step2Pricing from "./Step2Pricing";
import Step4Media from "./Step4Media";
import Step5Publish from "./Step5Publish";
import ProgressBar from "./ProgressBar";

interface PricingTier {
  name: string;
  price: number;
  description: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

interface PostGigFormData {
  title: string;
  category: { id: number; name: string };
  subcategory: string;
  tags: string[];
  pricing: {
    basic: PricingTier;
    standard: PricingTier;
    premium: PricingTier;
  };
  description: string;
  media: File[];
}

const PostGig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PostGigFormData>({
    title: "",
    category: { id: 0, name: "" },
    subcategory: "",
    tags: [],
    pricing: {
      basic: {
        name: "Basic",
        price: 0,
        description: "",
        features: [],
        deliveryTime: 1,
        revisions: 1,
      },
      standard: {
        name: "Standard",
        price: 0,
        description: "",
        features: [],
        deliveryTime: 2,
        revisions: 2,
      },
      premium: {
        name: "Premium",
        price: 0,
        description: "",
        features: [],
        deliveryTime: 3,
        revisions: 3,
      },
    },
    description: "",
    media: [],
  });

  const updateFormData = (newData: Partial<PostGigFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Overview formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <Step2Pricing formData={formData} updateFormData={updateFormData} />
        );
      case 3:
        return (
          <Step4Media formData={formData} updateFormData={updateFormData} />
        );
      case 4:
        return <Step5Publish formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center text-primary">
        Create Your Gig
      </h1>
      <Card className="w-full shadow-lg">
        <CardContent className="p-8">
          <ProgressBar currentStep={currentStep} totalSteps={4} />
          <div className="mt-8">
            <div className="h-[500px] overflow-y-auto">{renderStep()}</div>
            <div className="flex justify-between pt-4 mt-8 border-t">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {currentStep < 4 ? (
                <Button onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => {}} // This is handled in Step5Publish
                  className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Publish Gig
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostGig;
