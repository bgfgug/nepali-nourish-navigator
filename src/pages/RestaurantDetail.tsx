
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopAppBar from "@/components/layout/TopAppBar";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, Phone, Share2, Heart, Info, Menu } from "lucide-react";

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
  openingHours: "10:00 AM - 10:00 PM",
  phoneNumber: "+977 1234567890",
  coordinates: { lat: 27.7172, lng: 85.3240 }
};

// Mock menu items
const mockMenuItems = [
  {
    id: "m1",
    name: "Momo (Chicken)",
    description: "Steamed dumplings filled with spiced chicken and served with dipping sauce",
    price: 150,
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Appetizers"
  },
  {
    id: "m2",
    name: "Dal Bhat",
    description: "Traditional Nepali meal with rice, lentil soup, and various side dishes",
    price: 250,
    image: "https://images.unsplash.com/photo-1631292784640-146ba3605cfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Main Course"
  },
  {
    id: "m3",
    name: "Thukpa",
    description: "Tibetan noodle soup with vegetables and chicken",
    price: 180,
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Soups"
  },
  {
    id: "m4",
    name: "Sekuwa",
    description: "Grilled marinated meat, a popular Nepali street food",
    price: 220,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Main Course"
  },
  {
    id: "m5",
    name: "Sel Roti",
    description: "Traditional Nepali sweet ring-shaped rice bread",
    price: 120,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128a16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Desserts"
  },
  {
    id: "m6",
    name: "Butter Tea",
    description: "Traditional Tibetan tea made with butter and salt",
    price: 90,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Beverages"
  }
];

// Mock review data
const mockReviews = [
  {
    id: "r1",
    userName: "Anjali P.",
    userImage: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    date: "2 weeks ago",
    comment: "The momos were fantastic! Authentic Nepali flavors that reminded me of home."
  },
  {
    id: "r2",
    userName: "Rajesh S.",
    userImage: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    date: "1 month ago",
    comment: "Great food and ambiance. The Dal Bhat was delicious but a bit pricey."
  },
  {
    id: "r3",
    userName: "Sarah T.",
    userImage: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    date: "2 months ago",
    comment: "Best Nepali restaurant in town! The staff was very friendly and the food was amazing."
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
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");
  
  // Group menu items by category
  const menuByCategory = mockMenuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof mockMenuItems>);
  
  // In a real app, you would fetch restaurant details based on the ID
  const restaurant = mockRestaurant;
  const menuItems = mockMenuItems;
  const reviews = mockReviews;
  
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

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success("Added to favorites");
    }
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API
    toast.success("Sharing link copied to clipboard");
  };

  const handleCall = () => {
    // In a real app, this would open the phone app
    toast.success("Calling restaurant");
  };

  // Initialize and render map (simplified for this example)
  useEffect(() => {
    // In a real app, this would initialize a map with the restaurant location
    console.log("Map would be initialized here with coordinates:", restaurant.coordinates);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopAppBar hideSearch />
      
      <div className="relative h-64 md:h-72">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/80 hover:bg-white rounded-full shadow-md" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/80 hover:bg-white rounded-full shadow-md"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/80 hover:bg-white rounded-full shadow-md"
            onClick={handleToggleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-3xl font-bold text-white">{restaurant.name}</h1>
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
      
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl -mt-6 z-10 relative shadow-md">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{restaurant.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{restaurant.cuisines.join(", ")}</p>
            </div>
            <div className="flex items-center justify-center px-3 py-1 bg-green-100 dark:bg-green-900 rounded-md">
              <span className="text-green-800 dark:text-green-100 font-medium text-sm">{restaurant.rating}</span>
              <Star className="h-3 w-3 ml-1 text-green-800 dark:text-green-100 fill-green-800 dark:fill-green-100" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              {restaurant.distance}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              {restaurant.deliveryTime}
            </div>
          </div>
          
          <div className="flex overflow-x-auto space-x-2 pb-1 no-scrollbar">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-shrink-0 border-gray-300 hover:bg-gray-100 dark:border-gray-700"
              onClick={handleCall}
            >
              <Phone className="h-4 w-4 mr-2 text-green-600" />
              Call
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-shrink-0 border-gray-300 hover:bg-gray-100 dark:border-gray-700"
            >
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              Directions
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-shrink-0 border-gray-300 hover:bg-gray-100 dark:border-gray-700"
              onClick={handleToggleLike}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
              {isLiked ? 'Saved' : 'Save'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-shrink-0 border-gray-300 hover:bg-gray-100 dark:border-gray-700"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2 text-gray-600" />
              Share
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="menu" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <TabsList className="w-full justify-start rounded-none bg-transparent border-b-0 p-0">
              <TabsTrigger 
                value="menu" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ghar-red data-[state=active]:bg-transparent"
              >
                <Menu className="h-4 w-4 mr-2" />
                Menu
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ghar-red data-[state=active]:bg-transparent"
              >
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="info" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ghar-red data-[state=active]:bg-transparent"
              >
                <Info className="h-4 w-4 mr-2" />
                Info
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="menu" className="mt-0 p-0">
            <div className="p-4">
              {Object.entries(menuByCategory).map(([category, items]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-bold mb-4 sticky top-0 bg-white dark:bg-gray-800 py-2 z-10">{category}</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 border-b pb-4 last:border-b-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-1">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-medium">NPR {item.price}</span>
                            
                            {getItemQuantity(item.id) > 0 ? (
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-7 w-7 rounded-full border-ghar-red text-ghar-red"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span>{getItemQuantity(item.id)}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-7 w-7 rounded-full border-ghar-red text-ghar-red"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="rounded-md border-ghar-red text-ghar-red hover:bg-red-50"
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
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Ratings & Reviews</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-bold text-lg">{restaurant.rating}</span>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{reviews.length} reviews</span>
                  </div>
                </div>
                <Button variant="outline" className="border-ghar-red text-ghar-red">
                  Rate
                </Button>
              </div>
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <img 
                        src={review.userImage} 
                        alt={review.userName} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs ml-2 text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="mt-0">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">About</h3>
                <p className="text-gray-700 dark:text-gray-300">{restaurant.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Address</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{restaurant.address}</p>
                
                {/* Map Placeholder - In a real app, this would be an interactive map */}
                <div className="w-full h-36 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${restaurant.coordinates.lat},${restaurant.coordinates.lng}&zoom=15&size=600x200&markers=color:red%7C${restaurant.coordinates.lat},${restaurant.coordinates.lng}&key=YOUR_API_KEY`} 
                    alt="Restaurant location"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Opening Hours</h3>
                <p className="text-gray-700 dark:text-gray-300">{restaurant.openingHours}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Contact Details</h3>
                <p className="text-gray-700 dark:text-gray-300">{restaurant.phoneNumber}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 shadow-lg">
          <Button className="w-full bg-ghar-red hover:bg-red-600">
            Place Order • NPR {totalAmount}
          </Button>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
};

export default RestaurantDetail;
