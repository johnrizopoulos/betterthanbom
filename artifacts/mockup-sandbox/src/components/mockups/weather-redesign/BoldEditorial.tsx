import React, { useState } from "react";
import { Search, MapPin, Shirt, CloudRain, Sun, Cloud, Wind, Menu } from "lucide-react";

export function BoldEditorial() {
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
    <div className="flex justify-center items-center min-h-screen bg-stone-100 p-4 sm:p-8 font-sans antialiased selection:bg-[#C5A572] selection:text-white">
      {/* Mobile Device Container */}
      <div className="w-full max-w-[420px] h-[850px] bg-[#fdfbf7] overflow-hidden shadow-2xl relative flex flex-col border border-stone-300 rounded-[2rem]">
        
        {/* Header Section */}
        <header className="px-8 pt-12 pb-6 flex justify-between items-end border-b border-stone-300">
          <div>
            <h1 className="text-xs font-serif italic tracking-widest text-stone-900">
              Better Than BoM
            </h1>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-stone-500 mt-2">
              {new Date().toLocaleDateString('en-AU', { weekday: 'long', day: '2-digit', month: 'long' })}
            </p>
          </div>
          <button className="w-10 h-10 flex items-center justify-end text-stone-900 hover:text-[#C5A572] transition-colors">
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </header>

        {/* Search */}
        <div className="border-b border-stone-300 relative group focus-within:bg-stone-50 transition-colors duration-300">
          <input 
            type="text"
            placeholder="Search Location" 
            className="w-full h-14 bg-transparent px-8 text-sm font-serif italic tracking-wide placeholder:text-stone-400 focus:outline-none focus:placeholder:text-stone-300 text-stone-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-8 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#C5A572] group-focus-within:text-[#C5A572] transition-colors duration-300">
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Favorites Bar */}
        <div className="flex border-b border-stone-300 overflow-x-auto scrollbar-hide bg-white">
          <button className="shrink-0 px-8 py-4 bg-stone-900 text-white text-[0.6rem] font-medium uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
            <MapPin className="w-3 h-3 text-[#C5A572]" strokeWidth={2} /> MELBOURNE
          </button>
          {favorites.map((fav, i) => (
            <button key={fav} className={`shrink-0 px-6 py-4 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors ${i !== favorites.length - 1 ? 'border-r border-stone-200' : ''}`}>
              {fav}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden justify-between">
          
          <div className="p-8 relative z-10 flex-1 flex flex-col justify-center items-center">
            {/* Massive Temperature & Condition */}
            <div className="relative flex items-start justify-center">
              <span className="text-[10rem] font-serif font-light leading-[0.8] tracking-tighter text-stone-900">
                21
              </span>
              <div className="flex flex-col ml-1 mt-4">
                <span className="text-4xl font-serif text-[#C5A572] leading-none">°</span>
              </div>
            </div>

            <div className="text-center mt-6">
               <h2 className="text-sm font-medium uppercase tracking-[0.4em] text-stone-900 mb-2">
                 Melbourne
               </h2>
               <p className="text-lg font-serif italic text-stone-500">
                 Overcast conditions
               </p>
            </div>
          </div>

          {/* Outfit Recommendation */}
          <div className="mx-8 mb-8 border border-stone-300 bg-white p-5 flex items-center gap-6 hover:border-[#C5A572] transition-colors cursor-pointer group rounded-sm shadow-sm">
            <div className="w-12 h-12 bg-stone-50 flex items-center justify-center border border-stone-200 rounded-full shrink-0 group-hover:bg-[#C5A572]/10 group-hover:border-[#C5A572] transition-colors duration-300">
              <Shirt className="w-5 h-5 text-stone-900 group-hover:text-[#C5A572] transition-colors" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-stone-400 mb-1.5">
                Editor's Pick
              </p>
              <p className="text-sm font-serif italic text-stone-900 group-hover:text-[#C5A572] transition-colors">
                Perfect weather for a light t-shirt.
              </p>
            </div>
          </div>

        </main>

        {/* 7-Day Forecast */}
        <div className="bg-stone-900 text-stone-100 px-8 py-6 z-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-serif italic tracking-widest text-[#C5A572]">
              The Index
            </h3>
            <div className="h-[1px] flex-1 bg-stone-800 ml-6"></div>
          </div>
          
          <div className="space-y-0 border-t border-stone-800">
            {forecast.map((day, i) => (
              <div key={i} className="flex items-center group cursor-pointer border-b border-stone-800 py-3 hover:bg-stone-800/50 transition-colors px-2 -mx-2">
                <span className="w-12 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-stone-400 group-hover:text-[#C5A572] transition-colors">
                  {day.day}
                </span>
                <div className="flex-1 flex justify-center">
                  <day.icon className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" strokeWidth={1.5} />
                </div>
                <div className="w-24 flex items-center justify-end gap-4 font-serif text-sm">
                  <span className="text-stone-200">{day.temp[0]}°</span>
                  <span className="text-stone-600 italic">{day.temp[1]}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
