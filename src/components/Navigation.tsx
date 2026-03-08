
import React, { useState, useEffect } from 'react';
import { Gift, PawPrint, CheckCircle, MessageSquareHeart, Map, X, ChevronRight, Tent, Menu, Images } from 'lucide-react';
import RsvpModal from './RsvpModal';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 border-b ${
          scrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-200 py-3' 
            : 'bg-safari-cream/80 backdrop-blur-sm border-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 h-12 md:h-auto">
            
            <div className="flex justify-start items-center gap-3 md:gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 -ml-2 flex items-center justify-center text-safari-dark hover:bg-black/5 rounded-full transition-colors relative"
                aria-label="Alternar menu"
              >
                 <div className="relative w-6 h-6">
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                      <Menu size={24} />
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                      <X size={24} />
                    </span>
                 </div>
              </button>

              <div className="hidden md:flex w-11 h-11 bg-safari-yellow rounded-xl rotate-3 items-center justify-center text-safari-dark shadow-sm shrink-0 transition-transform hover:rotate-6">
                 <PawPrint size={22} />
              </div>

              <div 
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => scrollToSection('top')}
              >
                <div className="md:hidden text-safari-yellow transform -rotate-12">
                  <PawPrint size={22} fill="currentColor" className="opacity-90" />
                </div>

                <div className="flex flex-col items-center md:items-start">
                  <span className="font-display font-bold text-xl md:text-2xl text-safari-dark leading-none">Francisco</span>
                  <span className="text-[9px] md:text-[11px] font-bold text-safari-green tracking-[0.2em] uppercase block mt-0.5">Chá de Fraldas</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex justify-center w-full">
              <div className="flex items-center gap-1 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm px-2">
                <button 
                  onClick={() => scrollToSection('historia')} 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-safari-dark hover:bg-gray-100 transition-all whitespace-nowrap"
                >
                  <Map size={16} className="text-safari-brown opacity-70" />
                  História
                </button>
                <div className="w-px h-4 bg-gray-200"></div>
                <button 
                  onClick={() => scrollToSection('album')} 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-safari-dark hover:bg-gray-100 transition-all whitespace-nowrap"
                >
                  <Images size={16} className="text-safari-green opacity-90" />
                  Fotos
                </button>
                <div className="w-px h-4 bg-gray-200"></div>
                <button 
                  onClick={() => scrollToSection('presentes')} 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-safari-dark hover:bg-gray-100 transition-all whitespace-nowrap"
                >
                  <Gift size={16} className="text-safari-yellow opacity-100" />
                  Lista
                </button>
                <div className="w-px h-4 bg-gray-200"></div>
                <button 
                  onClick={() => scrollToSection('mensagens')} 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-safari-dark hover:bg-gray-100 transition-all whitespace-nowrap"
                >
                  <MessageSquareHeart size={16} className="text-orange-400 opacity-80" />
                  Mural
                </button>
              </div>
            </div>

            <div className="flex justify-end items-center gap-2 sm:gap-3">
              <button 
                onClick={() => setIsRsvpOpen(true)}
                className="flex items-center justify-center gap-2 h-10 md:h-11 px-4 md:px-6 rounded-full bg-safari-dark text-white font-bold text-sm hover:bg-green-800 transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <CheckCircle size={18} />
                <span className="hidden md:inline">Confirmar Presença</span>
                <span className="md:hidden text-xs">Confirmar</span>
              </button>

              <button 
                onClick={() => scrollToSection('presentes')}
                className="hidden md:flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-safari-yellow text-safari-dark font-bold text-sm shadow-md shadow-orange-100 hover:shadow-lg hover:bg-[#F5D880] hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <Gift size={18} />
                <span>Presentear</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        
        <div 
          className={`absolute inset-0 bg-safari-dark/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[300px] bg-safari-cream shadow-2xl transform transition-transform duration-300 ease-out flex flex-col pt-[72px] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <button 
              onClick={() => scrollToSection('top')}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-transparent hover:border-safari-green/20 active:scale-[0.98] transition-all group"
            >
              <div className="bg-safari-green/10 text-safari-dark p-3 rounded-xl group-hover:bg-safari-green group-hover:text-white transition-colors">
                <Tent size={22} />
              </div>
              <div className="text-left flex-1">
                <span className="font-display font-bold text-gray-800 block group-hover:text-safari-dark transition-colors">Início</span>
                <span className="text-xs text-gray-400">Acampamento Base</span>
              </div>
            </button>

            <button 
              onClick={() => scrollToSection('historia')}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-transparent hover:border-safari-green/20 active:scale-[0.98] transition-all group"
            >
              <div className="bg-safari-brown/10 text-safari-brown p-3 rounded-xl group-hover:bg-safari-brown group-hover:text-white transition-colors">
                <Map size={22} />
              </div>
              <div className="text-left flex-1">
                <span className="font-display font-bold text-gray-800 block group-hover:text-safari-dark transition-colors">Nossa História</span>
                <span className="text-xs text-gray-400">Mapa da Jornada</span>
              </div>
            </button>

            <button 
              onClick={() => scrollToSection('album')}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-transparent hover:border-safari-green/20 active:scale-[0.98] transition-all group"
            >
              <div className="bg-safari-green/10 text-safari-dark p-3 rounded-xl group-hover:bg-safari-green group-hover:text-white transition-colors">
                <Images size={22} />
              </div>
              <div className="text-left flex-1">
                <span className="font-display font-bold text-gray-800 block group-hover:text-safari-dark transition-colors">Álbum de Fotos</span>
                <span className="text-xs text-gray-400">Momentos especiais</span>
              </div>
            </button>

            <button 
              onClick={() => scrollToSection('presentes')}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-transparent hover:border-safari-green/20 active:scale-[0.98] transition-all group"
            >
              <div className="bg-safari-yellow/20 text-safari-brown p-3 rounded-xl group-hover:bg-safari-yellow group-hover:text-safari-dark transition-colors">
                <Gift size={22} />
              </div>
              <div className="text-left flex-1">
                <span className="font-display font-bold text-gray-800 block group-hover:text-safari-dark transition-colors">Lista de Presentes</span>
                <span className="text-xs text-gray-400">Mimos para o Francisco</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>

            <button 
              onClick={() => scrollToSection('mensagens')}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-transparent hover:border-safari-green/20 active:scale-[0.98] transition-all group"
            >
              <div className="bg-orange-50 text-orange-500 p-3 rounded-xl group-hover:bg-orange-100 transition-colors">
                <MessageSquareHeart size={22} />
              </div>
              <div className="text-left flex-1">
                <span className="font-display font-bold text-gray-800 block group-hover:text-safari-dark transition-colors">Mural de Recados</span>
                <span className="text-xs text-gray-400">Deixe sua mensagem</span>
              </div>
            </button>
          </div>

          <div className="p-6 bg-white border-t border-gray-100">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsRsvpOpen(true);
              }}
              className="w-full bg-safari-dark text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform hover:bg-green-800"
            >
              <CheckCircle size={22} />
              Confirmar Presença
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 font-display">
              Feito com carinho para o Francisco 🦁
            </p>
          </div>
        </div>
      </div>

      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
    </>
  );
};

export default Navigation;
