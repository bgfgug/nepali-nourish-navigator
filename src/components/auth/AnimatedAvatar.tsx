
import React, { useState, useEffect } from "react";

interface AnimatedAvatarProps {
  isPasswordFocused: boolean;
  isPasswordVisible: boolean;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  isPasswordFocused,
  isPasswordVisible,
}) => {
  const [blinking, setBlinking] = useState(false);

  // Random blinking
  useEffect(() => {
    if (!isPasswordFocused || isPasswordVisible) {
      const blinkInterval = setInterval(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 200);
      }, Math.random() * 5000 + 2000); // Random interval between 2-7 seconds
      
      return () => clearInterval(blinkInterval);
    }
  }, [isPasswordFocused, isPasswordVisible]);

  return (
    <div className="w-32 h-32 mx-auto mb-8">
      <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 relative flex justify-center overflow-hidden">
        {/* Face */}
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-8 mb-4 mt-4">
            <div className="w-6 h-6 relative flex items-center justify-center">
              {/* Eye white */}
              <div className="absolute w-full h-full rounded-full bg-white dark:bg-gray-300"></div>
              
              {/* Eye pupil - closes when password is hidden and focused */}
              <div 
                className={`absolute w-3 h-3 rounded-full bg-ghar-dark dark:bg-gray-800 transition-transform duration-200 ${
                  isPasswordFocused && !isPasswordVisible ? "scale-y-0" : ""
                } ${blinking ? "animate-blink" : ""}`}
              ></div>
            </div>
            
            <div className="w-6 h-6 relative flex items-center justify-center">
              {/* Eye white */}
              <div className="absolute w-full h-full rounded-full bg-white dark:bg-gray-300"></div>
              
              {/* Eye pupil - closes when password is hidden and focused */}
              <div 
                className={`absolute w-3 h-3 rounded-full bg-ghar-dark dark:bg-gray-800 transition-transform duration-200 ${
                  isPasswordFocused && !isPasswordVisible ? "scale-y-0" : ""
                } ${blinking ? "animate-blink" : ""}`}
              ></div>
            </div>
          </div>
          
          {/* Mouth - changes based on state */}
          <div 
            className={`
              w-12 h-2 rounded-full bg-ghar-dark dark:bg-gray-800 transition-all duration-300
              ${isPasswordFocused && !isPasswordVisible ? "w-8" : ""}
              ${isPasswordVisible ? "h-4 rounded-t-none rounded-b-full" : ""}
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAvatar;
