import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const geminiAPIResponse = async (message) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: `Answer the question directly.

                If the answer contains programming code, always put the code inside a Markdown code block with the correct language.

                Example:
                \`\`\`java
                public class Example {
                    public static void main(String[] args) {
                        System.out.println("Hello");
                    }
                }
                \`\`\`

                For normal answers, use simple readable text.

                Question: ${message}`
        });

        console.log("Gemini:", response.text);
        return response.text;

    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};

export default geminiAPIResponse;