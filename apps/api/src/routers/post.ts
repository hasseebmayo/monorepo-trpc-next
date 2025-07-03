import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  createPostSchema,
  updatePostSchema,
  getPostParamsSchema,
  getPostsQuerySchema,
  type Post,
  type NewPost,
  type UpdatePost
} from "@workspace/drizzle/schemas";

// Mock data store - updated to match Drizzle schema
let posts: Post[] = [
  {
    id: 1,
    title: "Hello World",
    content: "This is my first post! It contains a lot of interesting content about web development.",
    excerpt: "This is my first post!",
    authorId: 1,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is my second post! Here I discuss various topics related to TypeScript and React.",
    excerpt: "This is my second post!",
    authorId: 2,
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

  // Get all posts with filtering and pagination
  getAll: publicProcedure
    .input(getPostsQuerySchema)
    .query(({ input }) => {
      let filteredPosts = posts;

      // Apply author filter if provided
      if (input.authorId) {
        filteredPosts = posts.filter(post => post.authorId === input.authorId);
      }

      // Apply search filter if provided
      if (input.search) {
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(input.search!.toLowerCase()) ||
          post.content.toLowerCase().includes(input.search!.toLowerCase())
        );
      }

      // Apply pagination
      const start = (input.page - 1) * input.limit;
      const end = start + input.limit;

      return {
        posts: filteredPosts.slice(start, end),
        total: filteredPosts.length,
        page: input.page,
        limit: input.limit,
      };
    }),

  // Get post by ID
  getById: publicProcedure
    .input(getPostParamsSchema)
    .query(({ input }) => {
      const post = posts.find((p) => p.id === input.id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    }),

  // Create post
  create: publicProcedure
    .input(createPostSchema)
    .mutation(({ input }) => {
      const newPost: Post = {
        ...input,
        id: Math.floor(Math.random() * 10000),
        excerpt: input.excerpt || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      posts.push(newPost);
      return newPost;
    }),

  // Update post
  update: publicProcedure
    .input(z.object({
      id: z.coerce.number().positive(),
      data: updatePostSchema
    }))
    .mutation(({ input }) => {
      const postIndex = posts.findIndex((p) => p.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      const currentPost = posts[postIndex]!;
      const updatedPost: Post = {
        ...currentPost,
        ...input.data,
        id: currentPost.id,
        authorId: currentPost.authorId, // Don't allow changing author
        createdAt: currentPost.createdAt,
        updatedAt: new Date(),
      };

      posts[postIndex] = updatedPost;
      return updatedPost;
    }),

  // Delete post
  delete: publicProcedure
    .input(getPostParamsSchema)
    .mutation(({ input }) => {
      const postIndex = posts.findIndex((p) => p.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      const deletedPost = posts[postIndex];
      posts.splice(postIndex, 1);
      return deletedPost;
    }),
});;
