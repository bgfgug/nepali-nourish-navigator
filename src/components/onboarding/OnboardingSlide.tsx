
import React from "react";
import { cn } from "@/lib/utils";

interface OnboardingSlideProps {
  image: string;
  title: string;
  description: string;
  isActive: boolean;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  image,
  title,
  description,
  isActive,
}) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full transition-opacity duration-500",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      <div className="h-[60%] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[40%] flex flex-col justify-center items-center px-6 glass">
        <h2 className="text-2xl font-bold text-center mb-3 text-ghar-dark dark:text-white">
          {title}
        </h2>
        <p className="text-center text-ghar-text-gray dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default OnboardingSlide;
