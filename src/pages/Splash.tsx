
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Splash = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setAnimate(true);
    
    // Redirect to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center splash-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: animate ? 1 : 0, 
          scale: animate ? 1 : 0.8 
        }}
        transition={{ duration: 0.5 }}
        className="text-center text-white"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-2 font-nepali">घरधैलो</h1>
          <h2 className="text-xl md:text-2xl font-medium">Ghar Dhailo</h2>
          <p className="mt-4 text-white/80">Nepali Nourish Navigator</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Splash;
