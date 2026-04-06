import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSun, 
  Wind,
  Droplets,
  Star,
  Menu,
  ChevronRight,
  Umbrella,
  Shirt,
  CloudLightning,
  Thermometer,
  Moon
} from 'lucide-react';

const FAVORITES = ['Sydney', 'Brisbane', 'Hobart', 'Perth'];

const FORECAST = [
  { day: 'Today', max: 21, min: 14, icon: Cloud, desc: 'Overcast' },
  { day: 'Fri', max: 18, min: 12, icon: CloudRain, desc: 'Rain' },
  { day: 'Sat', max: 16, min: 10, icon: CloudRain, desc: 'Showers' },
  { day: 'Sun', max: 19, min: 11, icon: CloudSun, desc: 'Partly Cloudy' },
  { day: 'Mon', max: 24, min: 13, icon: Sun, desc: 'Sunny' },
  { day: 'Tue', max: 28, min: 15, icon: Sun, desc: 'Hot' },
  { day: 'Wed', max: 22, min: 14, icon: CloudSun, desc: 'Mostly Sunny' },
];

export function BentoMidnight() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        .bento-card-midnight {
          background: linear-gradient(180deg, rgba(30, 30, 30, 0.4) 0%, rgba(20, 20, 20, 0.4) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: 
            0 4px 24px -1px rgba(0, 0, 0, 0.5),
            inset 0 1px 1px rgba(255, 255, 255, 0.05),
            inset 0 0 40px rgba(255, 255, 255, 0.01);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
        }
        
        .bento-card-midnight:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.15);
          box-shadow: 
            0 12px 32px -4px rgba(0, 0, 0, 0.6),
            0 8px 16px -4px rgba(212, 175, 55, 0.05),
            inset 0 1px 1px rgba(255, 255, 255, 0.08),
            inset 0 0 40px rgba(212, 175, 55, 0.03);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
        
        .glass-input::placeholder {
          color: #666;
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-5 relative z-10">
        
        {/* Background Ambient Glows */}
        <div className="ambient-glow bg-[#D4AF37] w-64 h-64 -top-20 -left-20"></div>
        <div className="ambient-glow bg-[#8A2BE2] w-64 h-64 top-1/3 -right-32 opacity-10"></div>
        
        {/* Header & Search */}
        <div className="flex flex-col gap-5 mb-3 relative z-10">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-xl font-bold text-[#FFFFFF] tracking-tight flex items-center gap-2">
              Better Than BoM <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
            </h1>
            <button className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Menu className="w-5 h-5 text-[#A0A0A0]" />
            </button>
          </div>

          <div className="bento-card-midnight flex items-center px-5 py-4 h-16 rounded-[28px] group">
            <Search className="w-5 h-5 text-[#666] mr-4 flex-shrink-0 group-focus-within:text-[#D4AF37] transition-colors" />
            <input 
              type="text" 
              placeholder="Search suburb..." 
              className="glass-input bg-transparent border-none outline-none w-full text-[16px] font-medium text-[#FFF] focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 relative z-10">
          <button className="flex-shrink-0 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-semibold px-5 py-3 rounded-2xl flex items-center gap-2 text-sm hover:bg-[#D4AF37]/20 transition-colors">
            <Star className="w-4 h-4 fill-current" />
            Saved
          </button>
          {FAVORITES.map(fav => (
            <button key={fav} className="flex-shrink-0 bg-white/5 border border-white/5 rounded-2xl px-5 py-3 text-sm font-medium text-[#A0A0A0] hover:text-white hover:bg-white/10 transition-colors">
              {fav}
            </button>
          ))}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-2 gap-4 mt-2 relative z-10">
          
          {/* Location & Date */}
          <div className="col-span-2 bento-card-midnight p-7 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Current Location</span>
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-1">Melbourne</h2>
                <div className="text-sm font-medium text-[#888] flex items-center gap-2">
                  <span>37.81° S, 144.96° E</span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-sm font-bold bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-2 rounded-xl text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  24 Oct
                </div>
                <div className="text-sm font-medium text-[#A0A0A0] mt-3">Thursday</div>
              </div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bento-card-midnight p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#4A90E2]/20 rounded-full blur-2xl group-hover:bg-[#4A90E2]/30 transition-colors"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                <Cloud className="w-5 h-5 text-[#A0A0A0]" />
              </div>
              <div className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-[0.2em] border border-white/10 px-3 py-1.5 rounded-lg bg-black/20">Overcast</div>
            </div>
            
            <div className="relative z-10 mt-6">
              <div className="text-6xl font-light text-white tracking-tighter flex items-start">
                21<span className="text-2xl mt-2 text-[#D4AF37] font-medium">°</span>
              </div>
              <div className="text-xs font-medium text-[#666] mt-2 flex items-center gap-1.5">
                <Thermometer className="w-3 h-3" />
                Feels like 19°
              </div>
            </div>
          </div>

          {/* Outfit Recommendation Card */}
          <div className="bento-card-midnight p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent"></div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center backdrop-blur-md">
                <Shirt className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] border border-[#D4AF37]/20 px-3 py-1.5 rounded-lg bg-[#D4AF37]/5">Wear</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transform group-hover:scale-110 transition-transform duration-500 ease-out">
                👕
              </div>
            </div>
            
            <div className="relative z-10 text-xs font-semibold text-[#E0E0E0] text-center tracking-wide">
              T-shirt weather
            </div>
          </div>

          {/* Details Row */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="bento-card-midnight p-5 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A0A0A0] group-hover:border-[#A0A0A0]/30 transition-colors">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#666] uppercase tracking-[0.2em] mb-1">Wind</div>
                <div className="text-xl font-semibold text-white">14 <span className="text-xs text-[#666] font-medium">km/h</span></div>
              </div>
            </div>
            <div className="bento-card-midnight p-5 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#4A90E2] group-hover:border-[#4A90E2]/30 transition-colors">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#666] uppercase tracking-[0.2em] mb-1">Humidity</div>
                <div className="text-xl font-semibold text-white">64<span className="text-xs text-[#666] font-medium">%</span></div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="col-span-2 bento-card-midnight p-1">
            <div className="p-5 pb-3 flex justify-between items-center border-b border-white/5">
              <h2 className="text-[11px] font-bold text-[#888] uppercase tracking-[0.2em]">7-Day Forecast</h2>
            </div>
            
            <div className="p-2 space-y-1">
              {FORECAST.map((day, i) => {
                const Icon = day.icon;
                const isToday = i === 0;
                return (
                  <div key={day.day} className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${isToday ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}>
                    <div className={`w-14 font-semibold text-[14px] ${isToday ? 'text-white' : 'text-[#A0A0A0]'}`}>
                      {day.day}
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isToday ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-[#888]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-medium hidden sm:inline-block ${isToday ? 'text-[#D4AF37]' : 'text-[#888]'}`}>
                        {day.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 w-24 justify-end">
                      <span className={`font-semibold text-[15px] ${isToday ? 'text-white text-glow' : 'text-[#E0E0E0]'}`}>{day.max}°</span>
                      <span className="font-medium text-[15px] text-[#666]">{day.min}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
