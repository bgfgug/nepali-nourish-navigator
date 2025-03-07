
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Mock restaurant data
const restaurantData = {
  id: "1",
  name: "Himalayan Flavors",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  cuisine: "Nepali, Tibetan",
  rating: 4.5,
  deliveryTime: "25-30 min",
  location: "Thamel, Kathmandu",
  description: "Experience the authentic flavors of Nepal and Tibet in the heart of Kathmandu.",
  menu: [
    {
      id: "m1",
      name: "Chicken Momo",
      price: 220,
      description: "Steamed dumplings filled with spiced chicken and served with tomato chutney",
      image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "m2",
      name: "Veg Thali Set",
      price: 350,
      description: "Traditional Nepali meal with rice, lentils, vegetables, pickle and yogurt",
      image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "m3",
      name: "Butter Chicken",
      price: 380,
      description: "Tender chicken cooked in rich tomato and butter gravy, served with naan",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "m4",
      name: "Chicken Chowmein",
      price: 240,
      description: "Stir-fried noodles with chicken and vegetables in Nepali style",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    }
  ]
};

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
}

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<typeof restaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<MenuItem[]>([]);

  // Fetch restaurant data
  useEffect(() => {
    // Simulate API request
    setLoading(true);
    setTimeout(() => {
      setRestaurant(restaurantData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 0) + 1,
        };
        return updatedCart;
      } else {
        // Item doesn't exist, add to cart with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const handleUpdateQuantity = (itemId: string, action: "add" | "remove") => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId) {
          if (action === "add") {
            return { ...item, quantity: (item.quantity || 0) + 1 };
          } else {
            const newQuantity = (item.quantity || 0) - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
        }
        return item;
      }).filter((item) => (item.quantity || 0) > 0);
    });
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find((item) => item.id === itemId);
    return item?.quantity || 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 0)), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghar-gray dark:bg-gray-900">
        <div className="w-10 h-10 rounded-full border-4 border-ghar-red/30 border-t-ghar-red animate-spin"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghar-gray dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg mb-4">Restaurant not found</p>
          <Button onClick={() => navigate("/home")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-ghar-gray dark:bg-gray-900">
      {/* Restaurant Hero Section */}
      <div className="relative h-64 bg-ghar-dark">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          className="absolute top-4 left-4 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-white" size={20} />
        </Button>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-md mx-auto -mt-8 relative px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-1">{restaurant.name}</h1>
          <p className="text-ghar-text-gray dark:text-gray-400 mb-2">{restaurant.cuisine}</p>
          
          <div className="flex items-center text-sm mb-4">
            <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded">
              <Star size={14} className="mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <Separator orientation="vertical" className="mx-3 h-4" />
            <div className="flex items-center text-ghar-text-gray dark:text-gray-400">
              <Clock size={14} className="mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <Separator orientation="vertical" className="mx-3 h-4" />
            <div className="flex items-center text-ghar-text-gray dark:text-gray-400">
              <MapPin size={14} className="mr-1" />
              <span>{restaurant.location}</span>
            </div>
          </div>
          
          <p className="text-sm">{restaurant.description}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-md mx-auto mt-6 px-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        
        <div className="space-y-4">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex">
              <div className="flex-1 pr-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-ghar-red font-semibold mt-1">Rs. {item.price}</p>
                <p className="text-sm text-ghar-text-gray dark:text-gray-400 mt-1">
                  {item.description}
                </p>
                
                {/* Item quantity controls */}
                <div className="mt-2">
                  {getItemQuantity(item.id) === 0 ? (
                    <Button
                      variant="outline"
                      className="px-3 py-1 h-auto text-sm text-ghar-red border-ghar-red hover:bg-ghar-red/10"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.id, "remove")}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-6 text-center font-medium">
                        {getItemQuantity(item.id)}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.id, "add")}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-24 h-24">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-4 left-0 right-0 px-4 z-50">
          <div className="max-w-md mx-auto">
            <Button
              className="w-full h-14 bg-ghar-red hover:bg-ghar-red/90 shadow-lg rounded-xl"
              onClick={() => navigate("/checkout")}
            >
              <ShoppingCart className="mr-2" size={20} />
              <span>
                {getTotalItems()} items | Rs. {getTotalPrice()}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
