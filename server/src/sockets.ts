import { Server, Socket } from "socket.io";
import { SocketEvents } from "./enum";
import { JwtHelper } from "./helpers";
import { AuthService } from "./services";

export class Sockets {

	private readonly io: Server;

	constructor(io: Server) {
		this.io = io;

		this.socketEvents();
	}

	private async validateToken(token: string): Promise<[string, unknown?]> {

		try {
			const uid = JwtHelper.getUid(token);
			await AuthService.getUserById(uid);

			return [uid];
		} catch (error) {
			return ['', error];
		}
	}

	socketEvents() {
		this.io.on(SocketEvents.CONNECTION, async (socket) => {

			const token = socket.handshake.query.token as string;

			const [uid, error] = await this.validateToken(token);

			if (error) {
				console.log('Client not authenticated');
				return socket.disconnect();
			}

			const user = await AuthService.updateOnlineStatus(uid, true);

			console.log('Client connected', user.uid);

			this.io.emit(SocketEvents.LIST_USERS, await AuthService.findAllUsers());

			socket.on(SocketEvents.DISCONNECT, async () => {
				await AuthService.updateOnlineStatus(user.uid, false);
				console.log('Client disconnected', user.uid);
			});

		});
	}
}
