import { httpPublic } from '../http';
import { AuthModel } from '../models';

const API_URL_BASE = 'auth';

export const doLogin = async (email: string, password: string): Promise<AuthModel> => {
	return await httpPublic.post<AuthModel>(`${API_URL_BASE}/login`, { email, password });
}

export const doRegister = async (email: string, password: string, name: string): Promise<AuthModel> => {
	return await httpPublic.post<AuthModel>(`${API_URL_BASE}/new`, { email, password, name });
}