import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type SkillsSectionProps = {
  skills: string[];
  setSkills: (skills: string[]) => void;
};

export default function SkillsSection({
  skills,
  setSkills,
}: SkillsSectionProps) {
  const [skillInput, setSkillInput] = useState<string>("");

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  return (
    <div className="space-y-4">
      <Label>Skills</Label>
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter a skill"
        />
        <Button onClick={handleAddSkill}>Add Skill</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center px-3 py-1 bg-gray-200 rounded-full"
          >
            <span>{skill}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSkills(skills.filter((_, i) => i !== index))}
            >
              <Trash2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
