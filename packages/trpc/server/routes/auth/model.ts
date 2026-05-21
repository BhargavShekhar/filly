import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string().describe("Name of the User"),
    email: z.email().describe("Email of the user"),
    password: z.string().describe("Password of the user")
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe("Id of the user created"),
})

export const signInUserWithEmailAndPasswordInput = z.object({
    email: z.email().describe("Email addess if the user"),
    password: z.string().describe("Password of the user"),
})

export const signInUserWithEmailAndPasswordOutput = z.object({
    id: z.string().describe("Id of the user created"),
})