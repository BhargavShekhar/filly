import { z } from "zod";

export const createUserWithEmailAndPasswordInput = z.object({
    fullName: z.string().describe("Full name of the user"),
    email: z.email().describe("Email addess if the user"),
    password: z.string().describe("Password of the user"),
})

export const signInUserWithEmailAndPasswordInput = z.object({
    email: z.email().describe("Email addess if the user"),
    password: z.string().describe("Password of the user"),
})

export const generateUserTokenPayload = z.object({
    id: z.string().describe("UUID of the user")
})

export type CreateUserWithEmailAndPasswordType = z.infer<typeof createUserWithEmailAndPasswordInput>;
export type SignInUserWithEmailAndPasswordInputType = z.infer<typeof signInUserWithEmailAndPasswordInput>;
export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>;