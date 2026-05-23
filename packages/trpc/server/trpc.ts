import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { createContext } from "./context";
import { getAuthneticationCookie } from "./utils/cookie";
import { userService } from "./services";

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

export const authenticatedProcedure = tRPCContext.procedure.use(async ({ ctx, next }) => {
  const userToken = getAuthneticationCookie(ctx);

  if (!userToken) throw new Error("User is not logged in");

  const { id } = await userService.verifyAndDecodeUserToken(userToken);

  return next({
    ctx: { ...ctx, user: { id } }
  })
});