import React, { useState, useMemo } from 'react';
import { GIFTS, PIX_CONFIG } from '../constants';
import { Gift as GiftIcon, X, Copy, Check, Edit2, Tag, ChevronDown, ChevronUp, Star, Package, Smartphone, ScanLine, Info, QrCode } from 'lucide-react';
import type { Gift } from '../types';
import Reveal from './Reveal';

const formatPixKey = (key: string) => {
  const cleanKey = key.trim();
  if (cleanKey.includes('@')) return cleanKey;
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanKey)) {
    return cleanKey;
  }
  const nums = cleanKey.replace(/\D/g, '');
  const isPhoneFormat = cleanKey.includes('(') || cleanKey.startsWith('+') || (nums.length >= 10 && nums.length <= 11 && !cleanKey.includes('.'));
  if (isPhoneFormat) {
     if (nums.length >= 10 && nums.length <= 11) return `+55${nums}`;
     return `+${nums}`;
  }
  return nums;
};

const generatePixPayload = (chave: string, nome: string, cidade: string, valor: number, txtId: string = 'FRANCISCO') => {
  const formatField = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  };
  const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const chaveFormatada = formatPixKey(chave);
  const nomeFormatado = removeAccents(nome).substring(0, 25);
  const cidadeFormatada = removeAccents(cidade).substring(0, 15);
  const valorFormatado = valor.toFixed(2);

  let payload = 
    "000201" +
    "26" + (chaveFormatada.length + 14 + 8).toString().padStart(2,'0') + 
      "0014br.gov.bcb.pix" +
      formatField("01", chaveFormatada) +
    "52040000" + 
    "5303986" + 
    formatField("54", valorFormatado) +
    "5802BR" +
    formatField("59", nomeFormatado) +
    formatField("60", cidadeFormatada) +
    formatField("62", formatField("05", txtId));

  payload += "6304";
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) { crc = (crc << 1) ^ 0x1021; } else { crc = crc << 1; }
      crc = crc & 0xFFFF;
    }
  }
  return payload + crc.toString(16).toUpperCase().padStart(4, '0');
};

const GiftRegistry: React.FC = () => {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [copied, setCopied] = useState(false);
  const [customPrice, setCustomPrice] = useState<string>('');
  const [showAll, setShowAll] = useState(false);

  const handleOpenModal = (gift: Gift) => {
    setSelectedGift(gift);
    setCustomPrice(gift.price > 0 ? gift.price.toFixed(2) : '');
    setCopied(false);
  };

  const handleCloseModal = () => setSelectedGift(null);

  const currentPrice = useMemo(() => {
    if (selectedGift?.allowCustomPrice) {
      if (!customPrice) return 0;
      return parseFloat(customPrice.replace(',', '.')) || 0;
    }
    return selectedGift?.price || 0;
  }, [selectedGift, customPrice]);

  const pixPayload = useMemo(() => {
    if (!currentPrice || currentPrice <= 0) return "";
    return generatePixPayload(PIX_CONFIG.chave, PIX_CONFIG.nome, PIX_CONFIG.cidade, currentPrice);
  }, [currentPrice]);

  const handleCopyPix = () => {
    if (!pixPayload) return;
    navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const visibleGifts = showAll ? GIFTS : GIFTS.slice(0, 6);

  return (
    <section id="presentes" className="py-16 bg-white">
      <style>{`
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-safari-dark mb-6">Lista de Presentes</h2>
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed text-center max-w-2xl mx-auto">
              O friozinho de junho traz o nosso pequeno grande amor! A presença de vocês já é o maior presente. Para quem deseja ajudar a preparar o ninho do Francisco, temos duas formas de carinho:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border-2 border-safari-green/20 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-safari-green/5 rounded-bl-[4rem] transition-transform group-hover:scale-110"></div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                  <div className="w-12 h-12 bg-safari-green/10 text-safari-green rounded-xl flex items-center justify-center mb-4"><Package size={24} /></div>
                  <h3 className="font-display font-bold text-xl text-safari-dark mb-2">Levar no Dia</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Gosta de escolher pessoalmente? Amamos pacotes de fraldas <strong>M ou G</strong>.</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-safari-green bg-safari-green/5 px-3 py-1.5 rounded-full border border-safari-green/10">
                    <Check size={12} /> Pampers Premium ou Confort Sec
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-safari-yellow/40 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-safari-yellow/10 rounded-bl-[4rem] transition-transform group-hover:scale-110"></div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                  <div className="w-12 h-12 bg-safari-yellow/20 text-safari-dark rounded-xl flex items-center justify-center mb-4"><Smartphone size={24} /></div>
                  <h3 className="font-display font-bold text-xl text-safari-dark mb-2">Praticidade Online</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Prefere não carregar peso? Escolha um <strong>'mimo divertido'</strong> na lista abaixo.</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-safari-brown bg-safari-yellow/10 px-3 py-1.5 rounded-full border border-safari-yellow/20">
                    <Star size={12} fill="currentColor" /> Valor revertido para o enxoval
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 shrink-0"><ScanLine size={20} /></div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-800">Como funciona o presente virtual?</strong><br/>
                  Ao clicar em "Presentear", o site gera um <strong>QR Code Pix</strong>. Basta escanear com o app do seu banco. É seguro, rápido e cai direto na conta dos papais.
                </p>
              </div>
              <div className="hidden md:block text-slate-300"><Info size={20} /></div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {visibleGifts.map((gift, index) => {
            const isSelected = selectedGift?.id === gift.id;
            return (
              <Reveal key={gift.id} delay={index * 50} className="h-full">
                <div className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col ${isSelected ? 'border-safari-yellow ring-2 ring-safari-yellow/50 scale-[0.98]' : 'border-gray-100 hover:shadow-xl'}`}>
                  <div className="relative aspect-square sm:h-48 overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={gift.image} alt={gift.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-2 left-2 z-10 max-w-[85%]">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-safari-dark px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wide shadow-sm border border-gray-100 truncate">
                        <Tag size={10} /> {gift.category}
                      </div>
                    </div>
                    {gift.popular && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-safari-yellow text-safari-dark p-1.5 rounded-full shadow-md animate-pulse"><Star size={12} fill="currentColor" /></div>
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-5 flex flex-col flex-grow text-center relative">
                    <h3 className="font-display font-bold text-sm sm:text-lg text-gray-800 leading-tight mb-2 group-hover:text-safari-dark transition-colors line-clamp-2 min-h-[2.5em] sm:min-h-0">{gift.name}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm italic mb-4 line-clamp-3 sm:line-clamp-none flex-grow">{gift.description && `"${gift.description}"`}</p>
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-50">
                      <p className="text-safari-green font-display font-bold text-lg sm:text-2xl mb-3">
                        {gift.allowCustomPrice ? (
                          <span className="text-xs sm:text-sm font-bold bg-safari-green/10 text-safari-dark px-2 sm:px-3 py-1 rounded-full border border-safari-green/20">Valor Livre</span>
                        ) : (
                          `R$ ${gift.price.toFixed(2).replace('.', ',')}`
                        )}
                      </p>
                      <button onClick={() => handleOpenModal(gift)}
                        className={`w-full font-bold py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm ${isSelected ? 'bg-safari-yellow text-safari-dark shadow-inner' : 'bg-safari-dark text-white hover:bg-safari-green hover:shadow-md active:scale-95'}`}>
                        <GiftIcon size={16} />
                        {isSelected ? 'Ver Pix' : 'Presentear'}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {GIFTS.length > 6 && (
          <div className="text-center mt-12">
            <button onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-safari-brown font-bold rounded-full border border-safari-brown/20 hover:bg-safari-brown hover:text-white transition-all shadow-sm hover:shadow-md">
              {showAll ? <>Ver menos opções <ChevronUp size={18} /></> : <>Ver todos os presentes (+{GIFTS.length - 6}) <ChevronDown size={18} /></>}
            </button>
          </div>
        )}
      </div>

      {selectedGift && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md relative animate-fade-in shadow-2xl flex flex-col max-h-[90vh]">
            <div className="absolute top-4 right-4 z-20">
              <button onClick={handleCloseModal} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors shadow-sm"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-safari-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-safari-green shadow-sm"><GiftIcon size={32} /></div>
                <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">Ótima escolha!</h3>
                <div className="mb-6 px-4">
                  <p className="text-gray-500 text-sm mb-1">Você escolheu presentear o Francisco com:</p>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mt-2">
                    <strong className="text-safari-dark block text-lg">{selectedGift.name}</strong>
                    {selectedGift.description && <p className="text-gray-400 text-xs italic mt-1">"{selectedGift.description}"</p>}
                  </div>
                </div>

                {selectedGift.allowCustomPrice ? (
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-500 mb-2">Qual valor você deseja enviar?</label>
                    <div className="relative max-w-[200px] mx-auto group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold z-10">R$</span>
                      <input type="number" value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} onFocus={(e) => e.target.select()}
                        className="w-full pl-12 pr-12 py-3 text-2xl font-bold text-safari-dark border-2 border-safari-yellow rounded-xl focus:outline-none focus:ring-4 focus:ring-safari-yellow/20 text-center bg-white" placeholder="0,00" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-safari-yellow pointer-events-none z-10 bg-white/50 rounded-full p-1"><Edit2 size={18} /></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Clique no valor para editar</p>
                  </div>
                ) : (
                  <div className="mb-8">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Valor do Pix</p>
                    <p className="text-safari-green font-display font-bold text-4xl">R$ {selectedGift.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                )}

                <div className="bg-white p-4 rounded-xl border-2 border-dashed border-safari-green/30 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-safari-green/5"></div>
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-safari-dark mb-3">Escaneie o QR Code</p>
                    {pixPayload ? (
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixPayload)}`}
                        alt="Pix QR Code" className="w-48 h-48 mx-auto mix-blend-multiply opacity-90 p-2 bg-white rounded-lg shadow-sm" />
                    ) : (
                      <div className="w-48 h-48 mx-auto flex flex-col items-center justify-center p-4 bg-white/60 rounded-lg text-center gap-2">
                        <QrCode size={40} className="text-gray-300" />
                        <p className="text-gray-400 text-xs font-bold">{selectedGift.allowCustomPrice ? "Digite um valor acima para gerar o QR Code" : "Aguardando valor..."}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Ou copie o código Pix Copia e Cola:</p>
                  <div className="flex gap-2">
                    <input type="text" readOnly value={pixPayload || "Aguardando valor..."}
                      className={`w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none font-mono truncate ${!pixPayload ? 'opacity-50' : ''}`} disabled={!pixPayload} />
                    <button onClick={handleCopyPix} disabled={!pixPayload}
                      className={`px-4 rounded-lg font-bold text-white transition-all flex items-center justify-center shrink-0 shadow-sm ${copied ? 'bg-green-500' : !pixPayload ? 'bg-gray-300 cursor-not-allowed' : 'bg-safari-brown hover:bg-gray-700'}`}>
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                  {copied && <p className="text-green-600 text-xs font-bold">Código copiado com sucesso!</p>}
                </div>
                <p className="mt-6 text-xs text-gray-400">O valor cai direto na conta dos papais para a compra do item.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftRegistry;
