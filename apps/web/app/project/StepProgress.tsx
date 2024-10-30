// StepProgress.tsx
import { CheckCircle2, Circle } from "lucide-react";

interface StepProgressProps {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function StepProgress({
  steps,
  currentStep,
  setCurrentStep,
}: StepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-between mb-2 space-y-2 sm:space-y-0">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentStep(index)}
          >
            {index < currentStep ? (
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            ) : index === currentStep ? (
              <Circle className="w-5 h-5 fill-current sm:w-6 sm:h-6 text-primary" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 sm:w-6 sm:h-6" />
            )}
            <span
              className={`ml-1 sm:ml-2 ${
                index === currentStep
                  ? "text-primary font-medium"
                  : "text-gray-500"
              } text-sm sm:text-base`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-12 sm:w-24 mx-1 sm:mx-2 ${
                  index < currentStep ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
