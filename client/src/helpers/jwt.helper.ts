import { jwtDecode } from 'jwt-decode';

export const jwtIsExpired = (token: string | null) => {
	if (!token) return true;
	try {
    const decoded = jwtDecode(token) as { exp: number };

    return Math.floor(new Date().getTime() / 1000) >= decoded.exp;
  } catch (error) {
    return true;
  }

};