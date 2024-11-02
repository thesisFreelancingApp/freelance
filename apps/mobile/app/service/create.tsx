import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useImagePicker } from "~/lib/hooks/use-image-picker";
import { useCategories } from "~/lib/hooks/use-categories";
import { PackageForm } from "~/components/service/package-form";
import type { ServicePackage } from "~/types/service";

export default function CreateServiceScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const { images, pickImage, removeImage } = useImagePicker(5); // Max 5 images
  const { categories } = useCategories();

  const handleSubmit = async () => {
    // Submit logic
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Stack.Screen options={{ title: "Create New Service" }} />

      {/* Title & Description */}
      <Input
        label="Service Title"
        value={title}
        onChangeText={setTitle}
        placeholder="I will..."
      />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        className="mt-4"
      />

      {/* Images */}
      <View className="mt-4">
        <Text className="font-medium mb-2">Service Images</Text>
        {/* Image picker component */}
      </View>

      {/* Packages */}
      <View className="mt-4">
        <Text className="font-medium mb-2">Pricing Packages</Text>
        <PackageForm packages={packages} onChange={setPackages} />
      </View>

      <Button onPress={handleSubmit} className="mt-6 mb-8">
        Create Service
      </Button>
    </ScrollView>
  );
}
