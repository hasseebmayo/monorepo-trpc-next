import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./users";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  authorId: integer("author_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

// Zod schemas for validation
export const insertPostSchema = createInsertSchema(posts, {
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  authorId: z.number().positive("Author ID must be positive"),
});

export const selectPostSchema = createSelectSchema(posts);

export const updatePostSchema = insertPostSchema.partial().omit({ id: true, authorId: true });

// Export types
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type UpdatePost = z.infer<typeof updatePostSchema>;

// API validation schemas
export const createPostSchema = insertPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const getPostParamsSchema = z.object({
  id: z.coerce.number().positive("Post ID must be positive"),
});

export const getPostsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  authorId: z.coerce.number().positive().optional(),
  search: z.string().optional(),
});
