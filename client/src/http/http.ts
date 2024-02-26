const fetchWithHeaders = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
	const token = localStorage.getItem('token');

	options.headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	if (token) {
		options.headers = {
			...options.headers,
			'Authorization': `Bearer ${token}`,
		};
	}

	return fetch(url, options) as T;
};

const get = <T>(url: string, options: RequestInit = {}): Promise<T> =>
	fetchWithHeaders(url, { ...options, method: 'GET' });

const post = <T = unknown>(url: string, body: unknown, options: RequestInit = {}): Promise<T> =>
	fetchWithHeaders(url, { ...options, method: 'POST', body: JSON.stringify(body) });

const put = <T = unknown>(url: string, body: unknown, options: RequestInit = {}): Promise<T> =>
	fetchWithHeaders(url, { ...options, method: 'PUT', body: JSON.stringify(body) });


export const http = {
	get,
	post,
	put,
}