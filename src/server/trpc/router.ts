import { router } from "./init";
import { courseRouter } from "../routers/course";

export const appRouter = router({
  course: courseRouter,
});

export type AppRouter = typeof appRouter;
