import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ImageUploadProps {
  serviceData: {
    images: string[];
    name: string;
    tags: string[];
  }; // Inclure toutes les propriétés requises de ServiceData
  setServiceData: (data: {
    images: string[];
    name: string;
    tags: string[];
  }) => void;
}

export default function ImageUpload({
  serviceData,
  setServiceData,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setServiceData({
        ...serviceData,
        images: [...serviceData.images, imageUrl.trim()],
      });
      setImageUrl(""); // Réinitialiser le champ après ajout
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = serviceData.images.filter((_, i) => i !== index);
    setServiceData({ ...serviceData, images: updatedImages });
  };

  return (
    <div>
      <Label>Image URL</Label>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddImage();
            }
          }}
        />
        <Button onClick={handleAddImage} disabled={!imageUrl.trim()}>
          Add Image
        </Button>
      </div>

      <div className="mt-4 space-y-2">
        {serviceData.images.length > 0 && (
          <>
            <Label>Added Images</Label>
            <div className="grid grid-cols-2 gap-2">
              {serviceData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Uploaded preview ${index + 1}`}
                    className="object-cover w-full h-32 rounded"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
