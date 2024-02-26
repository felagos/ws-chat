import { UserModel } from "./user.model";

export interface AuthModel {
	user: UserModel;
	token: string;
}