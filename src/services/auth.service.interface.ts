import { Role, IUserDto } from '../dto/user.dto';
export interface IAuthService {
	register: (email: string, password: string, role: Role) => Promise<IUserDto>;
	login: (email: string, password: string) => Promise<{ token: string } | null>;
}
