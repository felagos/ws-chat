import { CreateUserDto, CreatedUserDto } from "../dto";
import { User } from "../models";

class AuthService {

	isEmailRegistered = async (email: string) => {

		const user = await User.findOne({ email });

		return user !== null;

	};

	createUser = async (userDto: CreateUserDto): Promise<CreatedUserDto> => {
		const user = new User(userDto);
		await user.save();

		return {
			email: user.email,
			name: user.name,
			uuid: user._id.toString()
		};
	}

}

export default new AuthService();