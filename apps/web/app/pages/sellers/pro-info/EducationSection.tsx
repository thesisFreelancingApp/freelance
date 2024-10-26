import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

type Education = {
  faculty: string;
  from: Date | undefined;
  to: Date | undefined;
};

type EducationsSectionProps = {
  educations: Education[];
  setEducation: (educations: Education[]) => void;
};

export default function EducationSection({
  educations,
  setEducation,
}: EducationsSectionProps) {
  const addEducation = () => {
    setEducation([
      ...educations,
      { faculty: "", from: undefined, to: undefined },
    ]);
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: any,
  ) => {
    const updatedEducations = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu,
    );
    setEducation(updatedEducations);
  };

  const removeEducation = (index: number) => {
    setEducation(educations.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label>Your Education</Label>
      {educations.map((education, index) => (
        <div key={index} className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <Input
              value={education.faculty}
              onChange={(e) =>
                updateEducation(index, "faculty", e.target.value)
              }
              placeholder="Enter faculty or school name"
            />
            <Input
              type="date"
              value={
                education.from ? education.from.toISOString().slice(0, 10) : ""
              }
              onChange={(e) =>
                updateEducation(index, "from", new Date(e.target.value))
              }
              placeholder="From"
            />
            <Input
              type="date"
              value={
                education.to ? education.to.toISOString().slice(0, 10) : ""
              }
              onChange={(e) =>
                updateEducation(index, "to", new Date(e.target.value))
              }
              placeholder="To"
            />
          </div>
          {index > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(index)}
              className="mt-2"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Education
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addEducation} variant="outline" size="sm">
        Add Education
      </Button>
    </div>
  );
}
