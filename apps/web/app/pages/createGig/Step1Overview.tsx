import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategories } from '@/server.actions/category.actions';

interface Category {
  id: string;
  name: string;
  children: Category[];
}

interface FormData {
  title: string;
  category: string;
  categoryId: string;   
  subcategory: string;
  subcategoryId: string; 
  tags: string[];
}

interface Step1OverviewProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step1Overview: React.FC<Step1OverviewProps> = ({ formData, updateFormData }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        const transformedCategories = fetchedCategories.map((category: any) => ({
          ...category,
          id: String(category.id),
          children: category.children.map((child: any) => ({
            ...child,
            id: String(child.id),
          })),
        }));
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
      if (selectedCategory) {
        setSubcategories(selectedCategory.children || []);
      } else {
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId, categories]);

  return (
    <div className="container mx-auto px-6 py-16 space-y-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Your Gig</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Gig Title */}
        <div className="col-span-1">
          <Label htmlFor="title" className="block mb-2 text-sm font-medium">Gig Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="I will design a logo for you"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Category */}
        <div className="col-span-1">
          <Label htmlFor="category" className="block mb-2 text-sm font-medium">Category</Label>
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <Select
              value={formData.categoryId}
              onValueChange={(value) => {
                updateFormData({ categoryId: value, subcategoryId: '' });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Subcategory */}
        {formData.categoryId && subcategories.length > 0 && (
          <div className="col-span-1">
            <Label htmlFor="subcategory" className="block mb-2 text-sm font-medium">Subcategory</Label>
            <Select
              value={formData.subcategoryId}
              onValueChange={(value) => updateFormData({ subcategoryId: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcat) => (
                  <SelectItem key={subcat.id} value={subcat.id}>
                    {subcat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Tags */}
        <div className="col-span-1">
          <Label htmlFor="tags" className="block mb-2 text-sm font-medium">Search Tags</Label>
          <Input
            id="tags"
            value={formData.tags.join(', ')}
            onChange={(e) => updateFormData({ tags: e.target.value.split(',').map(tag => tag.trim()) })}
            placeholder="e.g. logo, design, business"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1Overview;
