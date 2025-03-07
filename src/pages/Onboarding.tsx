
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OnboardingSlide } from "@/components/onboarding/OnboardingSlide";

const slides = [
  {
    id: 1,
    title: "Discover Local Nepali Cuisine",
    description: "Find authentic Nepali restaurants and dishes near you",
    imageSrc: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?q=80&w=1000",
    imageAlt: "Nepali food variety",
  },
  {
    id: 2,
    title: "Quick Delivery to Your Doorstep",
    description: "Our delivery partners bring food right to your home",
    imageSrc: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000",
    imageAlt: "Food delivery on bike",
  },
  {
    id: 3,
    title: "Support Local Businesses",
    description: "Help local restaurants thrive by ordering their specialties",
    imageSrc: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000",
    imageAlt: "Local restaurant",
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate("/login");
    }
  };
  
  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 relative"
        >
          <OnboardingSlide
            title={slides[currentSlide].title}
            description={slides[currentSlide].description}
            imageSrc={slides[currentSlide].imageSrc}
            imageAlt={slides[currentSlide].imageAlt}
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-center gap-2 mb-4">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={handleSkip}
          >
            Skip
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90" 
            onClick={handleNext}
          >
            {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
