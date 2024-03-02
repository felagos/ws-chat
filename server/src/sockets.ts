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

	private async validateToken(token: string) {

		try {
			const uid = JwtHelper.getUid(token);
			const user = await AuthService.getUserById(uid);

			return user;
		} catch (error) {
			return null;
		}
	}

	socketEvents() {
		this.io.on(SocketEvents.CONNECTION, async (socket) => {

			const token = socket.handshake.query.token as string;

			const user = await this.validateToken(token);

			if (!user) {
				console.log('Client not authenticated');
				return socket.disconnect();
			}

			const userOnline = await AuthService.updateOnlineStatus(user.uid, true);

			console.log('Client connected', user.uid);

			socket.on(SocketEvents.DISCONNECT, async () => {
				await AuthService.updateOnlineStatus(user.uid, false);
				console.log('Client disconnected', user.uid);
			});

		});
	}
}
