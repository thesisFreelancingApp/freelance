"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/server.actions/uploadMedias.actions";
import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MediaItem {
  url: string;
  type: string;
}

interface MediaUploadProps {
  serviceData: {
    medias: MediaItem[];
    name: string;
    description: string;
    tags: string[];
  };
  setServiceData: React.Dispatch<
    React.SetStateAction<{
      medias: MediaItem[];
      name: string;
      description: string;
      tags: string[];
    }>
  >;
}

export default function MediaUpload({
  serviceData,
  setServiceData,
}: MediaUploadProps) {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

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

  // Dans le fichier MediaUpload.tsx
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

      setServiceData((prevData) => ({
        ...prevData,
        medias: [...prevData.medias, ...uploadedMedia],
      }));
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

  useEffect(() => {
    return () => {
      previewUrls.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previewUrls]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media Upload</CardTitle>
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
                        className="object-cover w-full h-full rounded-md"
                      />
                    ) : (
                      <video
                        className="object-cover w-full h-full rounded-md"
                        controls={true}
                        playsInline
                        title={`Preview ${index + 1}`}
                        src={preview.url}
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemovePreview(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Label className="text-center">
                {isDragging
                  ? "Release to upload"
                  : "Drag & drop images or videos here or click to select"}
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
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Selected Media"
                )}
              </Button>
            </div>
          )}

          {serviceData.medias.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Media</Label>
              <div className="grid grid-cols-2 gap-4">
                {serviceData.medias.map((mediaItem, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        {mediaItem.type === "image" ? (
                          <img
                            src={mediaItem.url}
                            alt={`Uploaded ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <video
                            disablePictureInPicture
                            title={`Uploaded ${index + 1}`}
                            controlsList="nodownload"
                            className="object-cover w-full h-full rounded-md"
                            controls
                            src={mediaItem.url}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
