import { jwtIsExpired } from "../helpers";

type FailedQueue = { 
	resolve: (value: string | PromiseLike<string>) => void, 
	reject: (reason?: unknown) => void 
};

let isRefreshing = false;
let failedQueue: FailedQueue[] = [];

const processQueue = (error: Error | null, token: string | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const fetchWithAuthentication = async (url: string, options: RequestInit): Promise<Response> => {
  let jwt = localStorage.getItem('token');

  if (!jwt || jwtIsExpired(jwt)) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        if (options && options.headers instanceof Headers) {
          options.headers.set('Authorization', 'Bearer ' + token);
        }
        return fetch(url, options);
      });
    }

    isRefreshing = true;

    const refreshResponse = await fetch('/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ token: jwt }),
    });

    if (!refreshResponse.ok) {
      const error = new Error('Failed to refresh token');
      processQueue(error, null);
      throw error;
    }

    const data = await refreshResponse.json();

    localStorage.setItem('token', data.token);
    
    isRefreshing = false;
    jwt = data.token;
    processQueue(null, jwt);
  }

  if (options && options.headers instanceof Headers) {
    options.headers.set('Authorization', 'Bearer ' + jwt);
  }
  return fetch(url, options);
};