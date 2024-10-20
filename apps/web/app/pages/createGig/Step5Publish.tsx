import React from 'react';
import { Button } from "@/components/ui/button";
import GigPreview from './GigPreview';
import { createService } from '@/server.actions/services.actions';

interface FormData {
  title: string;
  category: { id: number } | string;
  tags: string[];
  pricing: {
    basic: { price: number; features: string[] };
    standard: { price: number; features: string[] };
    premium: { price: number; features: string[] };
  };
  description: string;
  media: File | null;
}

const Step5Publish: React.FC<{ formData: FormData }> = ({ formData }) => {
  const { title, category, tags, pricing, description, media } = formData;

  const handlePublish = async () => {
    try {
      const categoryId = typeof category === "string" ? parseInt(category, 10) : (category as { id: number }).id;

      if (isNaN(categoryId)) {
        throw new Error("Invalid category ID");
      }

      const dataToSend = {
        name: formData.title,
        basicPrice: formData.pricing.basic.price,
        standardPrice: formData.pricing.standard.price,
        premiumPrice: formData.pricing.premium.price,
        categoryId: categoryId,
        deliveryTime: 7,  // Example; adjust based on formData if applicable
        revisions: 2,
        description: formData.description || "No description provided",  // Fallback if description is empty or null
        images: formData.media ? [URL.createObjectURL(formData.media)] : [],
        tags: formData.tags,
        userId: "user-123",  // Replace with actual user ID
      };

      await createService(dataToSend);
      console.log("Gig published successfully");
    } catch (error) {
      console.error("Error publishing gig:", error);
    }
  };

  return (
    <div className="space-y-4">
      <GigPreview subcategory={''} {...formData} category={typeof category === 'string' ? category : category.id.toString()} />
      <div className="flex space-x-4">
        <Button onClick={() => console.log('Save as draft', formData)}>
          Save as Draft
        </Button>
        {/* <Button onClick={handlePublish}>
          Publish Gig
        </Button> */}
      </div>
    </div>
  );
};

export default Step5Publish;
