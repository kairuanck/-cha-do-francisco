import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StoryTimeline from './components/StoryTimeline';
import PhotoAlbum from './components/PhotoAlbum';
import PetSisters from './components/PetSisters';
import GiftRegistry from './components/GiftRegistry';
import GuestBook from './components/GuestBook';
import MusicPlayer from './components/MusicPlayer';
import { Heart, ArrowUp, PawPrint } from 'lucide-react';

function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-safari-green/30">
      <Navigation />
      
      <main>
        <Hero />
        <StoryTimeline />
        <PhotoAlbum />
        <PetSisters />
        <GiftRegistry />
        <GuestBook />
      </main>

      <footer className="bg-safari-dark text-white pt-20 pb-10 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-safari-green via-safari-yellow to-safari-green opacity-30"></div>
        <div className="absolute -right-10 top-20 text-white opacity-[0.03] transform rotate-12">
           <PawPrint size={200} />
        </div>
        <div className="absolute -left-10 bottom-10 text-white opacity-[0.03] transform -rotate-12">
           <PawPrint size={150} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-white/10 pb-12">
            
            {/* Coluna 1: A Declaração */}
            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-safari-yellow mb-2 border border-white/5">
                <Heart size={12} fill="currentColor" />
                <span>Feito com amor</span>
              </div>
              <h2 className="font-display text-3xl font-bold">Chá do Francisco</h2>
              <p className="text-safari-green/70 leading-relaxed text-sm max-w-sm mx-auto md:mx-0">
                Este site não é apenas um convite, é o primeiro capítulo digital da vida do nosso pequeno. Desenvolvido linha por linha pelo Papai e pela Mamãe, com todo o carinho do mundo.
              </p>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h3 className="font-display font-bold text-lg mb-2">Navegação</h3>
              <div className="flex flex-col gap-3 text-sm text-gray-300">
                <button onClick={() => scrollToSection('historia')} className="hover:text-safari-yellow transition-colors text-left flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-safari-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Nossa História
                </button>
                <button onClick={() => scrollToSection('presentes')} className="hover:text-safari-yellow transition-colors text-left flex items-center gap-2 group">
                   <span className="w-1 h-1 bg-safari-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Lista de Presentes
                </button>
                 <button onClick={() => scrollToSection('mensagens')} className="hover:text-safari-yellow transition-colors text-left flex items-center gap-2 group">
                   <span className="w-1 h-1 bg-safari-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Mural de Recados
                </button>
              </div>
            </div>

            {/* Coluna 3: Ação */}
            <div className="flex flex-col items-center md:items-end justify-center space-y-6">
              <button 
                onClick={scrollToTop}
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:-translate-y-1"
              >
                <span className="text-sm font-bold text-gray-200 group-hover:text-white">Voltar ao topo</span>
                <div className="bg-safari-green p-1.5 rounded-lg text-white group-hover:bg-safari-yellow group-hover:text-safari-dark transition-colors">
                  <ArrowUp size={16} />
                </div>
              </button>
            </div>
          </div>

          {/* Copyright e Créditos */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <p>© {new Date().getFullYear()} Francisco's Baby Shower. Todos os direitos reservados.</p>
            
            <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
               <span>Design & Code by</span>
               <strong className="text-safari-yellow">Papai & Mamãe</strong>
            </div>
          </div>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
}

export default App;
