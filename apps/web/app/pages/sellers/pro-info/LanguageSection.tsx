import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LanguageSectionProps = {
  languages: string[];
  setLanguages: (value: string[]) => void;
  timeZone: string;
  setTimeZone: (value: string) => void;
};

export default function LanguageSection({
  languages,
  setLanguages,
  timeZone,
  setTimeZone,
}: LanguageSectionProps) {
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
          <div key={index} className="px-3 py-1 bg-gray-200 rounded-full">
            {language}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Label>Time Zone</Label>
        <Select onValueChange={setTimeZone} value={timeZone}>
          <SelectTrigger>
            <SelectValue placeholder="Select a time zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UTC-12:00">UTC-12:00</SelectItem>
            <SelectItem value="UTC-11:00">UTC-11:00</SelectItem>
            <SelectItem value="UTC-10:00">UTC-10:00</SelectItem>
            <SelectItem value="UTC-09:00">UTC-09:00</SelectItem>
            <SelectItem value="UTC-08:00">UTC-08:00</SelectItem>
            <SelectItem value="UTC-07:00">UTC-07:00</SelectItem>
            <SelectItem value="UTC-06:00">UTC-06:00</SelectItem>
            <SelectItem value="UTC-05:00">UTC-05:00</SelectItem>
            <SelectItem value="UTC-04:00">UTC-04:00</SelectItem>
            <SelectItem value="UTC-03:00">UTC-03:00</SelectItem>
            <SelectItem value="UTC-02:00">UTC-02:00</SelectItem>
            <SelectItem value="UTC-01:00">UTC-01:00</SelectItem>
            <SelectItem value="UTC+00:00">UTC+00:00</SelectItem>
            <SelectItem value="UTC+01:00">UTC+01:00</SelectItem>
            <SelectItem value="UTC+02:00">UTC+02:00</SelectItem>
            <SelectItem value="UTC+03:00">UTC+03:00</SelectItem>
            <SelectItem value="UTC+04:00">UTC+04:00</SelectItem>
            <SelectItem value="UTC+05:00">UTC+05:00</SelectItem>
            <SelectItem value="UTC+06:00">UTC+06:00</SelectItem>
            <SelectItem value="UTC+07:00">UTC+07:00</SelectItem>
            <SelectItem value="UTC+08:00">UTC+08:00</SelectItem>
            <SelectItem value="UTC+09:00">UTC+09:00</SelectItem>
            <SelectItem value="UTC+10:00">UTC+10:00</SelectItem>
            <SelectItem value="UTC+11:00">UTC+11:00</SelectItem>
            <SelectItem value="UTC+12:00">UTC+12:00</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
