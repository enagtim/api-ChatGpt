import { Role, IUserDto } from '../../dto/user.dto';

export interface IAuthRepository {
	register: (email: string, password: string, role: Role) => Promise<IUserDto>;
	getByEmail: (email: string) => Promise<IUserDto | null>;
}
