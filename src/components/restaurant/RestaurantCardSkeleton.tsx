
import React from "react";
import { cn } from "@/lib/utils";

interface RestaurantCardSkeletonProps {
  className?: string;
}

const RestaurantCardSkeleton: React.FC<RestaurantCardSkeletonProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm",
        className
      )}
    >
      <div className="h-48 bg-gray-200 dark:bg-gray-700 shimmer"></div>
      <div className="p-4">
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded shimmer mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded shimmer mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
      </div>
    </div>
  );
};

export default RestaurantCardSkeleton;
