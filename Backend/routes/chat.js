import express from "express";
import "dotenv/config";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import Thread from "../models/Thread.js";
import geminiAPIResponse from "../utils/gemini.js";
import authMiddleware from "../middleware/auth.js";

const route = express.Router();


// Test route
route.post("/test", async (req, res) => {

    try {

        const thread = new Thread({
            threadId: "xyz",
            title: "Testing Thread2"
        });

        const response = await thread.save();

        res.send(response);

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            error: error.message
        });

    }

});


// Get all threads of logged-in user
route.get("/thread", authMiddleware, async (req, res) => {

    try {

        const threads = await Thread.find({
            userId: req.userId
        }).sort({
            updatedAt: -1
        });

        res.json(threads);

    } catch (error) {

        console.error("Error fetching threads:", error);

        res.status(500).json({
            error: error.message
        });

    }

});


// Get one thread
route.get("/thread/:threadId", authMiddleware, async (req, res) => {

    const { threadId } = req.params;

    try {

        const thread = await Thread.findOne({
            threadId,
            userId: req.userId
        });

        if (!thread) {

            return res.status(404).json({
                error: "Thread not found"
            });

        }

        res.json(thread.messages);

    } catch (error) {

        console.error("Error fetching thread:", error);

        res.status(500).json({
            error: error.message
        });

    }

});


// Delete thread
route.delete("/thread/:threadId", authMiddleware, async (req, res) => {

    const { threadId } = req.params;

    try {

        const thread = await Thread.findOneAndDelete({
            threadId,
            userId: req.userId
        });

        if (!thread) {

            return res.status(404).json({
                error: "Thread not found"
            });

        }

        res.json({
            message: "Thread deleted successfully"
        });

    } catch (error) {

        console.error("Error deleting thread:", error);

        res.status(500).json({
            error: error.message
        });

    }

});


// Chat
route.post("/chat", authMiddleware, async (req, res) => {

    const { threadId, message } = req.body;

    if (!threadId || !message) {

        return res.status(400).json({
            error: "Thread ID and message are required"
        });

    }

    try {

        let thread = await Thread.findOne({
            threadId,
            userId: req.userId
        });


        // Create new thread
        if (!thread) {

            thread = new Thread({

                threadId,

                title: message.substring(0, 20),

                userId: req.userId,

                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]

            });

        } else {

            thread.messages.push({
                role: "user",
                content: message
            });

        }


        // Gemini response
        const aiResponse = await geminiAPIResponse(message);


        thread.messages.push({
            role: "assistant",
            content: aiResponse
        });


        thread.updatedAt = new Date();

        await thread.save();


        res.json({
            answer: aiResponse,
            threadId: thread.threadId
        });


    } catch (error) {

        console.error("Error sending message:", error);

        res.status(500).json({
            error: error.message
        });

    }

});


export default route;