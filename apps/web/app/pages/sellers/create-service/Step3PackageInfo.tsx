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

  const handlePriceChange = (index: number, value: string) => {
    // Permet les chiffres avec une virgule pour 3 décimales max
    const validValue = /^[0-9]{0,5},?[0-9]{0,3}$/;

    if (validValue.test(value)) {
      const formattedValue = value.replace(",", ".");
      const decimalValue = new Prisma.Decimal(formattedValue);

      // Vérifier que la valeur est inférieure à 100000.000
      if (decimalValue.lessThan(new Prisma.Decimal("100000.000"))) {
        const updatedPackages = packages.map((pkg, i) =>
          i === index ? { ...pkg, price: decimalValue } : pkg,
        );
        setPackages(updatedPackages);
      } else {
        console.error("Le prix ne peut pas dépasser 99999,999.");
      }
    } else {
      console.error(
        "Entrée invalide : maximum 5 chiffres avant et 3 décimales après la virgule.",
      );
    }
  };

  return (
    <div>
      {packages.map((pkg, index) => (
        <div key={index} className="p-4 mb-4 border rounded">
          <h3 className="mb-2 font-semibold">Forfait {index + 1}</h3>

          <Label htmlFor={`package-name-${index}`}>Nom du Forfait</Label>
          <Input
            id={`package-name-${index}`}
            placeholder="Entrez le nom du forfait"
            value={pkg.name}
            onChange={(e) => handlePackageChange(index, "name", e.target.value)}
          />

          <Label htmlFor={`package-description-${index}`} className="mt-2">
            Description
          </Label>
          <Textarea
            id={`package-description-${index}`}
            placeholder="Entrez la description du forfait"
            value={pkg.description}
            onChange={(e) =>
              handlePackageChange(index, "description", e.target.value)
            }
          />

          <Label htmlFor={`package-price-${index}`} className="mt-2">
            Prix
          </Label>
          <Input
            id={`package-price-${index}`}
            placeholder="Entrez le prix du forfait"
            value={pkg.price ? pkg.price.toString().replace(".", ",") : ""}
            onChange={(e) => handlePriceChange(index, e.target.value)}
          />

          <Label htmlFor={`package-delivery-${index}`} className="mt-2">
            Délai de Livraison (jours)
          </Label>
          <Input
            id={`package-delivery-${index}`}
            type="number"
            placeholder="Entrez le délai de livraison en jours"
            value={pkg.deliveryTime.toString()}
            onChange={(e) =>
              handlePackageChange(index, "deliveryTime", Number(e.target.value))
            }
          />

          <Label htmlFor={`package-revisions-${index}`} className="mt-2">
            Révisions
          </Label>
          <Input
            id={`package-revisions-${index}`}
            type="number"
            placeholder="Entrez le nombre de révisions"
            value={pkg.revisions.toString()}
            onChange={(e) =>
              handlePackageChange(index, "revisions", Number(e.target.value))
            }
          />

          <Label htmlFor={`package-features-${index}`} className="mt-2">
            Caractéristiques
          </Label>
          <Textarea
            id={`package-features-${index}`}
            placeholder="Entrez les caractéristiques, séparées par des virgules"
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
            Supprimer le Forfait
          </Button>
        </div>
      ))}

      <Button onClick={handleAddPackage} className="mt-4">
        Ajouter un Forfait
      </Button>
    </div>
  );
}
