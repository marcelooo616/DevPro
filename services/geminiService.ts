import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Initialize the client safely.
// In a real app, you might want to handle the missing key more gracefully in the UI.
const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const evaluateSubmission = async (
    topicTitle: string,
    activityPrompt: string,
    userSubmission: string
): Promise<string> => {
    if (!apiKey) {
        return "⚠️ Erro: API Key não configurada. Não consigo avaliar sua resposta no momento.";
    }

    try {
        const userPrompt = `
Tópico estudado: ${topicTitle}
Atividade proposta: ${activityPrompt}

Resposta do aluno:
${userSubmission}

Por favor, avalie esta resposta conforme suas diretrizes de mentor.
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.4, // Slightly lower temperature for more consistent, structured feedback
            }
        });

        return response.text || "Não foi possível gerar uma avaliação no momento. Tente novamente.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "⚠️ Ocorreu um erro ao contatar seu mentor IA. Verifique sua conexão ou tente novamente mais tarde.";
    }
};
