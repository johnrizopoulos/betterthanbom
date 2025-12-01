import { useState, useEffect } from "react";
import { WeatherData, MOCK_LOCATIONS, DEFAULT_LOCATION } from "@/lib/weather-data";
import { useToast } from "@/hooks/use-toast";

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Simulate initial load with geolocation (mocked)
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(DEFAULT_LOCATION);
      setIsLoading(false);
    }, 1500); // Fake network delay

    return () => clearTimeout(timer);
  }, []);

  const searchLocation = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);

    // Simulate API Call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const normalizedQuery = query.toLowerCase().trim();
        const foundKey = Object.keys(MOCK_LOCATIONS).find(k => k.includes(normalizedQuery));
        
        if (foundKey) {
          setData(MOCK_LOCATIONS[foundKey]);
        } else {
          toast({
            title: "Location not found",
            description: "Try 'Melbourne', 'Sydney', 'Brisbane', or 'Hobart'.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
        resolve();
      }, 800);
    });
  };

  return {
    data,
    isLoading,
    searchLocation,
    searchQuery
  };
}
