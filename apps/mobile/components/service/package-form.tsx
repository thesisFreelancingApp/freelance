import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { ServicePackageInput } from "~/types/service";

interface PackageFormProps {
  packages: ServicePackageInput[];
  onChange: (packages: ServicePackageInput[]) => void;
}

export function PackageForm({ packages, onChange }: PackageFormProps) {
  const addPackage = () => {
    onChange([
      ...packages,
      {
        name: "",
        description: "",
        deliveryTime: 1,
        price: 0,
        revisions: 1,
        features: [],
      },
    ]);
  };

  const updatePackage = (
    index: number,
    updates: Partial<ServicePackageInput>
  ) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], ...updates };
    onChange(newPackages);
  };

  return (
    <View>
      {packages.map((pkg, index) => (
        <View key={index} className="mb-4 p-4 bg-secondary rounded-lg">
          <Input
            placeholder="Package Name"
            value={pkg.name}
            onChangeText={(text) => updatePackage(index, { name: text })}
          />
          <Input
            className="mt-2"
            placeholder="Description"
            value={pkg.description}
            onChangeText={(text) => updatePackage(index, { description: text })}
            multiline
          />
          <View className="flex-row mt-2">
            <Input
              className="flex-1 mr-2"
              placeholder="Price"
              value={pkg.price.toString()}
              onChangeText={(text) =>
                updatePackage(index, { price: parseFloat(text) || 0 })
              }
              keyboardType="numeric"
            />
            <Input
              className="flex-1"
              placeholder="Delivery (days)"
              value={pkg.deliveryTime.toString()}
              onChangeText={(text) =>
                updatePackage(index, { deliveryTime: parseInt(text) || 1 })
              }
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}
      <Button variant="outline" onPress={addPackage}>
        Add Package
      </Button>
    </View>
  );
}
