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
  Umbrella,
  ThermometerSun,
  Menu,
  Fish
} from 'lucide-react';

const FAVORITES = ['Sydney', 'Gold Coast', 'Byron Bay', 'Noosa'];

const FORECAST = [
  { day: 'TODAY', max: 21, min: 14, icon: Cloud, desc: 'Overcast' },
  { day: 'FRI', max: 18, min: 12, icon: CloudRain, desc: 'Rainy' },
  { day: 'SAT', max: 16, min: 10, icon: CloudRain, desc: 'Showers' },
  { day: 'SUN', max: 19, min: 11, icon: CloudSun, desc: 'Partly Cloudy' },
  { day: 'MON', max: 24, min: 13, icon: Sun, desc: 'Sunny' },
  { day: 'TUE', max: 28, min: 15, icon: Sun, desc: 'Hot!' },
  { day: 'WED', max: 22, min: 14, icon: CloudSun, desc: 'Mostly Sunny' },
];

export function SeussHatCat() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#FDF8E1] text-[#000000] p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ fontFamily: '"Comic Neue", cursive' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Comic+Neue:wght@400;700;900&display=swap');
        
        .font-seuss {
          font-family: 'Luckiest Guy', cursive;
          letter-spacing: 0.05em;
        }

        .seuss-border {
          border: 4px solid #000;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 6px 6px 0px #000;
        }

        .seuss-border-alt {
          border: 4px solid #000;
          border-radius: 15px 225px 15px 255px/255px 15px 225px 15px;
          box-shadow: -4px 6px 0px #000;
        }

        .seuss-border-round {
          border: 4px solid #000;
          border-radius: 50% 40% 50% 40% / 40% 50% 40% 50%;
          box-shadow: 4px 4px 0px #000;
        }

        .stripes-bg {
          background: repeating-linear-gradient(
            0deg,
            #E53935,
            #E53935 20px,
            #FFFFFF 20px,
            #FFFFFF 40px
          );
        }

        .stripes-bg-tilt {
          background: repeating-linear-gradient(
            -15deg,
            #E53935,
            #E53935 15px,
            #FFFFFF 15px,
            #FFFFFF 30px
          );
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-6 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-2 px-2">
          <h1 className="text-3xl font-seuss text-[#E53935] drop-shadow-[2px_2px_0_#000] tracking-wider transform -rotate-2">
            Better Than BoM!
          </h1>
          <button className="w-12 h-12 bg-[#FFEB3B] seuss-border-round flex items-center justify-center transform hover:rotate-12 transition-transform">
            <Menu className="w-6 h-6 text-black" strokeWidth={3} />
          </button>
        </div>

        {/* Search Bowl */}
        <div className="bg-[#81D4FA] seuss-border p-3 flex items-center gap-3 relative overflow-hidden transform rotate-1">
          <div className="absolute top-2 right-4 w-4 h-4 rounded-full border-2 border-black bg-white/50 animate-bounce"></div>
          <div className="absolute top-6 right-8 w-2 h-2 rounded-full border-2 border-black bg-white/50 animate-pulse"></div>
          
          <Search className="w-6 h-6 text-black flex-shrink-0" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search for a spot..." 
            className="bg-transparent border-none outline-none w-full text-lg font-bold text-black placeholder:text-black/60 font-seuss tracking-wide"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Favorites (Little Fish) */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex-shrink-0 flex items-center gap-2 transform -rotate-3">
            <Star className="w-6 h-6 fill-[#FFEB3B] text-black" strokeWidth={2} />
          </div>
          {FAVORITES.map((fav, i) => (
            <button key={fav} className={`flex-shrink-0 bg-${['#FF5252', '#448AFF', '#FFEB3B', '#69F0AE'][i % 4]} text-black seuss-border-round px-5 py-2 text-lg font-seuss transform ${i % 2 === 0 ? 'rotate-3' : '-rotate-2'} hover:scale-110 transition-transform flex items-center gap-2`}>
              <Fish className="w-4 h-4" strokeWidth={2.5} />
              {fav}
            </button>
          ))}
        </div>

        {/* Main Hat Stack */}
        <div className="relative mt-8">
          
          {/* Location Card */}
          <div className="bg-[#448AFF] seuss-border p-6 relative z-30 transform -rotate-2 mb-[-10px] hover:-translate-y-2 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-black" strokeWidth={3} />
                  <span className="text-xl font-seuss text-black uppercase">We Are Here!</span>
                </div>
                <h2 className="text-[46px] font-seuss text-white drop-shadow-[3px_3px_0_#000] leading-none mb-2">Melbourne</h2>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-2xl font-seuss bg-[#FFEB3B] seuss-border-round px-3 py-1 text-black transform rotate-6">
                  24 OCT
                </div>
              </div>
            </div>
          </div>

          {/* Temperature "Hat" Card */}
          <div className="stripes-bg seuss-border-alt p-6 flex flex-col justify-between relative z-20 pt-10 pb-8 transform rotate-1 mb-[-15px]">
            <div className="bg-white seuss-border p-4 flex items-center justify-between transform -rotate-2">
              <Cloud className="w-12 h-12 text-black fill-[#E0E0E0]" strokeWidth={2} />
              <div className="text-2xl font-seuss text-black uppercase bg-[#FFEB3B] px-3 py-1 seuss-border-round transform rotate-3">
                Overcast!
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <div className="bg-white seuss-border-round w-40 h-40 flex flex-col items-center justify-center transform rotate-3">
                <div className="text-[70px] font-seuss text-black leading-none -ml-2 drop-shadow-[2px_2px_0_#FFEB3B]">21°</div>
                <div className="text-xl font-bold text-black font-seuss">Feels like 19°</div>
              </div>
            </div>
          </div>

          {/* Outfit Recommendation */}
          <div className="bg-[#69F0AE] seuss-border p-6 relative z-10 pt-8 transform -rotate-1">
            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-seuss text-black uppercase transform -rotate-2 bg-white px-3 py-1 seuss-border-round">
                What to wear?
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <div className="text-[60px] filter drop-shadow-[4px_4px_0_#000] transform hover:rotate-12 transition-transform">
                👕
              </div>
              <div className="text-2xl font-seuss text-black bg-white seuss-border p-3 transform rotate-2">
                T-Shirt Weather!
              </div>
            </div>
          </div>

        </div>

        {/* 7-Day Forecast Book Page */}
        <div className="bg-white seuss-border p-6 relative mt-8 transform rotate-1">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/10 rounded-full"></div>
          
          <h2 className="text-2xl font-seuss text-black uppercase mb-6 flex items-center gap-2 transform -rotate-1">
            <CloudSun className="w-8 h-8" strokeWidth={2.5} />
            The Days Ahead!
          </h2>
          
          <div className="space-y-3">
            {FORECAST.map((day, i) => {
              const Icon = day.icon;
              const isToday = i === 0;
              return (
                <div key={day.day} className={`flex items-center justify-between p-3 border-b-4 border-dashed border-black/20 hover:bg-[#FDF8E1] transition-colors ${isToday ? 'bg-[#FFEB3B] seuss-border transform -rotate-1 scale-105 my-4' : ''}`}>
                  <div className={`w-16 font-seuss text-xl ${isToday ? 'text-[#E53935]' : 'text-black'}`}>
                    {day.day}
                  </div>
                  
                  <div className="flex-1 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center ${isToday ? 'bg-white' : 'bg-[#E0F7FA]'}`}>
                      <Icon className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold hidden sm:inline-block">
                      {day.desc}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 w-32 justify-end font-seuss text-xl">
                    <div className="bg-[#E53935] text-white px-2 py-1 rounded border-2 border-black transform rotate-2">
                      {day.max}°
                    </div>
                    <div className="bg-[#448AFF] text-white px-2 py-1 rounded border-2 border-black transform -rotate-2">
                      {day.min}°
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}
