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
  temp: number; // Max degrees Celsius
  tempMin: number; // Min degrees Celsius
  description: string; // Text description for accessibility
}

export interface WeatherData {
  location: string;
  lastUpdated: string;
  current: {
    condition: WeatherCondition;
    temp: number; // Degrees Celsius
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
      condition: "rain",
      temp: 14, // Raining -> Umbrella
      isDay: true,
      description: "Rainy"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "rain", temp: 12, description: "Rainy" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "cloudy", temp: 15, description: "Cloudy" },
      { date: "2025-12-04", dayName: "Thursday", condition: "wind", temp: 18, description: "Windy" },
      { date: "2025-12-05", dayName: "Friday", condition: "clear", temp: 22, description: "Sunny" },
      { date: "2025-12-06", dayName: "Saturday", condition: "storm", temp: 19, description: "Thunderstorms" },
      { date: "2025-12-07", dayName: "Sunday", condition: "partly-cloudy", temp: 21, description: "Partly Cloudy" },
      { date: "2025-12-08", dayName: "Monday", condition: "rain", temp: 13, description: "Showers" },
    ]
  },
  "sydney": {
    location: "Sydney, NSW",
    lastUpdated: new Date().toISOString(),
    current: {
      condition: "clear",
      temp: 29, // > 28 & No Rain -> Wide Brim Hat
      isDay: true,
      description: "Sunny"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "clear", temp: 30, description: "Sunny" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "partly-cloudy", temp: 26, description: "Partly Cloudy" },
      { date: "2025-12-04", dayName: "Thursday", condition: "cloudy", temp: 24, description: "Cloudy" },
      { date: "2025-12-05", dayName: "Friday", condition: "rain", temp: 22, description: "Rain" },
      { date: "2025-12-06", dayName: "Saturday", condition: "rain", temp: 21, description: "Rain" },
      { date: "2025-12-07", dayName: "Sunday", condition: "cloudy", temp: 25, description: "Cloudy" },
      { date: "2025-12-08", dayName: "Monday", condition: "clear", temp: 31, description: "Sunny" },
    ]
  },
  "brisbane": {
    location: "Brisbane, QLD",
    lastUpdated: new Date().toISOString(),
    current: {
      condition: "partly-cloudy",
      temp: 24, // 20-27 & No Rain -> T-shirt
      isDay: true,
      description: "Warm"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "rain", temp: 25, description: "Rain" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "storm", temp: 23, description: "Storms" },
      { date: "2025-12-04", dayName: "Thursday", condition: "cloudy", temp: 26, description: "Cloudy" },
      { date: "2025-12-05", dayName: "Friday", condition: "partly-cloudy", temp: 27, description: "Partly Cloudy" },
      { date: "2025-12-06", dayName: "Saturday", condition: "clear", temp: 29, description: "Sunny" },
      { date: "2025-12-07", dayName: "Sunday", condition: "clear", temp: 30, description: "Sunny" },
      { date: "2025-12-08", dayName: "Monday", condition: "wind", temp: 24, description: "Windy" },
    ]
  },
  "hobart": {
    location: "Hobart, TAS",
    lastUpdated: new Date().toISOString(),
    current: {
      condition: "snow",
      temp: 5, // < 10 -> Stay Inside
      isDay: true,
      description: "Freezing"
    },
    forecast: [
      { date: "2025-12-02", dayName: "Tuesday", condition: "snow", temp: 4, description: "Snow" },
      { date: "2025-12-03", dayName: "Wednesday", condition: "hail", temp: 6, description: "Hail" },
      { date: "2025-12-04", dayName: "Thursday", condition: "wind", temp: 9, description: "Windy" },
      { date: "2025-12-05", dayName: "Friday", condition: "cloudy", temp: 12, description: "Cloudy" },
      { date: "2025-12-06", dayName: "Saturday", condition: "partly-cloudy", temp: 14, description: "Partly Cloudy" },
      { date: "2025-12-07", dayName: "Sunday", condition: "rain", temp: 11, description: "Rain" },
      { date: "2025-12-08", dayName: "Monday", condition: "cloudy", temp: 10, description: "Cloudy" },
    ]
  }
};

export const DEFAULT_LOCATION = MOCK_LOCATIONS["melbourne"];
