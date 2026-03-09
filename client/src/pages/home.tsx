import { useState, useEffect, useRef } from "react";
import { useWeather, LocationResult } from "@/hooks/use-weather";
import { useFavorites } from "@/hooks/use-favorites";
import { WeatherBackground } from "@/components/weather-background";
import { WeatherIcon } from "@/components/weather-icon";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, MapPin, Loader2, HelpCircle, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data, isLoading, searchResults, isSearching, searchLocations, selectLocation, currentLocation } = useWeather();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.length >= 2) {
        searchLocations(inputValue);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, searchLocations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLocation = (location: LocationResult) => {
    setInputValue("");
    setShowDropdown(false);
    selectLocation(location);
  };

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <WeatherBackground condition={data?.current.condition} temp={data?.current.temp} />
      <div className="w-full max-w-md flex flex-col items-center h-full gap-3 relative z-10">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-1"
        >
          <h1 className="font-bold text-[#3737B3] whitespace-nowrap"
            style={{
              fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive',
              letterSpacing: '0.02em',
              fontWeight: 900,
              lineHeight: 1,
              fontSize: 'clamp(28px, 8vw, 55px)',
              fontStyle: 'italic',
              textShadow: '2px 2px 0px #ff6b6b, -1px -1px 0px #4ecdc4',
            }}
          >
            Better Than BoM
          </h1>
        </motion.div>
        
        {/* Search Bar with Help Button */}
        <div className="flex items-center gap-2 w-full justify-center">
          <motion.div 
            ref={searchRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex-1 z-20"
          >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input 
              data-testid="input-search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search any Australian suburb..." 
              className="pl-10 pr-10 h-12 rounded-full bg-white/40 border-white/40 shadow-sm hover:bg-white/60 focus:bg-white/80 backdrop-blur-md transition-all duration-300 text-base placeholder:text-muted-foreground/70"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
            )}
          </div>
          
          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showDropdown && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 overflow-hidden"
              >
                {searchResults.map((location) => (
                  <button
                    key={location.id}
                    data-testid={`button-location-${location.id}`}
                    onClick={() => handleSelectLocation(location)}
                    className="w-full px-4 py-3 text-left hover:bg-white/60 transition-colors flex items-center gap-3 border-b border-white/20 last:border-b-0"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.state}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
            {showDropdown && inputValue.length >= 2 && !isSearching && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 p-4 text-center text-muted-foreground"
              >
                No locations found
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

          {/* Help Button */}
          <button
            data-testid="button-icons-legend"
            onClick={() => setShowLegend(true)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>

        {/* Favorites Bar */}
        {favorites.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap justify-center w-full">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className={cn(
                  "group flex items-center gap-1 rounded-full text-xs font-medium transition-all duration-200 border",
                  currentLocation?.id === fav.id
                    ? "bg-foreground/10 border-foreground/20 text-foreground"
                    : "bg-white/30 border-white/40 text-muted-foreground hover:bg-white/50"
                )}
              >
                <button
                  data-testid={`button-favorite-${fav.id}`}
                  onClick={() => selectLocation(fav)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full"
                >
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{fav.name}</span>
                </button>
                <button
                  data-testid={`button-remove-favorite-${fav.id}`}
                  onClick={() => removeFavorite(fav.id)}
                  className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative w-full">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground animate-pulse font-medium">Loading weather...</p>
              </motion.div>
            ) : data ? (
              <motion.div
                key="weather"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center w-full"
              >
                {/* Location Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-2 space-y-0"
                >
                  <div className="flex items-center justify-center gap-2">
                    <h1 data-testid="text-location" className="text-foreground tracking-tight font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
                      {data.location.split(',')[0]}
                    </h1>
                    {currentLocation && (
                      <button
                        data-testid="button-toggle-favorite"
                        onClick={() => {
                          if (isFavorite(currentLocation.id)) {
                            removeFavorite(currentLocation.id);
                          } else {
                            addFavorite(currentLocation);
                          }
                        }}
                        className="p-1.5 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Star
                          className={cn(
                            "h-5 w-5 transition-colors",
                            isFavorite(currentLocation.id)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground hover:text-amber-400"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  <p className="text-muted-foreground font-medium" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)' }}>
                    {format(new Date(), "EEEE, d MMMM")}
                  </p>
                </motion.div>

                {/* Main Icon - The Hero */}
                <div className="relative flex flex-col items-center" style={{ marginBottom: 'clamp(0px, 1vh, 8px)' }}>
                   
                   <div className="relative z-10" style={{ width: 'clamp(120px, 28vh, 240px)', height: 'clamp(120px, 28vh, 240px)' }}>
                     <WeatherIcon 
                       condition={data.current.condition} 
                       temp={data.current.temp}
                       size="auto"
                       className="drop-shadow-2xl filter w-full h-full"
                     />
                   </div>
                   
                   {data.current.temp !== undefined && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 }}
                       className="relative z-10"
                     >
                       <span data-testid="text-temperature" className="font-heading font-bold text-foreground tracking-tighter" style={{ fontSize: 'clamp(2.5rem, 8vh, 4.5rem)' }}>
                         {Math.round(data.current.temp)}°
                       </span>
                     </motion.div>
                   )}

                   <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-heading font-medium text-muted-foreground relative z-10"
                    style={{ fontSize: 'clamp(1.2rem, 3.5vh, 1.875rem)' }}
                   >
                     {data.current.description}
                   </motion.p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Forecast Row */}
        <AnimatePresence>
          {!isLoading && data && data.forecast && data.forecast.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full bg-white/30 backdrop-blur-xl rounded-3xl p-2 shadow-lg border border-white/40 flex-shrink-0"
            >
              <div className="grid grid-cols-7 gap-1">
                {data.forecast.map((day, i) => (
                  <div key={day.date} className="flex flex-col items-center gap-0.5 group cursor-default">
                    <span className="text-[9px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {day.dayName.slice(0, 3)}
                    </span>
                    <div className="flex flex-col items-center gap-0 flex-1 justify-center">
                      <div className="p-1 rounded-xl group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300 h-[36px] flex items-center justify-center">
                        <WeatherIcon 
                          condition={day.condition} 
                          temp={day.temp}
                          size={28} 
                          animate={false} 
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground/80">
                        {day.temp}°
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {day.tempMin}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Icons Legend Modal */}
      <Dialog open={showLegend} onOpenChange={setShowLegend}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-white/40 max-h-[85vh] mx-4 flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-2xl font-bold">What Do These Icons Mean?</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 min-h-0">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-w-[60px] h-[60px]">
                <WeatherIcon condition="rain" temp={15} size={44} animate={false} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Umbrella</h3>
                <p className="text-sm text-muted-foreground">Rainy or stormy weather – bring an umbrella!</p>
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              <div className="p-3 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center min-w-[60px] h-[60px]">
                <WeatherIcon condition="partly-cloudy" temp={15} size={44} animate={false} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Jumper</h3>
                <p className="text-sm text-muted-foreground">Cool weather (10–19°C) – wear a sweater or light jacket</p>
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 flex items-center justify-center min-w-[60px] h-[60px]">
                <WeatherIcon condition="clear" temp={23} size={44} animate={false} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">T-Shirt</h3>
                <p className="text-sm text-muted-foreground">Warm weather (20–27°C) – light, short sleeves are perfect</p>
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              <div className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center min-w-[60px] h-[60px]">
                <WeatherIcon condition="clear" temp={30} size={44} animate={false} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Hat</h3>
                <p className="text-sm text-muted-foreground">Hot weather (&gt;28°C) – wear a hat and sunscreen</p>
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              <div className="p-3 rounded-lg bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center min-w-[60px] h-[60px]">
                <WeatherIcon condition="snow" temp={5} size={44} animate={false} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Coat</h3>
                <p className="text-sm text-muted-foreground">Cold weather (&lt;10°C) – bundle up! Winter coat recommended</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 pt-3 border-t border-border/40">
            Weather data sourced from Open-Meteo. This app is not affiliated with or sourced from the Bureau of Meteorology (bom.gov.au). Temperatures and conditions may vary slightly from BoM forecasts.
          </p>
          <div className="mt-3 pt-3 border-t border-border/40">
            <h3 className="font-bold text-sm text-foreground mb-2">Install on Your Phone</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground/80">Android (Chrome):</p>
                <p>Tap the menu (three dots) at the top right, then tap "Add to Home Screen" or "Install App".</p>
              </div>
              <div>
                <p className="font-semibold text-foreground/80">iPhone (Safari):</p>
                <p>Tap the Share button (square with arrow) at the bottom, scroll down and tap "Add to Home Screen".</p>
              </div>
            </div>
          </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
