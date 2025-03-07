
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface RestaurantMapProps {
  lat: number;
  lng: number;
  name: string;
  className?: string;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ lat, lng, name, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would initialize an actual map like Google Maps, Mapbox, etc.
    // For this demo, we're just simulating map loading
    const loadMap = async () => {
      try {
        // Simulate map loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (mapRef.current) {
          // This would be where we initialize the map in a real application
          console.log(`Map initialized with coordinates: ${lat}, ${lng}`);
          setIsMapLoaded(true);
        }
      } catch (error) {
        console.error("Error loading map:", error);
        setMapError("Failed to load map. Please try again later.");
      }
    };

    loadMap();
  }, [lat, lng]);

  // Generate a static map URL (Google Maps Static API)
  // Note: In a real app, you would use your own API key and properly implement a map component
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x200&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY_HERE`;

  return (
    <div className={`relative w-full h-36 rounded-lg overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-full bg-gray-200 dark:bg-gray-700">
        {!isMapLoaded && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading map...</div>
          </div>
        )}
        
        {mapError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <MapPin className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-center text-gray-500">{mapError}</p>
          </div>
        )}
        
        {isMapLoaded && (
          <>
            {/* In a real app, this would be replaced with an interactive map */}
            <img 
              src={staticMapUrl} 
              alt={`Map showing location of ${name}`}
              className="w-full h-full object-cover"
              onError={() => setMapError("Failed to load map image.")}
            />
            <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs">
              {name}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantMap;
