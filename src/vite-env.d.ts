/// <reference types="vite/client" />

declare module 'lucide-react';
declare module '@google/genai';

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
