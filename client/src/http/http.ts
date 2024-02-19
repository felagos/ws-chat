let jwt: string = 'your-jwt-token'; // replace with your JWT
let isRefreshing: boolean = false;
let failedQueue: Array<{ resolve: (value: string | PromiseLike<string>) => void, reject: (reason?: unknown) => void }> = [];

const processQueue = (error: unknown, newToken: string | null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(newToken!);
		}
	});

	failedQueue = [];
};

export async function request(url: RequestInfo, options?: RequestInit) {
	options = options || {};
	options.headers = options.headers instanceof Headers ? options.headers : new Headers();
	options.headers.set('Authorization', 'Bearer ' + jwt);
	options.headers.set('Content-Type', 'application/json');

	const response = await fetch(url, options);

	if (response.status === 401) { // Unauthorized
		if (!isRefreshing) {
			isRefreshing = true;

			const refreshResponse = await fetch('/renew', {
				method: 'GET',
				headers: { 'Authorization': 'Bearer ' + jwt }
			});

			if (!refreshResponse.ok) {
				const error = new Error('Failed to refresh token');
				processQueue(error, null);
				throw error;
			}

			const data = await refreshResponse.json();
			jwt = data.jwt; // replace with your refreshed JWT
			isRefreshing = false;
			processQueue(null, jwt);
		}

		return new Promise((resolve, reject) => {
			failedQueue.push({ resolve, reject });
		}).then(token => {
			if (options && options.headers instanceof Headers) {
				options.headers.set('Authorization', 'Bearer ' + token);
			}
			return fetch(url, options);
		});
	}

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
}
