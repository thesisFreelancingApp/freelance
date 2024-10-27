import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/server.actions/category/category.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: number;
  name: string;
  description: string | null;
  level: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  children: Category[];
}

interface FormData {
  title: string;
  category: { id: number; name: string };
  subcategory: string;
  tags: string[];
  description: string;
}

interface Step1OverviewProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step1Overview: React.FC<Step1OverviewProps> = ({
  formData,
  updateFormData,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        // console.log(fetchedCategories, "================================");

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (typeof formData.category === "object" && formData.category.id) {
      const selectedCategory = categories.find(
        (cat) => cat.id === formData.category.id,
      );
      if (selectedCategory) {
        setSubcategories(selectedCategory.children || []);
      } else {
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  }, [formData.category, categories]);

  const addTag = () => {
    if (newTag && formData.tags.length < 5) {
      updateFormData({ tags: [...formData.tags, newTag] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData({
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-primary mb-6">Gig Overview</h2>
      <div className="flex-grow overflow-y-auto pr-4">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Gig Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                    placeholder="I will design a professional logo for your business"
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  {loading ? (
                    <p className="text-muted-foreground">
                      Loading categories...
                    </p>
                  ) : (
                    <Select
                      value={
                        typeof formData.category === "object"
                          ? formData.category.id.toString()
                          : formData.category
                      }
                      onValueChange={(value) => {
                        const selectedCategory = categories.find(
                          (cat) => cat.id === parseInt(value),
                        );
                        updateFormData({
                          category: selectedCategory
                            ? {
                                id: selectedCategory.id,
                                name: selectedCategory.name,
                              }
                            : undefined,
                          subcategory: "",
                        });
                      }}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                {typeof formData.category === "object" &&
                  subcategories.length > 0 && (
                    <div>
                      <Label
                        htmlFor="subcategory"
                        className="text-sm font-medium"
                      >
                        Subcategory
                      </Label>
                      <Select
                        value={formData.subcategory}
                        onValueChange={(value) =>
                          updateFormData({ subcategory: value })
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategories.map((subcat) => (
                            <SelectItem
                              key={subcat.id}
                              value={subcat.id.toString()}
                            >
                              {subcat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label htmlFor="description" className="text-sm font-medium">
                Gig Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  updateFormData({ description: e.target.value })
                }
                placeholder="Describe your gig in detail..."
                className="mt-1 w-full h-32"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label htmlFor="tags" className="text-sm font-medium">
                Search Tags (up to 5)
              </Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTag(tag)}
                      className="ml-1 h-4 w-4 text-primary hover:text-primary/80"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <Input
                  id="newTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-grow"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  disabled={formData.tags.length >= 5 || !newTag}
                  className="ml-2"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Add up to 5 tags to help buyers find your gig. Press Enter or
                click "Add Tag" to add.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center mt-6">
        Provide a clear overview of your gig to help buyers understand what
        you're offering.
      </p>
    </div>
  );
};

export default Step1Overview;
