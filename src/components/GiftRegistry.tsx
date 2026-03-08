import React, { useState } from 'react';
import type { Gift } from '../types.ts';
import { GIFTS, PIX_CONFIG } from '../constants';
import { Gift as GiftIcon, Heart, ShoppingBag, Copy, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Reveal from './Reveal';

const GiftRegistry: React.FC = () => {
  const [customPrice, setCustomPrice] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedGift, setExpandedGift] = useState<string | number | null>(null);

  const handleCopyPix = (gift: Gift) => {
    const price = gift.allowCustomPrice && customPrice ? parseFloat(customPrice) : gift.price;
    navigator.clipboard.writeText(PIX_CONFIG.chave);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    alert(`Chave PIX copiada!\n\nChave: ${PIX_CONFIG.chave}\nValor sugerido: R$ ${price.toFixed(2)}\nFavorecido: ${PIX_CONFIG.nome}\n\nObrigado pelo presente! 💛`);
  };

  const toggleExpand = (id: string | number) => {
    setExpandedGift(expandedGift === id ? null : id);
  };

  return (
    <section id="presentes" className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-safari-yellow/20 px-4 py-2 rounded-full text-safari-brown text-sm font-bold mb-4">
            <GiftIcon size={16} />
            Lista de Presentes
          </div>
          <h2 className="font-display text-4xl font-bold text-safari-dark mb-4">
            Presenteie o Francisco
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada presente é um gesto de carinho. Escolha o que quiser e envie via PIX. 💛
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-safari-green/10 px-4 py-2 rounded-xl border border-safari-green/20">
            <span className="text-sm text-safari-dark font-bold">PIX: {PIX_CONFIG.chave}</span>
            <button
              onClick={() => { navigator.clipboard.writeText(PIX_CONFIG.chave); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="text-safari-green hover:text-safari-dark transition-colors"
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {GIFTS.map((gift) => (
            <Reveal key={gift.id}>
              <div className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${
                gift.popular ? 'border-safari-yellow' : gift.anchor ? 'border-safari-green' : 'border-gray-100'
              }`}>
                {(gift.popular || gift.anchor) && (
                  <div className={`text-center py-1 text-xs font-bold ${gift.popular ? 'bg-safari-yellow text-safari-dark' : 'bg-safari-green text-white'}`}>
                    {gift.popular ? '⭐ Mais Pedido' : '🏆 Especial'}
                  </div>
                )}
                <div className="relative h-44 overflow-hidden bg-gray-50">
                  <img src={gift.image} alt={gift.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=🎁'; }} />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-safari-brown shadow-sm">
                    {gift.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-safari-dark text-lg leading-tight mb-1">{gift.name}</h3>
                  {gift.description && (
                    <div className="mb-3">
                      <p className={`text-gray-500 text-xs leading-relaxed ${expandedGift === gift.id ? '' : 'line-clamp-2'}`}>{gift.description}</p>
                      {gift.description.length > 80 && (
                        <button onClick={() => toggleExpand(gift.id)} className="text-xs text-safari-green font-bold flex items-center gap-1 mt-1 hover:text-safari-dark transition-colors">
                          {expandedGift === gift.id ? <><ChevronUp size={12} /> menos</> : <><ChevronDown size={12} /> mais</>}
                        </button>
                      )}
                    </div>
                  )}
                  <div className="mt-auto">
                    {gift.allowCustomPrice ? (
                      <div className="mb-3">
                        <label className="text-xs font-bold text-gray-600 mb-1 block">Valor do seu presente:</label>
                        <div className="flex items-center gap-2">
                          <span className="text-safari-brown font-bold">R$</span>
                          <input type="number" value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder="0,00"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-safari-green" />
                        </div>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-safari-brown mb-3">R$ {gift.price.toFixed(2).replace('.', ',')}</p>
                    )}
                    <button onClick={() => handleCopyPix(gift)}
                      className="w-full bg-safari-green text-white font-bold py-3 rounded-xl hover:bg-safari-dark transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                      <Heart size={16} fill="currentColor" />
                      Presentear via PIX
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-safari-cream px-6 py-4 rounded-2xl border border-safari-yellow/30">
            <ShoppingBag size={20} className="text-safari-brown" />
            <div className="text-left">
              <p className="text-sm font-bold text-safari-dark">Favorecido: {PIX_CONFIG.nome}</p>
              <p className="text-xs text-gray-500">Cidade: {PIX_CONFIG.cidade}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GiftRegistry;
