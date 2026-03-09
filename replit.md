# Better than BoM - Weather Application

## Version 1.2

**Release Date:** March 9, 2026

## Overview

Better than BoM is an Australian weather application that provides current weather conditions and a 7-day forecast using visual, contextual imagery instead of numerical data. The application focuses on making weather information intuitive by displaying what users should wear (umbrella, jumper, t-shirt, hat, coat) rather than raw temperature and precipitation values.

**Key Features:**
- Search any Australian suburb or postcode
- Real-time weather data from Open-Meteo API
- Pixel-art outfit icons based on temperature and weather conditions
- 7-day forecast with daily min/max temperatures and outfit recommendations
- Favorite locations saved in browser for quick access
- Clean, minimal white background design
- Retro 90s computer-style header
- Data source disclaimer (not affiliated with BoM)

## User Preferences

- Preferred communication style: Simple, everyday language
- Design preference: Pixel art aesthetic, 90s computer style
- Header style: Dark blue, monospace font, no shadow effects
- Background: Clean white, no dynamic color changes

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
- `client/src/hooks/use-favorites.tsx` - Favorites management hook (localStorage)

**State Management:**
- Custom React hooks for weather data and location search
- Favorites persisted in browser localStorage (`btb-favorite-locations` key)
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
  - Returns: `{ forecast: [{ date, dayName, condition, temp, tempMin, description }] }`

**Weather Code Mapping:**
- WMO weather codes are mapped to conditions: clear, partly-cloudy, cloudy, rain, storm, snow, fog

### External APIs

**Open-Meteo API (Free, No API Key Required):**
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
  - Filters results to `country_code === 'AU'` for Australian locations
- Weather: `https://api.open-meteo.com/v1/forecast`
  - Current conditions: temperature_2m, weather_code, is_day
  - Daily forecast: weather_code, temperature_2m_max, temperature_2m_min

### File Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── weather-icon.tsx    # Pixel art icon component
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── hooks/
│   │   │   ├── use-weather.tsx     # Weather data hook
│   │   │   └── use-favorites.tsx   # Favorites localStorage hook
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

## Recent Changes

### V1.2 (March 9, 2026)
1. **Favorite Locations** - Save locations with star button, quick-access favorites bar below search
2. **Min/Max Temperatures** - Forecast now shows both daily minimum and maximum temperatures
3. **Data Source Disclaimer** - Help modal explains data comes from Open-Meteo, not BoM

### V1.1 (December 1, 2025)
1. **Header Styling** - "Better Than BoM" title with 90s computer font (dark blue, Courier New monospace)
2. **Icon Legend Modal** - Now displays actual pixel-art WeatherIcon components instead of emoji
3. **Removed "Current Location" Label** - Cleaner UI without redundant text
4. **Help Button Repositioned** - Moved to the right of the search field
5. **Clean Background** - Removed dynamic background color logic, now uses plain white
6. **Improved Spacing** - Increased gap between search field and city name

### V1.0 (December 1, 2025)
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
- Weather data from Open-Meteo may differ slightly from BoM (different weather models)

## Dependencies

**Core:**
- React, TypeScript, Vite, Express.js, Tailwind CSS v4

**UI:**
- shadcn/ui, Radix UI, Framer Motion, Lucide Icons

**Utilities:**
- date-fns, clsx, class-variance-authority, zod
