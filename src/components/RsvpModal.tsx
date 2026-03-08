
import React, { useState } from 'react';
import { X, Users, Baby, CheckCircle, Loader2, PartyPopper, AlertCircle, Leaf, MilkOff, WheatOff, Utensils, Calendar, Download } from 'lucide-react';
import { GOOGLE_SCRIPT_URL, EVENT_DETAILS } from '../constants';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIETARY_OPTIONS = [
  { id: 'vegetariano', label: 'Vegetariano', icon: <Leaf size={14} /> },
  { id: 'vegano', label: 'Vegano', icon: <Leaf size={14} /> },
  { id: 'lactose', label: 'Intol. Lactose', icon: <MilkOff size={14} /> },
  { id: 'celiaco', label: 'Doença Celíaca', icon: <WheatOff size={14} /> },
];

const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    adults: 0, 
    children: 0,
    childrenAges: [] as string[],
    dietaryRestrictions: [] as string[]
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleClose = () => {
    if (status === 'loading') return;
    onClose();
  };
  
  const formatDateForCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const handleGoogleCalendar = () => {
    const start = formatDateForCalendar(EVENT_DETAILS.calendarStart);
    const end = formatDateForCalendar(EVENT_DETAILS.calendarEnd);
    const title = encodeURIComponent("Chá de Fraldas do Francisco 🦁");
    const details = encodeURIComponent("Mal podemos esperar para celebrar com você! Lembre-se de confirmar se precisar alterar algo.");
    const location = encodeURIComponent(`${EVENT_DETAILS.locationName} - ${EVENT_DETAILS.address}`);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const handleIcsDownload = () => {
    const start = formatDateForCalendar(EVENT_DETAILS.calendarStart);
    const end = formatDateForCalendar(EVENT_DETAILS.calendarEnd);
    const now = formatDateForCalendar(new Date());
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Francisco Baby Shower//BR
BEGIN:VEVENT
UID:${Date.now()}@francisco.app
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:Chá de Fraldas do Francisco 🦁
DESCRIPTION:Mal podemos esperar para celebrar com você!
LOCATION:${EVENT_DETAILS.locationName} - ${EVENT_DETAILS.address}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cha-do-francisco.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (!GOOGLE_SCRIPT_URL) {
      alert("A URL do Google Script não foi configurada no arquivo constants.ts");
      return;
    }

    setStatus('loading');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('adults', formData.adults.toString());
      data.append('children', formData.children.toString());
      
      const agesString = formData.childrenAges.filter(age => age.trim() !== '').join(', ');
      data.append('children_ages', agesString);

      const dietString = formData.dietaryRestrictions.map(id => {
        return DIETARY_OPTIONS.find(opt => opt.id === id)?.label || id;
      }).join(', ');
      data.append('dietary_restrictions', dietString);
      
      data.append('date', new Date().toISOString());

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });

      setStatus('success');
      
    } catch (error) {
      console.error("Erro ao enviar", error);
      setStatus('error');
    }
  };

  const updateCount = (field: 'adults' | 'children', delta: number) => {
    setFormData(prev => {
      const newValue = Math.max(0, prev[field] + delta);
      let newAges = prev.childrenAges;

      if (field === 'children') {
        if (delta > 0) {
           newAges = [...prev.childrenAges, ''];
        } else {
           newAges = prev.childrenAges.slice(0, newValue);
        }
      }

      return {
        ...prev,
        [field]: newValue,
        childrenAges: field === 'children' ? newAges : prev.childrenAges
      };
    });
  };

  const updateChildAge = (index: number, value: string) => {
    const newAges = [...formData.childrenAges];
    newAges[index] = value;
    setFormData({...formData, childrenAges: newAges});
  };

  const toggleDietary = (id: string) => {
    setFormData(prev => {
      const exists = prev.dietaryRestrictions.includes(id);
      if (exists) {
        return {...prev, dietaryRestrictions: prev.dietaryRestrictions.filter(item => item !== id)};
      }
      return {...prev, dietaryRestrictions: [...prev.dietaryRestrictions, id]};
    });
  };

  const handleReset = () => {
    setFormData({ name: '', adults: 0, children: 0, childrenAges: [], dietaryRestrictions: [] });
    setStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-safari-dark/60 backdrop-blur-md transition-opacity" 
        onClick={handleClose}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in z-10 max-h-[90vh] flex flex-col">
        
        <button 
          onClick={handleClose}
          disabled={status === 'loading'}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center bg-safari-cream h-full overflow-y-auto">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <PartyPopper size={40} />
            </div>
            <h3 className="font-display text-3xl font-bold text-safari-dark mb-2">Oba! Presença Confirmada!</h3>
            <p className="text-gray-600 mb-8">
              Ficamos muito felizes que você vem!<br/>
              O Francisco já está ansioso para te conhecer. 🦁
            </p>

            <div className="w-full space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Salve na sua agenda</p>
              
              <button 
                onClick={handleGoogleCalendar}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <Calendar size={18} />
                Adicionar ao Google Agenda
              </button>

              <button 
                onClick={handleIcsDownload}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl shadow-sm transition-all"
              >
                <Download size={18} />
                Adicionar ao iPhone / Outlook
              </button>
            </div>

            <button 
              onClick={handleReset}
              className="mt-8 text-sm text-gray-400 hover:text-gray-600 underline"
            >
              Fechar janela
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
            <div className="bg-safari-green p-6 text-white relative overflow-hidden shrink-0">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" style={{ backgroundSize: '20px 20px' }}></div>
               <h2 className="font-display text-2xl font-bold relative z-10">Você vem celebrar com a gente?</h2>
               <p className="opacity-90 text-sm relative z-10">Confirme sua presença abaixo.</p>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    disabled={status === 'loading'}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-safari-green focus:bg-white focus:outline-none transition-all disabled:opacity-60"
                    placeholder="Digite seu nome aqui..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <label className="flex flex-col text-xs font-bold text-gray-500 mb-2 uppercase leading-tight">
                      <span className="flex items-center gap-1"><Users size={14} /> Adultos</span>
                      <span className="text-[10px] text-gray-400 font-normal normal-case">(Incluindo você)</span>
                    </label>
                    <div className="flex items-center justify-between bg-white rounded-lg p-1 shadow-sm">
                      <button 
                        type="button"
                        disabled={status === 'loading' || formData.adults === 0}
                        onClick={() => updateCount('adults', -1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors font-bold text-xl ${formData.adults === 0 ? 'text-gray-300' : 'text-safari-green hover:bg-safari-green/10'}`}
                      >-</button>
                      <span className="font-display font-bold text-xl text-safari-dark">{formData.adults}</span>
                      <button 
                        type="button"
                        disabled={status === 'loading'}
                        onClick={() => updateCount('adults', 1)}
                        className="w-8 h-8 flex items-center justify-center text-safari-green hover:bg-safari-green/10 rounded-md transition-colors font-bold text-xl"
                      >+</button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <label className="flex flex-col text-xs font-bold text-gray-500 mb-2 uppercase leading-tight">
                       <span className="flex items-center gap-1"><Baby size={14} /> Crianças</span>
                       <span className="text-[10px] text-gray-400 font-normal normal-case">(0 a 12 anos)</span>
                    </label>
                    <div className="flex items-center justify-between bg-white rounded-lg p-1 shadow-sm">
                      <button 
                        type="button"
                        disabled={status === 'loading' || formData.children === 0}
                        onClick={() => updateCount('children', -1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors font-bold text-xl ${formData.children === 0 ? 'text-gray-300' : 'text-safari-green hover:bg-safari-green/10'}`}
                      >-</button>
                      <span className="font-display font-bold text-xl text-safari-dark">{formData.children}</span>
                      <button 
                        type="button"
                        disabled={status === 'loading'}
                        onClick={() => updateCount('children', 1)}
                        className="w-8 h-8 flex items-center justify-center text-safari-green hover:bg-safari-green/10 rounded-md transition-colors font-bold text-xl"
                      >+</button>
                    </div>
                  </div>
                </div>

                {formData.children > 0 && (
                  <div className="bg-safari-yellow/10 p-4 rounded-xl border border-safari-yellow/30 animate-fade-in">
                    <label className="block text-xs font-bold text-safari-dark mb-2 uppercase tracking-wide">
                      Idade das Crianças
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.childrenAges.map((age, idx) => (
                        <input
                          key={idx}
                          type="text"
                          placeholder={`Criança ${idx + 1}`}
                          value={age}
                          onChange={(e) => updateChildAge(idx, e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-safari-yellow/50 focus:outline-none focus:ring-2 focus:ring-safari-yellow bg-white"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Utensils size={16} />
                    Alguma restrição alimentar?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DIETARY_OPTIONS.map((option) => {
                      const isSelected = formData.dietaryRestrictions.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleDietary(option.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border ${
                            isSelected 
                              ? 'bg-safari-green text-white border-safari-green shadow-md' 
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {option.icon}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} />
                    Ops! Algo deu errado. Tente novamente.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-safari-dark text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Confirmar Minha Presença
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RsvpModal;
