import { CreateUserDto, UserDto } from "../dto";
import { EncryptHelper } from "../helpers";
import { User } from "../models";

class AuthService {

	isEmailRegistered = async (email: string) => {
		const user = await User.findOne({ email });
		return user !== null;
	};

	getUserByEmail = async (email: string): Promise<UserDto | null> => {
		const user = await User.findOne({ email });

		if (!user) return null;

		return {
			email: user.email,
			name: user.name,
			uuid: user._id.toString(),
			password: user.password
		}
	}

	createUser = async (userDto: CreateUserDto): Promise<UserDto> => {
		const user = new User(userDto);
		await user.save();

		return {
			email: user.email,
			name: user.name,
			uuid: user._id.toString()
		};
	}

	arePasswordEquals = async (password: string, encryptedPassword: string) => {
		return await EncryptHelper.compare(password, encryptedPassword);
	}

}

export default new AuthService();