import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceData } from "@/types";

interface Step1BasicInfoProps {
  serviceData: ServiceData;
  setServiceData: (data: ServiceData) => void;
}

export default function Step1BasicInfo({
  serviceData,
  setServiceData,
}: Step1BasicInfoProps) {
  const handleServiceDataChange = (field: keyof ServiceData, value: string) => {
    setServiceData({ ...serviceData, [field]: value });
  };

  const handleAddTag = (newTag: string) => {
    if (newTag && serviceData.tags.length < 8) {
      setServiceData({ ...serviceData, tags: [...serviceData.tags, newTag] });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setServiceData({
      ...serviceData,
      tags: serviceData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <>
      <Label>Nom du Service</Label>
      <Input
        placeholder="Je réalise pour vous le service dont vous avez besoin ..."
        value={serviceData.name}
        onChange={(e) => handleServiceDataChange("name", e.target.value)}
      />

      <Label>Description</Label>
      <Textarea
        placeholder="Je propose une gamme de services conçus pour répondre aux besoins uniques de chaque client. Mon approche est basée sur l’écoute..."
        value={serviceData.description}
        onChange={(e) => handleServiceDataChange("description", e.target.value)}
      />

      <Label>Mots-Clés</Label>
      <div className="flex space-x-2">
        <Input
          placeholder="Saisir un mot-clé"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value) {
              handleAddTag(e.currentTarget.value.trim());
              e.currentTarget.value = "";
            }
          }}
        />
        <Button
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>(
              "input[placeholder='Saisir un mot-clé']",
            );
            if (input && input.value.trim()) {
              handleAddTag(input.value.trim());
              input.value = "";
            }
          }}
          disabled={serviceData.tags.length >= 8}
        >
          Ajouter
        </Button>
      </div>

      <div className="mt-2 space-x-2">
        {serviceData.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-200 rounded">
            {tag}
            <button className="ml-1" onClick={() => handleRemoveTag(tag)}>
              X
            </button>
          </span>
        ))}
      </div>
    </>
  );
}
