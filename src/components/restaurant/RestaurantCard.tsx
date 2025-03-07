
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm card-hover",
        className
      )}
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 px-2 py-1 bg-white dark:bg-gray-900 rounded-md text-sm font-medium flex items-center">
          <Star size={14} className="text-yellow-500 mr-1" />
          {rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-ghar-dark dark:text-white">{name}</h3>
        <p className="text-ghar-text-gray dark:text-gray-400 text-sm mb-2">{cuisine}</p>
        <div className="flex items-center text-ghar-text-gray dark:text-gray-400 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{deliveryTime}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
