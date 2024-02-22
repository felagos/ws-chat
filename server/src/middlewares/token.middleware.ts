import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const header = req.headers['authorization'];
		if (!header) {
			return res.status(401).json({
				message: 'Token is required'
			});
		}

		const [, token] = header.split(' ');

		jwt.verify(token, envs.JWY_KEY);

		next();
	} catch (error) {
		return res.status(500).json(error);
	}
}