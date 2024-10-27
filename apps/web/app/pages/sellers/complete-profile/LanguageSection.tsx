"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";

type LanguageSectionProps = {
  languages: string[];
  setLanguages: (value: string[]) => void;
  timeZone: string;
  setTimeZone: (value: string) => void;
};

export default function Component({
  languages,
  setLanguages,
  timeZone,
  setTimeZone,
}: LanguageSectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleAddLanguage = (language: string) => {
    setSelectedLanguage(language);
    if (!languages.includes(language)) {
      setLanguages([...languages, language]);
    }
  };

  const handleRemoveLanguage = (language: string) => {
    setLanguages(languages.filter((lang) => lang !== language));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages and Time Zone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="language-select">Languages</Label>
          <Select onValueChange={handleAddLanguage} value={selectedLanguage}>
            <SelectTrigger id="language-select">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-4">
            {languages.map((language, index) => (
              <Badge key={index} variant="secondary">
                {language}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 text-primary-foreground"
                  onClick={() => handleRemoveLanguage(language)}
                >
                  <X className="w-3 h-3" />
                  <span className="sr-only">Remove {language}</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="timezone-select">Time Zone</Label>
          <Select onValueChange={setTimeZone} value={timeZone}>
            <SelectTrigger id="timezone-select">
              <SelectValue placeholder="Select a time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC-12:00">
                UTC-12:00 - Baker Island, Howland Island
              </SelectItem>
              <SelectItem value="UTC-11:00">UTC-11:00 - Samoa</SelectItem>
              <SelectItem value="UTC-10:00">
                UTC-10:00 - Hawaii, Honolulu
              </SelectItem>
              <SelectItem value="UTC-09:00">
                UTC-09:00 - Alaska, Anchorage
              </SelectItem>
              <SelectItem value="UTC-08:00">
                UTC-08:00 - United States (West Coast), Los Angeles, Vancouver
              </SelectItem>
              <SelectItem value="UTC-07:00">
                UTC-07:00 - United States (Mountain), Denver, Calgary
              </SelectItem>
              <SelectItem value="UTC-06:00">
                UTC-06:00 - Mexico, Chicago, Mexico City
              </SelectItem>
              <SelectItem value="UTC-05:00">
                UTC-05:00 - United States (East), New York, Toronto
              </SelectItem>
              <SelectItem value="UTC-04:00">
                UTC-04:00 - Caribbean, Santiago, Caracas
              </SelectItem>
              <SelectItem value="UTC-03:00">
                UTC-03:00 - Argentina, Brazil (Brasília), Buenos Aires
              </SelectItem>
              <SelectItem value="UTC-02:00">
                UTC-02:00 - Atlantic (Atlantic Islands)
              </SelectItem>
              <SelectItem value="UTC-01:00">
                UTC-01:00 - Azores, Cape Verde
              </SelectItem>
              <SelectItem value="UTC+00:00">
                UTC+00:00 - United Kingdom, Lisbon, London
              </SelectItem>
              <SelectItem value="UTC+01:00">
                UTC+01:00 - Tunisia, Algeria, Paris, Tunis
              </SelectItem>
              <SelectItem value="UTC+02:00">
                UTC+02:00 - South Africa, Cairo, Athens
              </SelectItem>
              <SelectItem value="UTC+03:00">
                UTC+03:00 - Saudi Arabia, Moscow, Nairobi
              </SelectItem>
              <SelectItem value="UTC+04:00">
                UTC+04:00 - United Arab Emirates, Dubai, Baku
              </SelectItem>
              <SelectItem value="UTC+05:00">
                UTC+05:00 - Pakistan, Karachi, Tashkent
              </SelectItem>
              <SelectItem value="UTC+06:00">
                UTC+06:00 - Bangladesh, Dhaka, Almaty
              </SelectItem>
              <SelectItem value="UTC+07:00">
                UTC+07:00 - Thailand, Bangkok, Hanoi
              </SelectItem>
              <SelectItem value="UTC+08:00">
                UTC+08:00 - China, Singapore, Beijing, Hong Kong
              </SelectItem>
              <SelectItem value="UTC+09:00">
                UTC+09:00 - Japan, Seoul, Tokyo
              </SelectItem>
              <SelectItem value="UTC+10:00">
                UTC+10:00 - Australia (East), Sydney, Brisbane
              </SelectItem>
              <SelectItem value="UTC+11:00">
                UTC+11:00 - Solomon Islands, Noumea
              </SelectItem>
              <SelectItem value="UTC+12:00">
                UTC+12:00 - Fiji, Suva, Auckland
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
