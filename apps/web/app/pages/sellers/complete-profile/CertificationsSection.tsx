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

type Certification = {
  title: string;
  institution: string;
  date: Date | undefined;
};

type CertificationsSectionProps = {
  certifications: Certification[];
  addCertification: () => void;
  removeCertification: (index: number) => void;
  updateCertification: (
    index: number,
    field: keyof Certification,
    value: any,
  ) => void;
};

export default function CertificationsSection({
  certifications,
  addCertification,
  removeCertification,
  updateCertification,
}: CertificationsSectionProps) {
  return (
    <div className="space-y-4">
      <Label>Your Certifications</Label>
      {certifications.map((certification, index) => (
        <div key={index} className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <Input
              value={certification.title}
              onChange={(e) =>
                updateCertification(index, "title", e.target.value)
              }
              placeholder="Certification title"
            />
            <Input
              value={certification.institution}
              onChange={(e) =>
                updateCertification(index, "institution", e.target.value)
              }
              placeholder="Institution"
            />
            <Input
              type="month"
              value={
                certification.date
                  ? certification.date.toISOString().slice(0, 7)
                  : ""
              }
              onChange={(e) =>
                updateCertification(index, "date", new Date(e.target.value))
              }
              placeholder="Date (month and year)"
            />
          </div>
          {index > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCertification(index)}
              className="mt-2"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Certification
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addCertification} variant="outline" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
}
