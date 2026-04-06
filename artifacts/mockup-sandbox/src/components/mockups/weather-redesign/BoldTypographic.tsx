import React, { useState } from "react";
import { Search, MapPin, Umbrella, Shirt, CloudRain, Sun, Cloud, Wind, Menu, ArrowRight } from "lucide-react";

export function BoldTypographic() {
  const [searchQuery, setSearchQuery] = useState("");

  const favorites = ["SYD", "BNE", "PER", "ADL", "HOB"];
  
  const forecast = [
    { day: "MON", temp: [21, 14], icon: CloudRain },
    { day: "TUE", temp: [23, 12], icon: Cloud },
    { day: "WED", temp: [25, 15], icon: Sun },
    { day: "THU", temp: [28, 16], icon: Sun },
    { day: "FRI", temp: [22, 14], icon: CloudRain },
    { day: "SAT", temp: [19, 11], icon: Wind },
    { day: "SUN", temp: [20, 12], icon: Cloud },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e5e5e5] p-4 sm:p-8 font-sans antialiased selection:bg-black selection:text-white">
      {/* Mobile Device Container */}
      <div className="w-full max-w-[420px] h-[850px] bg-[#f2f2f2] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative flex flex-col border-[12px] border-black rounded-[2.5rem]">
        
        {/* Header Section */}
        <header className="px-6 pt-12 pb-4 flex justify-between items-end border-b-[6px] border-black bg-white">
          <div>
            <h1 className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-black">
              Better Than BoM
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mt-1">
              {new Date().toLocaleDateString('en-AU', { weekday: 'short', day: '2-digit', month: 'short' })}
            </p>
          </div>
          <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <Menu className="w-4 h-4" strokeWidth={3} />
          </button>
        </header>

        {/* Search */}
        <div className="border-b-[6px] border-black relative bg-white group focus-within:bg-[#ffff00] transition-colors duration-300">
          <input 
            type="text"
            placeholder="FIND LOCATION" 
            className="w-full h-16 bg-transparent px-6 text-xl font-black uppercase tracking-tighter placeholder:text-black/20 focus:outline-none focus:placeholder:text-black/40 text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full group-focus-within:rotate-90 transition-transform duration-300">
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>

        {/* Favorites Bar */}
        <div className="flex border-b-[6px] border-black overflow-x-auto scrollbar-hide bg-white">
          <button className="shrink-0 px-6 py-3 bg-black text-white text-[0.65rem] font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
            <MapPin className="w-3 h-3" strokeWidth={3} /> MELBOURNE
          </button>
          {favorites.map((fav, i) => (
            <button key={fav} className={`shrink-0 px-6 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] hover:bg-neutral-100 transition-colors ${i !== favorites.length - 1 ? 'border-r-[6px] border-black' : ''}`}>
              {fav}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative bg-white overflow-hidden justify-between">
          
          <div className="p-6 relative z-10">
            {/* City Name */}
            <h2 className="text-[4rem] leading-[0.8] font-black uppercase tracking-tighter text-black break-words">
              MELBOURNE
            </h2>

            {/* Massive Temperature & Condition */}
            <div className="mt-8 relative flex items-start">
              <span className="text-[12rem] font-black leading-[0.75] tracking-tighter text-black -ml-3">
                21
              </span>
              <div className="flex flex-col ml-2 mt-4">
                <span className="text-6xl font-black text-black leading-none">°</span>
                <div className="mt-4 bg-[#ffff00] text-black text-xl font-black uppercase tracking-tighter px-3 py-1 -rotate-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Overcast
                </div>
              </div>
            </div>
          </div>

          {/* Outfit Recommendation */}
          <div className="mx-6 mb-6 mt-auto border-[6px] border-black bg-white p-4 flex items-center gap-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-[#ffff00] flex items-center justify-center border-[4px] border-black rounded-full shrink-0 group-hover:rotate-12 transition-transform duration-300">
              <Shirt className="w-8 h-8 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-neutral-400 mb-1">
                Directive
              </p>
              <p className="text-2xl font-black uppercase tracking-tighter leading-none text-black">
                T-Shirt Wx.
              </p>
            </div>
          </div>

        </main>

        {/* 7-Day Forecast */}
        <div className="bg-black text-white p-6 z-20">
          <h3 className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-neutral-500 mb-6 flex items-center gap-4">
            <span>Forecast</span>
            <div className="h-[2px] flex-1 bg-neutral-800"></div>
          </h3>
          
          <div className="space-y-4">
            {forecast.map((day, i) => (
              <div key={i} className="flex items-center group cursor-pointer">
                <span className="w-14 text-xl font-black uppercase tracking-tighter text-neutral-500 group-hover:text-[#ffff00] transition-colors">
                  {day.day}
                </span>
                <div className="flex-1 flex justify-center">
                  <day.icon className="w-6 h-6 text-neutral-600 group-hover:text-white transition-colors" strokeWidth={2.5} />
                </div>
                <div className="w-28 flex items-center justify-end gap-3 font-black tracking-tighter text-xl">
                  <span className="text-white group-hover:scale-110 transition-transform origin-right">{day.temp[0]}°</span>
                  <span className="text-neutral-600">{day.temp[1]}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
