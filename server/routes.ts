import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Weather API Routes
  app.get("/api/weather/current", async (req, res) => {
    try {
      const { location } = req.query;
      
      if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: "Location parameter required" });
      }

      // Simple location mapping to BoM station IDs
      const locationMap: Record<string, { name: string; stationId: string; forecastArea: string }> = {
        'melbourne': { name: 'Melbourne, VIC', stationId: '95936', forecastArea: 'VIC_PT042' },
        'sydney': { name: 'Sydney, NSW', stationId: '66062', forecastArea: 'NSW_PT131' },
        'brisbane': { name: 'Brisbane, QLD', stationId: '94576', forecastArea: 'QLD_PT254' },
        'hobart': { name: 'Hobart, TAS', stationId: '94029', forecastArea: 'TAS_PT039' },
      };

      const normalizedLocation = location.toLowerCase().trim();
      const locationData = locationMap[normalizedLocation];

      if (!locationData) {
        return res.status(404).json({ error: "Location not found. Try Melbourne, Sydney, Brisbane, or Hobart." });
      }

      // Coordinates for Australian cities
      const coords: Record<string, { lat: number; lon: number }> = {
        'melbourne': { lat: -37.8136, lon: 144.9631 },
        'sydney': { lat: -33.8688, lon: 151.2093 },
        'brisbane': { lat: -27.4705, lon: 153.0260 },
        'hobart': { lat: -42.8821, lon: 147.3272 },
      };

      const coord = coords[normalizedLocation];
      if (!coord) {
        return res.status(404).json({ error: "Location not found" });
      }

      // Fetch from Open-Meteo (free, no API key required)
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lon}&current=temperature_2m,weather_code,is_day&timezone=Australia/Sydney`;
      
      const response = await fetch(openMeteoUrl);
      
      if (!response.ok) {
        throw new Error(`Weather API returned ${response.status}`);
      }

      const data = await response.json();
      const current = data.current;

      if (!current) {
        throw new Error("No weather data available");
      }

      // Map WMO weather codes to our conditions
      const weatherData = {
        location: locationData.name,
        lastUpdated: new Date().toISOString(),
        current: {
          temp: current.temperature_2m || 20,
          condition: mapWmoCodeToCondition(current.weather_code),
          isDay: current.is_day,
          description: getWeatherDescription(current.weather_code)
        }
      };

      res.json(weatherData);
    } catch (error) {
      console.error('Weather API error:', error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  app.get("/api/weather/forecast", async (req, res) => {
    try {
      const { location } = req.query;
      
      if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: "Location parameter required" });
      }

      // Generate 7-day mock forecast (BoM forecast API structure is complex)
      // In production, you'd parse the BoM forecast XML/JSON properly
      const forecast = generateMockForecast();
      
      res.json({ forecast });
    } catch (error) {
      console.error('Forecast API error:', error);
      res.status(500).json({ error: "Failed to fetch forecast data" });
    }
  });

  return httpServer;
}

// Map WMO weather codes to our conditions
// https://www.open-meteo.com/en/docs
function mapWmoCodeToCondition(code: number): string {
  if (code === 0 || code === 1) return "clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code === 51 || code === 53 || code === 55 || code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) return "rain";
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return "snow";
  if (code === 80 || code === 81 || code === 82) return "rain";
  if (code === 85 || code === 86) return "snow";
  if (code === 95 || code === 96 || code === 99) return "storm";
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
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with large hail",
  };
  return descriptions[code] || "Unknown";
}

// Generate mock 7-day forecast
function generateMockForecast() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const conditions = ['clear', 'partly-cloudy', 'cloudy', 'rain', 'wind'];
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    
    return {
      date: date.toISOString().split('T')[0],
      dayName: days[date.getDay()],
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      temp: Math.floor(Math.random() * 20) + 10, // 10-30°C
      description: "Forecast"
    };
  });
}
