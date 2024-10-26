import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

type Occupation = {
  title: string;
  from: Date | undefined;
  to: Date | undefined;
};

type OccupationsSectionProps = {
  occupations: Occupation[];
  companyType: "freelancer" | "company";
  companyName: string;
  profession: string;
  experienceLevel: string;
  sector: string;
  addOccupation: () => void;
  removeOccupation: (index: number) => void;
  updateOccupation: (
    index: number,
    field: keyof Occupation,
    value: any,
  ) => void;
  setCompanyType: (value: "freelancer" | "company") => void;
  setCompanyName: (value: string) => void;
  setProfession: (value: string) => void;
  setExperienceLevel: (value: string) => void;
  setSector: (value: string) => void;
};

export default function OccupationsSection({
  occupations,
  companyType,
  companyName,
  profession,
  experienceLevel,
  sector,
  addOccupation,
  removeOccupation,
  updateOccupation,
  setCompanyType,
  setCompanyName,
  setProfession,
  setExperienceLevel,
  setSector,
}: OccupationsSectionProps) {
  return (
    <div className="space-y-4">
      <Label>Company Type</Label>
      <Select
        value={companyType}
        onValueChange={(value) =>
          setCompanyType(value as "freelancer" | "company")
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Company Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="freelancer">Freelancer</SelectItem>
          <SelectItem value="company">Company</SelectItem>
        </SelectContent>
      </Select>

      {/* Conditionally disable the companyName and sector fields based on companyType */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter your company name"
          disabled={companyType === "freelancer"}
        />
      </div>

      <div className="space-y-2">
        <Label>Sector</Label>
        <Select
          value={sector}
          onValueChange={setSector}
          disabled={companyType === "freelancer"} // Disable if "Freelancer" is selected
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Profession</Label>
        <Input
          id="profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="Enter your profession"
        />
      </div>

      <div className="space-y-2">
        <Label>Experience Level</Label>
        <Select value={experienceLevel} onValueChange={setExperienceLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Select Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no_experience">No Experience</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Label>Your Occupations</Label>
      {occupations.map((occupation, index) => (
        <div key={index} className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <Input
              value={occupation.title}
              onChange={(e) => updateOccupation(index, "title", e.target.value)}
              placeholder="Enter occupation title"
            />
            <Input
              type="date"
              value={
                occupation.from
                  ? occupation.from.toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                updateOccupation(index, "from", new Date(e.target.value))
              }
              placeholder="From"
            />
            <Input
              type="date"
              value={
                occupation.to ? occupation.to.toISOString().slice(0, 10) : ""
              }
              onChange={(e) =>
                updateOccupation(index, "to", new Date(e.target.value))
              }
              placeholder="To"
            />
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
