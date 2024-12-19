export type Role = 'admin' | 'user';
export interface IUserDto {
	email: string;
	password: string;
	role: Role;
}
