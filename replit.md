# Better than BoM - Weather Application

## Version 2.0

**Release Date:** April 15, 2026

## Overview

Better than BoM is an Australian weather application that provides current weather conditions and a 7-day forecast using visual, contextual imagery instead of numerical data. The application focuses on making weather information intuitive by displaying what users should wear (umbrella, jumper, t-shirt, hat, coat) rather than raw temperature and precipitation values.

**Key Features:**
- Search any Australian suburb or postcode
- Real-time weather data from Open-Meteo API
- Pixel-art outfit icons based on temperature and weather conditions
- 7-day forecast with daily min/max temperatures and outfit recommendations
- Favorite locations saved in browser for quick access
- Remembers last viewed location across page reloads
- Soft Bento grid layout with warm earth-tone palette
- Wind speed and humidity display
- Data source disclaimer (not affiliated with BoM)

## User Preferences

- Preferred communication style: Simple, everyday language
- Design preference: Soft Bento grid, warm earthy tones
- Font: Nunito (Google Fonts), applied globally, bold weights
- Header style: "Better Than BoM ." with warm brown (#8A7D71) and terracotta dot (#D08B5B)
- Background: Solid warm off-white (#F4F1ED)
- Layout: 2-column bento grid, 420px max width, rounded 32px cards with subtle shadows and hover lift
- Colour palette: Peach gradient (#FEE9D7→#F8D8C2), sage green (#E4F1EE), dusty pink (#F8E1E7), warm whites

## Outfit Icon Logic

The app displays different pixel-art icons based on weather conditions. Temperature is rounded before comparison so the icon matches the displayed value.

| Icon | Condition |
|------|-----------|
| Umbrella (rainbow) | Rain or storm (takes priority over temperature) |
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
- Lucide Icons for forecast weather condition icons
- Custom pixel-art weather icons for outfit recommendations (sprite sheet: `attached_assets/image_1764585934042.png`)

**Key Components:**
- `client/src/pages/home.tsx` - Main weather display page (Soft Bento grid layout)
- `client/src/components/weather-icon.tsx` - Pixel art icon renderer (sprite sheet based)
- `client/src/hooks/use-weather.tsx` - Weather data fetching hook + last-location persistence
- `client/src/hooks/use-favorites.tsx` - Favorites management hook (localStorage)

**State Management:**
- Custom React hooks for weather data and location search
- Favorites persisted in browser localStorage (`btb-favorite-locations` key)
- Last viewed location persisted in browser localStorage (`btb-last-location` key)
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
  - Returns: `{ location, current: { temp, condition, isDay, description, windSpeed, humidity } }`
- `GET /api/weather/forecast?lat={lat}&lon={lon}` - 7-day forecast
  - Returns: `{ forecast: [{ date, dayName, condition, temp, tempMin, description }] }`

**Weather Code Mapping:**
- WMO weather codes are mapped to conditions: clear, partly-cloudy, cloudy, rain, storm, snow, fog

### External APIs

**Open-Meteo API (Free, No API Key Required):**
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
  - Filters results to `country_code === 'AU'` for Australian locations
- Weather: `https://api.open-meteo.com/v1/forecast`
  - Current conditions: temperature_2m, weather_code, is_day, wind_speed_10m, relative_humidity_2m
  - Daily forecast: weather_code, temperature_2m_max, temperature_2m_min

### File Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── weather-icon.tsx    # Pixel art icon component
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── hooks/
│   │   │   ├── use-weather.tsx     # Weather data hook + last-location persistence
│   │   │   └── use-favorites.tsx   # Favorites localStorage hook
│   │   ├── lib/
│   │   │   └── weather-data.ts     # Weather types and conditions
│   │   └── pages/
│   │       └── home.tsx            # Main page (Soft Bento layout)
│   └── index.html                  # HTML template with meta tags
├── server/
│   ├── routes.ts                   # API endpoints
│   └── index.ts                    # Express server setup
├── attached_assets/
│   └── image_1764585934042.png     # Pixel art icon sprite sheet
└── replit.md                       # This documentation
```

## Recent Changes

### V2.0 (April 15, 2026)
1. **Soft Bento Redesign** - Complete UI overhaul to Soft Bento grid layout with warm earth-tone palette, Nunito font, and rounded 32px cards
2. **Wind & Humidity** - Added wind speed (km/h) and humidity (%) to current weather display via Open-Meteo API
3. **Lucide Weather Icons** - Forecast now uses Lucide icons for weather conditions; pixel-art sprites remain for outfit recommendation
4. **Removed Animated Background** - Replaced dynamic weather background with clean solid off-white (#F4F1ED)
5. **Last Viewed Location** - App remembers and restores the most recently viewed location on page load (falls back to Melbourne for first-time visitors)
6. **Icon Logic Fix** - Temperature is now rounded before range comparison, and cascading ranges eliminate gaps that caused incorrect icon display at boundary values (e.g. 19.5°C)

### V1.3 (March 9, 2026)
1. **Progressive Web App (PWA)** - Installable on Android and iOS via "Add to Home Screen", offline caching, standalone mode
2. **Dr Seuss Header Theme** - Whimsical Comic Sans font with dual-color text shadow
3. **Centre-Aligned Layout** - All components centred on screen

### V1.2 (March 9, 2026)
1. **Dynamic Animated Backgrounds** - Weather-responsive gradients with particle effects (rain, clouds, sun rays, snow, fog, frost, storm flash)
2. **Favorite Locations** - Save locations with star button, quick-access favorites bar below search
3. **Min/Max Temperatures** - Forecast now shows both daily minimum and maximum temperatures
4. **Data Source Disclaimer** - Help modal explains data comes from Open-Meteo, not BoM

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
