import { GoogleGenAI, Type } from "@google/genai";
import { AIResponsePlan, Need } from '../types';

// Initialize the API client safely
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work correctly.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateNeedSummary = async (need: Need): Promise<string | null> => {
  const client = getClient();
  if (!client) return null;

  try {
    const prompt = `
      Summarize the following aid request in one short, impactful sentence.
      Focus on the location (${need.location}), the specific items needed, and the urgency (${need.urgency}).
      
      Full Description: "${need.description}"
      Title: "${need.title}"
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return null;
  }
};

export const generateResponsePlan = async (scenario: string): Promise<AIResponsePlan | null> => {
  const client = getClient();
  if (!client) return null;

  try {
    const prompt = `
      You are an expert crisis management AI for an African NGO context (specifically Zimbabwe).
      Create a pandemic response plan for the following scenario: "${scenario}".
      The currency should be USD.
      Focus on realistic logistics for Southern Africa.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategyName: { type: Type.STRING },
            immediateActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            requiredResources: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            riskAssessment: { type: Type.STRING },
            estimatedBudgetUSD: { type: Type.NUMBER }
          },
          required: ["strategyName", "immediateActions", "requiredResources", "riskAssessment", "estimatedBudgetUSD"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as AIResponsePlan;

  } catch (error) {
    console.error("Error generating plan:", error);
    return null;
  }
};

export const chatWithAI = async (message: string, history: { role: 'user' | 'model'; text: string }[]) => {
  const client = getClient();
  if (!client) return "AI Service Unavailable (Missing Key)";

  try {
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      config: {
        systemInstruction: "You are a helpful assistant for 'Ubuntu Relief', a pandemic response platform in Zimbabwe. Be empathetic, resourceful, and concise. Prioritize safety and official health guidelines."
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};