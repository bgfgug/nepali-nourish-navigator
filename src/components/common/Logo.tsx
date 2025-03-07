
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  animated = false,
  className,
}) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-4xl md:text-5xl",
  };

  const colors = {
    default: "text-ghar-red",
    white: "text-white",
  };

  return (
    <div
      className={cn(
        "font-bold flex items-center",
        sizes[size],
        colors[variant],
        animated && "group",
        className
      )}
    >
      <span className={cn(animated && "group-hover:animate-bounce")}>घर</span>
      <span
        className={cn(
          "text-ghar-dark dark:text-white",
          animated && "transition-transform group-hover:rotate-12"
        )}
      >
        धैलो
      </span>
    </div>
  );
};

export default Logo;
