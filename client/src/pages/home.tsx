import { useState, useEffect, useRef } from "react";
import { useWeather, LocationResult } from "@/hooks/use-weather";
import { useFavorites } from "@/hooks/use-favorites";
import { WeatherIcon } from "@/components/weather-icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  Loader2,
  HelpCircle,
  Star,
  X,
  Cloud,
  Sun,
  CloudRain,
  CloudSun,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { WeatherCondition } from "@/lib/weather-data";

function getConditionIcon(condition: WeatherCondition) {
  switch (condition) {
    case "clear": return Sun;
    case "partly-cloudy": return CloudSun;
    case "cloudy": return Cloud;
    case "rain": return CloudRain;
    case "storm": return CloudLightning;
    case "snow": return CloudSnow;
    case "fog": return CloudFog;
    case "wind": return Wind;
    default: return Cloud;
  }
}

function getOutfitLabel(condition: WeatherCondition, temp?: number): string {
  if (["rain", "storm", "hail", "drizzle"].includes(condition)) return "Umbrella weather";
  if (temp !== undefined) {
    const rounded = Math.round(temp);
    if (rounded > 28) return "Hat & sunscreen";
    if (rounded >= 20) return "T-shirt weather";
    if (rounded >= 10) return "Jumper weather";
    return "Rug up!";
  }
  return "T-shirt weather";
}

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

  const locationName = data?.location?.split(",")[0] || "Melbourne";
  const todayDate = format(new Date(), "d MMM");
  const todayDay = format(new Date(), "EEEE");

  return (
    <div className="min-h-dvh bg-[#F4F1ED] text-[#4A443E] p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto">
      <div className="w-full max-w-[420px] space-y-4">

        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-between items-center px-1">
            <h1 data-testid="text-app-title" className="text-xl font-black text-[#8A7D71] tracking-tight">
              Better Than BoM <span className="text-[#D08B5B]">.</span>
            </h1>
            <button
              data-testid="button-icons-legend"
              onClick={() => setShowLegend(true)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <HelpCircle className="w-5 h-5 text-[#8A7D71]" />
            </button>
          </div>

          <div ref={searchRef} className="relative flex items-center gap-3">
            <div className="flex-1 bg-white bento-card flex items-center px-5 py-4 h-14 rounded-[28px]">
              <Search className="w-5 h-5 text-[#BBAFA0] mr-3 flex-shrink-0" />
              <input
                data-testid="input-search"
                type="text"
                placeholder="Search suburb..."
                className="bg-transparent border-none outline-none w-full text-[16px] font-bold text-[#4A443E] placeholder:text-[#C5BDB2]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {isSearching && (
                <Loader2 className="w-4 h-4 text-[#BBAFA0] animate-spin flex-shrink-0" />
              )}
            </div>

            <AnimatePresence>
              {showDropdown && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-[#E8E2D9] overflow-hidden z-30"
                >
                  {searchResults.map((location) => (
                    <button
                      key={location.id}
                      data-testid={`button-location-${location.id}`}
                      onClick={() => handleSelectLocation(location)}
                      className="w-full px-4 py-3 text-left hover:bg-[#F9F8F6] transition-colors flex items-center gap-3 border-b border-[#F4F1ED] last:border-b-0"
                    >
                      <MapPin className="h-4 w-4 text-[#BBAFA0] flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[#4A443E]">{location.name}</p>
                        <p className="text-sm text-[#A0AABF]">{location.state}</p>
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
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-[#E8E2D9] p-4 text-center text-[#A0AABF] z-30"
                >
                  No locations found
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            data-testid="button-saved-label"
            className="flex-shrink-0 bg-[#E8E2D9] text-[#7A7165] font-bold px-5 py-3 rounded-2xl flex items-center gap-2 text-sm"
          >
            <Star className="w-4 h-4 fill-current" />
            Saved
          </button>
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className={cn(
                "flex-shrink-0 flex items-center group",
                currentLocation?.id === fav.id
                  ? "bg-[#D08B5B] text-white"
                  : "bg-white text-[#6A6158]"
              )}
              style={{ borderRadius: 16 }}
            >
              <button
                data-testid={`button-favorite-${fav.id}`}
                onClick={() => selectLocation(fav)}
                className="bento-card rounded-2xl px-5 py-3 text-sm font-bold"
              >
                {fav.name}
              </button>
              <button
                data-testid={`button-remove-favorite-${fav.id}`}
                onClick={() => removeFavorite(fav.id)}
                className="pr-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="w-12 h-12 border-4 border-[#D08B5B]/20 border-t-[#D08B5B] rounded-full animate-spin" />
              <p className="text-[#8A7D71] animate-pulse font-bold">Loading weather...</p>
            </div>
          ) : data ? (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="col-span-2 bento-card p-6 relative overflow-hidden group" style={{ background: "linear-gradient(135deg, #FEE9D7 0%, #F8D8C2 100%)" }}>
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/30 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#FFC59E]/40 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-110" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 opacity-80">
                      <MapPin className="w-4 h-4 text-[#A85B28]" />
                      <span className="text-sm font-bold text-[#A85B28] uppercase tracking-wider">Current Location</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h2 data-testid="text-location" className="text-4xl font-black tracking-tighter text-[#5C341A]">
                        {locationName}
                      </h2>
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
                          className="p-1.5 rounded-full hover:bg-white/40 transition-colors"
                        >
                          <Star
                            className={cn(
                              "h-5 w-5 transition-colors",
                              isFavorite(currentLocation.id)
                                ? "fill-amber-400 text-amber-400"
                                : "text-[#A85B28]/50 hover:text-amber-400"
                            )}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="text-lg font-black bg-white/60 px-4 py-1.5 rounded-2xl inline-block text-[#A85B28] backdrop-blur-sm">
                      {todayDate}
                    </div>
                    <div className="text-sm font-bold text-[#B06A3B] mt-2 mr-1">{todayDay}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#E4F1EE] bento-card p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-xl group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex items-center justify-between">
                  {(() => {
                    const CondIcon = getConditionIcon(data.current.condition as WeatherCondition);
                    return <CondIcon className="w-10 h-10 text-[#52877B] fill-[#52877B]/20" />;
                  })()}
                  <div className="text-[11px] font-bold text-[#52877B] uppercase tracking-wider bg-white/40 px-3 py-1 rounded-xl">
                    {data.current.description}
                  </div>
                </div>
                <div className="relative z-10 mt-4">
                  <div data-testid="text-temperature" className="text-6xl font-black text-[#264A42] tracking-tighter -ml-1">
                    {Math.round(data.current.temp)}<span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>°</span>
                  </div>
                  <div className="text-sm font-bold text-[#52877B] mt-1">
                    {data.current.description}
                  </div>
                </div>
              </div>

              <div className="bg-[#F8E1E7] bento-card p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/40 rounded-full translate-x-1/3 translate-y-1/3 blur-xl group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex justify-between items-center">
                  <div className="text-[11px] font-bold text-[#C97B8F] uppercase tracking-wider bg-white/50 px-3 py-1 rounded-xl backdrop-blur-sm">
                    Wear this
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center relative z-10 my-2">
                  <div className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 ease-out cursor-default drop-shadow-lg" style={{ width: 100, height: 100 }}>
                    <WeatherIcon
                      condition={data.current.condition}
                      temp={data.current.temp}
                      size="auto"
                      animate={false}
                    />
                  </div>
                </div>
                <div className="relative z-10 text-sm font-black text-[#B05B72] text-center">
                  {getOutfitLabel(data.current.condition as WeatherCondition, data.current.temp)}
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white bento-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F4FF] flex items-center justify-center text-[#6B8AF0] flex-shrink-0">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#A0AABF] uppercase tracking-wider">Wind</div>
                    <div className="text-xl font-black text-[#4A443E]">
                      {data.current.windSpeed ?? "—"} <span className="text-sm text-[#A0AABF] font-bold">km/h</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white bento-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F8FF] flex items-center justify-center text-[#6BB0F0] flex-shrink-0">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#A0AABF] uppercase tracking-wider">Humidity</div>
                    <div className="text-xl font-black text-[#4A443E]">
                      {data.current.humidity ?? "—"}<span className="text-sm text-[#A0AABF] font-bold">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 bg-white bento-card p-6">
                <div className="flex justify-between items-center mb-6 px-1">
                  <h2 className="text-sm font-black text-[#A0AABF] uppercase tracking-widest">7-Day Forecast</h2>
                </div>
                <div className="space-y-1">
                  {data.forecast.map((day, i) => {
                    const Icon = getConditionIcon(day.condition as WeatherCondition);
                    const isToday = i === 0;
                    return (
                      <div
                        key={day.date}
                        data-testid={`row-forecast-${i}`}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-2xl transition-colors",
                          isToday ? "bg-[#F4F1ED]" : "hover:bg-[#F9F8F6]"
                        )}
                      >
                        <div className="w-16 font-extrabold text-[#4A443E] text-[15px]">
                          {isToday ? "Today" : day.dayName.slice(0, 3)}
                        </div>
                        <div className="flex-1 flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isToday && "bg-white shadow-sm")}>
                            <Icon className={cn("w-5 h-5", isToday ? "text-[#52877B]" : "text-[#A0AABF]")} />
                          </div>
                          <span className="text-sm font-bold text-[#A0AABF] hidden sm:inline-block">
                            {day.description}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 w-24 justify-end">
                          <span className="font-black text-[15px] text-[#4A443E]">
                            {day.temp}<span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>°</span>
                          </span>
                          <span className="font-bold text-[15px] text-[#C5BDB2]">
                            {day.tempMin}<span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>°</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
      </div>

      <Dialog open={showLegend} onOpenChange={setShowLegend}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-[#E8E2D9] max-h-[85vh] mx-4 flex flex-col rounded-3xl">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-2xl font-black text-[#4A443E]">What Do These Icons Mean?</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 min-h-0">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <div className="p-3 rounded-2xl bg-[#E4F1EE] flex items-center justify-center min-w-[60px] h-[60px]">
                  <WeatherIcon condition="rain" temp={15} size={44} animate={false} />
                </div>
                <div>
                  <h3 className="font-black text-[#4A443E]">Umbrella</h3>
                  <p className="text-sm text-[#8A7D71]">Rainy or stormy weather – bring an umbrella!</p>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <div className="p-3 rounded-2xl bg-[#F8E1E7] flex items-center justify-center min-w-[60px] h-[60px]">
                  <WeatherIcon condition="partly-cloudy" temp={15} size={44} animate={false} />
                </div>
                <div>
                  <h3 className="font-black text-[#4A443E]">Jumper</h3>
                  <p className="text-sm text-[#8A7D71]">Cool weather (10–19<span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>°</span>C) – wear a sweater or light jacket</p>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <div className="p-3 rounded-2xl bg-[#E4F1EE] flex items-center justify-center min-w-[60px] h-[60px]">
                  <WeatherIcon condition="clear" temp={23} size={44} animate={false} />
                </div>
                <div>
                  <h3 className="font-black text-[#4A443E]">T-Shirt</h3>
                  <p className="text-sm text-[#8A7D71]">Warm weather (20–27<span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>°</span>C) – light, short sleeves are perfect</p>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <div className="p-3 rounded-2xl bg-[#FEE9D7] flex items-center justify-center min-w-[60px] h-[60px]">
                  <WeatherIcon condition="clear" temp={30} size={44} animate={false} />
                </div>
                <div>
                  <h3 className="font-black text-[#4A443E]">Hat</h3>
                  <p className="text-sm text-[#8A7D71]">Hot weather (&gt;28<span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>°</span>C) – wear a hat and sunscreen</p>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                <div className="p-3 rounded-2xl bg-[#E8E2D9] flex items-center justify-center min-w-[60px] h-[60px]">
                  <WeatherIcon condition="snow" temp={5} size={44} animate={false} />
                </div>
                <div>
                  <h3 className="font-black text-[#4A443E]">Coat</h3>
                  <p className="text-sm text-[#8A7D71]">Cold weather (&lt;10<span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>°</span>C) – bundle up! Winter coat recommended</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#A0AABF] mt-2 pt-3 border-t border-[#E8E2D9]">
              Weather data sourced from Open-Meteo. This app is not affiliated with or sourced from the Bureau of Meteorology (bom.gov.au). Temperatures and conditions may vary slightly from BoM forecasts.
            </p>
            <div className="mt-3 pt-3 border-t border-[#E8E2D9]">
              <h3 className="font-black text-sm text-[#4A443E] mb-2">Install on Your Phone</h3>
              <div className="space-y-2 text-xs text-[#8A7D71]">
                <div>
                  <p className="font-bold text-[#6A6158]">Android (Chrome):</p>
                  <p>Tap the menu (three dots) at the top right, then tap "Add to Home Screen" or "Install App".</p>
                </div>
                <div>
                  <p className="font-bold text-[#6A6158]">iPhone (Safari):</p>
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
