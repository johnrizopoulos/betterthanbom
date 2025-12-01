import { useState } from "react";
import { useWeather } from "@/hooks/use-weather";
import { WeatherIcon } from "@/components/weather-icon";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { WeatherCondition } from "@/lib/weather-data";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data, isLoading, searchLocation } = useWeather();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      searchLocation(inputValue);
    }
  };

  const getBackgroundClass = (condition?: WeatherCondition, temp?: number) => {
    if (!condition) return "from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-950";

    // Override background for specific "Feel" based on the new icons
    if (temp !== undefined) {
       if (temp < 10) return "from-stone-200 to-stone-100 dark:from-stone-900 dark:to-stone-950"; // Cozy/Inside
       if (temp > 28) return "from-amber-100 to-orange-50 dark:from-amber-900/40 dark:to-orange-950/40"; // Hot
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
      <div className="w-full max-w-md flex flex-col h-full max-h-[900px] gap-8">
        
        {/* Search Bar */}
        <motion.form 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSearch} 
          className="relative w-full z-10"
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search suburb or postcode..." 
              className="pl-10 h-12 rounded-full bg-white/40 border-white/40 shadow-sm hover:bg-white/60 focus:bg-white/80 backdrop-blur-md transition-all duration-300 text-base placeholder:text-muted-foreground/70"
            />
          </div>
        </motion.form>

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
                <p className="text-muted-foreground animate-pulse font-medium">Locating...</p>
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
                  className="mb-12 space-y-1"
                >
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium tracking-wide uppercase">Current Location</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl text-foreground tracking-tight font-bold">
                    {data.location.split(',')[0]}
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    {format(new Date(), "EEEE, d MMMM")}
                  </p>
                </motion.div>

                {/* Main Icon - The Hero */}
                <div className="relative mb-16">
                   <div className={cn(
                     "absolute inset-0 blur-3xl opacity-40 rounded-full scale-150 transition-colors duration-1000",
                     data.current.condition === 'clear' ? "bg-amber-300" :
                     data.current.condition === 'rain' ? "bg-blue-300" :
                     "bg-slate-300"
                   )} />
                   <WeatherIcon 
                     condition={data.current.condition} 
                     temp={data.current.temp}
                     size={240} 
                     className="drop-shadow-2xl relative z-10 filter"
                   />
                   <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-3xl font-heading font-semibold text-foreground/80"
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
          {!isLoading && data && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40"
            >
              <div className="grid grid-cols-7 gap-2">
                {data.forecast.map((day, i) => (
                  <div key={day.date} className="flex flex-col items-center gap-3 group cursor-default">
                    <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {day.dayName.slice(0, 3)}
                    </span>
                    <div className="p-2 rounded-xl group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300">
                      <WeatherIcon 
                        condition={day.condition} 
                        temp={day.temp}
                        size={28} 
                        animate={false} 
                      />
                    </div>
                    {/* A little dot for today, or decoration */}
                    {i === 0 && (
                      <div className="w-1 h-1 rounded-full bg-primary/50 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
