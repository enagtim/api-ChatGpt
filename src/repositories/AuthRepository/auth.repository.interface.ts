import { User, Role } from '@prisma/client';

export interface IAuthRepository {
	register: (email: string, password: string, role: Role) => Promise<User>;
	getByEmail: (email: string) => Promise<User | null>;
}
