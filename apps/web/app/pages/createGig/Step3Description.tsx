import React, { useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Step3DescriptionProps {
  formData: {
    description: string;
  };
  updateFormData: (newData: Partial<Step3DescriptionProps['formData']>) => void;
}

const Step3Description: React.FC<Step3DescriptionProps> = ({ formData, updateFormData }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    updateFormData({ description: newDescription });
  };

  useEffect(() => {
    console.log('Current formData:', formData); // Debugging
  }, [formData]);

  return (
    <div className="container mx-auto px-6 py-16 max-w-screen-lg" style={{ maxWidth: '64rem' }}>
      <h2 className="text-2xl font-semibold text-center mb-6">Gig Description</h2>
      <div className="w-full">
        <Card className="shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold text-center text-gray-700">Describe Your Gig</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className="block mb-2 text-lg font-medium text-gray-600">
                  What services are you offering? Be specific and detailed.
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a comprehensive description of your gig. Include what you'll do, your expertise, and what makes your service unique."
                  rows={10}
                  className="w-full p-3 text-lg border border-gray-300 rounded-lg resize-none min-h-[300px] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Step3Description;
