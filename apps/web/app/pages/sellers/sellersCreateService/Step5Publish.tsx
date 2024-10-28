import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GigPreview from "./GigPreview";
import { createService } from "@/server.actions/services.actions";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PricingTier {
  name: string;
  price: number;
  features: string[];
  deliveryTime: number;
  revisions: number;
  description: string;
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
  media: File[]; // Change this to File[]
}

const Step5Publish: React.FC<{ formData: PostGigFormData }> = ({
  formData,
}) => {
  const [publishStatus, setPublishStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handlePublish = async () => {
    try {
      setPublishStatus("idle");
      setErrorMessage(null);

      const categoryId =
        typeof formData.category === "string"
          ? parseInt(formData.category, 10)
          : formData.category.id;

      if (isNaN(categoryId)) {
        throw new Error("Invalid category ID");
      }

      const dataToSend = {
        name: formData.title,
        description: formData.description,
        categoryId: categoryId,
        subcategoryId: formData.subcategory, // Assuming subcategory is now a number
        images: formData.media.map((file) => URL.createObjectURL(file)),
        tags: formData.tags,
        packages: {
          basic: {
            ...formData.pricing.basic,
            description: formData.pricing.basic.description,
          },
          standard: {
            ...formData.pricing.standard,
            description: formData.pricing.standard.description,
          },
          premium: {
            ...formData.pricing.premium,
            description: formData.pricing.premium.description,
          },
        },
      };

      const result = await createService(dataToSend);
      // console.log("Gig published successfully:", result);
      setPublishStatus("success");
    } catch (error) {
      console.error("Error publishing gig:", error);
      setPublishStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="mb-6 text-2xl font-semibold text-primary">
        Review and Publish
      </h2>
      <div className="flex-grow pr-4 overflow-y-auto">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card>
              <CardContent className="p-6">
                <GigPreview {...formData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="summary">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Gig Summary</h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Title:</strong> {formData.title}
                  </li>
                  <li>
                    <strong>Category:</strong>{" "}
                    {typeof formData.category === "string"
                      ? formData.category
                      : formData.category.name}
                  </li>
                  <li>
                    <strong>Tags:</strong> {formData.tags.join(", ")}
                  </li>
                  <li>
                    <strong>Description:</strong>{" "}
                    {formData.description.substring(0, 100)}...
                  </li>
                  <li>
                    <strong>Pricing:</strong>
                  </li>
                  <ul className="ml-4">
                    {Object.entries(formData.pricing).map(([tier, details]) => (
                      <li key={tier}>
                        <strong>
                          {tier.charAt(0).toUpperCase() + tier.slice(1)}:
                        </strong>{" "}
                        ${details.price} - {details.name}
                        <br />
                        <span className="text-sm text-gray-600">
                          Description: {details.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-6">
        {publishStatus === "success" && (
          <Alert className="mb-4">
            <CheckCircle className="w-4 h-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your gig has been published successfully!
            </AlertDescription>
          </Alert>
        )}
        {publishStatus === "error" && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => console.log("Save as draft", formData)}
          >
            Save as Draft
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={publishStatus === "success"}
          >
            {publishStatus === "success" ? "Published" : "Publish Gig"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step5Publish;
