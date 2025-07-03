import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@workspace/api/types";
import type { CreateTRPCReact } from "@trpc/react-query";

export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

export type { AppRouter } from "@workspace/api/types";
export { TRPCProvider } from "./provider";
