import { Request, Response } from 'express'
import { CreateUserDto } from '../dto';

export const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body as CreateUserDto;
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	res.json({ message: 'User logged in' });
};

export const renewToken = async (req: Request, res: Response): Promise<void> => {
	res.json({ message: 'Token renewed successfully' });
};