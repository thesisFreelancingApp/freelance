"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { createServiceWithCategoryAndPackage } from "@/server.actions/sellers/services.actions";
import { Prisma } from "@prisma/client";
import { useState } from "react";

interface ServiceData {
  name: string;
  description?: string;
  tags: string[];
  creatorId: string;
  images: string[];
}

interface PackageData {
  name: string;
  description: string;
  price: Prisma.Decimal;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

interface Category {
  name: string;
  children: SubCategory[];
  id: number;
}

interface SubCategory {
  name: string;
  id: number;
  children?: SubCategory[];
}

// Données de catégories pour l'exemple
const categories: Category[] = [
  {
    name: "Graphic Design",
    id: 1001,
    children: [
      {
        name: "Logo Design",
        id: 1002,
        children: [
          { name: "Simple Logo", id: 1003 },
          { name: "Complex Logo", id: 1004 },
        ],
      },
    ],
  },
  {
    name: "Web Development",
    id: 1005,
    children: [
      {
        name: "Frontend",
        id: 1006,
        children: [
          { name: "React", id: 1007 },
          { name: "Vue", id: 1008 },
        ],
      },
    ],
  },
  {
    name: "Digital Marketing",
    id: 1009,
    children: [
      {
        name: "Social Media",
        id: 1010,
        children: [
          { name: "Facebook Ads", id: 1011 },
          { name: "Google Ads", id: 1012 },
        ],
      },
    ],
  },
];

export default function ServiceCreationForm({
  creatorId,
}: {
  creatorId: string;
}) {
  const [step, setStep] = useState(1);
  const [serviceData, setServiceData] = useState<ServiceData>({
    name: "",
    description: "",
    tags: [],
    creatorId: creatorId,
    images: [],
  });
  const [packageData, setPackageData] = useState<PackageData>({
    name: "",
    description: "",
    price: new Prisma.Decimal(0),
    deliveryTime: 0,
    revisions: 0,
    features: [],
  });

  const [mainCategory, setMainCategory] = useState<Category | null>(null);
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [childCategory, setChildCategory] = useState<SubCategory | null>(null);

  const handleAddTag = (newTag: string) => {
    if (newTag && serviceData.tags.length < 8) {
      setServiceData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
    }
  };

  const handleRemoveTag = (index: number) => {
    setServiceData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleServiceDataChange = (field: keyof ServiceData, value: any) => {
    setServiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePackageDataChange = (field: keyof PackageData, value: any) => {
    setPackageData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (childCategory) {
      try {
        const newService = await createServiceWithCategoryAndPackage(
          serviceData,
          childCategory.id, // Corrigé pour envoyer `name` comme identifiant de catégorie finale
          packageData,
        );
        console.log("Service and package created:", newService);
        alert("Service created successfully!");
      } catch (error) {
        console.error("Error creating service:", error);
        alert("An error occurred while creating the service.");
      }
    } else {
      alert("Please select a child category.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 1: Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  value={serviceData.name}
                  onChange={(e) =>
                    handleServiceDataChange("name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  value={serviceData.description}
                  onChange={(e) =>
                    handleServiceDataChange("description", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Tags (min 2, max 8)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="tag-input"
                    placeholder="Enter a tag and press 'Add'"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        e.preventDefault();
                        handleAddTag(e.currentTarget.value.trim());
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    disabled={serviceData.tags.length >= 8}
                    onClick={() => {
                      const input =
                        document.querySelector<HTMLInputElement>("#tag-input");
                      if (input && input.value.trim()) {
                        handleAddTag(input.value.trim());
                        input.value = "";
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {serviceData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center px-2 py-1 space-x-1 bg-gray-200 rounded"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleRemoveTag(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {serviceData.tags.length < 2 && (
                  <p className="text-red-500">Please add at least 2 tags.</p>
                )}
                {serviceData.tags.length >= 8 && (
                  <p className="text-gray-500">Maximum of 8 tags allowed.</p>
                )}
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 2: Select Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Main Category</Label>
                <select
                  value={mainCategory?.name || ""}
                  onChange={(e) => {
                    const selectedMainCategory = categories.find(
                      (cat) => cat.name === e.target.value,
                    );
                    setMainCategory(selectedMainCategory || null);
                    setSubCategory(null);
                    setChildCategory(null);
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a main category</option>
                  {categories.map((cat: Category) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {mainCategory && mainCategory.children && (
                <div className="space-y-2">
                  <Label>Sub Category</Label>
                  <select
                    value={subCategory?.name || ""}
                    onChange={(e) => {
                      const selectedSubCategory = mainCategory.children.find(
                        (subCat) => subCat.name === e.target.value,
                      );
                      setSubCategory(selectedSubCategory || null);
                      setChildCategory(null);
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select a sub-category</option>
                    {mainCategory.children.map((subCat: SubCategory) => (
                      <option key={subCat.name} value={subCat.name}>
                        {subCat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {subCategory && subCategory.children && (
                <div className="space-y-2">
                  <Label>Child Category</Label>
                  <select
                    value={childCategory?.name || ""}
                    onChange={(e) => {
                      const selectedChildCategory = subCategory.children?.find(
                        (childCat) => childCat.name === e.target.value,
                      );
                      setChildCategory(selectedChildCategory || null);
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select a child category</option>
                    {subCategory.children.map((childCat: SubCategory) => (
                      <option key={childCat.name} value={childCat.name}>
                        {childCat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 3: Package Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="package-name">Package Name</Label>
                <Input
                  id="package-name"
                  value={packageData.name}
                  onChange={(e) =>
                    handlePackageDataChange("name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package-description">Description</Label>
                <Textarea
                  id="package-description"
                  value={packageData.description}
                  onChange={(e) =>
                    handlePackageDataChange("description", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package-price">Price</Label>
                <Input
                  id="package-price"
                  type="number"
                  value={packageData.price.toString()}
                  onChange={(e) =>
                    handlePackageDataChange(
                      "price",
                      new Prisma.Decimal(e.target.value),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package-delivery-time">
                  Delivery Time (days)
                </Label>
                <Input
                  id="package-delivery-time"
                  type="number"
                  value={packageData.deliveryTime.toString()}
                  onChange={(e) =>
                    handlePackageDataChange(
                      "deliveryTime",
                      Number(e.target.value),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package-revisions">Revisions</Label>
                <Input
                  id="package-revisions"
                  type="number"
                  value={packageData.revisions.toString()}
                  onChange={(e) =>
                    handlePackageDataChange("revisions", Number(e.target.value))
                  }
                />
              </div>
            </CardContent>
          </>
        );

      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 4: Upload Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="Enter image URL and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleServiceDataChange("images", [
                        ...serviceData.images,
                        e.currentTarget.value,
                      ]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Added Images:</Label>
                <ul className="pl-5 list-disc">
                  {serviceData.images.map((image, index) => (
                    <li key={index}>{image}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </>
        );

      case 5:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 5: Review and Confirm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Service Details</h3>
                <p>
                  <strong>Name:</strong> {serviceData.name}
                </p>
                <p>
                  <strong>Description:</strong> {serviceData.description}
                </p>
                <p>
                  <strong>Tags:</strong> {serviceData.tags.join(", ")}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {`${mainCategory?.name} > ${subCategory?.name} > ${childCategory?.name}`}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Package Details</h3>
                <p>
                  <strong>Name:</strong> {packageData.name}
                </p>
                <p>
                  <strong>Description:</strong> {packageData.description}
                </p>
                <p>
                  <strong>Price:</strong> ${packageData.price.toString()}
                </p>
                <p>
                  <strong>Delivery Time:</strong> {packageData.deliveryTime}{" "}
                  days
                </p>
                <p>
                  <strong>Revisions:</strong> {packageData.revisions}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Images</h3>
                <ul className="pl-5 list-disc">
                  {serviceData.images.map((image, index) => (
                    <li key={index}>{image}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </>
        );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Progress value={(step / 5) * 100} className="w-full" />
      {renderStep()}
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step < 5 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Confirm and Create Service</Button>
        )}
      </CardFooter>
    </Card>
  );
}
