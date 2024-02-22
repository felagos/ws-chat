import { Request, Response } from 'express'
import { CreateUserDto, LoginDto } from '../dto';
import { AuthService } from '../services';
import { EncryptHelper, JwtHelper } from '../helpers';

type RequestWithUid = { uid: string } & Request;

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

		res.status(201).json({
			user,
			token: JwtHelper.generateToken(user),
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const loginDto: LoginDto = req.body;

		const user = await AuthService.getUserByEmail(loginDto.email);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		const arePasswordEquals = await AuthService.arePasswordEquals(loginDto.password, user.password ?? '');

		if (!arePasswordEquals) {
			res.status(401).json({ message: 'Wrong credentials' });
			return;
		}

		res.status(200).json({
			user,
			token: JwtHelper.generateToken(user),
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const renewToken = async (req: RequestWithUid, res: Response): Promise<void> => {
	const uid = req.uid;

	const user = await AuthService.getUserById(uid);

	if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	}

	res.status(200).json({
		user,
		token: JwtHelper.generateToken(user),
	});
};