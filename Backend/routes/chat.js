import express from "express";
import "dotenv/config";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import Thread from "../models/Thread.js";

const route = express.Router();

route.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "xyz",
            title: "Testing Thread2"
        });   
        const response = await thread.save();
        res.send(response);
    }catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({
            error: error.message
        });
    }
});

export default route;