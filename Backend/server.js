require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function testGemini() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: "What is java??"
        });

        console.log(response.text);
    } catch (error) {
        console.error("Gemini Error:", error.message);
    }
}

testGemini();














// import express from "express";
// import "dotenv/config";
// import cors from "cors";

// const app = express();
// const port = 8080;

// app.use(express.json());
// app.use(cors());

// app.listen(port , ()=>{
//     console.log(`Server runing on port : ${port}`);
// });