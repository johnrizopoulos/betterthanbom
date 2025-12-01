# Better than BoM - Weather Application

## Overview

Better than BoM is an Australian weather application that provides current weather conditions and a 7-day forecast using visual, contextual imagery instead of numerical data. The application focuses on making weather information intuitive by displaying what users should wear (umbrella, jumper, t-shirt, hat, coat) rather than raw temperature and precipitation values. Built as a single-page application, it fetches weather data from Open-Meteo API and presents it through a clean, modern interface with pixel-art style weather icons.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript using Vite as the build tool and development server
- Single-page application (SPA) architecture using Wouter for client-side routing
- Hot Module Replacement (HMR) enabled for development workflow

**UI Component System:**
- shadcn/ui component library with Radix UI primitives for accessible components
- Tailwind CSS v4 for styling with custom theme configuration
- Framer Motion for animations and transitions
- Custom weather icon system using sprite sheets with pixel-art styling

**State Management:**
- TanStack Query (React Query) for server state management and API caching
- Custom React hooks for weather data fetching and location handling
- Local state management using React hooks (useState, useEffect)

**Design Decisions:**
- Chose visual/iconographic representation over numerical weather data to improve user experience
- Temperature-based and condition-based logic determines which outfit icon to display (umbrella for rain, coat for cold, t-shirt for hot, etc.)
- Responsive design with mobile-first approach using Tailwind breakpoints
- Dynamic background gradients that change based on weather conditions

### Backend Architecture

**Server Framework:**
- Express.js running on Node.js with TypeScript
- HTTP server created using Node's native `http` module
- Development mode uses Vite middleware for seamless frontend integration
- Production mode serves static files from the `dist/public` directory

**API Design:**
- RESTful API endpoints for weather data:
  - `/api/weather/current` - Current weather conditions for a location
  - `/api/weather/forecast` - 7-day forecast data
- Query parameter-based location lookup (e.g., `?location=melbourne`)
- Simple location mapping to coordinates for Australian cities (Melbourne, Sydney, Brisbane, Hobart)

**Build Process:**
- esbuild bundles server code with selective dependency bundling (allowlist strategy)
- Vite builds client application separately
- Server dependencies are externalized except for frequently-used packages to optimize cold start times

### Data Storage Solutions

**User Management:**
- In-memory storage implementation (`MemStorage` class) for user data
- Schema defined using Drizzle ORM with PostgreSQL dialect
- User model includes: id, username, password fields
- Database configuration points to PostgreSQL via `DATABASE_URL` environment variable

**Design Note:**
- Current implementation uses in-memory storage as a placeholder
- Schema is prepared for PostgreSQL database (via Drizzle ORM)
- Production deployment would require connecting to actual PostgreSQL database (e.g., Neon serverless)

### Authentication and Authorization

**Current State:**
- User schema and storage interface exist but authentication is not actively implemented in routes
- Passport.js and related session management dependencies are installed but not configured
- Session management infrastructure prepared (connect-pg-simple, express-session, memorystore)

**Intended Design:**
- Local authentication strategy with username/password
- Session-based authentication using PostgreSQL session store
- User credentials would be validated against database

## External Dependencies

### Third-Party APIs

**Weather Data Provider:**
- **Open-Meteo API** - Free weather API service (no API key required)
- Provides current weather conditions and forecast data
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Returns temperature, weather codes, day/night indicators
- Timezone-aware responses for Australian locations

**API Integration Strategy:**
- Server-side API calls to avoid CORS issues and protect against client-side rate limiting
- Location-to-coordinates mapping for Australian cities
- Weather code interpretation to determine display conditions

### Database Services

**Neon Serverless PostgreSQL:**
- `@neondatabase/serverless` package for database connectivity
- Configured via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe database operations and schema management
- Migration files stored in `./migrations` directory

### UI Component Libraries

**Radix UI Primitives:**
- Comprehensive set of unstyled, accessible UI components
- Includes: Dialog, Dropdown Menu, Popover, Select, Tabs, Toast, Tooltip, and many more
- Foundation for shadcn/ui component system

**shadcn/ui:**
- Pre-built components using Radix UI + Tailwind CSS
- "New York" style variant selected
- Component aliases configured for clean imports (@/components, @/ui, @/lib)

### Styling & Animation

**Tailwind CSS:**
- v4 with Vite plugin integration
- Custom theme configuration with color variables
- CSS custom properties for dynamic theming
- Utility-first approach with component composition

**Framer Motion:**
- Animation library for React components
- Used for weather icon animations and page transitions
- Spring-based physics for natural motion

### Development Tools

**Replit Plugins:**
- `@replit/vite-plugin-runtime-error-modal` - Enhanced error reporting in development
- `@replit/vite-plugin-cartographer` - Development tooling integration
- `@replit/vite-plugin-dev-banner` - Development environment indicator
- Custom `vite-plugin-meta-images` - OpenGraph image meta tag updates for deployment

### Form Handling & Validation

**React Hook Form:**
- Form state management with `@hookform/resolvers` for validation
- Integration with Zod for schema validation via `drizzle-zod`

**Zod:**
- TypeScript-first schema validation
- Used for API request validation and form inputs
- Integration with Drizzle ORM for database schema validation

### Utility Libraries

- **date-fns** - Date manipulation and formatting
- **clsx** & **class-variance-authority** - Conditional className composition
- **nanoid** - Unique ID generation
- **uuid** - UUID generation for user IDs