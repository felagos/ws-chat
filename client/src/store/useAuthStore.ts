import { StateCreator, create } from "zustand";
import { UserModel } from "../models";
import { doLogin, doRegister } from "../services";

interface AuthState {
	user: UserModel | null;
	token: string | null;
	doLogin: (email: string, password: string) => Promise<void>;
	doRegister: (email: string, password: string, name: string) => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
	user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
	token: localStorage.getItem('token') ?? null,
	doLogin: async (email: string, password: string) => {
		const response = await doLogin(email, password);

		localStorage.setItem('token', response.token);
		localStorage.setItem('user', JSON.stringify(response.user));

		set({
			user: response.user,
			token: response.token,
		});
	},
	doRegister: async (email: string, password: string, name: string) => {
		const response = await doRegister(email, password, name);

		localStorage.setItem('token', response.token);
		localStorage.setItem('user', JSON.stringify(response.user));

		set({
			user: response.user,
			token: response.token,
		});
	},
});

export const useAuthStore = create<AuthState>()(storeApi);