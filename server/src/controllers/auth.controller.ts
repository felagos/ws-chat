import { Request, Response } from 'express'
import { CreateUserDto } from '../dto';
import { AuthService } from '../services';
import { EncryptHelper } from '../helpers';

export const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const createUserDto: CreateUserDto = req.body;
		createUserDto.password = await EncryptHelper.encrypt(createUserDto.password);

		const isEmailRegistered = await AuthService.isEmailRegistered(createUserDto.email);

		if (isEmailRegistered) {
			res.status(409).json({ message: 'User already registered' });
			return;
		}

		const user = await AuthService.createUser(createUserDto);

		res.status(201).json(user);

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