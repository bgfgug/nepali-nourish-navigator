
import React from "react";
import { cn } from "@/lib/utils";

// Define our categories
const categories = [
  {
    id: "1",
    name: "Momo",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "Thali Set",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Chowmein",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "4",
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "5",
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "6",
    name: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  }
];

interface CategorySectionProps {
  className?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ className }) => {
  return (
    <div className={cn("py-4", className)}>
      <h2 className="text-lg font-bold mb-4 px-4">What's on your mind?</h2>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex px-4 space-x-4 pb-2">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-gray-200 dark:border-gray-700">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
