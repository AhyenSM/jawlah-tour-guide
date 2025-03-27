import { 
  users, type User, type InsertUser,
  gameScores, type GameScore, type InsertGameScore,
  gameStats, type GameStats, type InsertGameStats 
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon, neonConfig } from '@neondatabase/serverless';
import { eq, and, sql } from "drizzle-orm";

// Enable WebSocket pooling for better performance
neonConfig.fetchConnectionCache = true;

// Storage interface definition
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game score operations
  saveGameScore(score: InsertGameScore): Promise<GameScore>;
  getTopScores(limit?: number): Promise<GameScore[]>;
  getUserScores(userId: number): Promise<GameScore[]>;
  
  // Game statistics operations
  updateGameStats(scenarioId: number, choiceId: string): Promise<void>;
  getGameStats(): Promise<{ totalPlays: number, popularChoices: Array<{ scenarioId: number, choiceId: string, count: number }> }>;
}

// PostgreSQL storage implementation
export class PgStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    // Create a SQL query executor for Neon database
    const sqlQueryExecutor = neon(process.env.DATABASE_URL!);
    // Create a Drizzle instance
    this.db = drizzle(sqlQueryExecutor);
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Game score operations
  async saveGameScore(score: InsertGameScore): Promise<GameScore> {
    const result = await this.db.insert(gameScores).values(score).returning();
    return result[0];
  }

  async getTopScores(limit: number = 10): Promise<GameScore[]> {
    return await this.db.select()
      .from(gameScores)
      .orderBy(sql`${gameScores.score} DESC`)
      .limit(limit);
  }

  async getUserScores(userId: number): Promise<GameScore[]> {
    return await this.db.select()
      .from(gameScores)
      .where(eq(gameScores.userId, userId))
      .orderBy(sql`${gameScores.createdAt} DESC`);
  }

  // Game statistics operations
  async updateGameStats(scenarioId: number, choiceId: string): Promise<void> {
    // First, try to update the existing record
    const existingStats = await this.db.select()
      .from(gameStats)
      .where(
        and(
          eq(gameStats.scenarioId, scenarioId),
          eq(gameStats.choiceId, choiceId)
        )
      );

    if (existingStats.length > 0) {
      // Update existing record
      await this.db.update(gameStats)
        .set({ 
          choiceCount: existingStats[0].choiceCount + 1,
          updatedAt: new Date()
        })
        .where(
          and(
            eq(gameStats.scenarioId, scenarioId),
            eq(gameStats.choiceId, choiceId)
          )
        );
    } else {
      // Create new record
      await this.db.insert(gameStats)
        .values({
          scenarioId,
          choiceId,
          choiceCount: 1,
          totalPlays: 1
        });
    }

    // Increment total plays counter for all records
    await this.db.execute(
      sql`UPDATE game_stats SET total_plays = total_plays + 1 WHERE scenario_id != ${scenarioId} OR choice_id != ${choiceId}`
    );
  }

  async getGameStats(): Promise<{ 
    totalPlays: number, 
    popularChoices: Array<{ scenarioId: number, choiceId: string, count: number }> 
  }> {
    // Get total plays
    const totalPlaysResult = await this.db.select({
      total: sql<number>`MAX(${gameStats.totalPlays})`
    }).from(gameStats);
    
    const totalPlays = totalPlaysResult[0]?.total || 0;

    // Get most popular choices per scenario
    const popularChoices = await this.db.select({
      scenarioId: gameStats.scenarioId,
      choiceId: gameStats.choiceId,
      count: gameStats.choiceCount
    })
    .from(gameStats)
    .orderBy(sql`${gameStats.choiceCount} DESC`)
    .limit(10);

    return {
      totalPlays,
      popularChoices: popularChoices.map(choice => ({
        scenarioId: choice.scenarioId,
        choiceId: choice.choiceId,
        count: choice.count
      }))
    };
  }
}

// Memory storage implementation for fallback/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameScores: Map<number, GameScore>;
  private gameStats: Map<string, GameStats>;
  currentUserId: number;
  currentScoreId: number;
  currentStatsId: number;
  totalPlays: number;

  constructor() {
    this.users = new Map();
    this.gameScores = new Map();
    this.gameStats = new Map();
    this.currentUserId = 1;
    this.currentScoreId = 1;
    this.currentStatsId = 1;
    this.totalPlays = 0;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Game score operations
  async saveGameScore(score: InsertGameScore): Promise<GameScore> {
    const id = this.currentScoreId++;
    const now = new Date();
    const gameScore: GameScore = { ...score, id, createdAt: now };
    this.gameScores.set(id, gameScore);
    return gameScore;
  }

  async getTopScores(limit: number = 10): Promise<GameScore[]> {
    return Array.from(this.gameScores.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  async getUserScores(userId: number): Promise<GameScore[]> {
    return Array.from(this.gameScores.values())
      .filter(score => score.userId === userId)
      .sort((a, b) => {
        return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
      });
  }

  // Game statistics operations
  async updateGameStats(scenarioId: number, choiceId: string): Promise<void> {
    this.totalPlays++;
    const key = `${scenarioId}-${choiceId}`;
    
    if (this.gameStats.has(key)) {
      const stats = this.gameStats.get(key)!;
      stats.choiceCount++;
      stats.totalPlays = this.totalPlays;
      stats.updatedAt = new Date();
    } else {
      const id = this.currentStatsId++;
      this.gameStats.set(key, {
        id,
        scenarioId,
        choiceId,
        choiceCount: 1,
        totalPlays: this.totalPlays,
        updatedAt: new Date()
      });
    }

    // Update totalPlays for all other records
    for (const [existingKey, stats] of this.gameStats.entries()) {
      if (existingKey !== key) {
        stats.totalPlays = this.totalPlays;
      }
    }
  }

  async getGameStats(): Promise<{ 
    totalPlays: number, 
    popularChoices: Array<{ scenarioId: number, choiceId: string, count: number }> 
  }> {
    const popularChoices = Array.from(this.gameStats.values())
      .sort((a, b) => b.choiceCount - a.choiceCount)
      .slice(0, 10)
      .map(stats => ({
        scenarioId: stats.scenarioId,
        choiceId: stats.choiceId,
        count: stats.choiceCount
      }));

    return {
      totalPlays: this.totalPlays,
      popularChoices
    };
  }
}

// Choose the appropriate storage implementation
let storageImpl: IStorage;

try {
  // Try to use PostgreSQL if available
  storageImpl = new PgStorage();
  console.log("Using PostgreSQL database for storage");
} catch (error) {
  // Fall back to in-memory storage if needed
  console.log("Failed to connect to PostgreSQL, using in-memory storage instead:", error);
  storageImpl = new MemStorage();
}

export const storage = storageImpl;
