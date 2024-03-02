import jwt from 'jsonwebtoken'
import { envs } from '../config/envs';

class JwtHelper {

	generateToken(payload: object) {
		return jwt.sign(payload, envs.JWY_KEY, {
			expiresIn: '5m'
		});
	}

	getUid(token: string) {
		const data = jwt.verify(token, envs.JWY_KEY) as { uid: string };

		return data.uid ?? '';
	}

}

export default new JwtHelper();