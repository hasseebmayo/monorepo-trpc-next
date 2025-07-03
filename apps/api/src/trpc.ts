import { initTRPC } from "@trpc/server";
import { z } from "zod";

// Initialize tRPC
const t = initTRPC.create();

// Export router, procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
