
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/common/Logo";

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set a timeout to complete the animation after 2.5 seconds
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);

    // Navigate to onboarding after splash completes
    const navigationTimer = setTimeout(() => {
      // Check if user has seen onboarding before
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
      
      if (hasSeenOnboarding) {
        navigate("/login");
      } else {
        navigate("/onboarding");
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center splash-gradient">
      <div className="relative flex flex-col items-center">
        {/* Logo with animation */}
        <div className={`transition-all duration-1000 ${animationComplete ? "scale-110" : "scale-100"}`}>
          <Logo variant="white" size="lg" />
        </div>
        
        {/* Tagline */}
        <p 
          className={`mt-4 text-white/90 text-lg transition-opacity duration-1000 
            ${animationComplete ? "opacity-100" : "opacity-0"}`}
        >
          Fresh Food, Swift Delivery
        </p>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-20">
        <div className="w-10 h-10 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
      </div>
    </div>
  );
};

export default Splash;
