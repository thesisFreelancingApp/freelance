"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

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

  // Mettre à jour les valeurs d'entrée lorsque le curseur change
  const handleSliderChange = (values: [number, number]) => {
    setPriceRange(values);
    setInputValues({ min: values[0], max: values[1] });
  };

  // Mettre à jour le curseur lorsque les valeurs d'entrée changent
  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    const newInputValues = {
      ...inputValues,
      [type]: numValue,
    };
    setInputValues(newInputValues);

    // Mettre à jour le curseur seulement si les valeurs sont valides
    if (type === "min" && numValue <= inputValues.max) {
      setPriceRange([numValue, priceRange[1]]);
    } else if (type === "max" && numValue >= inputValues.min) {
      setPriceRange([priceRange[0], numValue]);
    }
  };

  // Appliquer le filtre de prix
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
      {/* Filtre de plage de prix */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold">Budget</Label>
            <p className="text-sm text-muted-foreground">
              Définissez votre budget
            </p>
          </div>

          {/* Affichage du prix */}
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <Label htmlFor="min-price">Prix minimum</Label>
              <div className="relative">
                <DollarSign className="absolute w-4 h-4 -translate-y-1/2 left-2 top-1/2 text-muted-foreground" />
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
            <div className="self-end px-2">—</div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="max-price">Prix maximum</Label>
              <div className="relative">
                <DollarSign className="absolute w-4 h-4 -translate-y-1/2 left-2 top-1/2 text-muted-foreground" />
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

          {/* Curseur */}
          <div className="px-2 pt-2">
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

      {/* Filtre de délai de livraison */}
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

      {/* Options de tri */}
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
