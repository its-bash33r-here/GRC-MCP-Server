import { z } from 'zod';

export const authSchema = z.object({
    apiKey: z.string().min(1),
});

export function validateAuth(token: unknown): boolean {
    try {
        const result = authSchema.safeParse({ apiKey: token });
        if (!result.success) {
            return false;
        }
        
        const { apiKey } = result.data;
        return apiKey === process.env.API_KEY;
    } catch {
        return false;
    }
}

export class AuthUtils {
    static validateToken = validateAuth;

    static generateToken(): string {
        return process.env.API_KEY || '';
    }
}