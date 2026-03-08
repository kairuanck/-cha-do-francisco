import React, { useState } from 'react';
import type { GuestMessage } from '../types';
import { Send, Sparkles, MessageSquareHeart, Lock, Unlock, Heart, Reply, Trash2, Pencil, Crown, AlertCircle } from 'lucide-react';
import { generateGuestMessage } from '../services/geminiService';
import Reveal from './Reveal';

const INITIAL_MESSAGES: GuestMessage[] = [
  {
    id: '1',
    author: 'Vovó Maria',
    message: 'Meu netinho lindo, estamos contando os dias para ver seu rostinho! 🦁',
    timestamp: new Date(),
    reply: {
      author: 'Papai e Mamãe',
      message: 'Obrigado Vovó! O Francisco já está chutando só de ouvir sua voz.',
      timestamp: new Date()
    }
  },
  {
    id: '2',
    author: 'Tio João',
    message: 'Prepare-se Francisco, o tio vai te ensinar a jogar bola! ⚽',
    timestamp: new Date()
  }
];

const GuestBook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);
  const [name, setName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState(false); 
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const formatDate = (dateInput: Date | string) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !messageText.trim()) return;

    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      author: name,
      message: messageText,
      timestamp: new Date()
    };

    setMessages([newMessage, ...messages]);
    setName('');
    setMessageText('');
  };

  const handleGenerateMessage = async (tone: 'funny' | 'emotional' | 'short', senderName: string) => {
    if (!senderName.trim()) {
      alert("Por favor, digite seu nome primeiro!");
      return;
    }
    
    setIsGenerating(true);
    setAiError(false);
    setMessageText("Escrevendo..."); 

    try {
      // CORREÇÃO: Usando a variável senderName passada no argumento
      const suggestion = await generateGuestMessage(tone, senderName);
      setMessageText(suggestion);
    } catch (error) {
      console.warn("Falha na IA ou chave ausente. Usando fallback local.");
      
      let fallback = "";
      if (tone === 'funny') {
        const options = [
          `Francisco, prepare-se para ser muito mimado! O ${senderName} já chegou! 🦁`,
          `Alguém avisa o Francisco que o ${senderName} vai ensinar as melhores bagunças! 😂`,
          `Parabéns aos papais! Que o Francisco durma a noite toda (sonho meu, né?). Ass: ${senderName}.`
        ];
        fallback = options[Math.floor(Math.random() * options.length)];
      } else if (tone === 'emotional') {
        const options = [
          `Que o Francisco venha com muita saúde para iluminar nossas vidas. Com todo carinho, ${senderName}.`,
          `Meu coração transborda de alegria por vocês. Que o Francisco seja muito abençoado! Ass: ${senderName}. ❤️`,
          `Mal posso esperar para segurar o Francisco no colo. Amo vocês! - ${senderName}`
        ];
        fallback = options[Math.floor(Math.random() * options.length)];
      } else {
        fallback = `Parabéns papais! Ansioso para conhecer o Francisco. Abraços do ${senderName}.`;
      }
      
      setTimeout(() => {
        setMessageText(fallback);
        setAiError(true);
      }, 500);
    } finally {
      setTimeout(() => setIsGenerating(false), 500);
    }
  };

  const handleSubmitReply = (messageId: string) => {
    if (!replyText.trim()) return;

    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          reply: {
            author: 'Papai e Mamãe',
            message: replyText,
            timestamp: new Date()
          }
        };
      }
      return msg;
    });

    setMessages(updatedMessages);
    setReplyingTo(null);
    setReplyText('');
  };


  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      return;
    }

    const password = window.prompt("Digite a senha da família para gerenciar as mensagens:");
    
    if (password === "Fr@ncisco2026!") {
      setIsAdmin(true);
    } else if (password !== null) {
      alert("Senha incorreta. Tente novamente.");
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm("Tem certeza que deseja apagar esta mensagem permanentemente?")) {
      setMessages(messages.filter(msg => msg.id !== id));
    }
  };

  const handleDeleteReply = (id: string) => {
    if (window.confirm("Tem certeza que deseja apagar sua resposta?")) {
      setMessages(messages.map(msg => {
        if (msg.id === id) {
          return { ...msg, reply: undefined };
        }
        return msg;
      }));
    }
  };

  const handleEditReply = (msg: GuestMessage) => {
    if (msg.reply) {
      setReplyingTo(msg.id);
      setReplyText(msg.reply.message);
    }
  };

  return (
    <section id="mensagens" className="py-16 bg-safari-cream relative">
      <style>{`
        @keyframes border-pulse-yellow {
          0%, 100% { border-color: #f3f4f6; box-shadow: 0 0 0 0 transparent; }
          50% { border-color: #F2D06B; box-shadow: 0 0 0 1px #F2D06B; }
        }
        .animate-border-pulse {
          animation: border-pulse-yellow 3s ease-in-out infinite;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-safari-dark mb-4">Mural de Recados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Deixe um recadinho especial para o Francisco ler quando crescer.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Reveal delay={100} className="h-full">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-safari-yellow/30 h-full sticky top-24">
              <h3 className="font-display text-2xl font-bold text-safari-brown mb-6 flex items-center gap-2">
                <Send size={24} className="text-safari-green" />
                Escreva sua mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Seu Nome</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-safari-green focus:ring-2 focus:ring-safari-green/20 outline-none transition-all"
                    placeholder="Ex: Titia Ana"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sua Mensagem</label>
                  <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-safari-green focus:ring-2 focus:ring-safari-green/20 outline-none transition-all h-32 resize-none"
                    placeholder="Escreva algo especial..."
                  ></textarea>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-bold mb-3 flex items-center gap-1">
                    <Sparkles size={14} />
                    Sem criatividade? A IA ajuda:
                  </p>
                  <div className="flex gap-2 flex-wrap mb-2">
                    <button 
                      type="button"
                      onClick={() => handleGenerateMessage('emotional', name)}
                      disabled={isGenerating}
                      className="text-xs px-3 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {isGenerating ? '...' : '🥺 Emocionante'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleGenerateMessage('funny', name)}
                      disabled={isGenerating}
                      className="text-xs px-3 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
                    >
                       {isGenerating ? '...' : '😂 Engraçado'}
                    </button>
                     <button 
                      type="button"
                      onClick={() => handleGenerateMessage('short', name)}
                      disabled={isGenerating}
                      className="text-xs px-3 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
                    >
                       {isGenerating ? '...' : '⚡ Curto'}
                    </button>
                  </div>
                  {aiError && (
                     <p className="text-[10px] text-gray-400 italic animate-fade-in">
                       *Sugestão gerada automaticamente (IA offline).
                     </p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-safari-brown text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg transform active:scale-95"
                >
                  Enviar Recado
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={300} className="h-full">
            <div className="space-y-8 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar pb-8">
              {messages.map((msg) => (
                <div key={msg.id} className="relative animate-fade-in group">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative z-10 hover:shadow-md transition-shadow animate-border-pulse">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-safari-green/10 flex items-center justify-center text-safari-green font-bold text-xl font-display uppercase">
                          {msg.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 font-display leading-tight">{msg.author}</h4>
                          <span className="text-xs text-gray-400 block">{formatDate(msg.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <button 
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            title="Apagar mensagem"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                        <div className="text-safari-yellow/30">
                           <MessageSquareHeart size={24} />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 italic text-lg leading-relaxed pl-2 border-l-2 border-safari-green/30">
                      "{msg.message}"
                    </p>

                    {isAdmin && !msg.reply && replyingTo !== msg.id && (
                      <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          onClick={() => {
                            setReplyingTo(msg.id);
                            setReplyText('');
                          }}
                          className="text-xs font-bold text-safari-green bg-safari-green/10 px-3 py-1.5 rounded-full hover:bg-safari-green hover:text-white transition-colors flex items-center gap-1"
                         >
                           <Reply size={14} /> Responder
                         </button>
                      </div>
                    )}
                  </div>

                  {replyingTo === msg.id && (
                    <div className="mt-[-10px] ml-6 pt-6 pl-6 relative">
                       <div className="absolute top-0 left-0 w-6 h-full border-l-2 border-dashed border-gray-300 rounded-bl-2xl"></div>
                       <div className="absolute top-10 left-0 w-6 border-b-2 border-dashed border-gray-300"></div>

                       <div className="bg-white p-4 rounded-xl border border-safari-yellow shadow-md animate-fade-in relative z-20">
                           <p className="text-xs font-bold text-safari-dark mb-2">
                             {msg.reply ? 'Editando resposta para' : 'Respondendo a'} {msg.author}:
                           </p>
                           <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-safari-yellow bg-gray-50"
                            rows={2}
                            placeholder="Escreva uma resposta carinhosa..."
                           ></textarea>
                           <div className="flex justify-end gap-2 mt-2">
                             <button 
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                              className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1"
                             >
                               Cancelar
                             </button>
                             <button 
                              onClick={() => handleSubmitReply(msg.id)}
                              className="text-xs bg-safari-dark text-white px-3 py-1 rounded-lg hover:bg-safari-green transition-colors font-bold"
                             >
                               {msg.reply ? 'Atualizar' : 'Enviar'}
                             </button>
                           </div>
                        </div>
                    </div>
                  )}

                  {msg.reply && replyingTo !== msg.id && (
                    <div className="mt-[-10px] ml-6 relative animate-fade-in pt-6 pl-6 group/reply">
                       <div className="absolute top-0 left-0 w-6 h-24 border-l-2 border-dashed border-gray-200 rounded-bl-2xl"></div>
                       <div className="absolute top-10 left-0 w-6 border-b-2 border-dashed border-gray-200"></div>

                       <div className={`p-5 rounded-xl relative shadow-sm hover:shadow-md transition-all border ${
                         isAdmin 
                           ? 'bg-orange-50 border-orange-200' 
                           : 'bg-safari-cream/80 border-safari-yellow/20'
                       }`}>
                          <div className={`flex items-center gap-2 mb-2 pb-2 border-b justify-between ${
                            isAdmin ? 'border-orange-200' : 'border-safari-brown/10'
                          }`}>
                             <div className="flex items-center gap-2">
                                <div className={`p-1 rounded-full shadow-sm ${isAdmin ? 'bg-orange-100' : 'bg-white'}`}>
                                  {isAdmin ? (
                                    <Crown size={12} className="text-orange-500 fill-orange-500" />
                                  ) : (
                                    <Heart size={12} className="text-red-400 fill-red-400" />
                                  )}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${
                                  isAdmin ? 'text-orange-700' : 'text-safari-brown'
                                }`}>
                                  Família Respondeu
                                </span>
                             </div>
                             
                             <div className="flex items-center gap-2">
                               <span className="text-xs text-gray-400">{formatDate(msg.reply.timestamp)}</span>
                               
                               {isAdmin && (
                                 <div className="flex gap-1 ml-2 opacity-0 group-hover/reply:opacity-100 transition-opacity">
                                   <button 
                                     onClick={() => handleEditReply(msg)}
                                     className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                                     title="Editar resposta"
                                   >
                                     <Pencil size={14} />
                                   </button>
                                   <button 
                                     onClick={() => handleDeleteReply(msg.id)}
                                     className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                     title="Apagar resposta"
                                   >
                                     <Trash2 size={14} />
                                   </button>
                                 </div>
                               )}
                             </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{msg.reply.message}</p>
                       </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center mt-12 gap-2 opacity-40 hover:opacity-100 transition-opacity">
           <button 
            onClick={handleAdminToggle}
            className={`flex items-center gap-2 text-xs transition-colors px-4 py-2 rounded-full border ${isAdmin ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200'}`}
           >
             {isAdmin ? <Unlock size={14} /> : <Lock size={14} />}
             {isAdmin ? 'Sair do Modo Família' : 'Área da Família'}
           </button>
           {isAdmin && (
             <span className="text-[10px] text-orange-500 flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
               <AlertCircle size={10} />
               Modo Administrador Ativo
             </span>
           )}
        </div>
      </div>
    </section>
  );
};

export default GuestBook;
