import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import type { User, CreateUser, UpdateUser } from "@workspace/types";
import { CreateUserSchema, UpdateUserSchema } from "@workspace/types";

// Mock data store
let users: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "jane@example.com",
    name: "Jane Smith",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
];

export const userRouter = router({
  // Get all users
  getAll: publicProcedure.query(() => {
    return users;
  }),

  // Get user by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const user = users.find((u) => u.id === input.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),

  // Create user
  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(({ input }) => {
      const newUser: User = {
        ...input,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    }),  // Update user
  update: publicProcedure
    .input(z.object({ id: z.string(), data: UpdateUserSchema }))
    .mutation(({ input }) => {
      const userIndex = users.findIndex((u) => u.id === input.id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const currentUser = users[userIndex]!; // We know it exists because we found the index
      const updatedUser: User = {
        id: currentUser.id,
        email: input.data.email ?? currentUser.email,
        name: input.data.name ?? currentUser.name,
        createdAt: currentUser.createdAt,
        updatedAt: new Date(),
      };

      users[userIndex] = updatedUser;

      return updatedUser;
    }),

  // Delete user
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const userIndex = users.findIndex((u) => u.id === input.id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);
      return deletedUser;
    }),
});
