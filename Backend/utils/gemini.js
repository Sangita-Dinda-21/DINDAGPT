import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const geminiAPIResponse = async (message) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: message
        });

        console.log("Gemini:", response.text);

        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};

export default geminiAPIResponse;