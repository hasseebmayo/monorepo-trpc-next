import type { AnyRouter } from "@trpc/server";
import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { healthRouter } from "./routers/health";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  health: healthRouter,
}) satisfies AnyRouter;

// Explicitly type the AppRouter to avoid TypeScript inference issues
export type AppRouter = typeof appRouter;
