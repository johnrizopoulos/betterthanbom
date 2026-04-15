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
  Trees
} from 'lucide-react';

const FAVORITES = ['Sydney', 'Gold Coast', 'Byron Bay', 'Noosa'];

const FORECAST = [
  { day: 'Today', max: 21, min: 14, icon: Cloud, desc: 'Overcast', color: '#FF94B8', height: 60 },
  { day: 'Fri', max: 18, min: 12, icon: CloudRain, desc: 'Rain', color: '#FFD166', height: 45 },
  { day: 'Sat', max: 16, min: 10, icon: CloudRain, desc: 'Showers', color: '#06D6A0', height: 35 },
  { day: 'Sun', max: 19, min: 11, icon: CloudSun, desc: 'Partly Cloudy', color: '#118AB2', height: 50 },
  { day: 'Mon', max: 24, min: 13, icon: Sun, desc: 'Sunny', color: '#EF476F', height: 75 },
  { day: 'Tue', max: 28, min: 15, icon: Sun, desc: 'Hot', color: '#FF9F1C', height: 95 },
  { day: 'Wed', max: 22, min: 14, icon: CloudSun, desc: 'Mostly Sunny', color: '#06D6A0', height: 65 },
];

export function SeussLorax() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen text-[#4A3B2C] font-sans p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto relative" style={{ fontFamily: '"Bubblegum Sans", cursive' }}>
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          backgroundImage: 'url(/__mockup/images/truffula-bg.png)',
          backgroundColor: '#FDF0D5',
          backgroundBlendMode: 'multiply'
        }}
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Fredoka:wght@400;500;600;700&display=swap');
        
        .tuft-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 4px solid #4A3B2C;
          border-radius: 40px 60px 50px 70px / 60px 40px 70px 50px;
          box-shadow: 6px 8px 0px #4A3B2C;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .tuft-card:hover {
          transform: scale(1.02) rotate(-1deg);
        }

        .tuft-pink { background: rgba(255, 148, 184, 0.9); }
        .tuft-yellow { background: rgba(255, 209, 102, 0.9); }
        .tuft-green { background: rgba(6, 214, 160, 0.9); }
        .tuft-orange { background: rgba(255, 159, 28, 0.9); }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .truffula-stem {
          background: repeating-linear-gradient(
            -45deg,
            #FFD166,
            #FFD166 8px,
            #4A3B2C 8px,
            #4A3B2C 11px
          );
          border: 2px solid #4A3B2C;
          border-radius: 10px;
          width: 14px;
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-6 relative z-10">
        
        {/* Header & Search */}
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-center items-center px-1 py-2">
            <h1 className="text-5xl font-normal text-[#E07A5F] tracking-wide flex items-center gap-3 transform -rotate-2 drop-shadow-[2px_2px_0px_#4A3B2C]">
              <Trees className="w-10 h-10 text-[#81B29A] drop-shadow-[2px_2px_0px_#4A3B2C]" strokeWidth={2.5} />
              Better Than BoM
            </h1>
          </div>

          <div className="relative flex items-center gap-3 w-full">
            <div className="flex-1 tuft-card tuft-yellow flex items-center px-5 py-3 h-16 relative z-10">
              <Search className="w-7 h-7 text-[#4A3B2C] mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Find a spot..." 
                className="bg-transparent border-none outline-none w-full text-2xl font-normal text-[#4A3B2C] placeholder:text-[#4A3B2C]/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontFamily: '"Bubblegum Sans", cursive' }}
              />
            </div>
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 items-center">
          <button className="flex-shrink-0 tuft-card tuft-orange text-white font-normal px-6 py-3 text-2xl flex items-center gap-2 text-[#4A3B2C]">
            <Star className="w-6 h-6 fill-current" />
            Saved Spots
          </button>
          {FAVORITES.map((fav, i) => (
            <button key={fav} className={`flex-shrink-0 tuft-card ${i%2===0?'tuft-green':'tuft-pink'} px-6 py-3 text-2xl text-[#4A3B2C] transform ${i%2===0?'rotate-2':'-rotate-2'}`}>
              {fav}
            </button>
          ))}
        </div>

        {/* Main Location & Temperature */}
        <div className="tuft-card tuft-pink p-6 relative overflow-visible mt-4">
          <div className="absolute -top-6 -right-4 w-16 h-16 bg-[#FFD166] rounded-full border-4 border-[#4A3B2C] shadow-[4px_4px_0px_#4A3B2C] flex items-center justify-center transform rotate-12 z-20">
            <Sun className="w-9 h-9 text-[#4A3B2C]" strokeWidth={2.5} />
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-6 h-6 text-[#4A3B2C]" />
                <span className="text-xl text-[#4A3B2C] bg-white/70 px-3 py-0.5 rounded-full border-2 border-[#4A3B2C]">Here & Now</span>
              </div>
              <h2 className="text-6xl font-normal text-[#4A3B2C] leading-none mt-3 drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">Melbourne</h2>
              <div className="text-2xl mt-2 text-[#4A3B2C]/90 font-['Fredoka'] font-medium bg-white/40 inline-block px-3 py-1 rounded-2xl border-2 border-transparent">24 Oct, Thursday</div>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="flex flex-col">
              <div className="text-[100px] font-normal text-[#4A3B2C] leading-[0.8] tracking-tighter drop-shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">21°</div>
              <div className="text-4xl text-[#4A3B2C] mt-3 font-medium tracking-wide">Overcast</div>
            </div>
            <Cloud className="w-28 h-28 text-white fill-white stroke-[#4A3B2C] stroke-[2] filter drop-shadow-[4px_4px_0px_#4A3B2C]" />
          </div>
        </div>

        {/* Grid for Details & Outfit */}
        <div className="grid grid-cols-2 gap-5 mt-4">
          {/* Outfit Recommendation */}
          <div className="tuft-card tuft-orange p-5 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <h3 className="text-3xl text-[#4A3B2C] text-center mb-1 drop-shadow-[1px_1px_0px_rgba(255,255,255,0.5)]">Lorax Says:</h3>
            
            <div className="flex-1 flex items-center justify-center relative z-10">
               <img src="/__mockup/images/lorax-creature.png" alt="Lorax" className="w-28 h-28 object-contain transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <div className="text-2xl text-[#4A3B2C] text-center mt-2 bg-white/80 rounded-2xl border-2 border-[#4A3B2C] py-2 px-1 relative z-10 transform rotate-2">
              T-Shirt Weather!
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="tuft-card tuft-green p-4 flex items-center justify-center gap-3 flex-1 transform -rotate-1">
              <Wind className="w-10 h-10 text-[#4A3B2C]" strokeWidth={2} />
              <div className="flex flex-col items-center">
                <span className="text-4xl text-[#4A3B2C]">14</span>
                <span className="text-xl text-[#4A3B2C]/90 font-['Fredoka']">km/h wind</span>
              </div>
            </div>
            <div className="tuft-card tuft-yellow p-4 flex items-center justify-center gap-3 flex-1 transform rotate-1">
              <Droplets className="w-10 h-10 text-[#4A3B2C]" strokeWidth={2} />
              <div className="flex flex-col items-center">
                <span className="text-4xl text-[#4A3B2C]">64%</span>
                <span className="text-xl text-[#4A3B2C]/90 font-['Fredoka']">humid</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast - Truffula Trees */}
        <div className="tuft-card bg-[rgba(255,255,255,0.9)] p-6 mt-4">
          <h2 className="text-4xl text-[#4A3B2C] mb-10 text-center transform -rotate-2 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">Truffula Forecast</h2>
          
          <div className="flex justify-between items-end h-56 pb-8 border-b-4 border-[#4A3B2C] border-dashed mb-2 relative">
            {FORECAST.map((day, i) => (
              <div key={day.day} className="flex flex-col items-center w-12 group relative h-full justify-end">
                
                {/* Temp popup */}
                <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-[#4A3B2C] text-white px-3 py-2 rounded-xl text-xl border-2 border-white z-30 whitespace-nowrap shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
                  {day.max}° / {day.min}°
                </div>
                
                {/* Truffula Stem Container */}
                <div className="flex flex-col items-center w-full relative" style={{ height: `${day.height}%` }}>
                  {/* Truffula Tuft */}
                  <div 
                    className="w-14 h-14 rounded-full border-[3px] border-[#4A3B2C] flex items-center justify-center absolute -top-10 z-20 transition-transform group-hover:scale-125 shadow-[3px_3px_0px_#4A3B2C]"
                    style={{ backgroundColor: day.color }}
                  >
                    <day.icon className="w-7 h-7 text-[#4A3B2C]" strokeWidth={2.5} />
                  </div>
                  
                  {/* Truffula Stem */}
                  <div className="truffula-stem h-full absolute bottom-0 z-10 origin-bottom transition-transform group-hover:scale-y-[1.05]"></div>
                </div>
                
                <div className="absolute -bottom-8 text-2xl font-medium text-[#4A3B2C]">
                  {day.day}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
