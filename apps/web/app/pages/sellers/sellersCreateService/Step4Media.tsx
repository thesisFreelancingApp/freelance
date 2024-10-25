import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image, Film } from "lucide-react";

interface Step4MediaProps {
  formData: {
    media: File[];
  };
  updateFormData: (newData: Partial<Step4MediaProps["formData"]>) => void;
}

const Step4Media: React.FC<Step4MediaProps> = ({
  formData,
  updateFormData,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        updateFormData({ media: [...formData.media, ...Array.from(files)] });
      }, 1000);
    }
  };

  const removeFile = (index: number) => {
    const newMedia = [...formData.media];
    newMedia.splice(index, 1);
    updateFormData({ media: newMedia });
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-primary mb-6">Gig Media</h2>
      <div className="flex-grow overflow-y-auto pr-4">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Label htmlFor="media" className="text-sm font-medium">
                Upload Images or Videos
              </Label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="media"
                      className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                      <span>Upload files</span>
                      <input
                        id="media"
                        name="media"
                        type="file"
                        className="sr-only"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        accept="image/*,video/*"
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF or MP4 up to 10MB each
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {formData.media.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.media.map((file, index) => (
                    <div key={index} className="relative">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(file)}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center mt-6">
        Upload high-quality images or videos that best represent your service.
        These will be the first things potential buyers see.
      </p>
    </div>
  );
};

export default Step4Media;
