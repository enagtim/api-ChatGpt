import { User, Role, PrismaClient } from '@prisma/client';
import { IAuthRepository } from './auth.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';

@injectable()
export class Auth implements IAuthRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async register(email: string, password: string, role: Role): Promise<User> {
		return this.prisma.user.create({
			data: { email, password, role },
		});
	}
	public async getByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}
}
