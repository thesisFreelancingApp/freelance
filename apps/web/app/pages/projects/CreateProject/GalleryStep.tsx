"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/server.actions/uploadMedias.actions";
import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface MediaItem {
  url: string;
  type: string;
}

interface ProjectForm {
  title: string;
  description: string;
  minBudget: string;
  maxBudget: string;
  timeline: string;
  experienceLevel: string;
  sprints: { title: string; description: string }[];
  medias: MediaItem[];
  requirements: { title: string; detail: string }[]; // Exigences du projet
  skills: { value: string }[]; // Compétences requises (array of objects)
}

interface MediaStepProps {
  form: UseFormReturn<ProjectForm>;
}

export default function MediaStep({ form }: MediaStepProps) {
  const { setValue, watch } = form;
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const medias = watch("medias") || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));

    setMediaFiles((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));

    setMediaFiles((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDropZoneClick = () => {
    inputFileRef.current?.click();
  };

  const handleUploadMedia = async () => {
    if (mediaFiles.length === 0) return;
    setIsUploading(true);
    try {
      const uploadedMedia = await Promise.all(
        mediaFiles.map(async (file) => {
          const url = await uploadImage(file);
          return {
            url,
            type: file.type.startsWith("image/") ? "image" : "video",
          };
        }),
      );

      setValue("medias", [...medias, ...uploadedMedia]);
      setMediaFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePreview = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveMedia = (index: number) => {
    // Remove the selected media from the uploaded media list
    setValue(
      "medias",
      medias.filter((_, i) => i !== index),
    );
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previewUrls]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Galerie de Médias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleDropZoneClick}
            className={`border-2 border-dashed p-6 flex flex-col items-center justify-center rounded-md ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } h-64 cursor-pointer`}
          >
            {previewUrls.length > 0 ? (
              <div className="grid w-full grid-cols-3 gap-2">
                {previewUrls.map((preview, index) => (
                  <div key={index} className="relative w-full h-24">
                    {preview.type === "image" ? (
                      <img
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-full border rounded-md"
                      />
                    ) : (
                      <video
                        className="object-cover w-full h-full rounded-md"
                        controls
                        playsInline
                        title={`Preview ${index + 1}`}
                        src={preview.url}
                      />
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute p-0 text-white bg-black/30 top-2 right-2"
                      onClick={() => handleRemovePreview(index)}
                    >
                      <X className="w-2 h-2" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Label className="text-center">
                {isDragging
                  ? "Relâchez pour ajouter"
                  : "Glissez-déposez des images ou vidéos ici ou cliquez pour sélectionner"}
              </Label>
            )}
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              ref={inputFileRef}
              className="hidden"
            />
          </div>

          {mediaFiles.length > 0 && (
            <div className="flex gap-2">
              <Button onClick={handleUploadMedia} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="w-2 h-2 mr-2 animate-spin" />
                    Téléchargement en cours...
                  </>
                ) : (
                  "Télécharger les médias sélectionnés"
                )}
              </Button>
            </div>
          )}

          {medias.length > 0 && (
            <div className="space-y-2">
              <Label>Médias Téléchargés</Label>
              <div className="grid grid-cols-2 gap-4">
                {medias.map((mediaItem, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden aspect-video"
                  >
                    {mediaItem.type === "image" ? (
                      <img
                        src={mediaItem.url}
                        alt={`Uploaded ${index + 1}`}
                        className="object-cover w-full h-full border rounded-md"
                      />
                    ) : (
                      <video
                        className="object-cover w-full h-full border rounded-md"
                        controls
                        src={mediaItem.url}
                        title={`Uploaded ${index + 1}`}
                      />
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute p-0 text-white bg-black/30 top-2 right-2"
                      onClick={() => handleRemoveMedia(index)}
                    >
                      <X className="w-2 h-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
