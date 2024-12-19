import { PrismaClient } from '@prisma/client';
import { IAuthRepository } from './auth.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { Role, IUserDto } from '../../dto/user.dto';
import 'reflect-metadata';

@injectable()
export class AuthRepository implements IAuthRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async register(email: string, password: string, role: Role): Promise<IUserDto> {
		return this.prisma.user.create({
			data: { email, password, role },
		});
	}
	public async getByEmail(email: string): Promise<IUserDto | null> {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}
}
