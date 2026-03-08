
import React, { useState, useEffect, useCallback } from 'react';
import { PHOTO_GALLERY } from '../constants';
import { Images, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const PhotoAlbum: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof PHOTO_GALLERY[0] | null>(null);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    
    const currentIndex = PHOTO_GALLERY.findIndex(p => p.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % PHOTO_GALLERY.length;
    setSelectedImage(PHOTO_GALLERY[nextIndex]);
  }, [selectedImage]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;

    const currentIndex = PHOTO_GALLERY.findIndex(p => p.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + PHOTO_GALLERY.length) % PHOTO_GALLERY.length;
    setSelectedImage(PHOTO_GALLERY[prevIndex]);
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleNext, handlePrev]);

  return (
    <section id="album" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-safari-green/10 text-safari-dark rounded-full font-bold text-sm mb-4 tracking-wider shadow-sm border border-safari-green/20">
            <Images size={14} /> 
            <span>REGISTROS</span>
          </div>
          <h2 className="font-display text-4xl font-bold text-safari-dark mb-4">Álbum de Família</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Alguns momentos especiais dessa nossa doce espera.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PHOTO_GALLERY.map((photo, index) => (
            <Reveal key={photo.id} delay={index * 100} className="h-full">
              <div 
                className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setSelectedImage(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full text-safari-dark transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={24} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white font-display text-sm font-bold truncate">{photo.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {PHOTO_GALLERY.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <Images size={48} className="mx-auto text-gray-300 mb-4" />
             <p className="text-gray-400 font-bold">As fotos serão adicionadas em breve!</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in touch-none">
          
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
            title="Fechar (Esc)"
          >
            <X size={28} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-16" onClick={() => setSelectedImage(null)}>
            
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
              title="Foto Anterior (Seta Esquerda)"
            >
              <ChevronLeft size={32} />
            </button>

            <div 
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption} 
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain select-none"
              />
              <p className="text-white font-display text-lg md:text-xl mt-4 font-bold tracking-wide text-center">
                {selectedImage.caption}
              </p>
              <p className="text-white/40 text-xs mt-2">
                {PHOTO_GALLERY.findIndex(p => p.id === selectedImage.id) + 1} de {PHOTO_GALLERY.length}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
              title="Próxima Foto (Seta Direita)"
            >
              <ChevronRight size={32} />
            </button>

          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoAlbum;
