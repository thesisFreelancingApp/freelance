"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendarFR";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Occupation = {
  title: string;
  from: Date | undefined;
  to: Date | undefined;
};

export default function OccupationsSection({
  occupations,
  addOccupation,
  removeOccupation,
  updateOccupation,
}: {
  occupations: Occupation[];
  addOccupation: () => void;
  removeOccupation: (index: number) => void;
  updateOccupation: (
    index: number,
    field: keyof Occupation,
    value: string | undefined, // Changed to string | undefined
  ) => void;
}) {
  const [openCalendars, setOpenCalendars] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCalendar = (index: number, field: "from" | "to") => {
    setOpenCalendars((prev) => ({
      ...prev,
      [`${index}-${field}`]: !prev[`${index}-${field}`],
    }));
  };

  return (
    <div className="space-y-4">
      <Label>Your Occupations</Label>
      {occupations.map((occupation, index) => (
        <div key={index} className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <Input
              value={occupation.title}
              onChange={(e) => updateOccupation(index, "title", e.target.value)}
              placeholder="Enter occupation"
            />
            <Popover
              open={openCalendars[`${index}-from`]}
              onOpenChange={() => toggleCalendar(index, "from")}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!occupation.from && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {occupation.from ? (
                    format(new Date(occupation.from), "PPP")
                  ) : (
                    <span>From</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    occupation.from ? new Date(occupation.from) : undefined
                  }
                  onSelect={(date) => {
                    updateOccupation(
                      index,
                      "from",
                      date ? format(date, "yyyy-MM-dd") : undefined,
                    );
                    toggleCalendar(index, "from");
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover
              open={openCalendars[`${index}-to`]}
              onOpenChange={() => toggleCalendar(index, "to")}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!occupation.to && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {occupation.to ? (
                    format(new Date(occupation.to), "PPP")
                  ) : (
                    <span>To</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={occupation.to ? new Date(occupation.to) : undefined}
                  onSelect={(date) => {
                    updateOccupation(
                      index,
                      "to",
                      date ? format(date, "yyyy-MM-dd") : undefined,
                    );
                    toggleCalendar(index, "to");
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {index > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeOccupation(index)}
              className="mt-2"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Occupation
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addOccupation} variant="outline" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Add Occupation
      </Button>
    </div>
  );
}
