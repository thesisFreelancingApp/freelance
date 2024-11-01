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
    <div className="px-4 mb-8 md:px-0">
      <div className="flex items-center justify-between gap-4 sm:gap-2 sm:flex-wrap">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center text-center cursor-pointer"
            onClick={() => setCurrentStep(index)}
          >
            {index < currentStep ? (
              <CheckCircle2 className="w-6 h-6 text-primary" />
            ) : index === currentStep ? (
              <Circle className="w-6 h-6 fill-current text-primary" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300" />
            )}
            <span
              className={`mt-1 sm:mt-0 sm:ml-2 ${
                index === currentStep
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              } text-sm md:text-base`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
