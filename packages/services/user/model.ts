import { z } from "zod";

export const createUserWithEmailAndPasswordInput = z.object({
    fullName: z.string().describe("Full name of the user"),
    email: z.email().describe("Email addess if the user"),
    password: z.string().describe("Password of the user"),
})

export type CreateUserWithEmailAndPasswordType = z.infer<typeof createUserWithEmailAndPasswordInput>;