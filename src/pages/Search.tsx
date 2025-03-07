
import React, { useState } from "react";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";
import RestaurantCard from "@/components/restaurant/RestaurantCard";

// Mock restaurant data
const allRestaurants = [
  {
    id: "1",
    name: "Himalayan Flavors",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "Nepali, Tibetan",
    rating: 4.5,
    deliveryTime: "25-30 min",
  },
  {
    id: "2",
    name: "Kathmandu Kitchen",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "Nepali, Indian",
    rating: 4.2,
    deliveryTime: "35-40 min",
  },
  {
    id: "3",
    name: "Momo House",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "Nepali, Chinese",
    rating: 4.7,
    deliveryTime: "20-25 min",
  },
  {
    id: "4",
    name: "Everest Dining",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "Multi-cuisine",
    rating: 4.0,
    deliveryTime: "40-45 min",
  },
  {
    id: "5",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1458644267420-66bc8a5f21e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "Indian, Asian",
    rating: 4.3,
    deliveryTime: "30-35 min",
  },
  {
    id: "6",
    name: "Thakali Kitchen",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    cuisine: "Nepali",
    rating: 4.8,
    deliveryTime: "25-30 min",
  },
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof allRestaurants>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setHasSearched(true);
    // Filter restaurants based on search query
    const results = allRestaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
  };

  // Popular searches
  const popularSearches = [
    "Momo", "Thali", "Pizza", "Biryani", "Burger", "Chowmein", "Nepali", "Indian"
  ];

  return (
    <div className="min-h-screen pb-20 bg-ghar-gray dark:bg-gray-900">
      <div className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-10">
        <div className="max-w-md mx-auto p-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants, cuisines..."
              className="pl-10 h-12 bg-gray-100 dark:bg-gray-800 border-none"
            />
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <Button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10"
              variant="ghost"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        {!hasSearched ? (
          <>
            <h2 className="text-lg font-bold mt-6 mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSearchQuery(term);
                    // Trigger search with this term
                    const results = allRestaurants.filter(
                      (restaurant) =>
                        restaurant.name.toLowerCase().includes(term.toLowerCase()) ||
                        restaurant.cuisine.toLowerCase().includes(term.toLowerCase())
                    );
                    setSearchResults(results);
                    setHasSearched(true);
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 mb-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">
                {searchResults.length} Results
              </h2>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  setHasSearched(false);
                }}
                className="flex items-center text-ghar-red"
              >
                <ArrowLeft size={18} className="mr-1" />
                Back
              </Button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {searchResults.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-ghar-text-gray dark:text-gray-400">
                  No restaurants found for "{searchQuery}"
                </p>
                <p className="mt-2 text-sm text-ghar-text-gray dark:text-gray-500">
                  Try different keywords or check for spelling mistakes
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Search;
