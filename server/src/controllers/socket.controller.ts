import { JwtHelper } from "../helpers";
import { AuthService } from "../services"

class SocketController {

	async listAllUsers() {
		await AuthService.findAllUsers()
	}

	async connectUser(uid: string) {
		return await AuthService.updateOnlineStatus(uid, true);
	}

	async disconnectUser(uid: string) {
		await AuthService.updateOnlineStatus(uid, false);

		console.log('Client disconnected', uid);
	}

	async validateAuthentication(token: string): Promise<[string, unknown?]> {
		try {
			const uid = JwtHelper.getUid(token);
			await AuthService.getUserById(uid);

			return [uid];
		} catch (error) {
			return ['', error];
		}
	}

}

export default new SocketController();