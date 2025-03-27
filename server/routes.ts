import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for game statistics (optional)
  app.get('/api/game/stats', (req, res) => {
    // This could be extended to store game statistics in the database
    res.json({
      totalPlays: 0,
      averageScore: 0,
      popularChoices: []
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
