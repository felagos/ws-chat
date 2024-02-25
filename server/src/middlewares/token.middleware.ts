import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';
import { RequestWithUid } from '../types';

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
	const request = req as RequestWithUid;
	try {
		const header = req.headers['authorization'];
		if (!header) {
			return res.status(401).json({
				message: 'Token is required'
			});
		}

		const [, token] = header.split(' ');

		const { uid } = jwt.verify(token, envs.JWY_KEY) as { uid: string };
		request.uid = uid;

		next();
	} catch (error) {
		return res.status(500).json(error);
	}
}