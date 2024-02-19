let jwt = 'your-jwt-token'; // replace with your JWT
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, newToken = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(newToken);
		}
	});

	failedQueue = [];
};

async function request(url, options) {
	options.headers = options.headers || {};
	options.headers['Authorization'] = 'Bearer ' + jwt;
	options.headers['Content-Type'] = 'application/json';

	let response = await fetch(url, options);

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
			options.headers['Authorization'] = 'Bearer ' + token;
			return fetch(url, options);
		});
	}

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
}