import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceData } from "@/types";

interface Step1BasicInfoProps {
  serviceData: ServiceData;
  setServiceData: (data: ServiceData) => void;
}

export default function Step1BasicInfo({
  serviceData,
  setServiceData,
}: Step1BasicInfoProps) {
  const handleServiceDataChange = (field: keyof ServiceData, value: string) => {
    setServiceData({ ...serviceData, [field]: value });
  };

  const handleAddTag = (newTag: string) => {
    if (newTag && serviceData.tags.length < 8) {
      setServiceData({ ...serviceData, tags: [...serviceData.tags, newTag] });
    }
  };

  return (
    <>
      <Label>Service Name</Label>
      <Input
        value={serviceData.name}
        onChange={(e) => handleServiceDataChange("name", e.target.value)}
      />
      <Label>Description</Label>
      <Textarea
        value={serviceData.description}
        onChange={(e) => handleServiceDataChange("description", e.target.value)}
      />
      <Label>Tags</Label>
      <Input
        placeholder="Enter tag and press 'Enter'"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            handleAddTag(e.currentTarget.value.trim());
            e.currentTarget.value = "";
          }
        }}
      />
      <div>
        {serviceData.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </>
  );
}
