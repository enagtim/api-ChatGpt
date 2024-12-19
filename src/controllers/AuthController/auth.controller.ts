import { inject, injectable } from 'inversify';
import { IAuthController } from './auth.controller.interface';
import { TYPES } from '../../types';
import { IAuthService } from '../../services/auth.service.interface';
import { Request, Response } from 'express';
import { IUserDto } from '../../dto/user.dto';

@injectable()
export class AuthController implements IAuthController {
	constructor(@inject(TYPES.AuthService) private authservice: IAuthService) {}
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, role }: IUserDto = req.body;
			if (!email || !password || !role) {
				res.status(400).json({ message: 'Register data not valid' });
				return;
			}
			const user = this.authservice.register(email, password, role);
			res.status(201).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res
					.status(500)
					.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred' });
			}
		}
	}
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password }: IUserDto = req.body;
			if (!email || !password) {
				res.status(400).json({ message: 'Login data invalid. Email or password is required' });
				return;
			}
			const token = await this.authservice.login(email, password);
			res.status(200).json(token);
		} catch (error) {
			if (error instanceof Error) {
				res
					.status(500)
					.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred' });
			}
		}
	}
}
