import env from "../env";

const URL_API = env.API_URL;

const fetchWithHeaders = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
	const token = localStorage.getItem('token');

	options.headers = {
		'Content-Type': 'application/json',
		...options.headers,
		'Authorization': `Bearer ${token}`,
	};

	const response = await fetch(`${URL_API}/${url}`, options);

	return response.json() as Promise<T>;
};

const get = <T>(url: string, options: RequestInit = {}): Promise<T> =>
	fetchWithHeaders(url, { ...options, method: 'GET' });

const post = <T = unknown>(url: string, body: unknown, options: RequestInit = {}): Promise<T> =>
	fetchWithHeaders(url, { ...options, method: 'POST', body: JSON.stringify(body) });

export const httpPrivate = {
	get,
	post,
}