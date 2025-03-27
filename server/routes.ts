import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertGameScoreSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // === Game Statistics API Routes ===
  
  // Get game statistics
  app.get('/api/game/stats', async (req, res) => {
    try {
      const stats = await storage.getGameStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching game stats:", error);
      res.status(500).json({ error: "Failed to fetch game statistics" });
    }
  });

  // Update game statistics when a choice is made
  app.post('/api/game/stats', async (req, res) => {
    try {
      const schema = z.object({
        scenarioId: z.number(),
        choiceId: z.string()
      });

      const validatedData = schema.parse(req.body);
      await storage.updateGameStats(validatedData.scenarioId, validatedData.choiceId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating game stats:", error);
      res.status(500).json({ error: "Failed to update game statistics" });
    }
  });

  // === Game Scores API Routes ===
  
  // Save a game score
  app.post('/api/game/scores', async (req, res) => {
    try {
      const validatedData = insertGameScoreSchema.parse(req.body);
      const savedScore = await storage.saveGameScore(validatedData);
      res.status(201).json(savedScore);
    } catch (error) {
      console.error("Error saving game score:", error);
      res.status(500).json({ error: "Failed to save game score" });
    }
  });

  // Get top scores (leaderboard)
  app.get('/api/game/leaderboard', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const topScores = await storage.getTopScores(limit);
      res.json(topScores);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Get scores for a specific user
  app.get('/api/game/scores/user/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const userScores = await storage.getUserScores(userId);
      res.json(userScores);
    } catch (error) {
      console.error("Error fetching user scores:", error);
      res.status(500).json({ error: "Failed to fetch user scores" });
    }
  });

  // === User API Routes ===
  
  // Create a new user (simple registration)
  app.post('/api/users', async (req, res) => {
    try {
      const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(6)
      });

      const validatedData = schema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      
      const createdUser = await storage.createUser(validatedData);
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = createdUser;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Basic login endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
