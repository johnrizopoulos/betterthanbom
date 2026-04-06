import React, { useState } from 'react';
import { Search, MapPin, CloudRain, Sun, Cloud, CloudFog, CloudLightning, Shirt, Umbrella, Wind, Menu, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// --- Mock Data ---
const CURRENT_LOCATION = {
  city: "Melbourne",
  state: "VIC",
  temp: 21,
  condition: "Overcast",
  date: "Tuesday, 24 October",
  high: 22,
  low: 14,
  humidity: 65,
  wind: "14 km/h SSW",
  feelsLike: 20
};

const FORECAST = [
  { day: "Today", icon: Cloud, high: 22, low: 14, condition: "Overcast" },
  { day: "Wed", icon: CloudRain, high: 19, low: 12, condition: "Showers" },
  { day: "Thu", icon: Sun, high: 24, low: 11, condition: "Sunny" },
  { day: "Fri", icon: Cloud, high: 26, low: 15, condition: "Partly Cloudy" },
  { day: "Sat", icon: CloudLightning, high: 21, low: 16, condition: "Storms" },
  { day: "Sun", icon: Sun, high: 28, low: 14, condition: "Sunny" },
  { day: "Mon", icon: CloudRain, high: 18, low: 10, condition: "Rain" }
];

const FAVORITES = ["Sydney", "Brisbane", "Hobart", "Perth"];

// --- Helper Functions ---
function getOutfitRecommendation(temp: number, condition: string) {
  if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm') || condition.toLowerCase().includes('shower')) {
    return { icon: Umbrella, label: "Umbrella", description: "Don't forget your brolly." };
  }
  if (temp < 10) {
    return { icon: Shirt, label: "Heavy Coat", description: "Bundle up, it's freezing." }; // Lucide doesn't have a coat, use shirt/layers conceptually or a custom SVG if needed. Sticking to Lucide.
  }
  if (temp >= 10 && temp < 20) {
    return { icon: Shirt, label: "Jumper", description: "Perfect weather for a sweater." };
  }
  if (temp >= 20 && temp <= 27) {
    return { icon: Shirt, label: "T-Shirt", description: "Comfortable and mild." };
  }
  return { icon: Sun, label: "Sun Hat", description: "Slip, slop, slap." };
}

// --- Component ---
export function GlassMinimal() {
  const [searchQuery, setSearchQuery] = useState("");
  const outfit = getOutfitRecommendation(CURRENT_LOCATION.temp, CURRENT_LOCATION.condition);
  const OutfitIcon = outfit.icon;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e8ecef] p-4 font-sans text-slate-800">
      
      {/* Mobile Device Container */}
      <div className="relative w-full max-w-[420px] h-[850px] max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/40 ring-1 ring-white/60 backdrop-blur-3xl flex flex-col">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/weather-glass-bg.png" 
            alt="Frosted background" 
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-slate-100/60" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Header */}
          <header className="px-6 pt-12 pb-4 flex items-center justify-between">
            <h1 className="text-sm font-medium tracking-widest uppercase text-slate-500/80">Better Than BoM</h1>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20 text-slate-600">
              <Menu className="w-5 h-5" />
            </Button>
          </header>

          {/* Search */}
          <div className="px-6 pb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/40 rounded-2xl blur-md transition-all group-hover:bg-white/50" />
              <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 ring-1 ring-white/80 shadow-sm transition-all focus-within:bg-white/80 focus-within:ring-white">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search Australian suburbs..." 
                  className="bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 w-full font-light"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Favorites Bar */}
          <div className="px-6 pb-8">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-3 pb-2">
                <Button variant="outline" size="sm" className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 hover:bg-white/50 text-slate-600 h-8 px-3">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  Current
                </Button>
                {FAVORITES.map((fav) => (
                  <Button key={fav} variant="ghost" size="sm" className="rounded-full hover:bg-white/40 text-slate-500 h-8 px-4">
                    {fav}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>

          {/* Main Weather Display */}
          <div className="flex-1 px-6 flex flex-col items-center text-center justify-center -mt-8">
            <div className="space-y-1 mb-8">
              <h2 className="text-3xl font-light tracking-tight text-slate-800">{CURRENT_LOCATION.city}</h2>
              <p className="text-sm text-slate-500 font-light">{CURRENT_LOCATION.date}</p>
            </div>

            <div className="relative w-full flex justify-center items-center mb-8 group">
              <div className="absolute w-48 h-48 bg-white/30 rounded-full blur-2xl" />
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-white/60 to-white/10 backdrop-blur-xl ring-1 ring-white/80 shadow-lg flex flex-col items-center justify-center p-6 transition-transform duration-500 hover:scale-105">
                <OutfitIcon className="w-12 h-12 text-slate-700 mb-3 stroke-[1.5]" />
                <span className="text-sm font-medium text-slate-700">{outfit.label}</span>
                <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium opacity-80">Wear This</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start justify-center">
                <span className="text-8xl font-light tracking-tighter text-slate-800 ml-4">
                  {CURRENT_LOCATION.temp}
                </span>
                <span className="text-3xl font-light text-slate-400 mt-3">°</span>
              </div>
              <p className="text-lg text-slate-600 font-light mt-2">{CURRENT_LOCATION.condition}</p>
            </div>
            
            <div className="flex items-center gap-6 mt-6 text-sm text-slate-500 font-light">
              <span className="flex items-center gap-1.5"><Wind className="w-4 h-4 opacity-70" /> {CURRENT_LOCATION.wind}</span>
              <span className="flex items-center gap-1.5"><CloudRain className="w-4 h-4 opacity-70" /> {CURRENT_LOCATION.humidity}%</span>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="px-4 pb-6 mt-auto">
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-5 ring-1 ring-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-xs font-medium uppercase tracking-widest text-slate-500">Forecast</span>
              </div>
              
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-2 px-2">
                  {FORECAST.map((day, i) => {
                    const Icon = day.icon;
                    const isToday = i === 0;
                    return (
                      <div 
                        key={day.day} 
                        className={cn(
                          "flex flex-col items-center min-w-[64px] p-3 rounded-2xl transition-all",
                          isToday ? "bg-white/60 shadow-sm ring-1 ring-white/80" : "hover:bg-white/30"
                        )}
                      >
                        <span className={cn(
                          "text-xs mb-3 font-medium",
                          isToday ? "text-slate-800" : "text-slate-500"
                        )}>{day.day}</span>
                        <Icon className="w-6 h-6 text-slate-700 mb-3 stroke-[1.5]" />
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-medium text-slate-800">{day.high}°</span>
                          <span className="text-xs text-slate-400">{day.low}°</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
