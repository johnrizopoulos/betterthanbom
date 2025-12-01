# Better than BoM - Weather Application

## Version 1.0

**Release Date:** December 1, 2025

## Overview

Better than BoM is an Australian weather application that provides current weather conditions and a 7-day forecast using visual, contextual imagery instead of numerical data. The application focuses on making weather information intuitive by displaying what users should wear (umbrella, jumper, t-shirt, hat, coat) rather than raw temperature and precipitation values.

**Key Features:**
- Search any Australian suburb or postcode
- Real-time weather data from Open-Meteo API
- Pixel-art outfit icons based on temperature and weather conditions
- 7-day forecast with daily outfit recommendations
- Dynamic background gradients based on weather conditions

## User Preferences

Preferred communication style: Simple, everyday language.

## Outfit Icon Logic

The app displays different pixel-art icons based on weather conditions:

| Icon | Condition |
|------|-----------|
| Umbrella (rainbow) | Rain or storm |
| Jumper (pink sweater) | Cool weather (10-19°C) |
| T-shirt (cyan with smiley) | Warm weather (20-27°C) |
| Hat (beige sun hat) | Hot weather (>28°C) |
| Coat (purple/green winter coat) | Cold weather (<10°C) |

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript using Vite as the build tool
- Single-page application (SPA) architecture
- Hot Module Replacement (HMR) enabled for development

**UI Component System:**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS v4 for styling
- Framer Motion for animations
- Custom pixel-art weather icons (sprite sheet: `attached_assets/image_1764585934042.png`)

**Key Components:**
- `client/src/pages/home.tsx` - Main weather display page
- `client/src/components/weather-icon.tsx` - Pixel art icon renderer
- `client/src/hooks/use-weather.tsx` - Weather data fetching hook

**State Management:**
- Custom React hooks for weather data and location search
- Debounced search input with dropdown suggestions
- Local state using useState, useEffect, useCallback

### Backend Architecture

**Server Framework:**
- Express.js running on Node.js with TypeScript
- Development mode uses Vite middleware
- Production mode serves static files from `dist/public`

**API Endpoints:**
- `GET /api/weather/search?q={query}` - Search Australian suburbs
  - Returns: `{ results: [{ id, name, state, latitude, longitude, displayName }] }`
- `GET /api/weather/current?lat={lat}&lon={lon}&name={name}` - Current weather
  - Returns: `{ location, current: { temp, condition, isDay, description } }`
- `GET /api/weather/forecast?lat={lat}&lon={lon}` - 7-day forecast
  - Returns: `{ forecast: [{ date, dayName, condition, temp, description }] }`

**Weather Code Mapping:**
- WMO weather codes are mapped to conditions: clear, partly-cloudy, cloudy, rain, storm, snow, fog

### External APIs

**Open-Meteo API (Free, No API Key Required):**
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
  - Filters results to `country_code === 'AU'` for Australian locations
- Weather: `https://api.open-meteo.com/v1/forecast`
  - Current conditions: temperature_2m, weather_code, is_day
  - Daily forecast: weather_code, temperature_2m_max

### File Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── weather-icon.tsx    # Pixel art icon component
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── hooks/
│   │   │   └── use-weather.tsx     # Weather data hook
│   │   ├── lib/
│   │   │   └── weather-data.ts     # Weather types and conditions
│   │   └── pages/
│   │       └── home.tsx            # Main page
│   └── index.html                  # HTML template with meta tags
├── server/
│   ├── routes.ts                   # API endpoints
│   └── index.ts                    # Express server setup
├── attached_assets/
│   └── image_1764585934042.png     # Pixel art icon sprite sheet
└── replit.md                       # This documentation
```

## Recent Changes (V1.0)

1. **Suburb Search** - Users can now search for any Australian suburb using Open-Meteo geocoding
2. **Real Weather Data** - Switched from mock data to live Open-Meteo API
3. **7-Day Forecast** - Real forecast data with accurate day names
4. **Pixel Art Icons** - Custom sprite sheet with transparent backgrounds
5. **Compact Layout** - Reduced vertical spacing throughout the UI
6. **App Branding** - Updated title and meta tags to "Better than BoM"

## Deployment

The app is ready for publishing via Replit Deployments. To connect a custom domain (e.g., GoDaddy):
1. Publish the app on Replit
2. Go to Publishing → Settings → Link a domain
3. Copy the A record and TXT record values
4. Add these DNS records in your domain registrar
5. Wait for verification (up to 48 hours)

## Known Limitations

- Timezone is hardcoded to Australia/Sydney (could be improved to use location-specific timezone)
- No offline caching of weather data
- Search requires minimum 2 characters

## Dependencies

**Core:**
- React, TypeScript, Vite, Express.js, Tailwind CSS v4

**UI:**
- shadcn/ui, Radix UI, Framer Motion, Lucide Icons

**Utilities:**
- date-fns, clsx, class-variance-authority, zod
