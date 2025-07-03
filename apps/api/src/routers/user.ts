import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  createUserSchema,
  updateUserSchema,
  getUserParamsSchema,
  getUsersQuerySchema,
  type User,
  type NewUser,
  type UpdateUser
} from "@workspace/drizzle/schemas";

// Mock data store
let users: User[] = [
  {
    id: 1,
    email: "john@example.com",
    name: "John Doe",
    avatar: null,
    emailVerified: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    email: "jane@example.com",
    name: "Jane Smith",
    avatar: null,
    emailVerified: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
];

export const userRouter = router({
  // Get all users
  getAll: publicProcedure
    .input(getUsersQuerySchema)
    .query(({ input }) => {
      let filteredUsers = users;

      // Apply search filter if provided
      if (input.search) {
        filteredUsers = users.filter(user =>
          user.name.toLowerCase().includes(input.search!.toLowerCase()) ||
          user.email.toLowerCase().includes(input.search!.toLowerCase())
        );
      }

      // Apply pagination
      const start = (input.page - 1) * input.limit;
      const end = start + input.limit;

      return {
        users: filteredUsers.slice(start, end),
        total: filteredUsers.length,
        page: input.page,
        limit: input.limit,
      };
    }),

  // Get user by ID
  getById: publicProcedure
    .input(getUserParamsSchema)
    .query(({ input }) => {
      const user = users.find((u) => u.id === input.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),

  // Create user
  create: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => {
      const newUser: User = {
        ...input,
        id: Math.floor(Math.random() * 10000),
        avatar: input.avatar || null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    }),

  // Update user
  update: publicProcedure
    .input(z.object({
      id: z.coerce.number().positive(),
      data: updateUserSchema
    }))
    .mutation(({ input }) => {
      const userIndex = users.findIndex((u) => u.id === input.id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const currentUser = users[userIndex]!;
      const updatedUser: User = {
        ...currentUser,
        ...input.data,
        id: currentUser.id,
        createdAt: currentUser.createdAt,
        updatedAt: new Date(),
      };

      users[userIndex] = updatedUser;
      return updatedUser;
    }),

  // Delete user
  delete: publicProcedure
    .input(getUserParamsSchema)
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
