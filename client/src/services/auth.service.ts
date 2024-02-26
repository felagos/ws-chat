import env from '../env';
import { http } from '../http';
import { AuthModel } from '../models';

const API_URL = `${env.API_URL}/auth`;

export const doLogin = async (email: string, password: string): Promise<AuthModel> => {
	return await http.post<AuthModel>(`${API_URL}/login`, { email, password });
}

export const doRegister = async (email: string, password: string, name: string): Promise<AuthModel> => {
	return await http.post<AuthModel>(`${API_URL}/new`, { email, password, name });
}