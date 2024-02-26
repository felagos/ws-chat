import env from '../env';
import { LoginModel } from '../models';

const API_URL = `${env.API_URL}/auth`;

export const doLogin = async (email: string, password: string): Promise<LoginModel> => {
	const resp = await fetch(`${API_URL}/login`, {
		method: 'POST',
		body: JSON.stringify({ email, password })
	});

	const data = await resp.json();

	return data;
}