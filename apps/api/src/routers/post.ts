import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import type { Post, CreatePost, UpdatePost } from "@workspace/types";
import { CreatePostSchema, UpdatePostSchema } from "@workspace/types";

// Mock data store
let posts: Post[] = [
  {
    id: "1",
    title: "Hello World",
    content: "This is my first post!",
    published: true,
    authorId: "1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "Second Post",
    content: "This is my second post!",
    published: false,
    authorId: "2",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
];

export const postRouter = router({
  // Get all posts
  getSomething: publicProcedure
    .query(() => {
      return "Hello from the post router!";
    }),
  getAll: publicProcedure
    .input(z.object({ published: z.boolean().optional() }).optional())
    .query(({ input }) => {
      if (input?.published !== undefined) {
        return posts.filter((p) => p.published === input.published);
      }
      return posts;
    }),

  // Get post by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const post = posts.find((p) => p.id === input.id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    }),

  // Get posts by author
  getByAuthor: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(({ input }) => {
      return posts.filter((p) => p.authorId === input.authorId);
    }),

  // Create post
  create: publicProcedure
    .input(CreatePostSchema)
    .mutation(({ input }) => {
      const newPost: Post = {
        ...input,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      posts.push(newPost);
      return newPost;
    }),

  // Update post
  update: publicProcedure
    .input(z.object({ id: z.string(), data: UpdatePostSchema }))
    .mutation(({ input }) => {
      const postIndex = posts.findIndex((p) => p.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      const currentPost = posts[postIndex]!; // We know it exists
      const updatedPost: Post = {
        id: currentPost.id,
        title: input.data.title ?? currentPost.title,
        content: input.data.content ?? currentPost.content,
        published: input.data.published ?? currentPost.published,
        authorId: input.data.authorId ?? currentPost.authorId,
        createdAt: currentPost.createdAt,
        updatedAt: new Date(),
      };

      posts[postIndex] = updatedPost;

      return updatedPost;
    }),

  // Delete post
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const postIndex = posts.findIndex((p) => p.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      const deletedPost = posts[postIndex];
      posts.splice(postIndex, 1);
      return deletedPost;
    }),
});
