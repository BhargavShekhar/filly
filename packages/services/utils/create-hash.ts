import { createHmac } from "node:crypto";

export function generateHash(salt: string, data: string) {
    return createHmac("sha256", salt).update(data).digest("hex");
}