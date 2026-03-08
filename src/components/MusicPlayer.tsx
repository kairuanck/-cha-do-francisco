import React, { useRef, useState, useEffect } from 'react';
import { Music, Play, Volume2, VolumeX, Heart, Loader2 } from 'lucide-react';
import { BACKGROUND_MUSIC_URL } from '../constants';

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(BACKGROUND_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Autoplay prevented:", e));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleStart = async (withMusic: boolean) => {
    if (withMusic && audioRef.current) {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch (e) {
        console.error("Playback failed", e);
        setIsPlaying(false);
        setHasStarted(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setHasStarted(true);
    }
  };

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-safari-cream flex flex-col items-center justify-center p-4 text-center">
        <div className="animate-fade-in max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border-4 border-white ring-1 ring-gray-100 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-safari-green"></div>
          <div className="absolute -right-10 -top-10 text-safari-yellow/10">
            <Heart size={150} fill="currentColor" />
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-safari-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <Music size={32} className="text-safari-dark animate-pulse" />
            </div>

            <h1 className="font-display text-3xl font-bold text-safari-dark mb-2">Chá do Francisco</h1>
            <p className="text-gray-500 mb-8">Prepare-se para uma dose de fofura!<br/>Deseja ativar a música?</p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleStart(true)}
                disabled={isLoading}
                className="w-full bg-safari-green hover:bg-safari-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Carregando música...
                  </>
                ) : (
                  <>
                    <Play size={20} fill="currentColor" />
                    Sim, entrar com música
                  </>
                )}
              </button>
              
              <button 
                onClick={() => handleStart(false)}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-400 font-bold py-3 rounded-xl border border-gray-200 transition-colors text-sm"
              >
                Entrar sem som
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 animate-fade-in">
      <div className={`transition-all duration-300 ${isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
        <button 
          onClick={toggleMute}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-white hover:bg-white text-safari-brown transition-colors"
          title={isMuted ? "Ativar som" : "Mudo"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      
      <button 
        onClick={togglePlay}
        className={`flex items-center gap-2 px-4 py-3 rounded-full font-display font-bold shadow-lg border-2 border-white transition-all hover:scale-105 ${
          isPlaying 
            ? 'bg-safari-yellow text-safari-dark animate-border-pulse' 
            : 'bg-white text-gray-400'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex gap-1 h-3 items-end">
               <div className="w-1 bg-safari-dark h-full animate-[bounce_1s_infinite]"></div>
               <div className="w-1 bg-safari-dark h-2/3 animate-[bounce_1.2s_infinite]"></div>
               <div className="w-1 bg-safari-dark h-full animate-[bounce_0.8s_infinite]"></div>
            </div>
            <span className="text-sm">Tocando</span>
          </>
        ) : (
          <>
            <Play size={18} fill="currentColor" />
            <span className="text-sm">Tocar Música</span>
          </>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
