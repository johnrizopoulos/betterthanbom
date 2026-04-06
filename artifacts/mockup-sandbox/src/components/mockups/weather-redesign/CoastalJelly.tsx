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
  Sparkles,
  CloudLightning
} from 'lucide-react';

const FAVORITES = ['Sydney', 'Gold Coast', 'Byron Bay', 'Noosa'];

const FORECAST = [
  { day: 'Today', max: 21, min: 14, icon: Cloud, desc: 'Overcast', color: '#FF3366', lightColor: '#FFE6EB' },
  { day: 'Fri', max: 18, min: 12, icon: CloudRain, desc: 'Rain', color: '#00C4FF', lightColor: '#E6FAFF' },
  { day: 'Sat', max: 16, min: 10, icon: CloudLightning, desc: 'Storms', color: '#8A2BE2', lightColor: '#F3E5F5' },
  { day: 'Sun', max: 19, min: 11, icon: CloudSun, desc: 'Partly Cloudy', color: '#FF9900', lightColor: '#FFF4E5' },
  { day: 'Mon', max: 24, min: 13, icon: Sun, desc: 'Sunny', color: '#FFCC00', lightColor: '#FFF9E5' },
  { day: 'Tue', max: 28, min: 15, icon: Sun, desc: 'Hot', color: '#FF3366', lightColor: '#FFE6EB' },
  { day: 'Wed', max: 22, min: 14, icon: CloudSun, desc: 'Mostly Sunny', color: '#00E676', lightColor: '#E6FFE5' },
];

export function CoastalJelly() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOutfitHovered, setIsOutfitHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF8FF] text-[#2D3748] font-sans p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ fontFamily: '"Fredoka", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        
        .jelly-card {
          border-radius: 40px;
          border: 4px solid #FFFFFF;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        
        .jelly-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
          border-radius: 40px 40px 0 0;
          pointer-events: none;
        }

        .jelly-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Specific card colors & shadows */
        .bg-jelly-blue {
          background-color: #00C4FF;
          box-shadow: 0 16px 32px -8px rgba(0, 196, 255, 0.6), inset 0 -8px 16px rgba(0,0,0,0.1);
          color: white;
        }
        
        .bg-jelly-pink {
          background-color: #FF3366;
          box-shadow: 0 16px 32px -8px rgba(255, 51, 102, 0.6), inset 0 -8px 16px rgba(0,0,0,0.1);
          color: white;
        }
        
        .bg-jelly-yellow {
          background-color: #FFCC00;
          box-shadow: 0 16px 32px -8px rgba(255, 204, 0, 0.6), inset 0 -8px 16px rgba(0,0,0,0.1);
          color: #2D3748;
        }
        
        .bg-jelly-green {
          background-color: #00E676;
          box-shadow: 0 16px 32px -8px rgba(0, 230, 118, 0.6), inset 0 -8px 16px rgba(0,0,0,0.1);
          color: white;
        }
        
        .bg-jelly-purple {
          background-color: #8A2BE2;
          box-shadow: 0 16px 32px -8px rgba(138, 43, 226, 0.6), inset 0 -8px 16px rgba(0,0,0,0.1);
          color: white;
        }

        .bg-jelly-white {
          background-color: #FFFFFF;
          box-shadow: 0 16px 32px -8px rgba(100, 100, 110, 0.2), inset 0 -8px 16px rgba(0,0,0,0.02);
          border: 4px solid #F0E6FF;
        }
        
        .jelly-button {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .jelly-button:active {
          transform: scale(0.92);
        }
        
        .jelly-pill {
          border-radius: 99px;
          border: 3px solid #FFFFFF;
          box-shadow: 0 8px 16px -4px rgba(0,0,0,0.15);
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-5">
        
        {/* Header & Search */}
        <div className="flex flex-col gap-5 mb-4">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-[28px] font-bold text-[#8A2BE2] tracking-tight flex items-center gap-2 drop-shadow-sm">
              <Sparkles className="w-8 h-8 text-[#FFCC00] fill-[#FFCC00]" />
              Better Than BoM
            </h1>
            <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(138,43,226,0.15)] transition-transform hover:scale-110 jelly-button border-4 border-[#F3E5F5]">
              <Menu className="w-6 h-6 text-[#8A2BE2]" strokeWidth={3} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 jelly-card bg-jelly-white flex items-center px-6 py-4 h-[72px]">
              <Search className="w-6 h-6 text-[#FF3366] mr-3 flex-shrink-0" strokeWidth={3} />
              <input 
                type="text" 
                placeholder="Search spots..." 
                className="bg-transparent border-none outline-none w-full text-[20px] font-semibold text-[#2D3748] placeholder:text-[#CBD5E0]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button className="flex-shrink-0 jelly-pill bg-[#8A2BE2] text-white font-bold px-7 py-4 flex items-center gap-2 text-[18px] hover:-translate-y-1 transition-transform jelly-button">
            <Star className="w-5 h-5 fill-current" />
            Spots
          </button>
          {FAVORITES.map((fav, i) => {
            const colors = ['bg-[#FF3366]', 'bg-[#00C4FF]', 'bg-[#FFCC00]', 'bg-[#00E676]'];
            const textColor = i === 2 ? 'text-[#2D3748]' : 'text-white';
            return (
              <button key={fav} className={`flex-shrink-0 jelly-pill ${colors[i%colors.length]} ${textColor} font-bold px-7 py-4 text-[18px] hover:-translate-y-1 transition-transform jelly-button`}>
                {fav}
              </button>
            )
          })}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-2 gap-5 mt-2">
          
          {/* Location & Date - Spans 2 cols */}
          <div className="col-span-2 jelly-card bg-jelly-blue p-8">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/40">
                  <MapPin className="w-5 h-5 text-white" fill="white" />
                  <span className="text-[15px] font-bold text-white uppercase tracking-wider">Current Spot</span>
                </div>
                <h2 className="text-[52px] font-bold tracking-tight text-white leading-none drop-shadow-md">Melbourne</h2>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div className="text-2xl font-bold bg-[#FFCC00] px-5 py-3 rounded-[24px] inline-block text-[#2D3748] shadow-[0_4px_12px_rgba(255,204,0,0.5)] border-4 border-white transform rotate-3">
                  24 Oct
                </div>
                <div className="text-[18px] font-bold text-white mt-1 mr-1 uppercase tracking-widest bg-black/10 px-4 py-1.5 rounded-full">Thursday</div>
              </div>
            </div>
            {/* Decorative shapes */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-20 rounded-full blur-xl"></div>
            <div className="absolute top-10 right-20 w-8 h-8 bg-white opacity-40 rounded-full"></div>
            <div className="absolute top-16 right-32 w-4 h-4 bg-white opacity-60 rounded-full"></div>
          </div>

          {/* Temperature Card */}
          <div className="jelly-card bg-jelly-yellow p-7 flex flex-col justify-between aspect-[1/1.1]">
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-white p-3 rounded-[20px] shadow-sm border-2 border-white/50">
                <Cloud className="w-10 h-10 text-[#00C4FF]" fill="#E6FAFF" strokeWidth={2.5} />
              </div>
              <div className="text-[13px] font-bold text-[#FFCC00] uppercase tracking-wider bg-white px-4 py-2 rounded-full shadow-sm border-2 border-[#FFE580]">
                Overcast
              </div>
            </div>
            <div className="relative z-10 mt-6 text-center">
              <div className="text-[84px] font-bold text-[#2D3748] tracking-tighter leading-none drop-shadow-md">21°</div>
              <div className="text-[18px] font-bold text-[#2D3748]/70 mt-2 bg-white/30 inline-block px-4 py-1 rounded-full">Feels 19°</div>
            </div>
          </div>

          {/* Outfit Recommendation Card */}
          <div 
            className="jelly-card bg-jelly-pink p-7 flex flex-col justify-between aspect-[1/1.1] cursor-pointer"
            onMouseEnter={() => setIsOutfitHovered(true)}
            onMouseLeave={() => setIsOutfitHovered(false)}
          >
            <div className="relative z-10 flex justify-end">
              <div className="text-[13px] font-bold text-[#FF3366] uppercase tracking-wider bg-white px-4 py-2 rounded-full shadow-sm border-2 border-[#FF99B2]">
                Vibe Check
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10 my-2">
              <div className={`text-[90px] leading-none filter drop-shadow-lg transform transition-all duration-300 ease-in-out ${isOutfitHovered ? 'scale-125 rotate-12' : '-rotate-6'}`}>
                👕
              </div>
            </div>
            
            <div className="relative z-10 text-[18px] font-bold text-[#FF3366] text-center bg-white py-3 px-2 rounded-[20px] shadow-sm border-2 border-white/50">
              T-shirt weather
            </div>
          </div>

          {/* Details Row */}
          <div className="col-span-2 grid grid-cols-2 gap-5">
            <div className="jelly-card bg-jelly-white p-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-[24px] bg-[#00E676] flex items-center justify-center text-white flex-shrink-0 shadow-[0_8px_16px_rgba(0,230,118,0.3)] border-4 border-[#B3FFD6]">
                <Wind className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#A0AEC0] uppercase tracking-wider">Wind</div>
                <div className="text-[28px] font-bold text-[#2D3748] leading-none mt-1">14 <span className="text-[18px] text-[#718096]">km/h</span></div>
              </div>
            </div>
            <div className="jelly-card bg-jelly-white p-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-[24px] bg-[#00C4FF] flex items-center justify-center text-white flex-shrink-0 shadow-[0_8px_16px_rgba(0,196,255,0.3)] border-4 border-[#B3EFFF]">
                <Droplets className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#A0AEC0] uppercase tracking-wider">Humid</div>
                <div className="text-[28px] font-bold text-[#2D3748] leading-none mt-1">64<span className="text-[18px] text-[#718096]">%</span></div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="col-span-2 jelly-card bg-jelly-white p-8">
            <div className="flex justify-between items-center mb-6 px-2">
              <h2 className="text-[18px] font-bold text-[#8A2BE2] uppercase tracking-widest flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                7-Day Outlook
              </h2>
            </div>
            
            <div className="space-y-4">
              {FORECAST.map((day, i) => {
                const Icon = day.icon;
                const isToday = i === 0;
                return (
                  <div key={day.day} className={`flex items-center justify-between p-4 rounded-[24px] transition-all hover:scale-[1.02] border-4 ${isToday ? 'bg-[#FFF9E5] border-[#FFCC00]' : 'bg-transparent border-transparent hover:bg-[#FDF8FF] hover:border-[#F3E5F5]'}`}>
                    <div className="w-20 font-bold text-[#2D3748] text-[20px]">
                      {day.day}
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-sm border-2 border-white/50" style={{ backgroundColor: day.color }}>
                        <Icon className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <span className="text-[18px] font-bold text-[#718096] hidden sm:inline-block">
                        {day.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 w-32 justify-end">
                      <div className="bg-black/5 px-3 py-1.5 rounded-xl flex items-center justify-center min-w-[3.5rem]">
                        <span className="font-bold text-[20px] text-[#2D3748]">{day.max}°</span>
                      </div>
                      <div className="min-w-[2.5rem] text-right">
                        <span className="font-bold text-[18px] text-[#A0AEC0]">{day.min}°</span>
                      </div>
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
