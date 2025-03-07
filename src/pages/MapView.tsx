
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "@/components/layout/TopAppBar";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Search, X } from "lucide-react";

// Mock restaurant locations
const mockRestaurantLocations = [
  {
    id: "1",
    name: "Himalayan Kitchen",
    lat: 27.7172,
    lng: 85.3240,
    rating: 4.5,
    cuisines: ["Nepali", "Tibetan"],
    priceRange: "$$"
  },
  {
    id: "2",
    name: "Kathmandu Café",
    lat: 27.7065,
    lng: 85.3206,
    rating: 4.2,
    cuisines: ["Nepali", "Cafe"],
    priceRange: "$"
  },
  {
    id: "3",
    name: "Momo House",
    lat: 27.7152,
    lng: 85.3123,
    rating: 4.7,
    cuisines: ["Momos", "Nepali"],
    priceRange: "$"
  },
  {
    id: "4",
    name: "Everest Dining",
    lat: 27.7193,
    lng: 85.3150,
    rating: 4.3,
    cuisines: ["Nepali", "Indian"],
    priceRange: "$$"
  }
];

const MapView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<(typeof mockRestaurantLocations)[0] | null>(null);

  // Filter restaurants based on search query
  const filteredRestaurants = searchQuery
    ? mockRestaurantLocations.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mockRestaurantLocations;

  // In a real app, this would initialize a map with restaurant markers
  useEffect(() => {
    console.log("Map would be initialized here with all restaurant locations");
  }, []);

  const handleRestaurantSelect = (restaurant: typeof mockRestaurantLocations[0]) => {
    setSelectedRestaurant(restaurant);
    // In a real app, this would pan the map to the selected restaurant
    console.log(`Map would pan to restaurant coordinates: ${restaurant.lat}, ${restaurant.lng}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopAppBar hideSearch />
      
      <div className="p-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="relative flex-1">
          <Input
            placeholder="Search for restaurants or cuisines"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-8 pl-10"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 relative">
        {/* Map Placeholder - In a real app, this would be an interactive map */}
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <div className="text-center p-4">
            <MapPin className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 dark:text-gray-300">
              Interactive map would appear here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Showing {filteredRestaurants.length} restaurants in Kathmandu
            </p>
          </div>
        </div>
        
        {/* Restaurant Info Card - Shows when a restaurant is selected */}
        {selectedRestaurant && (
          <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-in slide-in">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{selectedRestaurant.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedRestaurant.cuisines.join(", ")} • {selectedRestaurant.priceRange}
                </p>
                <div className="flex items-center mt-1">
                  <span className="flex items-center bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded text-xs font-medium text-green-800 dark:text-green-100">
                    {selectedRestaurant.rating}
                  </span>
                </div>
              </div>
              <Button 
                size="sm"
                onClick={() => navigate(`/restaurant/${selectedRestaurant.id}`)}
              >
                View
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* List of nearby restaurants */}
      <div className="bg-white dark:bg-gray-800 border-t">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Nearby Restaurants</h2>
          <div className="space-y-2">
            {filteredRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleRestaurantSelect(restaurant)}
              >
                <div className="bg-gray-200 dark:bg-gray-600 rounded-full p-2 mr-3">
                  <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {restaurant.cuisines.join(", ")} • {restaurant.priceRange}
                  </p>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/restaurant/${restaurant.id}`);
                  }}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default MapView;
