import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type LanguageSectionProps = {
  languages: string[];
  setLanguages: (value: string[]) => void;
};

export default function LanguageSection({ languages, setLanguages }: LanguageSectionProps) {
  const handleAddLanguage = (language: string) => {
    if (!languages.includes(language)) {
      setLanguages([...languages, language]);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Languages</Label>
      <Select onValueChange={handleAddLanguage}>
        <SelectTrigger>
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
          <div key={index} className="bg-gray-200 rounded-full px-3 py-1">
            {language}
          </div>
        ))}
      </div>
    </div>
  );
}
