
import { useState, useEffect } from "react";
import { WeatherData } from "@/lib/weather-data";

export interface LocationResult {
  id: number;
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  displayName: string;
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initial load - fetch Melbourne by default
  useEffect(() => {
    fetchWeatherByCoords(-37.8136, 144.9631, "Melbourne, VIC");
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number, name: string) => {
    try {
      setIsLoading(true);
      setSearchResults([]);
      
      // Fetch current weather
      const currentResponse = await fetch(
        `/api/weather/current?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`
      );
      
      if (!currentResponse.ok) {
        const error = await currentResponse.json();
        throw new Error(error.error || "Failed to fetch weather");
      }
      
      const currentData = await currentResponse.json();
      
      // Fetch forecast
      const forecastResponse = await fetch(
        `/api/weather/forecast?lat=${lat}&lon=${lon}`
      );
      const forecastData = await forecastResponse.json();
      
      setData({
        ...currentData,
        forecast: forecastData.forecast || []
      });
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      // Error handling - could add user-facing error state if needed
    } finally {
      setIsLoading(false);
    }
  };

  const searchLocations = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(`/api/weather/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error("Search failed");
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const selectLocation = async (location: LocationResult) => {
    setSearchResults([]);
    await fetchWeatherByCoords(location.latitude, location.longitude, location.displayName);
  };

  return {
    data,
    isLoading,
    searchResults,
    isSearching,
    searchLocations,
    selectLocation,
  };
}
