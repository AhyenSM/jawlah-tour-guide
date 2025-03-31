// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var gameScores = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  score: integer("score").notNull(),
  travelerType: text("traveler_type").notNull(),
  choices: json("choices").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var gameStats = pgTable("game_stats", {
  id: serial("id").primaryKey(),
  totalPlays: integer("total_plays").notNull().default(0),
  scenarioId: integer("scenario_id").notNull(),
  choiceId: text("choice_id").notNull(),
  choiceCount: integer("choice_count").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertGameScoreSchema = createInsertSchema(gameScores).pick({
  userId: true,
  score: true,
  travelerType: true,
  choices: true
});
var insertGameStatsSchema = createInsertSchema(gameStats).pick({
  totalPlays: true,
  scenarioId: true,
  choiceId: true,
  choiceCount: true
});

// server/storage.ts
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon, neonConfig } from "@neondatabase/serverless";
import { eq, and, sql } from "drizzle-orm";
neonConfig.fetchConnectionCache = true;
var PgStorage = class {
  db;
  constructor() {
    const sqlQueryExecutor = neon(process.env.DATABASE_URL);
    this.db = drizzle(sqlQueryExecutor);
  }
  // User operations
  async getUser(id) {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  async getUserByUsername(username) {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  async createUser(insertUser) {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  // Game score operations
  async saveGameScore(score) {
    const result = await this.db.insert(gameScores).values(score).returning();
    return result[0];
  }
  async getTopScores(limit = 10) {
    return await this.db.select().from(gameScores).orderBy(sql`${gameScores.score} DESC`).limit(limit);
  }
  async getUserScores(userId) {
    return await this.db.select().from(gameScores).where(eq(gameScores.userId, userId)).orderBy(sql`${gameScores.createdAt} DESC`);
  }
  // Game statistics operations
  async updateGameStats(scenarioId, choiceId) {
    const existingStats = await this.db.select().from(gameStats).where(
      and(
        eq(gameStats.scenarioId, scenarioId),
        eq(gameStats.choiceId, choiceId)
      )
    );
    if (existingStats.length > 0) {
      await this.db.update(gameStats).set({
        choiceCount: existingStats[0].choiceCount + 1,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(
        and(
          eq(gameStats.scenarioId, scenarioId),
          eq(gameStats.choiceId, choiceId)
        )
      );
    } else {
      await this.db.insert(gameStats).values({
        scenarioId,
        choiceId,
        choiceCount: 1,
        totalPlays: 1
      });
    }
    await this.db.execute(
      sql`UPDATE game_stats SET total_plays = total_plays + 1 WHERE scenario_id != ${scenarioId} OR choice_id != ${choiceId}`
    );
  }
  async getGameStats() {
    const totalPlaysResult = await this.db.select({
      total: sql`MAX(${gameStats.totalPlays})`
    }).from(gameStats);
    const totalPlays = totalPlaysResult[0]?.total || 0;
    const popularChoices = await this.db.select({
      scenarioId: gameStats.scenarioId,
      choiceId: gameStats.choiceId,
      count: gameStats.choiceCount
    }).from(gameStats).orderBy(sql`${gameStats.choiceCount} DESC`).limit(10);
    return {
      totalPlays,
      popularChoices: popularChoices.map((choice) => ({
        scenarioId: choice.scenarioId,
        choiceId: choice.choiceId,
        count: choice.count
      }))
    };
  }
};
var MemStorage = class {
  users;
  gameScores;
  gameStats;
  currentUserId;
  currentScoreId;
  currentStatsId;
  totalPlays;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.gameScores = /* @__PURE__ */ new Map();
    this.gameStats = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentScoreId = 1;
    this.currentStatsId = 1;
    this.totalPlays = 0;
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const now = /* @__PURE__ */ new Date();
    const user = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  // Game score operations
  async saveGameScore(score) {
    const id = this.currentScoreId++;
    const now = /* @__PURE__ */ new Date();
    const gameScore = { ...score, id, createdAt: now };
    this.gameScores.set(id, gameScore);
    return gameScore;
  }
  async getTopScores(limit = 10) {
    return Array.from(this.gameScores.values()).sort((a, b) => b.score - a.score).slice(0, limit);
  }
  async getUserScores(userId) {
    return Array.from(this.gameScores.values()).filter((score) => score.userId === userId).sort((a, b) => {
      return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
    });
  }
  // Game statistics operations
  async updateGameStats(scenarioId, choiceId) {
    this.totalPlays++;
    const key = `${scenarioId}-${choiceId}`;
    if (this.gameStats.has(key)) {
      const stats = this.gameStats.get(key);
      stats.choiceCount++;
      stats.totalPlays = this.totalPlays;
      stats.updatedAt = /* @__PURE__ */ new Date();
    } else {
      const id = this.currentStatsId++;
      this.gameStats.set(key, {
        id,
        scenarioId,
        choiceId,
        choiceCount: 1,
        totalPlays: this.totalPlays,
        updatedAt: /* @__PURE__ */ new Date()
      });
    }
    for (const [existingKey, stats] of this.gameStats.entries()) {
      if (existingKey !== key) {
        stats.totalPlays = this.totalPlays;
      }
    }
  }
  async getGameStats() {
    const popularChoices = Array.from(this.gameStats.values()).sort((a, b) => b.choiceCount - a.choiceCount).slice(0, 10).map((stats) => ({
      scenarioId: stats.scenarioId,
      choiceId: stats.choiceId,
      count: stats.choiceCount
    }));
    return {
      totalPlays: this.totalPlays,
      popularChoices
    };
  }
};
var storageImpl;
try {
  storageImpl = new PgStorage();
  console.log("Using PostgreSQL database for storage");
} catch (error) {
  console.log("Failed to connect to PostgreSQL, using in-memory storage instead:", error);
  storageImpl = new MemStorage();
}
var storage = storageImpl;

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/game/stats", async (req, res) => {
    try {
      const stats = await storage.getGameStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching game stats:", error);
      res.status(500).json({ error: "Failed to fetch game statistics" });
    }
  });
  app2.post("/api/game/stats", async (req, res) => {
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
  app2.post("/api/game/scores", async (req, res) => {
    try {
      const validatedData = insertGameScoreSchema.parse(req.body);
      const savedScore = await storage.saveGameScore(validatedData);
      res.status(201).json(savedScore);
    } catch (error) {
      console.error("Error saving game score:", error);
      res.status(500).json({ error: "Failed to save game score" });
    }
  });
  app2.get("/api/game/leaderboard", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const topScores = await storage.getTopScores(limit);
      res.json(topScores);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });
  app2.get("/api/game/scores/user/:userId", async (req, res) => {
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
  app2.post("/api/users", async (req, res) => {
    try {
      const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(6)
      });
      const validatedData = schema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      const createdUser = await storage.createUser(validatedData);
      const { password, ...userWithoutPassword } = createdUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });
  app2.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
