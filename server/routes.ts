import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatSessionSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get or create chat session
  app.post("/api/chat/session", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      let session = await storage.getChatSession(sessionId);
      
      if (!session) {
        const newSession = {
          sessionId,
          currentMenu: 'main',
          menuStack: [],
          conversationHistory: [],
        };
        
        const validatedSession = insertChatSessionSchema.parse(newSession);
        session = await storage.createChatSession(validatedSession);
      }

      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to handle chat session" });
    }
  });

  // Update chat session state
  app.patch("/api/chat/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const updates = req.body;

      const updatedSession = await storage.updateChatSession(sessionId, updates);
      
      if (!updatedSession) {
        return res.status(404).json({ message: "Session not found" });
      }

      res.json(updatedSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to update session" });
    }
  });

  // Get chat messages for a session
  app.get("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get messages" });
    }
  });

  // Add a new chat message
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedMessage = insertChatMessageSchema.parse(req.body);
      const message = await storage.addChatMessage(validatedMessage);
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to add message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
