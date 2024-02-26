import env from '../env';
import { AuthModel } from '../models';

const API_URL = `${env.API_URL}/auth`;

export const doLogin = async (email: string, password: string): Promise<AuthModel> => {
	const resp = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password })
	});

	const data = await resp.json();

	return data;
}

export const doRegister = async (email: string, password: string, name: string): Promise<AuthModel> => {
	const resp = await fetch(`${API_URL}/new`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, name })
	});

	const data = await resp.json();

	return data;
}