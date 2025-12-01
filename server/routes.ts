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

      // Fetch current observations from BoM
      const bomUrl = `http://www.bom.gov.au/fwo/IDV60901/IDV60901.${locationData.stationId}.json`;
      const response = await fetch(bomUrl);
      
      if (!response.ok) {
        throw new Error(`BoM API returned ${response.status}`);
      }

      const bomData = await response.json();
      const observations = bomData.observations?.data?.[0];

      if (!observations) {
        throw new Error("No observation data available");
      }

      // Map BoM data to our format
      const weatherData = {
        location: locationData.name,
        lastUpdated: observations.local_date_time_full || new Date().toISOString(),
        current: {
          temp: parseFloat(observations.air_temp) || 20,
          condition: mapBomConditionToOurs(observations.weather),
          isDay: true, // Could derive from sunrise/sunset if needed
          description: observations.weather || "Unknown"
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

// Helper to map BoM weather descriptions to our conditions
function mapBomConditionToOurs(bomWeather: string): string {
  if (!bomWeather) return "clear";
  
  const weather = bomWeather.toLowerCase();
  
  if (weather.includes("rain") || weather.includes("shower")) return "rain";
  if (weather.includes("storm") || weather.includes("thunder")) return "storm";
  if (weather.includes("snow")) return "snow";
  if (weather.includes("hail")) return "hail";
  if (weather.includes("fog") || weather.includes("mist")) return "fog";
  if (weather.includes("cloud") || weather.includes("overcast")) {
    if (weather.includes("partly")) return "partly-cloudy";
    return "cloudy";
  }
  if (weather.includes("wind")) return "wind";
  if (weather.includes("clear") || weather.includes("sunny") || weather.includes("fine")) return "clear";
  
  return "partly-cloudy";
}

// Generate mock 7-day forecast
function generateMockForecast() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
