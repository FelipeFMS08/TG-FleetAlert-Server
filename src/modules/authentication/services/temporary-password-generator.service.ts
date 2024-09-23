import { IPasswordGenerator } from "../interfaces/password-generator.interface";
import crypto from 'crypto';

export class TemporaryPasswordGeneratorService implements IPasswordGenerator {
    generateTemporaryPassword(): string {
        return crypto.randomBytes(8).toString('hex');
    }
}