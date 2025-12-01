import { Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudRain, CloudSnow, Moon, Sun, Umbrella, Wind } from "lucide-react";

export type WeatherCondition = 
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "wind"
  | "storm"
  | "snow"
  | "hail"
  | "fog";

export interface DailyForecast {
  date: string; // ISO date
  dayName: string; // "Monday", "Tuesday"
  condition: WeatherCondition;
  description: string; // Text description for accessibility
}

export interface WeatherData {
  location: string;
  lastUpdated: string;
  current: {
    condition: WeatherCondition;
    isDay: boolean;
    description: string;
  };
  forecast: DailyForecast[];
}

export const MOCK_LOCATIONS: Record<string, WeatherData> = {
  "melbourne": {
    location: "Melbourne, VIC",
    lastUpdated: new Date().toISOString(),
    current: {
      condition: "partly-cloudy",
      isDay: true,
      description: "Partly Cloudy"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "rain", description: "Rainy" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "cloudy", description: "Cloudy" },
      { date: "2025-12-04", dayName: "Thursday", condition: "wind", description: "Windy" },
      { date: "2025-12-05", dayName: "Friday", condition: "clear", description: "Sunny" },
      { date: "2025-12-06", dayName: "Saturday", condition: "storm", description: "Thunderstorms" },
      { date: "2025-12-07", dayName: "Sunday", condition: "partly-cloudy", description: "Partly Cloudy" },
      { date: "2025-12-08", dayName: "Monday", condition: "rain", description: "Showers" },
    ]
  },
  "sydney": {
    location: "Sydney, NSW",
    lastUpdated: new Date().toISOString(),
    current: {
      condition: "clear",
      isDay: true,
      description: "Sunny"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "clear", description: "Sunny" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "partly-cloudy", description: "Partly Cloudy" },
      { date: "2025-12-04", dayName: "Thursday", condition: "cloudy", description: "Cloudy" },
      { date: "2025-12-05", dayName: "Friday", condition: "rain", description: "Rain" },
      { date: "2025-12-06", dayName: "Saturday", condition: "rain", description: "Rain" },
      { date: "2025-12-07", dayName: "Sunday", condition: "cloudy", description: "Cloudy" },
      { date: "2025-12-08", dayName: "Monday", condition: "clear", description: "Sunny" },
    ]
  },
  "brisbane": {
    location: "Brisbane, QLD",
    lastUpdated: new Date().toISOString(),
    current: {
      condition: "storm",
      isDay: true,
      description: "Stormy"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "rain", description: "Rain" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "storm", description: "Storms" },
      { date: "2025-12-04", dayName: "Thursday", condition: "cloudy", description: "Cloudy" },
      { date: "2025-12-05", dayName: "Friday", condition: "partly-cloudy", description: "Partly Cloudy" },
      { date: "2025-12-06", dayName: "Saturday", condition: "clear", description: "Sunny" },
      { date: "2025-12-07", dayName: "Sunday", condition: "clear", description: "Sunny" },
      { date: "2025-12-08", dayName: "Monday", condition: "wind", description: "Windy" },
    ]
  },
  "hobart": {
    location: "Hobart, TAS",
    lastUpdated: new Date().toISOString(),
    current: {
      condition: "snow",
      isDay: true,
      description: "Snow"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "snow", description: "Snow" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "hail", description: "Hail" },
      { date: "2025-12-04", dayName: "Thursday", condition: "wind", description: "Windy" },
      { date: "2025-12-05", dayName: "Friday", condition: "cloudy", description: "Cloudy" },
      { date: "2025-12-06", dayName: "Saturday", condition: "partly-cloudy", description: "Partly Cloudy" },
      { date: "2025-12-07", dayName: "Sunday", condition: "rain", description: "Rain" },
      { date: "2025-12-08", dayName: "Monday", condition: "cloudy", description: "Cloudy" },
    ]
  }
};

export const DEFAULT_LOCATION = MOCK_LOCATIONS["melbourne"];
