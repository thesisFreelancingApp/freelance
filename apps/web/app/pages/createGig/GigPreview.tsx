import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, DollarSign, Clock, RefreshCw } from "lucide-react";

interface PricingTier {
  name: string;
  price: number;
  description: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

interface GigPreviewProps {
  title: string;
  category: { id: number; name: string } | string;
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

const GigPreview: React.FC<GigPreviewProps> = ({
  title,
  category,
  subcategory,
  tags,
  pricing,
  description,
  media,
}) => {
  const renderPricingTier = (tierName: string, tier: PricingTier) => (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold capitalize">
          {tier.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center text-3xl font-bold mb-4">
          <DollarSign className="h-6 w-6 mr-1" />
          {tier.price}
        </div>
        <p className="text-sm mb-4">{tier.description}</p>
        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {tier.deliveryTime} day{tier.deliveryTime > 1 ? "s" : ""}
          </div>
          <div className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-1" />
            {tier.revisions} revision{tier.revisions > 1 ? "s" : ""}
          </div>
        </div>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {media && media.length > 0 && (
        <div className="mb-6">
          {media[0].type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(media[0])}
              alt="Gig preview"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex space-x-2 mb-2">
          <Badge variant="secondary">
            {typeof category === "string" ? category : category.name}
          </Badge>
          <Badge variant="outline">{subcategory}</Badge>
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="font-semibold text-lg mb-2">Description</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Separator />
      <div>
        <h4 className="font-semibold text-lg mb-4">Pricing</h4>
        <div className="flex flex-col md:flex-row gap-4">
          {renderPricingTier("Basic", pricing.basic)}
          {renderPricingTier("Standard", pricing.standard)}
          {renderPricingTier("Premium", pricing.premium)}
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="font-semibold text-lg mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GigPreview;
