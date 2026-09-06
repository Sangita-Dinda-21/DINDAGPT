import express from "express";
import "dotenv/config";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    }catch (error) {
        console.error("MongoDB connection error:", error);
        // process.exit(1);
    }
}


// app.post("/test", async (req, res) => {
//     try {
//         const { message } = req.body;

//         const response = await ai.models.generateContent({
//             model: "gemini-3.7-flash",
//             contents: message
//         });

//         console.log("Gemini:", response.text);

//         res.json({
//             answer: response.text
//         });

//     } catch (error) {
//         console.error("Gemini Error:", error);

//         res.status(500).json({
//             error: error.message
//         });
//     }
// });

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
});