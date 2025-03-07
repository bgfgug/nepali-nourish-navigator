
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopAppBar from "@/components/layout/TopAppBar";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus } from "lucide-react";

// Mock restaurant data
const mockRestaurant = {
  id: "1",
  name: "Himalayan Kitchen",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  rating: 4.5,
  cuisines: ["Nepali", "Tibetan"],
  priceRange: "$$",
  deliveryTime: "30-40 min",
  distance: "1.2 km",
  address: "123 Kathmandu Street, Thamel",
  description: "Authentic Nepali cuisine with a modern twist. Our chefs prepare traditional dishes using fresh, local ingredients.",
  openingHours: "10:00 AM - 10:00 PM"
};

// Mock menu items
const mockMenuItems = [
  {
    id: "m1",
    name: "Momo (Chicken)",
    description: "Steamed dumplings filled with spiced chicken and served with dipping sauce",
    price: 150,
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "m2",
    name: "Dal Bhat",
    description: "Traditional Nepali meal with rice, lentil soup, and various side dishes",
    price: 250,
    image: "https://images.unsplash.com/photo-1631292784640-146ba3605cfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "m3",
    name: "Thukpa",
    description: "Tibetan noodle soup with vegetables and chicken",
    price: 180,
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "m4",
    name: "Sekuwa",
    description: "Grilled marinated meat, a popular Nepali street food",
    price: 220,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // In a real app, you would fetch restaurant details based on the ID
  const restaurant = mockRestaurant;
  const menuItems = mockMenuItems;
  
  const handleAddToCart = (item: typeof mockMenuItems[0]) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      }
    });
    
    toast.success(`Added ${item.name} to cart`);
  };
  
  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prev.filter(item => item.id !== itemId);
      }
    });
  };
  
  const getItemQuantity = (itemId: string) => {
    const item = cart.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };
  
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopAppBar hideSearch />
      
      <div className="relative h-48 md:h-64">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/80 hover:bg-white rounded-full" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-2xl font-bold text-white">{restaurant.name}</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
            <span className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              {restaurant.rating}
            </span>
            <span>•</span>
            <span>{restaurant.cuisines.join(", ")}</span>
            <span>•</span>
            <span>{restaurant.priceRange}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 p-4 bg-white border-b">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          {restaurant.deliveryTime}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {restaurant.distance}
        </div>
      </div>
      
      <main className="flex-1 overflow-auto pb-20">
        <div className="container px-4 py-4">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">About</h2>
            <p className="text-gray-600">{restaurant.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-background">
                <Clock className="h-3 w-3 mr-1" />
                {restaurant.openingHours}
              </Badge>
              <Badge variant="outline" className="bg-background">
                <MapPin className="h-3 w-3 mr-1" />
                {restaurant.address}
              </Badge>
            </div>
          </div>
          
          <Separator />
          
          <div className="my-6">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="flex gap-3 border rounded-lg p-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">NPR {item.price}</span>
                      
                      {getItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{getItemQuantity(item.id)}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => handleAddToCart(item)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <Button className="w-full">
            Place Order • NPR {totalAmount}
          </Button>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
};

export default RestaurantDetail;
