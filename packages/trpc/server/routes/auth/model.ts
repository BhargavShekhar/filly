import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string().describe("Name of the User"),
    email: z.email().describe("Email of the user"),
    password: z
        .string()
        .regex(
            /^ (?=.* [a - z])(?=.* [A - Z])(?=.*\d)(?=.* [@$! %*?&]) /,
            "Password must contain uppercase, lowercase, number, and special character"
        )
        .describe("Password of the user")
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe("Id of the user created")
})