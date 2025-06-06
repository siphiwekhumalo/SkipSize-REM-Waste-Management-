import { pgTable, text, serial, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const skips = pgTable("skips", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  dimensions: text("dimensions").notNull(),
  capacity: text("capacity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  suitableFor: jsonb("suitable_for").$type<string[]>(),
  isPopular: boolean("is_popular").default(false),
  features: jsonb("features").$type<string[]>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSkipSchema = createInsertSchema(skips).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Skip = typeof skips.$inferSelect;
export type InsertSkip = z.infer<typeof insertSkipSchema>;

// API response types
export const skipApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  size: z.string(),
  dimensions: z.string().optional(),
  capacity: z.string().optional(),
  price: z.number(),
  originalPrice: z.number().optional(),
  imageUrl: z.string().optional(),
  suitableFor: z.array(z.string()).optional(),
  isPopular: z.boolean().optional(),
  features: z.array(z.string()).optional(),
});

export type SkipApiResponse = z.infer<typeof skipApiResponseSchema>;
