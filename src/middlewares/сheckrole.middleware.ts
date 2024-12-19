import { Request, Response, NextFunction } from 'express';
import { Role } from '../dto/user.dto';

export const checkRole = (role: Role) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const user = req.user;
		if (!user) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		if (user.role !== role) {
			res.status(403).json({ message: 'Forbidden: Insufficient permission' });
			return;
		}
		next();
	};
};
