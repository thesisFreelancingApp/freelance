import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Step1Overview from '@/app/pages/createGig/Step1Overview';
import Step2Pricing from '@/app/pages/createGig/Step2Pricing';
import Step3Description from '@/app/pages/createGig/Step3Description';
import Step4Media from '@/app/pages/createGig/Step4Media';
import Step5Publish from '@/app/pages/createGig/Step5Publish';
import ProgressBar from '@/app/pages/createGig/ProgressBar';
import { createService } from '@/server.actions/services.actions';  // Add the server action import

interface PostGigFormData {
  title: string;
  category: string;
  categoryId: string;
  subcategory: string;
  subcategoryId: string;
  tags: string[];
  pricing: {
    basic: { price: number; features: string[] };
    standard: { price: number; features: string[] };
    premium: { price: number; features: string[] };
  };
  description: string;
  media: File | null;
}

const PostGig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PostGigFormData>({
    title: '',
    category: '',
    categoryId: '',
    subcategory: '',
    subcategoryId: '',
    tags: [],
    pricing: {
      basic: { price: 0, features: [] },
      standard: { price: 0, features: [] },
      premium: { price: 0, features: [] },
    },
    description: '',
    media: null,
  });

  const updateFormData = (newData: Partial<PostGigFormData>) => {
    console.log("Updating form data:", newData);  // Debug: Log the data being updated
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = async () => {
    try {
      console.log("Form Data at publish:", formData);  // Debug: Ensure formData contains the description

      // Validate categoryId and subcategoryId to ensure they are valid numbers
      const categoryId = parseInt(formData.categoryId, 10);
      const subcategoryId = parseInt(formData.subcategoryId, 10);

      if (isNaN(categoryId) || isNaN(subcategoryId)) {
        throw new Error("Invalid category or subcategory ID");
      }

      // Validate required fields
      if (!formData.title || !formData.description || !formData.categoryId || !formData.subcategoryId) {
        throw new Error("Title, category, subcategory, and description are required.");
      }

      const transformedData = {
        name: formData.title,
        basicPrice: formData.pricing.basic.price,
        standardPrice: formData.pricing.standard.price,
        premiumPrice: formData.pricing.premium.price,
        categoryId,
        subcategoryId,
        userId: '3',  // Hardcoded userId for testing
        deliveryTime: 7,
        revisions: 3,
        images: formData.media ? [URL.createObjectURL(formData.media)] : [],
        tags: formData.tags,
        description: formData.description || "No description",  // Add fallback value
      };

      console.log("Publishing service with data:", transformedData);

      // Call the server action to create the service
      const response = await createService(transformedData);
      console.log("Service published:", response);

      // Optionally, handle UI feedback on successful publish
      alert('Gig Published Successfully!');
    } catch (error) {
      console.error("Error publishing gig:", error instanceof Error ? error.message : error);
      alert(`Failed to publish gig: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Overview formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2Pricing formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3Description formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4Media formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Step5Publish formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          {/* Progress bar */}
          <ProgressBar currentStep={currentStep} totalSteps={5} />

          {/* Render current step */}
          {renderStep()}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button onClick={handlePrevious}>Previous</Button>
            )}
            {currentStep < 5 ? (
              <Button onClick={handleNext} className="ml-auto">Next</Button>
            ) : (
              <Button onClick={handlePublish} className="ml-auto">
                Publish Gig
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostGig;
