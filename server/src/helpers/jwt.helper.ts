import jwt from 'jsonwebtoken'
import { envs } from '../config/envs';

class JwtHelper {

	generateToken(payload: object) {
		return jwt.sign(payload, envs.JWY_KEY, {
			expiresIn: '5m'
		});
	}

}

export default new JwtHelper();