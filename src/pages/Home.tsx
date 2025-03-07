
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "@/components/layout/TopAppBar";
import BottomNav from "@/components/layout/BottomNav";
import CategorySection from "@/components/home/CategorySection";
import OffersSection from "@/components/home/OffersSection";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantCardSkeleton from "@/components/restaurant/RestaurantCardSkeleton";

// Mock restaurant data
const mockRestaurants = [
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

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<typeof mockRestaurants>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  // Reference for the last restaurant element for infinite scrolling
  const lastRestaurantRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Initial data fetch
  useEffect(() => {
    setLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setLoading(false);
    }, 1500);
  }, []);

  // Fetch more data when page changes
  useEffect(() => {
    if (page === 1) return;
    
    setLoading(true);
    // Simulate API request delay for loading more restaurants
    setTimeout(() => {
      // Add the same restaurants again but with new IDs
      const newRestaurants = mockRestaurants.map((restaurant) => ({
        ...restaurant,
        id: `${restaurant.id}-${page}`,
      }));
      
      setRestaurants((prev) => [...prev, ...newRestaurants]);
      setLoading(false);
      
      // Stop after 5 pages to prevent infinite loading
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1500);
  }, [page]);

  return (
    <div className="min-h-screen pb-20 bg-ghar-gray dark:bg-gray-900">
      <TopAppBar />

      <div className="max-w-md mx-auto">
        {/* Categories Section */}
        <CategorySection className="mt-4" />

        {/* Offers Section */}
        <OffersSection className="mt-2" />

        {/* Restaurants Section */}
        <div className="mt-6 px-4">
          <h2 className="text-lg font-bold mb-4">Restaurants</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => {
              // Add a ref to the last item for infinite scroll
              if (index === restaurants.length - 1) {
                return (
                  <div ref={lastRestaurantRef} key={restaurant.id}>
                    <RestaurantCard {...restaurant} />
                  </div>
                );
              } else {
                return <RestaurantCard key={restaurant.id} {...restaurant} />;
              }
            })}

            {/* Skeleton loading state */}
            {loading && (
              <>
                <RestaurantCardSkeleton />
                <RestaurantCardSkeleton />
              </>
            )}
          </div>

          {/* No more restaurants message */}
          {!hasMore && !loading && (
            <div className="text-center py-8 text-ghar-text-gray dark:text-gray-400">
              You've seen all available restaurants
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
