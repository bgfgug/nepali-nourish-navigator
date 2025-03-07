
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: ShoppingBag, label: "Orders", path: "/orders" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <div className="h-full max-w-md mx-auto flex justify-around items-center px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full relative transition-colors",
                isActive
                  ? "text-ghar-red"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              <item.icon size={22} />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-ghar-red rounded-t-md" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
