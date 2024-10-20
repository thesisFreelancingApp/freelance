import React, { useState } from "react";
import { Label } from "@/components/ui/label";

interface PostGigFormData {
  media: File | null | undefined;
  // other properties...
}

interface Step4MediaProps {
  formData: PostGigFormData;
  updateFormData: (data: Partial<PostGigFormData>) => void;
}

const Step4Media: React.FC<Step4MediaProps> = ({ formData, updateFormData }) => {
  const [uploading, setUploading] = useState(false);

  // Handle file upload (no Cloudinary)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setUploading(false);
        updateFormData({ media: file });
      }, 1000); // Simulate a delay (adjust as needed)
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="media">Upload Image or Video</Label>
        <input
          id="media"
          type="file"
          className="file-input"
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </div>

      {formData.media && (
        <div>
          <p>Uploaded File:</p>
          {formData.media instanceof File && formData.media.type.startsWith("video") ? (
            <video controls width="500" height="300" className="rounded">
              <source src={URL.createObjectURL(formData.media)} type={formData.media.type} />
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <img
              src={URL.createObjectURL(formData.media)}
              alt="Uploaded media"
              width="500"
              height="300"
              className="rounded"
            />
          )}
        </div>
      )}
      <p className="text-sm text-gray-500">Use high-quality images/videos that best represent your service.</p>
    </div>
  );
};

export default Step4Media;
