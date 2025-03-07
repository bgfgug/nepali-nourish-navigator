
import React from "react";
import { cn } from "@/lib/utils";

interface OnboardingSlideProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-[60%] w-full">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[40%] flex flex-col justify-center items-center px-6 bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default OnboardingSlide;
