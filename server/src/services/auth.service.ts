import { CreateUserDto, UserDto } from "../dto";
import { EncryptHelper } from "../helpers";
import { User } from "../models";

class AuthService {

	isEmailRegistered = async (email: string) => {
		const user = await User.findOne({ email });
		return user !== null;
	};

	getUserById = async (uid: string): Promise<UserDto | null> => {
		const user = await User.findById(uid);

		if (!user) return null;

		return {
			email: user.email,
			name: user.name,
			uid: user._id.toString()
		}
	}

	getUserByEmail = async (email: string): Promise<UserDto | null> => {
		const user = await User.findOne({ email });

		if (!user) return null;

		return {
			email: user.email,
			name: user.name,
			uid: user._id.toString(),
			password: user.password
		}
	}

	createUser = async (userDto: CreateUserDto): Promise<UserDto> => {
		const user = new User(userDto);
		await user.save();

		return {
			email: user.email,
			name: user.name,
			uid: user._id.toString()
		};
	}

	arePasswordEquals = async (password: string, encryptedPassword: string) => {
		return await EncryptHelper.compare(password, encryptedPassword);
	}

	updateOnlineStatus = async (uid: string, online: boolean) => {
		const user = (await User.findById(uid))!;
		user.online = online;
		
		return {
			email: user.email,
			name: user.name,
			uid: user._id.toString()
		};
	}

}

export default new AuthService();