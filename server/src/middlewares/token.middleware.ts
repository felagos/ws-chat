import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const header = req.headers['authorization'];
		if (!header) {
			return res.status(400).json({
				message: 'Token is required'
			});
		}

		const [, token] = header.split(' ');

		const decoded = jwt.verify(token, envs.JWY_KEY);
		req.body.user = decoded;

		next();
	} catch (error) {
		return res.status(400).json(error);
	}
}