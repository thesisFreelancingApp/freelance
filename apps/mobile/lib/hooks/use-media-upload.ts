import { useState } from "react";
import { supabase } from "../supabase";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      return result.assets[0];
    }
  };

  const uploadMedia = async (uri: string, path: string) => {
    try {
      setUploading(true);

      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.split("/").pop() || "";
      const extension = filename.split(".").pop() || "";
      const filePath = `${path}/${Date.now()}.${extension}`;

      const { error: uploadError, data } = await supabase.storage
        .from("chat-media")
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("chat-media").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading media:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    pickImage,
    uploadMedia,
    uploading,
  };
}
