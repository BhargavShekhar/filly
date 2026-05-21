import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { createCookieFactory, getCookieFactory, clearCookieFactory } from "./utils/cookie";

export interface TrpcContext {
    createCookie: ReturnType<typeof createCookieFactory>,
    getCookie: ReturnType<typeof getCookieFactory>,
    clearCookie: ReturnType<typeof clearCookieFactory>
}

export async function createContext({
    req,
    res
}: CreateExpressContextOptions): Promise<TrpcContext> {
    const ctx: TrpcContext = {
        createCookie: createCookieFactory(res),
        getCookie: getCookieFactory(req),
        clearCookie: clearCookieFactory(res)
    }
    return ctx
}

export type Context = Awaited<ReturnType<typeof createContext>>;
