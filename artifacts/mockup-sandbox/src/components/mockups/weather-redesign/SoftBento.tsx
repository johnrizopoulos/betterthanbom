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
  CloudLightning
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

export function SoftBento() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F4F1ED] text-[#4A443E] font-sans p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        
        .bento-card {
          border-radius: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02), 0 1px 4px rgba(0,0,0,0.01);
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .soft-gradient {
          background: linear-gradient(135deg, #FEE9D7 0%, #F8D8C2 100%);
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-4">
        
        {/* Header & Search */}
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-between items-center px-1">
            <h1 className="text-xl font-black text-[#8A7D71] tracking-tight">Better Than BoM <span className="text-[#D08B5B]">.</span></h1>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Menu className="w-5 h-5 text-[#8A7D71]" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white bento-card flex items-center px-5 py-4 h-16 rounded-[28px]">
              <Search className="w-5 h-5 text-[#BBAFA0] mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search suburb..." 
                className="bg-transparent border-none outline-none w-full text-[16px] font-bold text-[#4A443E] placeholder:text-[#C5BDB2]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button className="flex-shrink-0 bg-[#E8E2D9] text-[#7A7165] font-bold px-5 py-3 rounded-2xl flex items-center gap-2 text-sm hover:bg-[#DFD8CE] transition-colors">
            <Star className="w-4 h-4 fill-current" />
            Saved
          </button>
          {FAVORITES.map(fav => (
            <button key={fav} className="flex-shrink-0 bg-white bento-card rounded-2xl px-5 py-3 text-sm font-bold text-[#6A6158]">
              {fav}
            </button>
          ))}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          
          {/* Location & Date - Spans 2 cols */}
          <div className="col-span-2 soft-gradient bento-card p-6 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/30 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#FFC59E]/40 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 opacity-80">
                  <MapPin className="w-4 h-4 text-[#A85B28]" />
                  <span className="text-sm font-bold text-[#A85B28] uppercase tracking-wider">Current Location</span>
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-[#5C341A]">Melbourne</h2>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-lg font-black bg-white/60 px-4 py-1.5 rounded-2xl inline-block text-[#A85B28] backdrop-blur-sm">
                  24 Oct
                </div>
                <div className="text-sm font-bold text-[#B06A3B] mt-2 mr-1">Thursday</div>
              </div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bg-[#E4F1EE] bento-card p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10 flex items-center justify-between">
              <Cloud className="w-10 h-10 text-[#52877B] fill-[#52877B]/20" />
              <div className="text-sm font-bold text-[#52877B] uppercase tracking-wider bg-white/40 px-3 py-1 rounded-xl">Overcast</div>
            </div>
            <div className="relative z-10 mt-4">
              <div className="text-6xl font-black text-[#264A42] tracking-tighter -ml-1">21°</div>
              <div className="text-sm font-bold text-[#52877B] mt-1">Feels like 19°</div>
            </div>
          </div>

          {/* Outfit Recommendation Card */}
          <div className="bg-[#F8E1E7] bento-card p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/40 rounded-full translate-x-1/3 translate-y-1/3 blur-xl group-hover:scale-110 transition-transform"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <Shirt className="w-6 h-6 text-[#C97B8F]" />
              <div className="text-sm font-bold text-[#C97B8F] uppercase tracking-wider bg-white/50 px-3 py-1 rounded-xl backdrop-blur-sm">Wear this</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10 my-2">
              <div className="text-[80px] leading-none filter drop-shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 ease-out cursor-default">
                👕
              </div>
            </div>
            
            <div className="relative z-10 text-sm font-black text-[#B05B72] text-center">
              T-shirt weather
            </div>
          </div>

          {/* Details Row */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-white bento-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0F4FF] flex items-center justify-center text-[#6B8AF0] flex-shrink-0">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#A0AABF] uppercase tracking-wider">Wind</div>
                <div className="text-xl font-black text-[#4A443E]">14 <span className="text-sm text-[#A0AABF] font-bold">km/h</span></div>
              </div>
            </div>
            <div className="bg-white bento-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0F8FF] flex items-center justify-center text-[#6BB0F0] flex-shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#A0AABF] uppercase tracking-wider">Humidity</div>
                <div className="text-xl font-black text-[#4A443E]">64<span className="text-sm text-[#A0AABF] font-bold">%</span></div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="col-span-2 bg-white bento-card p-6">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-sm font-black text-[#A0AABF] uppercase tracking-widest">7-Day Forecast</h2>
            </div>
            
            <div className="space-y-1">
              {FORECAST.map((day, i) => {
                const Icon = day.icon;
                const isToday = i === 0;
                return (
                  <div key={day.day} className={`flex items-center justify-between p-3 rounded-2xl transition-colors ${isToday ? 'bg-[#F4F1ED]' : 'hover:bg-[#F9F8F6]'}`}>
                    <div className="w-16 font-extrabold text-[#4A443E] text-[15px]">
                      {day.day}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isToday ? 'bg-white shadow-sm' : ''}`}>
                        <Icon className={`w-5 h-5 ${isToday ? 'text-[#52877B]' : 'text-[#A0AABF]'}`} />
                      </div>
                      <span className="text-sm font-bold text-[#A0AABF] hidden sm:inline-block">
                        {day.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 w-24 justify-end">
                      <span className="font-black text-[15px] text-[#4A443E]">{day.max}°</span>
                      <span className="font-bold text-[15px] text-[#C5BDB2]">{day.min}°</span>
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
