export interface Gift {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  allowCustomPrice?: boolean;
  description?: string;
  popular?: boolean;
  anchor?: boolean;
}

export interface GuestMessage {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  reply?: {
    author: string;
    message: string;
    timestamp: Date;
  };
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: 'heart' | 'baby' | 'calendar' | 'star' | 'music';
}

export type MusicState = 'PLAYING' | 'PAUSED' | 'STOPPED';
