import dotenv from 'dotenv';
dotenv.config();
import { JwtPayload, sign } from "jsonwebtoken";

export async function generateToken(payload: JwtPayload): Promise<String> {
    const jwtSecret = process.env.JWT_SECRET || 'jwtSecret';
    const tokenExpiry = Number(process.env.JWT_EXPIRES)
    return new Promise((resolve, reject) => {
        let token = sign(payload, jwtSecret, { expiresIn: tokenExpiry });
        return resolve(token);
    })
}