import express from "express";
import "dotenv/config";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import Thread from "../models/Thread.js";
import geminiAPIResponse from "../utils/gemini.js";

const route = express.Router();
//test route to check if the server is running
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



//Get all threads
route.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (error) {
        console.error("Error fetching threads:", error);
        res.status(500).json({
            error: error.message
        });
    }
});

route.get("/thread/:threadId", async (req, res) => {
    const {threadId} = req.params;
    try {
        const thread = await Thread.findOne({ threadId }); 
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }   
        res.json(thread.messages);
    } catch (error) {
        console.error("Error fetching thread:", error);
        res.status(500).json({
            error: error.message
        });
    }
});

route.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOneAndDelete({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json({ message: "Thread deleted successfully" });
    } catch (error) {
        console.error("Error deleting thread:", error);
        res.status(500).json({
            error: error.message
        });
    }
});


route.post("/chat", async (req, res) => {
    const { threadId,message } = req.body;

    if(!threadId || !message) {
        return res.status(400).json({ error: "Thread ID and message are required" });
    }

    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            //create new thread 
             thread = new Thread({
                threadId,
                title: message.substring(0, 20) ,
                messages: [{role: "user", content: message}]
            });
        }else{
            thread.messages.push({role: "user", content: message});
        }

        const aiResponse = await geminiAPIResponse(message);
        thread.messages.push({role: "assistant", content: aiResponse});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({ answer: aiResponse, threadId: thread.threadId });

        
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            error: error.message
        });
    }
});

export default route;