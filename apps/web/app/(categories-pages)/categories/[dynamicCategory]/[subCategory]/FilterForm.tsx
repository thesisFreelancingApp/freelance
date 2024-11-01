"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface FilterFormProps {
  initialValues: {
    minPrice?: number;
    maxPrice?: number;
    deliveryTime?: number;
    sort?: string;
  };
}

export default function FilterForm({ initialValues }: FilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialValues.minPrice || 0,
    initialValues.maxPrice || 1000,
  ]);
  const [inputValues, setInputValues] = useState({
    min: initialValues.minPrice || 0,
    max: initialValues.maxPrice || 1000,
  });

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value.toString());
        }
      });

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // Update input values when slider changes
  const handleSliderChange = (values: [number, number]) => {
    setPriceRange(values);
    setInputValues({ min: values[0], max: values[1] });
  };

  // Update slider when input changes
  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    const newInputValues = {
      ...inputValues,
      [type]: numValue,
    };
    setInputValues(newInputValues);

    // Update slider only if values are valid
    if (type === "min" && numValue <= inputValues.max) {
      setPriceRange([numValue, priceRange[1]]);
    } else if (type === "max" && numValue >= inputValues.min) {
      setPriceRange([priceRange[0], numValue]);
    }
  };

  // Apply price filter
  const applyPriceFilter = () => {
    router.push(
      `?${createQueryString({
        minPrice: inputValues.min,
        maxPrice: inputValues.max,
      })}`,
      { scroll: false },
    );
  };

  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold">Budget</Label>
            <p className="text-sm text-muted-foreground">
              Définissez votre budget
            </p>
          </div>

          {/* Price Display */}
          <div className="flex justify-between items-center">
            <div className="flex-1 space-y-2">
              <Label htmlFor="min-price">Prix minimum</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="min-price"
                  type="number"
                  value={inputValues.min}
                  onChange={(e) => handleInputChange("min", e.target.value)}
                  className="pl-8"
                  min={0}
                  max={inputValues.max}
                />
              </div>
            </div>
            <div className="px-2 self-end">—</div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="max-price">Prix maximum</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="max-price"
                  type="number"
                  value={inputValues.max}
                  onChange={(e) => handleInputChange("max", e.target.value)}
                  className="pl-8"
                  min={inputValues.min}
                />
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="pt-2 px-2">
            <Slider
              value={priceRange}
              min={0}
              max={10000}
              step={50}
              onValueChange={handleSliderChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">$0</span>
              <span className="text-xs text-muted-foreground">$10,000+</span>
            </div>
          </div>

          <Button onClick={applyPriceFilter} className="w-full">
            Appliquer le filtre de prix
          </Button>
        </div>
      </Card>

      {/* Delivery Time Filter */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">
              Délai de livraison
            </Label>
            <p className="text-sm text-muted-foreground">
              Choisissez le délai souhaité
            </p>
          </div>
          <Select
            defaultValue={initialValues.deliveryTime?.toString()}
            onValueChange={(value) =>
              router.push(`?${createQueryString({ deliveryTime: value })}`, {
                scroll: false,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un délai" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">24 heures</SelectItem>
              <SelectItem value="3">Jusqu'à 3 jours</SelectItem>
              <SelectItem value="7">Jusqu'à 7 jours</SelectItem>
              <SelectItem value="14">Jusqu'à 14 jours</SelectItem>
              <SelectItem value="30">Jusqu'à 30 jours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Sort Options */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">Trier par</Label>
            <p className="text-sm text-muted-foreground">
              Choisissez l'ordre d'affichage
            </p>
          </div>
          <Select
            defaultValue={initialValues.sort || "rating"}
            onValueChange={(value) =>
              router.push(`?${createQueryString({ sort: value })}`, {
                scroll: false,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Meilleures évaluations</SelectItem>
              <SelectItem value="price_asc">Prix: Croissant</SelectItem>
              <SelectItem value="price_desc">Prix: Décroissant</SelectItem>
              <SelectItem value="delivery_time">Temps de livraison</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
}
