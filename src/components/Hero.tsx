
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Leaf, PawPrint, Dog, Heart, ExternalLink, X, Map as MapIcon, Navigation } from 'lucide-react';
import Reveal from './Reveal';
import { EVENT_DETAILS } from '../constants';

const Hero: React.FC = () => {
  const [showMapModal, setShowMapModal] = useState(false);

  const handleLocationClick = () => {
    if (EVENT_DETAILS.isTbd) {
      alert("O local exato será divulgado em breve! 🐾");
      return;
    }
    setShowMapModal(true);
  };

  const encodedAddress = encodeURIComponent(EVENT_DETAILS.address);
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section className="relative w-full bg-safari-cream pt-28 pb-0 overflow-hidden flex flex-col justify-center min-h-[85vh]">
      
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(#4A7c59 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-safari-green/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-safari-yellow/10 rounded-full blur-3xl transform -translate-x-1/3"></div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10 pb-20">
        <Reveal>
          <div className="flex flex-col items-center">
            
            <div className="relative mb-8 group">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-[1px] border-safari-dark/10 flex items-center justify-center relative bg-white shadow-2xl shadow-safari-green/10 overflow-hidden">
                
                <div className="absolute inset-3 rounded-full border border-dashed border-safari-yellow/40 z-20"></div>

                <span className="font-display font-bold text-[10rem] sm:text-[12rem] text-safari-dark/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] z-0 select-none">
                  F
                </span>

                <div className="relative z-10 flex items-end justify-center gap-1 mt-8">
                  <div className="flex flex-col items-center transform -rotate-6 transition-transform duration-500 group-hover:rotate-0">
                    <Dog size={52} className="text-safari-brown fill-safari-brown/10 sm:w-16 sm:h-16" strokeWidth={1.5} />
                  </div>

                  <Heart size={16} className="text-safari-green fill-safari-green mb-8 animate-bounce" />

                  <div className="flex flex-col items-center transform rotate-6 scale-x-[-1] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-x-[-1]">
                    <Dog size={48} className="text-safari-yellow fill-safari-yellow/20 sm:w-14 sm:h-14" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="absolute top-4 right-8 text-safari-green opacity-40">
                   <Leaf size={16} className="transform rotate-45" />
                </div>
                 <div className="absolute bottom-6 left-8 text-safari-green opacity-30">
                   <Leaf size={12} className="transform -rotate-45" />
                </div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 bg-safari-green text-white p-2 rounded-full shadow-sm">
                  <PawPrint size={16} fill="currentColor" />
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <span className="font-display text-safari-green font-bold tracking-widest uppercase text-sm sm:text-base">
                Vem aí o nosso pequeno
              </span>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-safari-dark drop-shadow-sm">
                Francisco
              </h1>
            </div>
            
            <p className="font-sans text-lg md:text-xl text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
              Com a proteção das irmãs de quatro patas e o carinho de toda a família.
            </p>
          </div>
        </Reveal>

        <Reveal className="w-full max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-2 sm:p-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:divide-x md:divide-gray-100">
            
            <div className="flex items-center justify-center gap-3 p-4 hover:bg-white/50 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-full bg-safari-green/10 flex items-center justify-center text-safari-green shrink-0">
                <Calendar size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Data</p>
                <p className="font-display text-safari-dark font-bold text-lg">{EVENT_DETAILS.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 hover:bg-white/50 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-full bg-safari-green/10 flex items-center justify-center text-safari-green shrink-0">
                <Clock size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Horário</p>
                <p className="font-display text-safari-dark font-bold text-lg">{EVENT_DETAILS.time}</p>
              </div>
            </div>

            <div 
              onClick={handleLocationClick}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl transition-colors relative group cursor-pointer ${EVENT_DETAILS.isTbd ? 'cursor-default' : 'hover:bg-safari-yellow/10'}`}
            >
              <div className="w-10 h-10 rounded-full bg-safari-green/10 flex items-center justify-center text-safari-green shrink-0 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  Local
                  {!EVENT_DETAILS.isTbd && <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                </p>
                <p className="font-display text-safari-dark font-bold text-lg leading-tight">{EVENT_DETAILS.locationName}</p>
              </div>
            </div>

          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden z-20">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] sm:h-[100px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {showMapModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-safari-dark/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative shadow-2xl overflow-hidden">
            
            <button 
              onClick={() => setShowMapModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6 pt-2">
              <div className="w-16 h-16 bg-safari-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-safari-green">
                <MapPin size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-safari-dark">Como quer ir?</h3>
              <p className="text-sm text-gray-500 mt-2 px-4">
                {EVENT_DETAILS.address}
              </p>
            </div>

            <div className="space-y-3">
              <a 
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#33CCFF] hover:bg-[#2DB3E0] text-white font-bold py-3.5 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
              >
                <Navigation size={20} />
                Abrir no Waze
              </a>

              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition-all"
              >
                <MapIcon size={20} />
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
