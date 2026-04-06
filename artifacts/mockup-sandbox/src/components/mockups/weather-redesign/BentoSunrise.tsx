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
  Shirt,
  Umbrella,
  Leaf
} from 'lucide-react';

const FAVORITES = ['Sydney', 'Brisbane', 'Hobart', 'Perth'];

const FORECAST = [
  { day: 'Today', max: 21, min: 14, icon: Cloud, desc: 'Overcast' },
  { day: 'Fri', max: 18, min: 12, icon: CloudRain, desc: 'Rain' },
  { day: 'Sat', max: 16, min: 10, icon: CloudRain, desc: 'Showers' },
  { day: 'Sun', max: 19, min: 11, icon: CloudSun, desc: 'Partly Cloudy' },
  { day: 'Mon', max: 24, min: 13, icon: Sun, desc: 'Sunny' },
  { day: 'Tue', max: 28, min: 15, icon: Sun, desc: 'Warm' },
  { day: 'Wed', max: 22, min: 14, icon: CloudSun, desc: 'Mostly Sunny' },
];

export function BentoSunrise() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5C5549] p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ fontFamily: '"Outfit", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        .sunrise-card {
          border-radius: 36px;
          box-shadow: 0 10px 40px rgba(138, 154, 134, 0.08), inset 0 2px 0 rgba(255, 255, 255, 0.5);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        
        .sunrise-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 16px 40px rgba(138, 154, 134, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.8);
        }

        .organic-shape-1 { border-radius: 40px 16px 40px 40px; }
        .organic-shape-2 { border-radius: 16px 40px 40px 40px; }
        .organic-shape-3 { border-radius: 40px 40px 16px 40px; }
        .organic-shape-4 { border-radius: 40px 40px 40px 16px; }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .sage-gradient { background: linear-gradient(135deg, #E6EBE3 0%, #D4DDD0 100%); }
        .peach-gradient { background: linear-gradient(135deg, #FFF0E8 0%, #FDE0D3 100%); }
        .sunlight-gradient { background: linear-gradient(135deg, #FFF9EB 0%, #FCE8B8 100%); }
        
        .leaf-pattern {
          background-image: radial-gradient(#8A9A86 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0;
          opacity: 0.05;
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-5 relative">
        {/* Ambient background glows */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-[#FDE0D3] rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#E6EBE3] rounded-full mix-blend-multiply filter blur-[80px] opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[10%] w-[70%] h-[60%] bg-[#FCE8B8] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
        </div>

        <div className="relative z-10 space-y-5">
          {/* Header & Search */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-2 pt-2">
              <h1 className="text-2xl font-extrabold text-[#74826F] tracking-tight flex items-center gap-2">
                <Leaf className="w-6 h-6 text-[#9EAC98]" />
                Better Than BoM<span className="text-[#D98A6C] text-3xl leading-none">.</span>
              </h1>
              <div className="w-12 h-12 bg-white/60 sunrise-card rounded-full flex items-center justify-center cursor-pointer hover:bg-white">
                <Menu className="w-5 h-5 text-[#8A9A86]" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/80 sunrise-card organic-shape-1 flex items-center px-6 py-4 h-[68px]">
                <Search className="w-5 h-5 text-[#B5BDB1] mr-3" />
                <input 
                  type="text" 
                  placeholder="Find your space..." 
                  className="bg-transparent border-none outline-none w-full text-[17px] font-medium text-[#5C5549] placeholder:text-[#A6AFA3]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Favorites Bar */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button className="flex-shrink-0 bg-[#E8C37D]/20 text-[#B89650] font-semibold px-6 py-3.5 rounded-[20px] flex items-center gap-2 text-[15px] hover:bg-[#E8C37D]/30 transition-colors">
              <Star className="w-4 h-4 fill-current" />
              Saved
            </button>
            {FAVORITES.map(fav => (
              <button key={fav} className="flex-shrink-0 bg-white/60 sunrise-card rounded-[20px] px-6 py-3.5 text-[15px] font-medium text-[#8A9A86] hover:text-[#74826F] hover:bg-white/80">
                {fav}
              </button>
            ))}
          </div>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Location & Date */}
            <div className="col-span-2 sunlight-gradient sunrise-card organic-shape-4 p-8 relative overflow-hidden group">
              <div className="absolute inset-0 leaf-pattern"></div>
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/40 rounded-full blur-2xl transition-transform duration-1000 group-hover:scale-110"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 bg-white/40 px-4 py-2 rounded-2xl backdrop-blur-md">
                    <MapPin className="w-4 h-4 text-[#D98A6C]" />
                    <span className="text-sm font-bold text-[#D98A6C] tracking-wide">MELBOURNE</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[15px] font-bold text-[#B89650]">Thursday</div>
                    <div className="text-[13px] font-medium text-[#C4A96E]">24 October</div>
                  </div>
                </div>
                
                <h2 className="text-[2.75rem] leading-[1.1] font-extrabold tracking-tight text-[#8B7543] w-[80%]">
                  Good morning. The garden awaits.
                </h2>
              </div>
            </div>

            {/* Temperature Card */}
            <div className="sage-gradient sunrise-card organic-shape-2 p-7 flex flex-col justify-between aspect-square relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <Cloud className="w-12 h-12 text-[#74826F] fill-[#74826F]/10" />
                <div className="text-sm font-semibold text-[#74826F] bg-white/40 px-3 py-1.5 rounded-xl backdrop-blur-sm">Overcast</div>
              </div>
              
              <div className="relative z-10 mt-auto pt-4">
                <div className="flex items-start">
                  <div className="text-[5.5rem] leading-none font-medium text-[#4A5546] tracking-tighter -ml-1">21</div>
                  <div className="text-2xl font-semibold text-[#74826F] mt-2">°C</div>
                </div>
                <div className="text-[15px] font-medium text-[#74826F] mt-2">Feels like 19°</div>
              </div>
            </div>

            {/* Outfit Recommendation Card */}
            <div className="peach-gradient sunrise-card organic-shape-3 p-7 flex flex-col justify-between aspect-square relative overflow-hidden group">
              <div className="absolute left-0 bottom-0 w-32 h-32 bg-white/40 rounded-full -translate-x-1/4 translate-y-1/4 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex justify-between items-center">
                <div className="text-sm font-bold text-[#C9816B] bg-white/50 px-3 py-1.5 rounded-xl backdrop-blur-sm">Advice</div>
                <Shirt className="w-5 h-5 text-[#C9816B]" />
              </div>
              
              <div className="flex-1 flex items-center justify-center relative z-10 mt-2">
                <div className="text-[5rem] filter drop-shadow-md transform -rotate-6 group-hover:rotate-6 transition-transform duration-500 ease-in-out cursor-default">
                  👕
                </div>
              </div>
              
              <div className="relative z-10 text-[15px] font-semibold text-[#B36E5A] text-center leading-tight">
                Perfect weather for a soft t-shirt.
              </div>
            </div>

            {/* Details Row */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-white/70 sunrise-card organic-shape-1 p-6 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2 text-[#9EAC98]">
                  <Wind className="w-5 h-5" />
                  <span className="text-[13px] font-bold uppercase tracking-wider">Breeze</span>
                </div>
                <div className="text-2xl font-bold text-[#5C5549]">14 <span className="text-base text-[#8A9A86] font-medium">km/h</span></div>
              </div>
              <div className="bg-white/70 sunrise-card organic-shape-2 p-6 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2 text-[#A7C2D1]">
                  <Droplets className="w-5 h-5" />
                  <span className="text-[13px] font-bold uppercase tracking-wider">Moisture</span>
                </div>
                <div className="text-2xl font-bold text-[#5C5549]">64<span className="text-base text-[#8A9A86] font-medium">%</span></div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="col-span-2 bg-white/60 sunrise-card organic-shape-4 p-7 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-5 h-5 text-[#D98A6C]" />
                <h2 className="text-base font-bold text-[#5C5549]">The week ahead</h2>
              </div>
              
              <div className="space-y-2">
                {FORECAST.map((day, i) => {
                  const Icon = day.icon;
                  const isToday = i === 0;
                  return (
                    <div key={day.day} className={`flex items-center justify-between p-3.5 rounded-[24px] transition-all duration-300 ${isToday ? 'bg-[#FDFBF7] shadow-sm' : 'hover:bg-white/80'}`}>
                      <div className={`w-16 font-semibold text-[16px] ${isToday ? 'text-[#D98A6C]' : 'text-[#8A9A86]'}`}>
                        {day.day}
                      </div>
                      <div className="flex-1 flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center ${isToday ? 'bg-[#FFF0E8]' : 'bg-[#F4F6F3]'}`}>
                          <Icon className={`w-5 h-5 ${isToday ? 'text-[#D98A6C]' : 'text-[#9EAC98]'}`} />
                        </div>
                        <span className={`text-[15px] font-medium hidden sm:inline-block ${isToday ? 'text-[#5C5549]' : 'text-[#8A9A86]'}`}>
                          {day.desc}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 w-28 justify-end">
                        <span className="font-bold text-[16px] text-[#5C5549]">{day.max}°</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E6EBE3]"></div>
                        <span className="font-medium text-[16px] text-[#A6AFA3]">{day.min}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
