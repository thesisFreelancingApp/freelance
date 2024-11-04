import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker(maxImages: number = 5) {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    if (images.length >= maxImages) {
      return;
    }

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

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return {
    images,
    pickImage,
    removeImage,
  };
}
