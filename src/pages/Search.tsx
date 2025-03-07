
import { useState } from "react";
import TopAppBar from "@/components/layout/TopAppBar";
import BottomNav from "@/components/layout/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantCardSkeleton from "@/components/restaurant/RestaurantCardSkeleton";
import { Search as SearchIcon, X } from "lucide-react";

const mockSearchResults = [
  {
    id: "1",
    name: "Himalayan Kitchen",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    cuisines: ["Nepali", "Tibetan"],
    priceRange: "$$",
    deliveryTime: "30-40 min",
    distance: "1.2 km"
  },
  {
    id: "2",
    name: "Kathmandu Café",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.2,
    cuisines: ["Nepali", "Cafe"],
    priceRange: "$",
    deliveryTime: "20-30 min",
    distance: "0.8 km"
  }
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof mockSearchResults>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearched(true);
    
    // Simulate search delay
    setTimeout(() => {
      setResults(mockSearchResults);
      setLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopAppBar hideSearch />
      
      <main className="flex-1 overflow-auto pb-16">
        <div className="container px-4 py-4">
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Search for restaurants or dishes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pr-10"
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={!query.trim() || loading}
            >
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RestaurantCardSkeleton />
              <RestaurantCardSkeleton />
            </div>
          ) : searched ? (
            <>
              <h2 className="text-xl font-bold mb-4">
                {results.length > 0
                  ? `Search Results (${results.length})`
                  : "No results found"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    image={restaurant.image}
                    cuisines={restaurant.cuisines}
                    rating={restaurant.rating}
                    priceRange={restaurant.priceRange}
                    deliveryTime={restaurant.deliveryTime}
                    distance={restaurant.distance}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Search for your favorite food
              </h3>
              <p className="text-muted-foreground">
                Find restaurants, cuisines, or dishes
              </p>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Search;
