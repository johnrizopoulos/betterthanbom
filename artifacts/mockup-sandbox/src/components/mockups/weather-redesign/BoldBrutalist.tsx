import React, { useState } from "react";
import { ArrowRight, Cloud, CloudRain, MapPin, Menu, Shirt, Sun, Wind } from "lucide-react";

export function BoldBrutalist() {
  const [searchQuery, setSearchQuery] = useState("");

  const favorites = ["SYD", "BNE", "PER", "ADL", "HOB"];
  
  const forecast = [
    { day: "MON", temp: [21, 14], icon: CloudRain, condition: "WET" },
    { day: "TUE", temp: [23, 12], icon: Cloud, condition: "GREY" },
    { day: "WED", temp: [25, 15], icon: Sun, condition: "CLEAR" },
    { day: "THU", temp: [28, 16], icon: Sun, condition: "HOT" },
    { day: "FRI", temp: [22, 14], icon: CloudRain, condition: "RAIN" },
    { day: "SAT", temp: [19, 11], icon: Wind, condition: "WIND" },
    { day: "SUN", temp: [20, 12], icon: Cloud, condition: "DULL" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d3d3d3] p-4 sm:p-8 font-sans antialiased selection:bg-[#ff3300] selection:text-white"
         style={{ backgroundImage: 'radial-gradient(#999 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Mobile Device Container */}
      <div className="w-full max-w-[420px] h-[850px] bg-white overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative flex flex-col border-[8px] border-black">
        
        {/* Decorative Tape/Caution Stripe */}
        <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#ff3300_10px,#ff3300_20px)] z-50"></div>

        {/* Header Section */}
        <header className="px-6 pt-10 pb-4 flex justify-between items-end border-b-[8px] border-black bg-white relative">
          <div className="absolute top-10 right-4 w-24 h-24 border border-black rounded-full opacity-20 pointer-events-none flex items-center justify-center -rotate-12">
            <span className="text-[0.5rem] font-bold">"LOGO"</span>
          </div>
          <div className="z-10">
            <h1 className="text-[0.75rem] font-black uppercase tracking-[0.5em] text-black">
              "BETTER THAN BOM"
            </h1>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-neutral-500 mt-2 bg-black text-white inline-block px-1">
              REF: {new Date().toLocaleDateString('en-AU', { weekday: 'short', day: '2-digit', month: 'short' })}
            </p>
          </div>
          <button className="w-12 h-12 border-[4px] border-black bg-white text-black flex items-center justify-center hover:bg-[#ff3300] hover:text-white transition-colors z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
            <Menu className="w-6 h-6" strokeWidth={4} />
          </button>
        </header>

        {/* Search */}
        <div className="border-b-[8px] border-black relative bg-[#f4f4f4] group focus-within:bg-[#ff3300] transition-colors duration-200">
          <div className="absolute -top-3 left-4 bg-white border-2 border-black px-1 text-[0.5rem] font-black z-20">"INPUT"</div>
          <input 
            type="text"
            placeholder="[ ENTER LOCATION ]" 
            className="w-full h-20 bg-transparent px-6 pt-4 text-2xl font-black uppercase tracking-tighter placeholder:text-black/30 placeholder:line-through focus:outline-none focus:placeholder:text-black/50 text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <ArrowRight className="w-6 h-6" strokeWidth={4} />
          </button>
        </div>

        {/* Favorites Bar */}
        <div className="flex border-b-[8px] border-black overflow-x-auto scrollbar-hide bg-white relative">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjEiIC8+Cjwvc3ZnPg==')] opacity-50 z-0"></div>
          <button className="relative z-10 shrink-0 px-6 py-4 bg-black text-[#ff3300] text-[0.75rem] font-black uppercase tracking-[0.2em] border-r-[8px] border-black flex items-center justify-center gap-2 hover:bg-[#ff3300] hover:text-black transition-colors">
            <MapPin className="w-4 h-4" strokeWidth={3} /> MELBOURNE
          </button>
          {favorites.map((fav, i) => (
            <button key={fav} className={`relative z-10 shrink-0 px-6 py-4 text-[0.75rem] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors ${i !== favorites.length - 1 ? 'border-r-[8px] border-black' : ''}`}>
              {fav}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative bg-white overflow-hidden p-6 z-10">
          
          {/* Background watermark */}
          <div className="absolute -right-20 top-20 text-[10rem] font-black text-black/[0.03] rotate-90 whitespace-nowrap pointer-events-none">
            DATA_VIS
          </div>

          <div className="relative z-10 border-l-[8px] border-black pl-4">
            <p className="text-[0.6rem] font-black tracking-[0.4em] mb-2">"LOCATION"</p>
            {/* City Name */}
            <h2 className="text-[4.5rem] leading-[0.8] font-black uppercase tracking-tighter text-black break-words relative inline-block">
              MELB<br/>OURNE
              <div className="absolute -bottom-2 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#ff3300]"></div>
            </h2>

            {/* Massive Temperature & Condition */}
            <div className="mt-6 relative">
               <p className="text-[0.6rem] font-black tracking-[0.4em] absolute -top-4 left-2 z-20 bg-white px-1">"TEMPERATURE"</p>
              <div className="flex items-start">
                <span className="text-[11rem] font-black leading-[0.75] tracking-tighter text-black">
                  21
                </span>
                <div className="flex flex-col ml-1 mt-2">
                  <span className="text-8xl font-black text-black leading-none">°</span>
                  <div className="mt-2 bg-black text-[#ff3300] text-2xl font-black uppercase tracking-tighter px-2 py-1 rotate-[-5deg] shadow-[6px_6px_0px_0px_rgba(255,51,0,1)] border-2 border-black">
                    OVERCAST
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Outfit Recommendation */}
          <div className="mt-auto relative z-20">
            <div className="absolute -top-3 right-4 bg-black text-white px-2 py-1 text-[0.5rem] font-black uppercase tracking-[0.2em] z-30">
              "RECOMMENDATION"
            </div>
            <div className="border-[8px] border-black bg-[#ff3300] p-4 flex items-center gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group relative overflow-hidden">
              {/* Stripe overlay */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]"></div>
              
              <div className="w-16 h-16 bg-white flex items-center justify-center border-[4px] border-black shrink-0 relative z-10 group-hover:rotate-180 transition-transform duration-500">
                <Shirt className="w-10 h-10 text-black" strokeWidth={3} />
              </div>
              <div className="relative z-10">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-black mb-1">
                  SYS.DIRECTIVE //
                </p>
                <p className="text-3xl font-black uppercase tracking-tighter leading-none text-black bg-white inline-block px-2">
                  T-SHIRT WX.
                </p>
              </div>
            </div>
          </div>

        </main>

        {/* 7-Day Forecast - Data Table Style */}
        <div className="bg-black text-white flex-none border-t-[8px] border-black">
          <div className="p-4 border-b-[4px] border-neutral-800 flex justify-between items-center bg-[#111]">
            <h3 className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#ff3300]">
              [ FORECAST_DATA ]
            </h3>
            <span className="text-[0.6rem] font-mono text-neutral-500">LAST_UPDATED: NOW</span>
          </div>
          
          <div className="grid grid-cols-1 divide-y-[2px] divide-neutral-800 font-mono text-sm max-h-[220px] overflow-y-auto scrollbar-hide relative">
            <div className="absolute right-8 top-0 bottom-0 w-[2px] bg-neutral-800 pointer-events-none"></div>
            {forecast.map((day, i) => (
              <div key={i} className="flex items-center group cursor-pointer hover:bg-[#ff3300] hover:text-black transition-colors px-4 py-3 relative">
                <span className="w-16 font-black tracking-widest">
                  {day.day}
                </span>
                <div className="flex-1 flex items-center gap-4">
                  <day.icon className="w-5 h-5" strokeWidth={3} />
                  <span className="text-[0.65rem] uppercase tracking-widest hidden sm:inline-block">[{day.condition}]</span>
                </div>
                <div className="w-24 flex items-center justify-between font-black pr-6">
                  <span className="text-lg">{day.temp[0]}°</span>
                  <span className="text-neutral-500 group-hover:text-black/60">{day.temp[1]}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
