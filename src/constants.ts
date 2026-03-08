import type { Gift, TimelineEvent } from './types.ts';

export const PIX_CONFIG = {
  chave: "+5551984317937",  
  nome: "Kairuan Camera Kunzler",
  cidade: "Porto Alegre"
};

export const EVENT_DETAILS = {
  date: "25 de Novembro",       
  time: "15:00 horas",          
  locationName: "Casa da Vovó", 
  address: "Rua Exemplo, 123, Porto Alegre - RS",
  isTbd: false,
  calendarStart: new Date(2025, 10, 25, 15, 0), 
  calendarEnd: new Date(2025, 10, 25, 19, 0)
};

export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVx-H0QOwuJeHU4SXti-OGmxSldslhzkQ4MvldvO7_uhS6XEr6gZFEO3v8WCbsMAY/exec"; 

export const BACKGROUND_MUSIC_URL = "https://files.catbox.moe/4vwe0e.mp3";

export const PET_IMAGES = {
  mel: "https://i.postimg.cc/gJhtc3hH/Mel-800.jpg",
  bolacha: "https://i.postimg.cc/WpKxvbJh/bolacha-final.jpg"
};

export const PHOTO_GALLERY = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop',
    caption: 'Descobrindo o amor'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=800&auto=format&fit=crop',
    caption: 'Sapatinhos prontos'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1506806745989-1382453c0d76?q=80&w=800&auto=format&fit=crop',
    caption: 'Esperando você'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1498644686561-197e4c5b9c02?q=80&w=800&auto=format&fit=crop',
    caption: 'Cada detalhe importa'
  }
];

export const GIFTS: Gift[] = [
  { 
    id: 6, 
    name: "Fraldas 'Modo Turbo'", 
    price: 249.90, 
    category: "Estoque Gigante", 
    description: "Para os dias explosivos! Um estoque industrial que garante a paz (e o bumbum seco) por semanas.", 
    image: "https://i.postimg.cc/DfJ9Dbjx/fraldas-turbo.jpg", 
    allowCustomPrice: false,
    anchor: true,
    popular: false
  },
  { 
    id: 5, 
    name: "Vale Banho de Resort", 
    price: 89.90, 
    category: "Relax VIP", 
    description: "Luxo nível resort. O direito inalienável de um banho quente com mais de 5 minutos.", 
    image: "https://i.postimg.cc/wxyCPsfy/vale-banho-2.jpg",
    allowCustomPrice: false,
    popular: false
  },
  { 
    id: 1, 
    name: "Pacote de Fraldas", 
    price: 109.90, 
    category: "Favorito", 
    description: "Equivale a um pacotão Jumbo da Pampers. O clássico que nunca falha!", 
    image: "https://i.postimg.cc/qBhPYCb6/fraldas-pacote.jpg", 
    allowCustomPrice: false,
    popular: true
  }, 
  { 
    id: 4, 
    name: "Vale 1 Cochilo", 
    price: 99.90, 
    category: "Raridade", 
    description: "Item raríssimo. Colecionável. Patrocine 1 hora de silêncio absoluto para recarregar a bateria.", 
    image: "https://i.postimg.cc/y6gM5SQf/sono.png", 
    allowCustomPrice: false,
    popular: false
  },
  { 
    id: 8, 
    name: "Cota 'Papai vs. Botões'", 
    price: 34.90, 
    category: "Diversão", 
    description: "Ajude a financiar a luta diária contra 12 botõezinhos que nunca se alinham.", 
    image: "https://i.postimg.cc/Kc66yvw7/body-papai.jpg",
    allowCustomPrice: false,
    popular: false
  },
  { 
    id: 12, 
    name: "Contribuição Livre", 
    price: 0, 
    category: "Do Seu Jeito", 
    description: "Um presente em forma de carinho — do jeitinho e no valor que você puder. 💛", 
    image: "https://i.postimg.cc/ZYGGhK2L/contribuicao.png", 
    allowCustomPrice: true,
    popular: false
  },
  { 
    id: 7, 
    name: "Cota 'Mamãe Dorme Plena'", 
    price: 299.90, 
    category: "Lendário", 
    description: "Item raro. Não garantimos disponibilidade de estoque (sono), mas garantimos a felicidade!", 
    image: "https://i.postimg.cc/L4Yc7ZCL/mamae-dorme-plena-pijama.jpg", 
    allowCustomPrice: false
  },
  { 
    id: 14, 
    name: "Cota 'Pijama Confortável'", 
    price: 199.90, 
    category: "Conforto", 
    description: "O uniforme oficial e sagrado do puerpério. Conforto máximo para maratonar madrugadas.", 
    image: "https://i.postimg.cc/XNGRhyH9/pijama-mamae.jpg", 
    allowCustomPrice: false
  },
  { 
    id: 11, 
    name: "Fraldas de Pano/Boquinhas", 
    price: 59.90, 
    category: "Coringa", 
    description: "O canivete suíço dos bebês: serve para ombro, baba, apoio e limpar o inexplicável.", 
    image: "https://i.postimg.cc/7PGFcTsz/fraldas-pano.jpg",
    allowCustomPrice: false
  },
  { 
    id: 13, 
    name: "Mordedor 'Salva-Dedos'", 
    price: 49.90, 
    category: "Socorro", 
    description: "Para quando os dentinhos resolverem dar 'oi' e tudo virar alvo. Salve os dedos do papai!", 
    image: "https://i.postimg.cc/9XR6Sq84/mordedor2.jpg",
    allowCustomPrice: false
  },
  { 
    id: 2, 
    name: "Pomada VIP", 
    price: 44.90, 
    category: "Blindagem", 
    description: "Blindagem de elite. Proteção VIP contra assaduras para o bumbum do Francisco.", 
    image: "https://i.postimg.cc/v8gJj6qv/pomada-vip.jpg",
    allowCustomPrice: false
  },
  { 
    id: 3, 
    name: "Lenços 'Apocalipse Edition'", 
    price: 39.90, 
    category: "S.O.S.", 
    description: "Kit para situações que a ciência ainda não explicou. Risco biológico nível 5.", 
    image: "https://i.postimg.cc/ryBBLF35/lencos-apocalipse.jpg",
    allowCustomPrice: false
  }, 
  { 
    id: 10, 
    name: "Cota 'Café da Mamãe'", 
    price: 24.90, 
    category: "Combustível", 
    description: "Modo sobrevivência: para funcionar mesmo dormindo em parcelas.", 
    image: "https://i.postimg.cc/BZLry1Yj/cafe-mamae.jpg",
    allowCustomPrice: false
  }, 
  { 
    id: 9, 
    name: "Lenços 'Onde Deixei?'", 
    price: 19.90, 
    category: "Mistério", 
    description: "Spoiler: tá no lugar óbvio, mas o papai não viu. Um pacote extra para cada cômodo.", 
    image: "https://i.postimg.cc/y6gM5SQP/lenco-onde-deixei.jpg",
    allowCustomPrice: false
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    date: '03 Out 2025',
    title: 'Antes do Atraso',
    description: 'Antes mesmo do atraso… a ansiedade falou mais alto. Um teste de farmácia com uma linha fraquinha. No beta HCG, o tão esperado positivo.',
    icon: 'star'
  },
  {
    id: '2',
    date: 'Outubro 2025',
    title: 'Evoluindo',
    description: 'Repetimos o beta 4 vezes. Só pra ver o sonho evoluindo direitinho.',
    icon: 'calendar'
  },
  {
    id: '3',
    date: '20 Out 2025',
    title: '6 Semanas',
    description: 'Ouvimos o coraçãozinho pela primeira vez. Ele media só 3mm… e já era gigante pra nós!',
    icon: 'heart'
  },
  {
    id: '4',
    date: '26 Nov 2025',
    title: 'É Menino!',
    description: 'Descobrimos que nosso mundo seria azul.',
    icon: 'baby'
  },
  {
    id: '5',
    date: 'A Escolha',
    title: 'Francisco',
    description: 'Aqui em casa, amor por animais é tradição. São Francisco sempre foi especial pra mamãe. E do significado que nos tocou: liberdade. Assim nasceu “Francisco”.',
    icon: 'music'
  },
  {
    id: '6',
    date: '17–18 Semanas',
    title: 'Oi, Família!',
    description: 'Começaram os primeiros chutinhos. Como se ele dissesse: “oi, família, cheguei!”',
    icon: 'baby'
  }
];



