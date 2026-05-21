import { randomBytes } from "node:crypto";

import JWT from "jsonwebtoken";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import {
    createUserWithEmailAndPasswordInput,
    signInUserWithEmailAndPasswordInput,
    generateUserTokenPayload,
    type GenerateUserTokenPayloadType,
    type SignInUserWithEmailAndPasswordInputType,
    type CreateUserWithEmailAndPasswordType,
} from "./model";
import { env } from "../env";
import { generateHash } from "../utils/create-hash";

class UserService {
    private async getUserByEmail(email: string) {
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (!result || result.length === 0) return null;

        return result[0];
    }

    private async generateUserToken(payload: GenerateUserTokenPayloadType) {
        const { id } = await generateUserTokenPayload.parseAsync(payload);

        const token = JWT.sign({ id }, env.JWT_SECRET)

        return { token }
    }

    private async verifyUserToken(token: string): Promise<GenerateUserTokenPayloadType> {
        try {
            const payload = JWT.verify(token, env.JWT_SECRET) as GenerateUserTokenPayloadType;
            return payload;
        } catch (error) {
            throw new Error("Invalid user token")
        }
    }

    private async getUserInfoById(id: string) {
        const user = await db.select({
            id: usersTable.id,
            fullName: usersTable.fullName,
            email: usersTable.email,
            profileImage: usersTable.profileImageUrl
        }).from(usersTable).where(eq(usersTable.id, id));

        if (!user || user.length === 0) throw new Error("Invalid user id");

        return user[0]!;
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordType) {
        const { fullName, email, password } = await createUserWithEmailAndPasswordInput.parseAsync(payload);

        const existingUserWithEmail = await this.getUserByEmail(email);

        if (existingUserWithEmail) throw new Error(`User with email ${email} already exists`);

        const salt = randomBytes(16).toString("hex");
        const hash = generateHash(salt, password);

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

    public async signInUserWithEmailAndPassword(payload: SignInUserWithEmailAndPasswordInputType) {
        const { email, password } = await signInUserWithEmailAndPasswordInput.parseAsync(payload);

        const existingUserWithEmail = await this.getUserByEmail(email);

        if (!existingUserWithEmail) throw new Error(`Invalid credentials`);

        if (!existingUserWithEmail.salt || !existingUserWithEmail.password) throw Error(`Invalid Sign in method`);

        const hash = generateHash(existingUserWithEmail.salt, password);

        if (existingUserWithEmail.password !== hash) throw new Error(`Invalid credentials`);

        const userId = existingUserWithEmail.id;

        const { token } = await this.generateUserToken({ id: userId });

        return {
            id: userId,
            token
        }
    }

    public async verifyAndDecodeUserToken(token: string) {
        const { id } = await this.verifyUserToken(token);
        const userInfo = await this.getUserInfoById(id);
        return { ...userInfo }
    }
}

export default UserService;