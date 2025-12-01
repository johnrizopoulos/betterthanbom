import { useState, useEffect } from "react";
import { WeatherData } from "@/lib/weather-data";
import { useToast } from "@/hooks/use-toast";

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Initial load - fetch Melbourne by default
  useEffect(() => {
    fetchWeather("melbourne");
  }, []);

  const fetchWeather = async (location: string) => {
    try {
      setIsLoading(true);
      
      // Fetch current weather
      const currentResponse = await fetch(`/api/weather/current?location=${encodeURIComponent(location)}`);
      
      if (!currentResponse.ok) {
        const error = await currentResponse.json();
        throw new Error(error.error || "Failed to fetch weather");
      }
      
      const currentData = await currentResponse.json();
      
      // Fetch forecast
      const forecastResponse = await fetch(`/api/weather/forecast?location=${encodeURIComponent(location)}`);
      const forecastData = await forecastResponse.json();
      
      setData({
        ...currentData,
        forecast: forecastData.forecast
      });
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Location not found",
        description: error instanceof Error ? error.message : "Try Melbourne, Sydney, Brisbane, or Hobart.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    setSearchQuery(query);
    await fetchWeather(query);
  };

  return {
    data,
    isLoading,
    searchLocation,
    searchQuery
  };
}
