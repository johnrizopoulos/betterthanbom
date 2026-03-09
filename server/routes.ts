import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const BOM_HEADERS = {
  'User-Agent': 'BetterThanBoM/1.0 (weather app; contact@example.com)',
  'Accept': 'application/json',
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Search for Australian locations using Open-Meteo geocoding
  app.get("/api/weather/search", async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string' || q.length < 2) {
        return res.json({ results: [] });
      }

      const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=10&language=en&format=json`;
      
      const response = await fetch(geocodeUrl);
      
      if (!response.ok) {
        throw new Error(`Geocoding API returned ${response.status}`);
      }

      const data = await response.json();
      
      // Filter to Australian locations only
      const australianResults = (data.results || [])
        .filter((loc: any) => loc.country_code === 'AU')
        .map((loc: any) => ({
          id: loc.id,
          name: loc.name,
          state: loc.admin1 || '',
          country: loc.country,
          latitude: loc.latitude,
          longitude: loc.longitude,
          displayName: `${loc.name}${loc.admin1 ? ', ' + loc.admin1 : ''}`
        }));

      res.json({ results: australianResults });
    } catch (error) {
      console.error('Search API error:', error);
      res.status(500).json({ error: "Failed to search locations" });
    }
  });

  // Get current weather by coordinates
  app.get("/api/weather/current", async (req, res) => {
    try {
      const { lat, lon, name } = req.query;
      
      if (!lat || !lon || typeof lat !== 'string' || typeof lon !== 'string') {
        return res.status(400).json({ error: "Latitude and longitude required" });
      }

      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid coordinates" });
      }

      // Fetch current weather from Open-Meteo
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&timezone=Australia/Sydney`;
      
      const response = await fetch(openMeteoUrl);
      
      if (!response.ok) {
        throw new Error(`Weather API returned ${response.status}`);
      }

      const data = await response.json();
      const current = data.current;

      if (!current) {
        throw new Error("No weather data available");
      }

      const weatherData = {
        location: name || 'Unknown Location',
        latitude,
        longitude,
        lastUpdated: new Date().toISOString(),
        current: {
          temp: Math.round(current.temperature_2m * 10) / 10,
          condition: mapWmoCodeToCondition(current.weather_code),
          isDay: current.is_day === 1,
          description: getWeatherDescription(current.weather_code)
        }
      };

      res.json(weatherData);
    } catch (error) {
      console.error('Weather API error:', error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // Get 7-day forecast by coordinates
  app.get("/api/weather/forecast", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      
      if (!lat || !lon || typeof lat !== 'string' || typeof lon !== 'string') {
        return res.status(400).json({ error: "Latitude and longitude required" });
      }

      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid coordinates" });
      }

      // Fetch 7-day forecast from Open-Meteo
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Australia/Sydney&forecast_days=7`;
      
      const response = await fetch(openMeteoUrl);
      
      if (!response.ok) {
        throw new Error(`Forecast API returned ${response.status}`);
      }

      const data = await response.json();
      const daily = data.daily;

      if (!daily || !daily.time) {
        throw new Error("No forecast data available");
      }

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      const forecast = daily.time.map((dateStr: string, i: number) => {
        const date = new Date(dateStr);
        return {
          date: dateStr,
          dayName: days[date.getDay()],
          condition: mapWmoCodeToCondition(daily.weather_code[i]),
          temp: Math.round(daily.temperature_2m_max[i]),
          tempMin: Math.round(daily.temperature_2m_min[i]),
          description: getWeatherDescription(daily.weather_code[i])
        };
      });

      res.json({ forecast });
    } catch (error) {
      console.error('Forecast API error:', error);
      res.status(500).json({ error: "Failed to fetch forecast data" });
    }
  });

  return httpServer;
}

// Map WMO weather codes to our conditions
function mapWmoCodeToCondition(code: number): string {
  if (code === 0 || code === 1) return "clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95 && code <= 99) return "storm";
  return "partly-cloudy";
}

function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight showers",
    81: "Moderate showers",
    82: "Heavy showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm",
  };
  return descriptions[code] || "Unknown";
}
