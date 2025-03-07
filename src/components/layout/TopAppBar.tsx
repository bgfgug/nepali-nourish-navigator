
import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../common/ThemeToggle";
import { cn } from "@/lib/utils";

interface TopAppBarProps {
  hideSearch?: boolean;
  className?: string;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ hideSearch = false, className }) => {
  const [location, setLocation] = useState("Kathmandu, Nepal");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locations = [
    "Kathmandu, Nepal",
    "Pokhara, Nepal",
    "Lalitpur, Nepal",
    "Bhaktapur, Nepal",
    "Biratnagar, Nepal",
  ];

  return (
    <div className={cn("bg-white dark:bg-gray-900 shadow-sm py-3 px-4", className)}>
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center text-left font-normal"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            <MapPin className="mr-1 text-red-500" size={18} />
            <span className="truncate max-w-[150px]">{location}</span>
            <ChevronDown
              size={18}
              className={`ml-1 transition-transform ${
                isLocationOpen ? "rotate-180" : ""
              }`}
            />
          </Button>

          {isLocationOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 overflow-hidden animate-in fade-in">
              {locations.map((loc) => (
                <button
                  key={loc}
                  className="w-full text-left py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    setLocation(loc);
                    setIsLocationOpen(false);
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopAppBar;
