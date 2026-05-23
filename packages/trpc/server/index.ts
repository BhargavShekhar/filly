import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { FormRouter } from "./routes/form/route";

export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  form: FormRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
