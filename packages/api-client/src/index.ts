import { createTRPCReact, type CreateTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@workspace/api/types";

// Create the tRPC client with explicit type annotation to resolve TypeScript inference issues
export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

export type { AppRouter } from "@workspace/api/types";
export { TRPCProvider } from "./provider";
