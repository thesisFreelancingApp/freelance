import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MinusCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PricingTier {
  name: string;
  price: number;
  description: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

interface FormData {
  pricing: {
    basic: PricingTier;
    standard: PricingTier;
    premium: PricingTier;
  };
}

interface Step2PricingProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step2Pricing: React.FC<Step2PricingProps> = ({
  formData,
  updateFormData,
}) => {
  const handleChange = (
    tier: "basic" | "standard" | "premium",
    field: string,
    value: string | number,
  ) => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], [field]: value },
      },
    });
  };

  const handlePriceChange = (
    tier: "basic" | "standard" | "premium",
    price: string,
  ) => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], price: parseFloat(price) || 0 },
      },
    });
  };

  const handleDeliveryTimeChange = (
    tier: "basic" | "standard" | "premium",
    deliveryTime: string,
  ) => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: {
          ...formData.pricing[tier],
          deliveryTime: parseInt(deliveryTime) || 1,
        },
      },
    });
  };

  const handleRevisionsChange = (
    tier: "basic" | "standard" | "premium",
    revisions: string,
  ) => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: {
          ...formData.pricing[tier],
          revisions: parseInt(revisions) || 0,
        },
      },
    });
  };

  const handleFeatureChange = (
    tier: "basic" | "standard" | "premium",
    index: number,
    value: string,
  ) => {
    const newFeatures = [...formData.pricing[tier].features];
    newFeatures[index] = value;
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], features: newFeatures },
      },
    });
  };

  const addFeature = (tier: "basic" | "standard" | "premium") => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: {
          ...formData.pricing[tier],
          features: [...formData.pricing[tier].features, ""],
        },
      },
    });
  };

  const removeFeature = (
    tier: "basic" | "standard" | "premium",
    index: number,
  ) => {
    const newFeatures = [...formData.pricing[tier].features];
    newFeatures.splice(index, 1);
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], features: newFeatures },
      },
    });
  };

  const handleDescriptionChange = (
    tier: "basic" | "standard" | "premium",
    description: string,
  ) => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], description },
      },
    });
  };

  const renderPricingTier = (tier: "basic" | "standard" | "premium") => {
    const bgColor = tier === "standard" ? "bg-primary/5" : "bg-background";
    return (
      <Card
        key={tier}
        className={`${bgColor} border-2 ${tier === "standard" ? "border-primary" : "border-border"}`}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold capitalize text-center">
            {tier}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor={`${tier}-name`} className="text-sm font-medium">
              Package Name
            </Label>
            <Input
              id={`${tier}-name`}
              value={formData.pricing[tier].name}
              onChange={(e) => handleChange(tier, "name", e.target.value)}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <Label htmlFor={`${tier}-price`} className="text-sm font-medium">
              Price ($)
            </Label>
            <Input
              id={`${tier}-price`}
              type="number"
              value={formData.pricing[tier].price}
              onChange={(e) =>
                handleChange(tier, "price", parseFloat(e.target.value))
              }
              className="mt-1 w-full"
            />
          </div>
          <div>
            <Label
              htmlFor={`${tier}-description`}
              className="text-sm font-medium"
            >
              Package Description
            </Label>
            <Textarea
              id={`${tier}-description`}
              value={formData.pricing[tier].description}
              onChange={(e) =>
                handleChange(tier, "description", e.target.value)
              }
              className="mt-1 w-full"
            />
          </div>
          <div>
            <Label
              htmlFor={`${tier}-delivery-time`}
              className="text-sm font-medium"
            >
              Delivery Time (days)
            </Label>
            <Input
              id={`${tier}-delivery-time`}
              type="number"
              value={formData.pricing[tier].deliveryTime}
              onChange={(e) =>
                handleChange(tier, "deliveryTime", parseInt(e.target.value))
              }
              className="mt-1 w-full"
            />
          </div>
          <div>
            <Label
              htmlFor={`${tier}-revisions`}
              className="text-sm font-medium"
            >
              Revisions
            </Label>
            <Input
              id={`${tier}-revisions`}
              type="number"
              value={formData.pricing[tier].revisions}
              onChange={(e) =>
                handleChange(tier, "revisions", parseInt(e.target.value))
              }
              className="mt-1 w-full"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Features</Label>
            {formData.pricing[tier].features.map((feature, index) => (
              <div key={index} className="flex items-center mt-2">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <Input
                  value={feature}
                  onChange={(e) =>
                    handleFeatureChange(tier, index, e.target.value)
                  }
                  placeholder={`Feature ${index + 1}`}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(tier, index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addFeature(tier)}
              className="mt-4 w-full text-primary hover:text-primary-foreground hover:bg-primary"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Pricing Packages
      </h2>
      <div className="flex-grow overflow-y-auto pr-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["basic", "standard", "premium"] as const).map(renderPricingTier)}
        </div>
      </div>
    </div>
  );
};

export default Step2Pricing;
