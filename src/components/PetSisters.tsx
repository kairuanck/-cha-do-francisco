
import React from 'react';
import { PawPrint, Heart, Star, Zap, Shield } from 'lucide-react';
import Reveal from './Reveal';
import { PET_IMAGES } from '../constants';

const PetSisters: React.FC = () => {
  return (
    <section className="py-20 bg-safari-cream relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 transform -rotate-12"><PawPrint size={60} /></div>
        <div className="absolute top-40 left-32 transform rotate-12"><PawPrint size={60} /></div>
        <div className="absolute top-80 left-10 transform -rotate-45"><PawPrint size={60} /></div>
        
        <div className="absolute bottom-10 right-10 transform rotate-12"><PawPrint size={60} /></div>
        <div className="absolute bottom-40 right-32 transform -rotate-12"><PawPrint size={60} /></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 mb-5 text-safari-brown text-xs font-bold uppercase tracking-widest">
             <PawPrint size={12} /> Equipe de Segurança
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-safari-dark mb-4">As Irmãs Guardiãs</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            O Francisco já tem quem cuide dele. <br className="hidden md:block" />Conheça a nossa equipe de apoio oficial.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto items-start">
          
          <Reveal delay={100} className="relative group">
            <div className="bg-white p-4 pb-6 rounded-3xl shadow-xl transform transition-all duration-500 hover:-rotate-1 hover:scale-[1.02] border-b-4 border-r-4 border-gray-100/50">
              
              <div className="absolute -top-3 -left-3 z-20">
                <div className="bg-safari-green text-white font-display font-bold text-xs px-3 py-1.5 rounded-full shadow-md transform -rotate-12 flex items-center gap-1 border-2 border-white">
                  <Shield size={12} /> Guarda-Costas
                </div>
              </div>

              <div className="w-full max-w-[300px] md:max-w-none mx-auto aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl bg-gray-100 relative mb-5">
                <img 
                  src={PET_IMAGES.mel}
                  alt="Mel" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none"></div>
              </div>

              <div className="text-center px-2">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-3xl text-safari-dark">Mel</h3>
                  <Heart size={20} className="text-safari-brown fill-safari-brown animate-pulse" />
                </div>
                <p className="text-gray-500 text-sm italic mb-4">"Ninguém chega perto do berço sem minha autorização."</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-safari-green/10 text-safari-dark text-xs font-bold rounded-lg border border-safari-green/20">
                    Paciência: 100%
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg border border-gray-100">
                    Protetora
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg border border-gray-100">
                    Zen
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300} className="relative group md:mt-12">
            <div className="bg-white p-4 pb-6 rounded-3xl shadow-xl transform transition-all duration-500 hover:rotate-1 hover:scale-[1.02] border-b-4 border-r-4 border-gray-100/50">
              
              <div className="absolute -top-3 -right-3 z-20">
                <div className="bg-safari-yellow text-safari-dark font-display font-bold text-xs px-3 py-1.5 rounded-full shadow-md transform rotate-12 flex items-center gap-1 border-2 border-white">
                  <Star size={12} fill="currentColor" /> Animadora
                </div>
              </div>

              <div className="w-full max-w-[300px] md:max-w-none mx-auto aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl bg-gray-100 relative mb-5">
                <img 
                  src={PET_IMAGES.bolacha}
                  alt="Bolacha" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none"></div>
              </div>

              <div className="text-center px-2">
                 <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-3xl text-safari-dark">Bolacha</h3>
                  <Zap size={20} className="text-safari-yellow fill-safari-yellow animate-pulse" />
                </div>
                <p className="text-gray-500 text-sm italic mb-4">"Já separei meus brinquedos para dividir (ou não)."</p>

                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-safari-yellow/20 text-safari-brown text-xs font-bold rounded-lg border border-safari-yellow/30">
                    Energia: Infinita
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg border border-gray-100">
                    Brincalhona
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg border border-gray-100">
                    Fiscal de Petisco
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default PetSisters;
