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
  Sparkles
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

export function CoastalCandy() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-[#4A4A4A] font-sans p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ fontFamily: '"Nunito", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        
        .candy-card {
          border-radius: 40px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.04), inset 0 -4px 0 rgba(0,0,0,0.05), inset 0 4px 0 rgba(255,255,255,0.4);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid rgba(255,255,255,0.6);
        }
        
        .candy-card:hover {
          transform: translateY(-4px) scale(1.02) rotate(1deg);
          box-shadow: 0 15px 30px rgba(0,0,0,0.06), inset 0 -4px 0 rgba(0,0,0,0.05), inset 0 4px 0 rgba(255,255,255,0.5);
        }

        .candy-card-alt:hover {
          transform: translateY(-4px) scale(1.02) rotate(-1deg);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .wobble-hover:hover {
          animation: wobble 0.8s ease-in-out infinite alternate;
        }

        @keyframes wobble {
          0% { transform: rotate(-5deg) scale(1.1); }
          100% { transform: rotate(5deg) scale(1.1); }
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-5">
        
        {/* Header & Search */}
        <div className="flex flex-col gap-5 mb-4">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-2xl font-black text-[#FF8DA1] tracking-tight flex items-center gap-2 drop-shadow-sm">
              <Sparkles className="w-6 h-6 text-[#FFD166]" fill="#FFD166" />
              Better Than BoM
            </h1>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.05),inset_0_-3px_0_rgba(0,0,0,0.05)] hover:bg-[#FFF5F7] transition-colors border border-gray-100">
              <Menu className="w-5 h-5 text-[#FF8DA1]" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white candy-card flex items-center px-6 py-4 h-[68px] rounded-[34px]">
              <Search className="w-6 h-6 text-[#A0E8AF] mr-3 flex-shrink-0" strokeWidth={2.5} />
              <input 
                type="text" 
                placeholder="Find a happy place..." 
                className="bg-transparent border-none outline-none w-full text-[18px] font-bold text-[#4A4A4A] placeholder:text-[#D1D5DB]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button className="flex-shrink-0 bg-[#FFD166] text-[#6B4E00] font-black px-6 py-3.5 rounded-full flex items-center gap-2 text-[16px] shadow-[0_4px_10px_rgba(255,209,102,0.3),inset_0_-3px_0_rgba(0,0,0,0.1)] hover:scale-105 transition-transform">
            <Star className="w-4 h-4 fill-current" />
            Favs
          </button>
          {FAVORITES.map(fav => (
            <button key={fav} className="flex-shrink-0 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_-3px_0_rgba(0,0,0,0.02)] rounded-full px-6 py-3.5 text-[16px] font-bold text-[#A3A3A3] hover:text-[#FF8DA1] hover:scale-105 transition-all">
              {fav}
            </button>
          ))}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          
          {/* Location & Date - Spans 2 cols */}
          <div className="col-span-2 bg-[#A0E8AF] candy-card p-8 relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/30 rounded-full blur-2xl transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[#2B7A3B]" />
                  <span className="text-[14px] font-black text-[#2B7A3B] uppercase tracking-wider bg-white/40 px-3 py-1 rounded-full">Here Now</span>
                </div>
                <h2 className="text-[44px] font-black tracking-tight text-[#1E562A] leading-none mt-2">Melbourne</h2>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div className="text-xl font-black bg-white px-4 py-2 rounded-2xl inline-block text-[#2B7A3B] shadow-sm transform rotate-2">
                  24 Oct
                </div>
                <div className="text-[16px] font-extrabold text-[#1E562A] mt-1 px-2">Thursday</div>
              </div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bg-[#BDE0FE] candy-card candy-card-alt p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/40 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <Cloud className="w-12 h-12 text-[#3A7CA5] drop-shadow-sm wobble-hover" strokeWidth={2} fill="rgba(255,255,255,0.5)" />
            </div>
            <div className="relative z-10 mt-2">
              <div className="text-[13px] font-black text-[#3A7CA5] uppercase tracking-widest mb-1">Overcast</div>
              <div className="text-[64px] font-black text-[#1D3557] tracking-tighter leading-none -ml-1">21°</div>
              <div className="text-[15px] font-bold text-[#457B9D] mt-2 bg-white/40 inline-block px-3 py-1 rounded-full">Feels 19°</div>
            </div>
          </div>

          {/* Outfit Recommendation Card */}
          <div className="bg-[#FFC8DD] candy-card p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-white/40 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex justify-end">
              <div className="text-[12px] font-black text-[#A53860] uppercase tracking-wider bg-white/60 px-3 py-1.5 rounded-full shadow-sm transform -rotate-3">Wear This</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="text-[80px] leading-none filter drop-shadow-lg transform rotate-6 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 ease-out cursor-pointer">
                👕
              </div>
            </div>
            
            <div className="relative z-10 text-[16px] font-black text-[#A53860] text-center bg-white/50 py-2.5 rounded-2xl backdrop-blur-sm">
              T-shirt weather
            </div>
          </div>

          {/* Details Row */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-[#EAE4E9] candy-card p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#9D8189] flex-shrink-0 shadow-sm">
                <Wind className="w-7 h-7 wobble-hover" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[13px] font-extrabold text-[#9D8189] uppercase tracking-wider">Wind</div>
                <div className="text-2xl font-black text-[#4A4A4A]">14 <span className="text-[15px] text-[#9D8189] font-bold">km/h</span></div>
              </div>
            </div>
            <div className="bg-[#FFF1E6] candy-card candy-card-alt p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#E29578] flex-shrink-0 shadow-sm">
                <Droplets className="w-7 h-7 wobble-hover" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[13px] font-extrabold text-[#E29578] uppercase tracking-wider">Humidity</div>
                <div className="text-2xl font-black text-[#4A4A4A]">64<span className="text-[15px] text-[#E29578] font-bold">%</span></div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="col-span-2 bg-white candy-card p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-4 border-[#FFF8F3]">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-[15px] font-black text-[#4A4A4A] uppercase tracking-wider flex items-center gap-2 bg-[#F3F4F6] px-4 py-2 rounded-full">
                <CloudSun className="w-5 h-5 text-[#FFB703]" />
                Next 7 Days
              </h2>
            </div>
            
            <div className="space-y-3">
              {FORECAST.map((day, i) => {
                const Icon = day.icon;
                const isToday = i === 0;
                return (
                  <div key={day.day} className={`flex items-center justify-between p-4 rounded-[24px] transition-all cursor-pointer ${isToday ? 'bg-[#FFD166] shadow-[0_4px_0_rgba(230,180,50,1)] transform -translate-y-1' : 'bg-[#F9FAFB] hover:bg-[#F3F4F6] hover:-translate-y-0.5'}`}>
                    <div className={`w-16 font-black text-[17px] ${isToday ? 'text-[#6B4E00]' : 'text-[#4A4A4A]'}`}>
                      {day.day}
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white ${isToday ? 'text-[#FF9F1C] shadow-sm' : 'text-[#9CA3AF]'}`}>
                        <Icon className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <span className={`text-[16px] font-bold hidden sm:inline-block ${isToday ? 'text-[#6B4E00]' : 'text-[#6B7280]'}`}>
                        {day.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 w-28 justify-end">
                      <span className={`font-black text-[18px] ${isToday ? 'text-[#6B4E00]' : 'text-[#4A4A4A]'}`}>{day.max}°</span>
                      <span className={`font-bold text-[16px] ${isToday ? 'text-[#B8860B]' : 'text-[#9CA3AF]'}`}>{day.min}°</span>
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
