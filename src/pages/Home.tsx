import { useState, useEffect } from "react";
import TopAppBar from "@/components/layout/TopAppBar";
import BottomNav from "@/components/layout/BottomNav";
import CategorySection from "@/components/home/CategorySection";
import OffersSection from "@/components/home/OffersSection";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantCardSkeleton from "@/components/restaurant/RestaurantCardSkeleton";

// Mock data for restaurants
const mockRestaurants = [
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
  },
  {
    id: "3",
    name: "Momo House",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    cuisines: ["Momos", "Nepali"],
    priceRange: "$",
    deliveryTime: "15-25 min",
    distance: "0.5 km"
  },
  {
    id: "4",
    name: "Everest Dining",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.3,
    cuisines: ["Nepali", "Indian"],
    priceRange: "$$",
    deliveryTime: "35-45 min",
    distance: "1.5 km"
  }
];

const Home = () => {
  const [restaurants, setRestaurants] = useState<typeof mockRestaurants>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Simulated fetch of restaurants with staggered loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setRestaurants(prev => [...prev, ...mockRestaurants]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [page]);

  // Load more restaurants when user scrolls to bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopAppBar />
      
      <main className="flex-1 overflow-auto pb-16" onScroll={handleScroll}>
        <div className="container px-4 py-4">
          <CategorySection />
          <OffersSection />
          
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Restaurants Near You</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurants.map((restaurant) => (
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
              
              {loading && (
                <>
                  <RestaurantCardSkeleton />
                  <RestaurantCardSkeleton />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Home;
