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
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen font-sans selection:bg-safari-green/30"
      style={{ backgroundColor: '#F9F7F2', colorScheme: 'light' }}
    >
      <Navigation />

      <main style={{ backgroundColor: '#F9F7F2' }}>
        <Hero />
        <StoryTimeline />
        <PhotoAlbum />
        <PetSisters />
        <GiftRegistry />
        <GuestBook />
      </main>

      <footer className="text-white pt-20 pb-10 relative overflow-hidden" style={{ backgroundColor: '#4A7c59' }}>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-safari-green via-safari-yellow to-safari-green opacity-30"></div>
        <div className="absolute -right-10 top-20 text-white opacity-[0.03] transform rotate-12">
          <PawPrint size={200} />
        </div>
        <div className="absolute -left-10 bottom-10 text-white opacity-[0.03] transform -rotate-12">
          <PawPrint size={150} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-white/10 pb-12">

            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold border border-white/5" style={{ color: '#F2D06B' }}>
                <Heart size={12} fill="currentColor" />
                <span>Feito com amor</span>
              </div>
              <h2 className="font-display text-3xl font-bold" style={{ color: '#ffffff' }}>Chá do Francisco</h2>
              <p className="leading-relaxed text-sm max-w-sm mx-auto md:mx-0" style={{ color: 'rgba(139,191,159,0.7)' }}>
                Este site não é apenas um convite, é o primeiro capítulo digital da vida do nosso pequeno. Desenvolvido linha por linha pelo Papai e pela Mamãe, com todo o carinho do mundo.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-4">
              <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#ffffff' }}>Navegação</h3>
              <div className="flex flex-col gap-3 text-sm" style={{ color: '#d1d5db' }}>
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

            <div className="flex flex-col items-center md:items-end justify-center space-y-6">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-3 px-6 py-3 border border-white/10 rounded-xl transition-all hover:-translate-y-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <span className="text-sm font-bold" style={{ color: '#e5e7eb' }}>Voltar ao topo</span>
                <div className="p-1.5 rounded-lg text-white transition-colors" style={{ backgroundColor: '#8BBF9F' }}>
                  <ArrowUp size={16} />
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-xs gap-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <p>© {new Date().getFullYear()} Francisco's Baby Shower. Todos os direitos reservados.</p>
            <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
              <span>Design & Code by</span>
              <strong style={{ color: '#F2D06B' }}>Papai & Mamãe</strong>
            </div>
          </div>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
}

export default App;
