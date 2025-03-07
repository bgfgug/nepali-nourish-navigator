
import React from "react";
import { cn } from "@/lib/utils";

// Define our offers
const offers = [
  {
    id: "1",
    title: "50% OFF",
    description: "On your first order",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "2",
    title: "Free Delivery",
    description: "On orders above Rs. 500",
    image: "https://images.unsplash.com/photo-1576866206061-27d27ed9ce0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "3",
    title: "New Restaurants",
    description: "Try something new",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "from-orange-500 to-red-500",
  },
];

interface OffersSectionProps {
  className?: string;
}

const OffersSection: React.FC<OffersSectionProps> = ({ className }) => {
  return (
    <div className={cn("py-4", className)}>
      <h2 className="text-lg font-bold mb-4 px-4">Offers For You</h2>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex px-4 space-x-4 pb-2">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`flex-shrink-0 w-72 h-36 rounded-xl overflow-hidden shadow-sm relative`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-90`}></div>
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              />
              <div className="relative p-4 flex flex-col h-full justify-center">
                <h3 className="text-white text-2xl font-bold">{offer.title}</h3>
                <p className="text-white/90 mt-1">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
