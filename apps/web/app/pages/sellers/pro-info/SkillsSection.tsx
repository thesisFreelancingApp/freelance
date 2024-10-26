import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

type Skill = { name: string; level: string };

export default function SkillsSection({
  skills,
  addSkill,
  removeSkill,
  updateSkill,
}: {
  skills: Skill[];
  addSkill: () => void;
  removeSkill: (index: number) => void;
  updateSkill: (index: number, field: keyof Skill, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Label>Skills</Label>
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={skill.name}
            onChange={(e) => updateSkill(index, "name", e.target.value)}
            placeholder="Skill name"
          />
          <Select
            value={skill.level}
            onValueChange={(value) => updateSkill(index, "level", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Skill level" />
            </SelectTrigger>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </Select>
          {index > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSkill(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addSkill} variant="outline" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Add Skill
      </Button>
    </div>
  );
}
