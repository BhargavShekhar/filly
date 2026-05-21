import { createHmac, randomBytes } from "node:crypto";

import JWT from "jsonwebtoken";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import { createUserWithEmailAndPasswordInput, generateUserTokenPayload, GenerateUserTokenPayloadType, type CreateUserWithEmailAndPasswordType } from "./model";
import { env } from "../env";

class UserService {
    private async getUserByEmail(email: string) {
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (!result || result.length === 0) return null;

        return result[0];
    }

    private async generateUserToken(payload: GenerateUserTokenPayloadType) {
        const { id } = await generateUserTokenPayload.parseAsync(payload);

        const token = JWT.sign({ id }, env.JWT_SECRET)

        return { token };
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordType) {
        const { fullName, email, password } = await createUserWithEmailAndPasswordInput.parseAsync(payload);

        const existingUserWithEmail = await this.getUserByEmail(email);

        if (existingUserWithEmail) throw new Error(`User with email ${email} already exists`);

        const salt = randomBytes(16).toString("hex");
        const hash = createHmac("sha256", salt).update(password).digest("hex");

        const userInsertResult = await db.insert(usersTable).values({
            fullName,
            email,
            password: hash,
            salt
        }).returning({ id: usersTable.id })

        if (!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id) throw new Error(`Something went wrong while creating user`);

        const userId = userInsertResult[0].id;

        const { token } = await this.generateUserToken({ id: userId });

        return {
            id: userId,
            token
        }
    }
}

export default UserService;