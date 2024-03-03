import { CreateUserDto, UserDto } from "../dto";
import { EncryptHelper } from "../helpers";
import { User } from "../models";

class AuthService {

	private mapToUserDto(user: any, withPassword = false): UserDto {
		const userMapped: UserDto = {
			email: user.email,
			name: user.name,
			uid: user._id.toString(),
			online: user.online
		};

		if (withPassword) {
			userMapped.password = user.password;
		}

		return userMapped
	}

	isEmailRegistered = async (email: string) => {
		const user = await User.findOne({ email });
		return user !== null;
	};

	getUserById = async (uid: string): Promise<UserDto | null> => {
		const user = await User.findById(uid);

		if (!user) return null;

		return this.mapToUserDto(user);
	}

	getUserByEmail = async (email: string): Promise<UserDto | null> => {
		const user = await User.findOne({ email });

		if (!user) return null;

		return this.mapToUserDto(user, true);
	}

	createUser = async (userDto: CreateUserDto): Promise<UserDto> => {
		const user = new User(userDto);
		await user.save();

		return this.mapToUserDto(user);
	}

	arePasswordEquals = async (password: string, encryptedPassword: string) => {
		return await EncryptHelper.compare(password, encryptedPassword);
	}

	updateOnlineStatus = async (uid: string, online: boolean) => {
		const user = (await User.findById(uid))!;
		user.online = online;

		await user.save();

		return this.mapToUserDto(user);
	}

	findAllUsers = async () => {
		const users = await User
			.find()
			.sort('-online');

		return users.map(user => this.mapToUserDto(user));
	}

}

export default new AuthService();