import bcrypt from 'bcrypt';
import { ICryptoService } from '../interfaces/crypto-service.interface';

export class CryptoService implements ICryptoService {
    private readonly saltRounds: number;

    constructor(saltRounds: number = 10) {
        this.saltRounds = saltRounds;
    }

    public async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
