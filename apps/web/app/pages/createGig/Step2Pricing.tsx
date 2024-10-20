import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PricingTier {
  price: number;
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

const Step2Pricing: React.FC<Step2PricingProps> = ({ formData, updateFormData }) => {
  const handlePriceChange = (tier: 'basic' | 'standard' | 'premium', price: string) => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], price: parseFloat(price) || 0 }
      }
    });
  };

  const handleFeatureChange = (tier: 'basic' | 'standard' | 'premium', index: number, value: string) => {
    const newFeatures = [...formData.pricing[tier].features];
    newFeatures[index] = value;
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], features: newFeatures }
      }
    });
  };

  const addFeature = (tier: 'basic' | 'standard' | 'premium') => {
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { 
          ...formData.pricing[tier], 
          features: [...formData.pricing[tier].features, '']
        }
      }
    });
  };

  const removeFeature = (tier: 'basic' | 'standard' | 'premium', index: number) => {
    const newFeatures = formData.pricing[tier].features.filter((_, i) => i !== index);
    updateFormData({
      pricing: {
        ...formData.pricing,
        [tier]: { ...formData.pricing[tier], features: newFeatures }
      }
    });
  };

  const renderPricingTier = (tier: 'basic' | 'standard' | 'premium') => {
    return (
      <Card key={tier} className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold capitalize text-center">{tier}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${tier}-price`} className="block mb-2 text-sm font-medium">Price ($)</Label>
              <Input
                id={`${tier}-price`}
                type="number"
                value={formData.pricing[tier].price}
                onChange={(e) => handlePriceChange(tier, e.target.value)}
                placeholder="Enter price"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium">Features</Label>
              {formData.pricing[tier].features.map((feature, index) => (
                <div key={index} className="flex items-center mt-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(tier, index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-grow w-full p-2 border rounded-lg"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeFeature(tier, index)}
                    className="ml-2"
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
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-6 py-16 space-y-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Pricing Tiers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(['basic', 'standard', 'premium'] as const).map(renderPricingTier)}
      </div>
    </div>
  );
};

export default Step2Pricing;