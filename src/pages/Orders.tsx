
import React, { useState } from "react";
import { Check, ChevronRight, Clock, MapPin } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock order data
const activeOrders = [
  {
    id: "o1",
    restaurant: "Himalayan Flavors",
    items: [
      { name: "Chicken Momo", quantity: 2 },
      { name: "Veg Thali Set", quantity: 1 },
    ],
    total: 790,
    status: "in-progress",
    statusText: "Food is being prepared",
    progress: 40,
    estimatedDelivery: "25-30 min",
    deliveryAddress: "Thapathali, Kathmandu",
    orderTime: "2:30 PM",
  },
];

const pastOrders = [
  {
    id: "o2",
    restaurant: "Momo House",
    items: [
      { name: "Chicken Chowmein", quantity: 1 },
      { name: "Chicken Momo", quantity: 2 },
    ],
    total: 700,
    status: "delivered",
    statusText: "Delivered",
    orderDate: "Yesterday",
    deliveryAddress: "Thapathali, Kathmandu",
  },
  {
    id: "o3",
    restaurant: "Kathmandu Kitchen",
    items: [
      { name: "Butter Chicken", quantity: 1 },
      { name: "Naan", quantity: 2 },
    ],
    total: 520,
    status: "delivered",
    statusText: "Delivered",
    orderDate: "Jun 10, 2023",
    deliveryAddress: "Thapathali, Kathmandu",
  },
];

const OrderStatusSteps = [
  { status: "confirmed", label: "Order Confirmed" },
  { status: "preparing", label: "Preparing" },
  { status: "ready", label: "Ready for Pickup" },
  { status: "delivery", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
];

const OrderProgress: React.FC<{ progress: number }> = ({ progress }) => {
  // Determine which steps are complete based on progress percentage
  const stepsComplete = Math.floor((progress / 100) * OrderStatusSteps.length);

  return (
    <div className="mt-4 mb-6">
      <Progress value={progress} className="h-2 mb-6" />
      
      <div className="flex justify-between">
        {OrderStatusSteps.map((step, index) => (
          <div
            key={step.status}
            className="flex flex-col items-center relative"
            style={{ width: `${100 / OrderStatusSteps.length}%` }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                ${
                  index < stepsComplete
                    ? "bg-ghar-red text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                }`}
            >
              {index < stepsComplete ? (
                <Check size={16} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`text-xs text-center ${
                index < stepsComplete
                  ? "text-ghar-dark dark:text-white"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="min-h-screen pb-20 bg-ghar-gray dark:bg-gray-900">
      <div className="sticky top-0 pt-4 pb-2 px-4 bg-white dark:bg-gray-900 shadow-sm z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">My Orders</h1>
          
          <Tabs
            defaultValue="active"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full">
              <TabsTrigger value="active" className="flex-1">
                Active
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1">
                Past Orders
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-4">
        {activeTab === "active" ? (
          <div className="py-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">{order.restaurant}</h3>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded text-xs">
                      {order.statusText}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-b border-gray-100 dark:border-gray-700 py-3 my-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-1"
                      >
                        <span>
                          {item.quantity} × {item.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-ghar-text-gray dark:text-gray-400">Total</span>
                    <span className="font-bold">Rs. {order.total}</span>
                  </div>

                  {/* Order Progress */}
                  <OrderProgress progress={order.progress} />

                  {/* Delivery Info */}
                  <div className="flex justify-between items-center text-sm text-ghar-text-gray dark:text-gray-400 mt-2 mb-4">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{order.estimatedDelivery}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>{order.deliveryAddress}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2 border-ghar-red text-ghar-red hover:bg-ghar-red/10"
                  >
                    Track Order
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-ghar-text-gray dark:text-gray-400">
                  You don't have any active orders
                </p>
                <Button
                  className="mt-4 bg-ghar-red hover:bg-ghar-red/90"
                  onClick={() => {
                    // Navigate to home
                    window.location.href = "/home";
                  }}
                >
                  Order Now
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4">
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 mb-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">{order.restaurant}</h3>
                    <span className="text-sm text-ghar-text-gray dark:text-gray-400">
                      {order.orderDate}
                    </span>
                  </div>

                  {/* Order summary */}
                  <div className="border-t border-b border-gray-100 dark:border-gray-700 py-3 my-3">
                    <div className="flex justify-between">
                      <span className="text-ghar-text-gray dark:text-gray-400">
                        {order.items.reduce((total, item) => total + item.quantity, 0)} items
                      </span>
                      <span className="font-bold">Rs. {order.total}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-ghar-text-gray dark:text-gray-400">
                        {order.deliveryAddress}
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        {order.statusText}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                    onClick={() => {
                      // Navigate to order details
                    }}
                  >
                    <span>View Details</span>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-ghar-text-gray dark:text-gray-400">
                  You haven't placed any orders yet
                </p>
                <Button
                  className="mt-4 bg-ghar-red hover:bg-ghar-red/90"
                  onClick={() => {
                    // Navigate to home
                    window.location.href = "/home";
                  }}
                >
                  Browse Restaurants
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Orders;
