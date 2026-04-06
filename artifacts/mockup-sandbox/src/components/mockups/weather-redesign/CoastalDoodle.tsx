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
  Smile
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

export function CoastalDoodle() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#2D3748] font-sans p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ fontFamily: '"Kalam", cursive' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap');
        
        .doodle-font {
          font-family: 'Kalam', cursive;
        }

        .bubbly-font {
          font-family: 'Fredoka', sans-serif;
        }
        
        .doodle-card {
          background: #ffffff;
          border: 3px solid #2D3748;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 4px 4px 0px #2D3748;
          transition: all 0.2s ease-in-out;
        }
        
        .doodle-card:hover {
          transform: translateY(-4px) rotate(-1deg);
          box-shadow: 6px 8px 0px #2D3748;
        }

        .doodle-card-alt {
          background: #ffffff;
          border: 3px dashed #2D3748;
          border-radius: 15px 225px 15px 255px/255px 15px 225px 15px;
          box-shadow: 4px 4px 0px #2D3748;
          transition: all 0.2s ease-in-out;
        }

        .doodle-card-alt:hover {
          transform: translateY(-4px) rotate(1deg);
          box-shadow: 6px 8px 0px #2D3748;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .candy-blue { background-color: #90CDF4; }
        .candy-pink { background-color: #FBB6CE; }
        .candy-yellow { background-color: #FAF089; }
        .candy-green { background-color: #9AE6B4; }
        .candy-purple { background-color: #D6BCFA; }
        .candy-orange { background-color: #FBD38D; }
      `}} />

      <div className="w-full max-w-[420px] space-y-5">
        
        {/* Header & Search */}
        <div className="flex flex-col gap-5 mb-4">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-3xl font-bold text-[#2D3748] tracking-tight flex items-center gap-2 bubbly-font">
              <Smile className="w-8 h-8 text-[#ED8936] fill-[#FBD38D]" />
              Better Than BoM
            </h1>
            <button className="w-12 h-12 bg-white doodle-card flex items-center justify-center hover:bg-[#FAF089]">
              <Menu className="w-6 h-6 text-[#2D3748]" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 doodle-card candy-blue flex items-center px-4 py-2 h-16">
              <Search className="w-6 h-6 text-[#2D3748] mr-3 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search spots..." 
                className="bg-transparent border-none outline-none w-full text-[19px] font-bold text-[#2D3748] placeholder:text-[#4A5568] bubbly-font"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button className="flex-shrink-0 bg-[#2D3748] text-white font-bold px-6 py-3 doodle-card flex items-center gap-2 text-[17px] hover:bg-[#4A5568]">
            <Star className="w-5 h-5 fill-current text-[#FAF089]" />
            Spots
          </button>
          {FAVORITES.map((fav, index) => {
            const colors = ['candy-pink', 'candy-green', 'candy-purple', 'candy-orange'];
            const colorClass = colors[index % colors.length];
            return (
              <button key={fav} className={\`flex-shrink-0 doodle-card \${colorClass} px-6 py-3 text-[17px] font-bold text-[#2D3748] hover:bg-white\`}>
                {fav}
              </button>
            )
          })}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-2 gap-5 mt-2">
          
          {/* Location & Date - Spans 2 cols */}
          <div className="col-span-2 candy-yellow doodle-card p-6 relative group overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <Sun className="w-32 h-32 text-[#ED8936]" strokeWidth={1} />
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-[#E53E3E]" />
                  <span className="text-[16px] font-bold text-[#E53E3E] uppercase tracking-wider bubbly-font">Current Spot</span>
                </div>
                <h2 className="text-[48px] font-bold tracking-tight text-[#2D3748] leading-none bubbly-font">Melbourne</h2>
              </div>
              <div className="text-right flex flex-col items-end pt-2">
                <div className="text-xl font-bold bg-white px-3 py-1 doodle-card-alt text-[#2D3748] transform rotate-2">
                  24 Oct
                </div>
                <div className="text-[18px] font-bold text-[#DD6B20] mt-3 uppercase tracking-wide mr-1 transform -rotate-2">Thursday</div>
              </div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="doodle-card candy-blue p-5 flex flex-col justify-between aspect-[1/1.1] relative group">
            <div className="flex items-center justify-between">
              <div className="bg-white p-2 rounded-full border-2 border-[#2D3748] shadow-[2px_2px_0px_#2D3748] transform -rotate-6">
                 <Cloud className="w-10 h-10 text-[#3182CE] fill-[#EBF8FF]" strokeWidth={2} />
              </div>
              <div className="text-[13px] font-bold text-[#2D3748] uppercase tracking-widest bg-white px-2 py-1 doodle-card-alt transform rotate-3">Overcast</div>
            </div>
            <div className="mt-4">
              <div className="text-[72px] font-bold text-[#2D3748] tracking-tighter leading-none bubbly-font">21°</div>
              <div className="text-[17px] font-bold text-[#4A5568] mt-1 bubbly-font">Feels like 19°</div>
            </div>
          </div>

          {/* Outfit Recommendation Card */}
          <div className="candy-pink doodle-card-alt p-5 flex flex-col justify-between aspect-[1/1.1] relative group">
            <div className="flex justify-end">
              <div className="text-[13px] font-bold text-[#2D3748] uppercase tracking-widest bg-white px-2 py-1 doodle-card transform -rotate-3">Vibe Check</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10 my-2">
              <div className="text-[75px] leading-none transform rotate-6 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300">
                👕
              </div>
            </div>
            
            <div className="text-[18px] font-bold text-[#2D3748] text-center bg-white py-1 doodle-card transform rotate-2">
              T-shirt weather
            </div>
          </div>

          {/* Details Row */}
          <div className="col-span-2 grid grid-cols-2 gap-5">
            <div className="doodle-card candy-green p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-white doodle-card flex items-center justify-center text-[#38A169] flex-shrink-0">
                <Wind className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#2D3748] uppercase tracking-wider bubbly-font">Wind</div>
                <div className="text-2xl font-bold text-[#2D3748] bubbly-font">14 <span className="text-[16px] text-[#2D3748] font-bold">km/h</span></div>
              </div>
            </div>
            <div className="doodle-card candy-purple p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-white doodle-card flex items-center justify-center text-[#805AD5] flex-shrink-0 transform rotate-3">
                <Droplets className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#2D3748] uppercase tracking-wider bubbly-font">Humidity</div>
                <div className="text-2xl font-bold text-[#2D3748] bubbly-font">64<span className="text-[16px] text-[#2D3748] font-bold">%</span></div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="col-span-2 doodle-card bg-[#FFFDF0] p-6 mb-8">
            <div className="flex justify-between items-center mb-5 px-1">
              <h2 className="text-[18px] font-bold text-[#2D3748] uppercase tracking-widest flex items-center gap-2 bubbly-font">
                <Smile className="w-5 h-5 text-[#ED8936]" />
                7-Day Outlook
              </h2>
            </div>
            
            <div className="space-y-3">
              {FORECAST.map((day, i) => {
                const Icon = day.icon;
                const isToday = i === 0;
                return (
                  <div key={day.day} className={\`flex items-center justify-between p-3 transition-all \${isToday ? 'doodle-card candy-yellow' : 'border-b-2 border-dashed border-[#CBD5E0] hover:bg-white hover:border-[#2D3748]'}\`}>
                    <div className="w-16 font-bold text-[#2D3748] text-[18px] bubbly-font">
                      {day.day}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className={\`w-10 h-10 flex items-center justify-center transform \${i%2===0 ? 'rotate-6' : '-rotate-6'}\`}>
                        <Icon className={\`w-6 h-6 \${isToday ? 'text-[#DD6B20]' : 'text-[#4A5568]'}\`} strokeWidth={2.5} />
                      </div>
                      <span className={\`text-[17px] font-bold hidden sm:inline-block \${isToday ? 'text-[#2D3748]' : 'text-[#718096]'}\`}>
                        {day.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 w-24 justify-end">
                      <span className="font-bold text-[18px] text-[#2D3748] bubbly-font">{day.max}°</span>
                      <span className="font-bold text-[16px] text-[#A0AEC0] bubbly-font">{day.min}°</span>
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
