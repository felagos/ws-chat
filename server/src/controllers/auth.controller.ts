import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response): Promise<void> => {
	res.json({ message: 'User created' });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	res.json({ message: 'User logged in' });
};

export const renewToken = async (req: Request, res: Response): Promise<void> => {
	res.json({ message: 'Token renewed successfully' });
};