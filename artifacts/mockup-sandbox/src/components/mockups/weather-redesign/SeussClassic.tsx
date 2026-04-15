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
  Umbrella
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

export function SeussClassic() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen text-[#000000] p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto" style={{ 
      fontFamily: '"Patrick Hand", cursive',
      backgroundImage: 'url(/__mockup/images/seuss-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Patrick+Hand&display=swap');
        
        .seuss-font-bold {
          font-family: 'Luckiest Guy', cursive;
          letter-spacing: 1px;
        }

        .seuss-card {
          background: #ffffff;
          border: 4px solid #000000;
          border-radius: 20px 40px 15px 35px;
          box-shadow: 6px 6px 0px #000000;
          transition: transform 0.2s ease-in-out;
        }

        .seuss-card:hover {
          transform: rotate(2deg) scale(1.02);
        }

        .seuss-input {
          border: 4px solid #000000;
          border-radius: 30px 10px 25px 15px;
          box-shadow: 4px 4px 0px #000000;
        }

        .seuss-stripe-bg {
          background: repeating-linear-gradient(
            -45deg,
            #E63946,
            #E63946 20px,
            #ffffff 20px,
            #ffffff 40px
          );
        }

        .seuss-button {
          border: 3px solid #000000;
          border-radius: 15px 25px 10px 30px;
          box-shadow: 4px 4px 0px #000000;
          transition: transform 0.1s;
        }

        .seuss-button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #000000;
        }

        .wobbly-border {
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
        }
      `}} />

      <div className="w-full max-w-[420px] space-y-6 relative">
        
        {/* Header & Search */}
        <div className="flex flex-col gap-4 mb-2">
          <div className="seuss-card seuss-stripe-bg p-4 transform -rotate-2">
            <h1 className="seuss-font-bold text-4xl text-center text-white" style={{
              textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}>
              Better Than BoM!
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white seuss-input p-2 rotate-1">
            <Search className="w-6 h-6 text-black ml-2 flex-shrink-0" strokeWidth={3} />
            <input 
              type="text" 
              placeholder="Where to, you ask?..." 
              className="bg-transparent border-none outline-none w-full text-xl font-bold text-black placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Favorites Bar */}
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button className="flex-shrink-0 bg-[#FFB703] text-black font-bold px-5 py-2 seuss-button flex items-center gap-2 text-lg transform rotate-2">
            <Star className="w-5 h-5 fill-black" strokeWidth={2} />
            Saved Spots
          </button>
          {FAVORITES.map((fav, i) => (
            <button key={fav} className={`flex-shrink-0 bg-white text-black px-5 py-2 text-lg font-bold seuss-button transform ${i % 2 === 0 ? '-rotate-2' : 'rotate-3'}`}>
              {fav}
            </button>
          ))}
        </div>

        {/* Location & Date */}
        <div className="seuss-card bg-[#FFB703] p-6 transform -rotate-1 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-black" strokeWidth={2.5} />
                <span className="text-xl font-bold text-black">Here We Are!</span>
              </div>
              <h2 className="seuss-font-bold text-5xl text-black leading-none mt-1">
                Melbourne
              </h2>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="text-2xl font-bold bg-white px-3 py-1 seuss-button transform rotate-3 inline-block text-black">
                24 Oct
              </div>
              <div className="text-xl font-bold text-black mt-2 transform -rotate-2">Thursday</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Temperature Card */}
          <div className="seuss-card bg-[#8ECAE6] p-4 flex flex-col items-center justify-center transform rotate-2 relative">
            <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-4 -translate-y-4">
              <img src="/__mockup/images/seuss-hat.png" alt="Seuss Hat" className="w-full h-full object-contain filter drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" />
            </div>
            <div className="flex items-center justify-center bg-white border-4 border-black wobbly-border p-2 mb-2 transform -rotate-3">
              <Cloud className="w-10 h-10 text-black fill-white" strokeWidth={2} />
            </div>
            <div className="text-lg font-bold text-black bg-white px-3 py-1 border-2 border-black rounded-xl transform rotate-2 mb-2">Overcast</div>
            <div className="seuss-font-bold text-6xl text-black leading-none">21°</div>
            <div className="text-lg font-bold text-black mt-1 bg-[#FFB703] px-2 border-2 border-black rounded-lg transform -rotate-2">Feels 19°</div>
          </div>

          {/* Outfit Recommendation */}
          <div className="seuss-card bg-[#219EBC] p-4 flex flex-col items-center justify-between transform -rotate-3">
            <div className="text-sm font-bold text-black bg-[#FFB703] px-3 py-1 border-2 border-black wobbly-border transform rotate-2">
              What to wear?
            </div>
            <div className="text-7xl transform rotate-12 my-2 drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
              👕
            </div>
            <div className="text-xl font-bold text-white bg-black px-3 py-2 border-2 border-white wobbly-border text-center transform -rotate-2">
              T-Shirt Weather!
            </div>
          </div>
        </div>

        {/* Details Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="seuss-card bg-white p-4 flex items-center gap-3 transform rotate-1">
            <div className="w-12 h-12 bg-[#FFB703] border-3 border-black wobbly-border flex items-center justify-center text-black flex-shrink-0">
              <Wind className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-600">Wind Blows</div>
              <div className="seuss-font-bold text-2xl text-black">14 <span className="font-sans text-sm font-bold">km/h</span></div>
            </div>
          </div>
          <div className="seuss-card bg-white p-4 flex items-center gap-3 transform -rotate-2">
            <div className="w-12 h-12 bg-[#8ECAE6] border-3 border-black wobbly-border flex items-center justify-center text-black flex-shrink-0">
              <Droplets className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-600">Wetness</div>
              <div className="seuss-font-bold text-2xl text-black">64<span className="font-sans text-sm font-bold">%</span></div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="seuss-card bg-white p-5 transform rotate-1 mb-8">
          <h2 className="seuss-font-bold text-2xl text-black mb-4 flex items-center gap-2">
            <Umbrella className="w-6 h-6" strokeWidth={2.5} />
            The Days Ahead!
          </h2>
          
          <div className="space-y-3">
            {FORECAST.map((day, i) => {
              const Icon = day.icon;
              const isToday = i === 0;
              return (
                <div key={day.day} className={`flex items-center justify-between p-3 border-3 border-black wobbly-border ${isToday ? 'bg-[#FFB703]' : 'bg-[#F1FAEE]'} transform ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} transition-transform hover:scale-105`}>
                  <div className="w-14 seuss-font-bold text-xl text-black">
                    {day.day}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className={`w-10 h-10 bg-white border-2 border-black wobbly-border flex items-center justify-center text-black transform ${i % 2 !== 0 ? 'rotate-6' : '-rotate-6'}`}>
                      <Icon className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold text-black hidden sm:inline-block">
                      {day.desc}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 w-24 justify-end">
                    <span className="seuss-font-bold text-xl text-[#E63946] drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">{day.max}°</span>
                    <span className="seuss-font-bold text-lg text-[#457B9D] drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">{day.min}°</span>
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
