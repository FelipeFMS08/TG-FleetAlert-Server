import { NextFunction } from "express";
import { JwtService } from "../../shared/jwt.service";


export class AuthenticationMiddleware {
    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    public authenticateToken(req: any, res: any, next: NextFunction) {
        const token = req.headers['authorization']?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
    
        const decoded = this.jwtService.verifyToken(token);
        if (!decoded) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    
        req.user = decoded;
        next();
    }
    
}