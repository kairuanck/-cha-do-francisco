import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const generateGuestMessage = async (tone: 'funny' | 'emotional' | 'short', senderName: string): Promise<string> => {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error("API_KEY não configurada no ambiente.");
    }

    const prompt = `
      Você está ajudando um convidado a escrever uma mensagem curta e carinhosa para o guestbook do Chá de Fraldas do bebê Francisco.
      O tema da festa é animais/safari.
      O nome de quem está enviando é: ${senderName}.
      
      Por favor, escreva uma mensagem em português do Brasil seguindo este tom: ${tone}.
      A mensagem deve ter no máximo 2 frases.
      Não use aspas na resposta.
      Seja criativo e inclua referências sutis a animais se possível.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text || "Parabéns pelo Francisco! Muita saúde.";
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
};
