import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		res.status(401).json({ message: 'Authentication token is required' });
		return;
	}
	try {
		const JWT_SECRET = process.env.JWT_SECRET;
		if (!JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined');
		}
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
		req.user = decoded;
		next();
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Invalid or expired token' });
		}
	}
};
