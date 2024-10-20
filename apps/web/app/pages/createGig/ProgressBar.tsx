import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  const steps = ['Overview', 'Pricing', 'Description', 'Media', 'Publish'];

  return (
    <div>
      {/* Step Indicators */}
      <div className="flex justify-between mb-4">
        {steps.map((stepLabel, index) => {
          const step = index + 1;
          const isActive = step <= currentStep;
          return (
            <div key={step} className="relative flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full 
                ${isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {step}
              </div>
              <span className="mt-2 text-sm text-gray-600">{stepLabel}</span>
              {index !== totalSteps - 1 && (
                <div className="absolute w-full h-1 bg-gray-200 top-4 -right-8 transform translate-x-4">
                  <div
                    className={`h-full ${isActive ? 'bg-primary' : ''}`}
                    style={{
                      width: step === currentStep ? `${progress}%` : '100%',
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
