import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;
  const steps = ["Overview", "Pricing", "Description", "Media", "Publish"];

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {steps.map((stepLabel, index) => {
          const step = index + 1;
          const isActive = step <= currentStep;
          const isCompleted = step < currentStep;
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium
                ${isCompleted ? "bg-primary text-primary-foreground" : isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                {step}
              </div>
              <span className="mt-1 text-xs text-muted-foreground">
                {stepLabel}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-muted rounded-full h-1 mt-2">
        <div
          className="bg-primary h-1 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
