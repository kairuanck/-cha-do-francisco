import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PHOTO_GALLERY } from '../constants';
import { Images, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const PhotoAlbum: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof PHOTO_GALLERY[0] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;
    if (carouselRef.current) carouselRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: direction === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <section id="album" className="py-24 bg-white relative overflow-hidden">
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
          <p className="text-gray-400 text-sm mt-2 flex items-center justify-center gap-1">
            <ChevronLeft size={14} /> arraste para navegar <ChevronRight size={14} />
          </p>
        </Reveal>

        <div className="relative">
          <button
            onClick={() => scrollCarousel('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-safari-dark hover:bg-safari-green hover:text-white transition-all border border-gray-100"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{
              cursor: 'grab',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {PHOTO_GALLERY.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative flex-shrink-0 w-64 md:w-72 aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => !isDragging.current && setSelectedImage(photo)}
                style={{ userSelect: 'none' }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  draggable={false}
                />

                <div className="absolute top-3 left-3 w-7 h-7 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full text-safari-dark transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={24} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-display text-sm font-bold line-clamp-2 leading-tight">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-safari-dark hover:bg-safari-green hover:text-white transition-all border border-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-1">
          {PHOTO_GALLERY.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-safari-green/30" />
          ))}
        </div>

      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in touch-none">

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
          >
            <X size={28} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-16" onClick={() => setSelectedImage(null)}>

            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
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
              <p className="text-white font-display text-lg md:text-xl mt-4 font-bold tracking-wide text-center px-4">
                {selectedImage.caption}
              </p>
              <p className="text-white/40 text-xs mt-2">
                {PHOTO_GALLERY.findIndex(p => p.id === selectedImage.id) + 1} de {PHOTO_GALLERY.length}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
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
