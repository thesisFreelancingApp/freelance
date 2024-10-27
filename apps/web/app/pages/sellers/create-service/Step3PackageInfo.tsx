import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Packages } from "@/types";
import { Prisma } from "@prisma/client";

interface PackageSelectionProps {
  packages: Packages[];
  setPackages: (packages: Packages[]) => void;
}

export default function PackageSelection({
  packages,
  setPackages,
}: PackageSelectionProps) {
  const handlePackageChange = (
    index: number,
    field: keyof Packages,
    value: any,
  ) => {
    const updatedPackages = packages.map((pkg, i) =>
      i === index ? { ...pkg, [field]: value } : pkg,
    );
    setPackages(updatedPackages);
  };

  const handleAddPackage = () => {
    setPackages([
      ...packages,
      {
        name: "",
        description: "",
        price: new Prisma.Decimal(0),
        deliveryTime: 0,
        revisions: 0,
        features: [],
      },
    ]);
  };

  const handleRemovePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  return (
    <div>
      {packages.map((pkg, index) => (
        <div key={index} className="p-4 mb-4 border rounded">
          <h3 className="mb-2 font-semibold">Package {index + 1}</h3>

          <Label htmlFor={`package-name-${index}`}>Package Name</Label>
          <Input
            id={`package-name-${index}`}
            value={pkg.name}
            onChange={(e) => handlePackageChange(index, "name", e.target.value)}
          />

          <Label htmlFor={`package-description-${index}`} className="mt-2">
            Description
          </Label>
          <Textarea
            id={`package-description-${index}`}
            value={pkg.description}
            onChange={(e) =>
              handlePackageChange(index, "description", e.target.value)
            }
          />

          <Label htmlFor={`package-price-${index}`} className="mt-2">
            Price
          </Label>
          <Input
            id={`package-price-${index}`}
            type="number"
            value={pkg.price.toString()}
            onChange={(e) =>
              handlePackageChange(
                index,
                "price",
                new Prisma.Decimal(e.target.value),
              )
            }
          />

          <Label htmlFor={`package-delivery-${index}`} className="mt-2">
            Delivery Time (days)
          </Label>
          <Input
            id={`package-delivery-${index}`}
            type="number"
            value={pkg.deliveryTime.toString()}
            onChange={(e) =>
              handlePackageChange(index, "deliveryTime", Number(e.target.value))
            }
          />

          <Label htmlFor={`package-revisions-${index}`} className="mt-2">
            Revisions
          </Label>
          <Input
            id={`package-revisions-${index}`}
            type="number"
            value={pkg.revisions.toString()}
            onChange={(e) =>
              handlePackageChange(index, "revisions", Number(e.target.value))
            }
          />

          <Label htmlFor={`package-features-${index}`} className="mt-2">
            Features
          </Label>
          <Textarea
            id={`package-features-${index}`}
            placeholder="Enter features separated by commas"
            value={pkg.features.join(", ")}
            onChange={(e) =>
              handlePackageChange(index, "features", e.target.value.split(","))
            }
          />

          <Button
            variant="outline"
            onClick={() => handleRemovePackage(index)}
            className="mt-4"
          >
            Remove Package
          </Button>
        </div>
      ))}

      <Button onClick={handleAddPackage} className="mt-4">
        Add Package
      </Button>
    </div>
  );
}
