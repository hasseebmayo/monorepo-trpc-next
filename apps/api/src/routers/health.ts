import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const healthRouter = router({
  // Check server status
  status: publicProcedure.query(() => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }),

  // Ping endpoint
  ping: publicProcedure
    .input(z.object({ message: z.string().optional() }))
    .query(({ input }) => {
      return {
        pong: input.message || "Hello from tRPC!",
        timestamp: new Date().toISOString(),
      };
    }),
});
