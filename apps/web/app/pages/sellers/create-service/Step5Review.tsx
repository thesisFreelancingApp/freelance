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
        <CardTitle>Réviser et Confirmer Votre Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informations du Service */}
        <div>
          <h3 className="font-semibold">Informations du Service</h3>
          <p>
            <strong>Nom :</strong> {serviceData.name}
          </p>
          <p>
            <strong>Description :</strong> {serviceData.description}
          </p>
          <p>
            <strong>Tags :</strong> {serviceData.tags.join(", ")}
          </p>
        </div>

        {/* Informations de la Catégorie */}
        <div>
          <h3 className="font-semibold">Catégorie</h3>
          <p>
            {selectedCategory.main?.name} {" > "}
            {selectedCategory.sub?.name} {" > "}
            {selectedCategory.child?.name}
          </p>
        </div>

        {/* Forfaits */}
        <div>
          <h3 className="font-semibold">Forfaits</h3>
          {packages.map((pkg, index) => (
            <div key={index} className="p-2 mb-2 border rounded">
              <p>
                <strong>Nom du Forfait :</strong> {pkg.name}
              </p>
              <p>
                <strong>Description :</strong> {pkg.description}
              </p>
              <p>
                <strong>Prix :</strong> ${pkg.price.toString()}
              </p>
              <p>
                <strong>Délai de Livraison :</strong> {pkg.deliveryTime} jours
              </p>
              <p>
                <strong>Révisions :</strong> {pkg.revisions}
              </p>
              <p>
                <strong>Caractéristiques :</strong> {pkg.features.join(", ")}
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
                alt={`Image du Service ${index + 1}`}
                className="object-cover w-full h-32 rounded"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
