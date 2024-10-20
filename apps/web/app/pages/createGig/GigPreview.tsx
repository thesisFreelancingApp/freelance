import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PricingTier {
  price: number;
  features: string[];
}

interface GigPreviewProps {
  title: string;
  category: string;
  subcategory: string;
  tags: string[];
  pricing: {
    basic: PricingTier;
    standard: PricingTier;
    premium: PricingTier;
  };
  description: string;
  media: File | null;
}

const GigPreview: React.FC<GigPreviewProps> = ({
  title,
  category,
  subcategory,
  tags,
  pricing,
  description,
  media
}) => {
  const renderPricingTier = (tierName: string, tier: PricingTier) => (
    <div className="mb-4">
      <h4 className="font-semibold capitalize">{tierName}</h4>
      <p>${tier.price}</p>
      <ul className="list-disc list-inside">
        {tier.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gig Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold">{title}</h3>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Subcategory:</strong> {subcategory}</p>
        <Separator className="my-4" />
        <div>
          <h4 className="font-semibold">Description</h4>
          <p>{description}</p>
        </div>
        <Separator className="my-4" />
        <div>
          <h4 className="font-semibold">Pricing</h4>
          {renderPricingTier('Basic', pricing.basic)}
          {renderPricingTier('Standard', pricing.standard)}
          {renderPricingTier('Premium', pricing.premium)}
        </div>
        <Separator className="my-4" />
        <div>
          <h4 className="font-semibold">Tags</h4>
          <p>{tags.join(', ')}</p>
        </div>
        {media && (
          <>
            <Separator className="my-4" />
            <div>
              <h4 className="font-semibold">Media</h4>
              <p>File: {media.name}</p>
              {media.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(media)}
                  alt="Gig preview"
                  className="mt-2 max-w-full h-auto"
                />
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GigPreview;