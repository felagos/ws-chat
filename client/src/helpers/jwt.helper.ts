export const jwtIsExpired = (token: string | null) => {
	if (!token) return true;
	const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
	return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}