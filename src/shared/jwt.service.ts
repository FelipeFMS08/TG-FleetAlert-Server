import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    email: string;
    firstAccess: boolean;
}

export class JwtService {
    private readonly secretKey: string;
    private readonly expiresIn: string;
    private readonly refreshTokenExpiresIn: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY!;
        this.expiresIn = process.env.JWT_EXPIRES_IN || '12h';
        this.refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
    }

    generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn});
    }

    generateRefreshToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.refreshTokenExpiresIn });
    }

    verifyToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, this.secretKey) as JwtPayload;
        } catch (error) {
            return null;
        }
    }

    refreshToken(token: string): string | null {
        const payload = this.verifyToken(token);
        if (payload) {
            return this.generateToken(payload)
        }
        return null;
    }
}