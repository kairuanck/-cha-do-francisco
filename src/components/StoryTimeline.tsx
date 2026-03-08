
import React from 'react';
import { TIMELINE_EVENTS } from '../constants';
import { Heart, Star, Baby, Calendar, Music, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

const StoryTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart': return <Heart size={20} className="text-white" />;
      case 'star': return <Star size={20} className="text-white" />;
      case 'baby': return <Baby size={20} className="text-white" />;
      case 'music': return <Music size={20} className="text-white" />;
      default: return <Calendar size={20} className="text-white" />;
    }
  };

  return (
    <section id="historia" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-safari-yellow/30 text-safari-dark rounded-full font-bold text-sm mb-4 tracking-wider">
            NOSSA JORNADA
          </span>
          <h2 className="font-display text-4xl font-bold text-safari-dark">A História do Francisco</h2>
        </Reveal>

        <div className="relative max-w-5xl mx-auto pb-12">
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-safari-green/30 rounded-full"></div>

          <div className="space-y-12 mb-16 relative">
            {TIMELINE_EVENTS.map((event, index) => (
              <Reveal 
                key={event.id} 
                className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full relative ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                <div className="hidden md:block w-5/12"></div>

                <div className="absolute left-8 md:static md:left-auto transform -translate-x-1/2 md:translate-x-0 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-safari-green shadow-lg ring-4 ring-white transition-transform hover:scale-110 mt-1 md:mt-0">
                  {getIcon(event.icon)}
                </div>

                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                  <div className={`bg-safari-cream p-6 rounded-2xl shadow-md border border-safari-green/20 hover:shadow-lg transition-all group relative
                    before:hidden md:before:block before:absolute before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-safari-cream before:rotate-45 before:border-b before:border-l before:border-safari-green/20
                    ${index % 2 === 0 ? 'md:mr-8 md:before:-right-2 md:before:border-b-0 md:before:border-l-0 md:before:border-t md:before:border-r' : 'md:ml-8 md:before:-left-2'}
                  `}>
                    <span className="text-safari-green font-bold text-sm mb-1 block uppercase tracking-wide">{event.date}</span>
                    <h3 className="font-display font-bold text-xl text-safari-brown mb-2 group-hover:text-safari-dark transition-colors">{event.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>

              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="relative z-10 flex flex-col items-center text-center mt-20">
             <div className="absolute -top-20 left-8 md:left-1/2 transform md:-translate-x-1/2 h-20 w-1 bg-gradient-to-b from-safari-green/30 to-transparent"></div>

            <div className="w-16 h-16 bg-safari-yellow rounded-full flex items-center justify-center shadow-xl ring-8 ring-white mb-6 animate-pulse">
              <Sparkles size={32} className="text-safari-dark" />
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-sm border-2 border-dashed border-safari-yellow/50 max-w-lg mx-auto transform hover:-translate-y-1 transition-transform duration-300">
              <p className="font-display text-2xl font-bold text-safari-green mb-2">
                E a nossa história mais linda...
              </p>
              <p className="font-handwriting text-xl text-safari-brown italic">
                está só começando. ✨
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;
