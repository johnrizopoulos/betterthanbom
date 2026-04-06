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
  Waves
} from 'lucide-react';

const FAVORITES = ['Sydney', 'Gold Coast', 'Byron Bay', 'Noosa'];

const FORECAST = [
  { day: 'Today', max: 21, min: 14, icon: Cloud, desc: 'Overcast' },
  { day: 'Fri', max: 18, min: 12, icon: CloudRain, desc: 'Rain' },
  { day: 'Sat', max: 16, min: 10, icon: CloudRain, desc: 'Showers' },
  { day: 'Sun', max: 19, min: 11, icon: CloudSun, desc: 'Partly Cloudy' },
  { day: 'Mon', max: 24, min: 13, icon: Sun, desc: 'Sunny' },
  { day: 'Tue', max: 28, min: 15, icon: Sun, desc: 'Hot' },
  { day: 'Wed', max: 22, min: 14, icon: CloudSun, desc: 'Mostly Sunny' },
];

export function BentoCoastal() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F0F5F9] text-[#1a365d] font-sans p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ fontFamily: '"Outfit", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        .coastal-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 36px;
          box-shadow: 0 8px 32px rgba(12, 62, 90, 0.04), inset 0 0 0 1px rgba(255,255,255,0.8);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .coastal-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 16px 40px rgba(12, 62, 90, 0.08), inset 0 0 0 1px rgba(255,255,255,1);
          background: rgba(255, 255, 255, 0.85);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .ocean-gradient {
          background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%);
        }
        
        .sand-gradient {
          background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
        }
        
        .coral-gradient {
          background: linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%);
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-5">
        
        {/* Header & Search */}
        <div className="flex flex-col gap-5 mb-4">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-2xl font-black text-[#0C3E5A] tracking-tight flex items-center gap-2">
              <Waves className="w-6 h-6 text-[#38BDF8]" />
              Better Than BoM
            </h1>
            <button className="w-12 h-12 bg-white/60 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center shadow-sm transition-colors border border-white/40">
              <Menu className="w-5 h-5 text-[#0C3E5A]" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 coastal-card flex items-center px-6 py-4 h-16 rounded-[32px]">
              <Search className="w-5 h-5 text-[#94A3B8] mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search spots..." 
                className="bg-transparent border-none outline-none w-full text-[17px] font-medium text-[#0C3E5A] placeholder:text-[#94A3B8]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button className="flex-shrink-0 bg-[#0C3E5A] text-white font-semibold px-6 py-3.5 rounded-3xl flex items-center gap-2 text-[15px] hover:bg-[#1E4E6D] transition-colors shadow-md">
            <Star className="w-4 h-4 fill-current" />
            Spots
          </button>
          {FAVORITES.map(fav => (
            <button key={fav} className="flex-shrink-0 coastal-card rounded-3xl px-6 py-3.5 text-[15px] font-semibold text-[#334155] hover:text-[#0C3E5A]">
              {fav}
            </button>
          ))}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          
          {/* Location & Date - Spans 2 cols */}
          <div className="col-span-2 ocean-gradient coastal-card p-7 relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/40 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110 group-hover:translate-x-4"></div>
            <div className="absolute left-[-10%] bottom-[-20%] w-48 h-48 bg-[#7DD3FC]/30 rounded-full blur-2xl transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-x-4"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <MapPin className="w-4 h-4 text-[#0284C7]" />
                  <span className="text-[13px] font-bold text-[#0284C7] uppercase tracking-widest">Current Spot</span>
                </div>
                <h2 className="text-[42px] font-black tracking-tighter text-[#0C3E5A] leading-none">Melbourne</h2>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-xl font-black bg-white/80 px-4 py-2 rounded-2xl inline-block text-[#0284C7] shadow-sm">
                  24 Oct
                </div>
                <div className="text-[15px] font-bold text-[#38BDF8] mt-2 mr-1 uppercase tracking-wide">Thursday</div>
              </div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="coastal-card p-6 flex flex-col justify-between aspect-[1/1.1] relative overflow-hidden group bg-white/60">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#E0F2FE]/60 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <Cloud className="w-10 h-10 text-[#0284C7] drop-shadow-sm" strokeWidth={1.5} />
              <div className="text-[11px] font-black text-[#0284C7] uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-xl shadow-sm">Overcast</div>
            </div>
            <div className="relative z-10 mt-6">
              <div className="text-[72px] font-black text-[#0C3E5A] tracking-tighter leading-none -ml-1">21°</div>
              <div className="text-[15px] font-semibold text-[#64748B] mt-2">Feels like 19°</div>
            </div>
          </div>

          {/* Outfit Recommendation Card */}
          <div className="coral-gradient coastal-card p-6 flex flex-col justify-between aspect-[1/1.1] relative overflow-hidden group">
            <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-white/40 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex justify-end">
              <div className="text-[11px] font-black text-[#E11D48] uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-xl shadow-sm">Vibe Check</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10 my-1">
              <div className="text-[85px] leading-none filter drop-shadow-xl transform -rotate-12 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out cursor-default">
                👕
              </div>
            </div>
            
            <div className="relative z-10 text-[15px] font-bold text-[#BE123C] text-center bg-white/40 py-2 rounded-2xl backdrop-blur-sm">
              T-shirt weather
            </div>
          </div>

          {/* Details Row */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="coastal-card p-5 flex items-center gap-4 bg-white/60">
              <div className="w-14 h-14 rounded-[20px] bg-[#F0F9FF] flex items-center justify-center text-[#38BDF8] flex-shrink-0 shadow-inner">
                <Wind className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[12px] font-bold text-[#64748B] uppercase tracking-widest">Wind</div>
                <div className="text-2xl font-black text-[#0C3E5A]">14 <span className="text-[15px] text-[#94A3B8] font-semibold">km/h</span></div>
              </div>
            </div>
            <div className="coastal-card p-5 flex items-center gap-4 bg-white/60">
              <div className="w-14 h-14 rounded-[20px] bg-[#F0F9FF] flex items-center justify-center text-[#38BDF8] flex-shrink-0 shadow-inner">
                <Droplets className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[12px] font-bold text-[#64748B] uppercase tracking-widest">Humidity</div>
                <div className="text-2xl font-black text-[#0C3E5A]">64<span className="text-[15px] text-[#94A3B8] font-semibold">%</span></div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="col-span-2 coastal-card p-7 bg-white/70">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-[13px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-2">
                <Waves className="w-4 h-4" />
                7-Day Outlook
              </h2>
            </div>
            
            <div className="space-y-2">
              {FORECAST.map((day, i) => {
                const Icon = day.icon;
                const isToday = i === 0;
                return (
                  <div key={day.day} className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${isToday ? 'bg-white shadow-sm ring-1 ring-black/5' : 'hover:bg-white/50'}`}>
                    <div className="w-16 font-extrabold text-[#0C3E5A] text-[16px]">
                      {day.day}
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isToday ? 'bg-[#F0F9FF] text-[#0284C7]' : 'text-[#94A3B8]'}`}>
                        <Icon className="w-5 h-5" strokeWidth={isToday ? 2.5 : 2} />
                      </div>
                      <span className={`text-[15px] font-semibold hidden sm:inline-block ${isToday ? 'text-[#0284C7]' : 'text-[#64748B]'}`}>
                        {day.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 w-28 justify-end">
                      <span className="font-black text-[16px] text-[#0C3E5A]">{day.max}°</span>
                      <span className="font-bold text-[16px] text-[#94A3B8]">{day.min}°</span>
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
