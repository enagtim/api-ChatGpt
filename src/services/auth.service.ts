import { Role, IUserDto } from '../dto/user.dto';
import { IAuthService } from './auth.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IAuthRepository } from '../repositories/AuthRepository/auth.repository.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'reflect-metadata';

@injectable()
export class AuthService implements IAuthService {
	constructor(@inject(TYPES.AuthRepository) private authrepository: IAuthRepository) {}
	public async register(email: string, password: string, role: Role): Promise<IUserDto> {
		const hashedPassword = await bcrypt.hash(password, 12);
		return this.authrepository.register(email, hashedPassword, role);
	}
	public async login(email: string, password: string): Promise<{ token: string } | null> {
		const user = await this.authrepository.getByEmail(email);
		if (!user) {
			return null;
		}
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return null;
		}
		const JWT_SECRET = process.env.JWT_SECRET;
		if (!JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined');
		}
		const token = jwt.sign({ email: user.email, password: user.password }, JWT_SECRET);
		return { token };
	}
}
