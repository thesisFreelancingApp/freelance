import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, Packages, ServiceData, SubCategory } from "@/types";

interface Step5ReviewProps {
  serviceData: ServiceData;
  selectedCategory: {
    main: Category | null;
    sub: SubCategory | null;
    child: SubCategory | null;
  };
  packages: Packages[];
  onSubmit: () => void;
}

export default function Step5Review({
  serviceData,
  selectedCategory,
  packages,
  onSubmit,
}: Step5ReviewProps) {
  return (
    <Card className="w-full max-w-2xl p-4 mx-auto space-y-4">
      <CardHeader>
        <CardTitle>Review and Confirm Your Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Service Information */}
        <div>
          <h3 className="font-semibold">Service Information</h3>
          <p>
            <strong>Name:</strong> {serviceData.name}
          </p>
          <p>
            <strong>Description:</strong> {serviceData.description}
          </p>
          <p>
            <strong>Tags:</strong> {serviceData.tags.join(", ")}
          </p>
        </div>

        {/* Category Information */}
        <div>
          <h3 className="font-semibold">Category</h3>
          <p>
            {selectedCategory.main?.name} {" > "}
            {selectedCategory.sub?.name} {" > "}
            {selectedCategory.child?.name}
          </p>
        </div>

        {/* Packages */}
        <div>
          <h3 className="font-semibold">Packages</h3>
          {packages.map((pkg, index) => (
            <div key={index} className="p-2 mb-2 border rounded">
              <p>
                <strong>Package Name:</strong> {pkg.name}
              </p>
              <p>
                <strong>Description:</strong> {pkg.description}
              </p>
              <p>
                <strong>Price:</strong> ${pkg.price.toString()}
              </p>
              <p>
                <strong>Delivery Time:</strong> {pkg.deliveryTime} days
              </p>
              <p>
                <strong>Revisions:</strong> {pkg.revisions}
              </p>
              <p>
                <strong>Features:</strong> {pkg.features.join(", ")}
              </p>
            </div>
          ))}
        </div>

        {/* Images */}
        <div>
          <h3 className="font-semibold">Images</h3>
          <div className="grid grid-cols-2 gap-2">
            {serviceData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Service Image ${index + 1}`}
                className="object-cover w-full h-32 rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button onClick={onSubmit} className="mt-4">
          Confirm and Create Service
        </Button>
      </CardContent>
    </Card>
  );
}
