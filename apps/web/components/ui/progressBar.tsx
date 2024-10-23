// ProgressBar.tsx
import React from "react";

type ProgressBarProps = {
  progress: number; // La valeur de la progression (de 0 à 100)
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
