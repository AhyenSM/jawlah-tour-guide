import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gameScores = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  score: integer("score").notNull(),
  travelerType: text("traveler_type").notNull(),
  choices: json("choices").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gameStats = pgTable("game_stats", {
  id: serial("id").primaryKey(),
  totalPlays: integer("total_plays").notNull().default(0),
  scenarioId: integer("scenario_id").notNull(),
  choiceId: text("choice_id").notNull(),
  choiceCount: integer("choice_count").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema for inserting users
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Schema for inserting game scores
export const insertGameScoreSchema = createInsertSchema(gameScores).pick({
  userId: true,
  score: true,
  travelerType: true,
  choices: true,
});

// Schema for inserting/updating game statistics
export const insertGameStatsSchema = createInsertSchema(gameStats).pick({
  totalPlays: true,
  scenarioId: true,
  choiceId: true,
  choiceCount: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGameScore = z.infer<typeof insertGameScoreSchema>;
export type GameScore = typeof gameScores.$inferSelect;

export type InsertGameStats = z.infer<typeof insertGameStatsSchema>;
export type GameStats = typeof gameStats.$inferSelect;
