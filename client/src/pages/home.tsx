import { useState, useEffect, useRef } from "react";
import { useWeather, LocationResult } from "@/hooks/use-weather";
import { WeatherIcon } from "@/components/weather-icon";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, MapPin, Loader2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { WeatherCondition } from "@/lib/weather-data";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data, isLoading, searchResults, isSearching, searchLocations, selectLocation } = useWeather();
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

  const getBackgroundClass = (condition?: WeatherCondition, temp?: number) => {
    if (!condition) return "from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-950";

    if (temp !== undefined) {
       if (temp < 10) return "from-stone-200 to-stone-100 dark:from-stone-900 dark:to-stone-950";
       if (temp > 28) return "from-amber-100 to-orange-50 dark:from-amber-900/40 dark:to-orange-950/40";
    }

    switch (condition) {
      case "clear":
        return "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30";
      case "partly-cloudy":
        return "from-sky-50 to-white dark:from-sky-950/30 dark:to-slate-950/30";
      case "cloudy":
        return "from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800";
      case "rain":
        return "from-blue-50 to-slate-100 dark:from-blue-950/30 dark:to-slate-900";
      case "storm":
        return "from-purple-50 to-slate-200 dark:from-purple-950/30 dark:to-slate-900";
      case "snow":
        return "from-cyan-50 to-white dark:from-cyan-950/30 dark:to-slate-950";
      case "wind":
        return "from-teal-50 to-slate-100 dark:from-teal-950/30 dark:to-slate-900";
      default:
        return "from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-950";
    }
  };

  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-1000 bg-gradient-to-br",
      getBackgroundClass(data?.current.condition, data?.current.temp)
    )}>
      <div className="w-full max-w-md flex flex-col h-full max-h-[900px] gap-2">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2"
        >
          <h1 className="text-3xl md:text-4xl font-bold"
            style={{
              color: '#001a4d',
              fontFamily: '"MS DOS", "Perfect DOS VGA 437", "Courier New", monospace',
              letterSpacing: '0.15em',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            Better Than BoM
          </h1>
        </motion.div>
        
        {/* Header with Icons Button */}
        <div className="flex justify-end">
          <button
            data-testid="button-icons-legend"
            onClick={() => setShowLegend(true)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search Bar */}
        <motion.div 
          ref={searchRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full z-20"
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

        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] relative">
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
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium tracking-wide uppercase">Current Location</span>
                  </div>
                  <h1 data-testid="text-location" className="text-4xl md:text-5xl text-foreground tracking-tight font-bold">
                    {data.location.split(',')[0]}
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    {format(new Date(), "EEEE, d MMMM")}
                  </p>
                </motion.div>

                {/* Main Icon - The Hero */}
                <div className="relative mb-2 flex flex-col items-center">
                   <div className={cn(
                     "absolute inset-0 blur-3xl opacity-40 rounded-full scale-150 transition-colors duration-1000",
                     data.current.condition === 'clear' ? "bg-amber-300" :
                     data.current.condition === 'rain' ? "bg-blue-300" :
                     "bg-slate-300"
                   )} />
                   
                   <div className="relative z-10">
                     <WeatherIcon 
                       condition={data.current.condition} 
                       temp={data.current.temp}
                       size={240} 
                       className="drop-shadow-2xl filter"
                     />
                   </div>
                   
                   {/* Current Temperature */}
                   {data.current.temp !== undefined && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 }}
                       className="mt-1 relative z-10"
                     >
                       <span data-testid="text-temperature" className="text-6xl md:text-7xl font-heading font-bold text-foreground tracking-tighter">
                         {Math.round(data.current.temp)}°
                       </span>
                     </motion.div>
                   )}

                   <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-1 text-3xl font-heading font-medium text-muted-foreground relative z-10"
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
              className="w-full bg-white/30 backdrop-blur-xl rounded-3xl p-3 shadow-lg border border-white/40"
            >
              <div className="grid grid-cols-7 gap-2">
                {data.forecast.map((day, i) => (
                  <div key={day.date} className="flex flex-col items-center gap-1 group cursor-default">
                    <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {day.dayName.slice(0, 3)}
                    </span>
                    <div className="flex flex-col items-center gap-0 flex-1 justify-center min-h-[50px]">
                      <div className="p-2 rounded-xl group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300 h-[44px] flex items-center justify-center">
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
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-white/40">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">What Do These Icons Mean?</DialogTitle>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
