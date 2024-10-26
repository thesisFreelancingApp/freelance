import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

type Education = {
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
};

export function EducationSection({
  education,
  addEducation,
  removeEducation,
  updateEducation,
}: {
  education: Education[];
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateEducation: (
    index: number,
    field: keyof Education,
    value: string,
  ) => void;
}) {
  return (
    <div className="space-y-4">
      <Label>Education</Label>
      {education.map((edu, index) => (
        <div key={index} className="grid grid-cols-2 gap-2">
          <Input
            value={edu.country}
            onChange={(e) => updateEducation(index, "country", e.target.value)}
            placeholder="Country"
          />
          <Input
            value={edu.university}
            onChange={(e) =>
              updateEducation(index, "university", e.target.value)
            }
            placeholder="University"
          />
          <Input
            value={edu.title}
            onChange={(e) => updateEducation(index, "title", e.target.value)}
            placeholder="Title"
          />
          <Input
            value={edu.major}
            onChange={(e) => updateEducation(index, "major", e.target.value)}
            placeholder="Major"
          />
          <Input
            type="number"
            value={edu.year}
            onChange={(e) => updateEducation(index, "year", e.target.value)}
            placeholder="Year"
          />
          {index > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addEducation} variant="outline" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
