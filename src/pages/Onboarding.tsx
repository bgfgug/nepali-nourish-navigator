
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingSlide from "@/components/onboarding/OnboardingSlide";
import { Button } from "@/components/ui/button";

const onboardingData = [
  {
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Discover Local Cuisine",
    description: "Explore the finest Nepali dishes from local restaurants right at your fingertips."
  },
  {
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Quick Delivery",
    description: "Our delivery partners ensure your food arrives fresh and hot, every single time."
  },
  {
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Special Offers",
    description: "Enjoy exclusive deals and discounts on your favorite restaurants and dishes."
  }
];

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === onboardingData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/login");
  };

  const handleNext = () => {
    if (currentSlide === onboardingData.length - 1) {
      localStorage.setItem("hasSeenOnboarding", "true");
      navigate("/login");
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-white dark:bg-black">
      {/* Slides */}
      {onboardingData.map((slide, index) => (
        <OnboardingSlide
          key={index}
          image={slide.image}
          title={slide.title}
          description={slide.description}
          isActive={currentSlide === index}
        />
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {onboardingData.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-6 bg-ghar-red"
                : "w-2 bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="absolute bottom-16 w-full flex justify-between px-6 z-20">
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
        <Button onClick={handleNext}>
          {currentSlide === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
