import { Server } from "socket.io";
import { SocketEvents } from "./enum";
import { SocketController } from "./controllers";
import { MessageDto } from "./dto";
import { MessageService } from "./services";

export class Sockets {

	private readonly io: Server;

	constructor(io: Server) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		this.io.on(SocketEvents.CONNECTION, async (socket) => {

			const token = socket.handshake.query.token as string;

			const [uid, error] = await SocketController.validateAuthentication(token);

			if (error) {
				console.log('Client not authenticated');
				return socket.disconnect();
			}

			const user = await SocketController.connectUser(uid);

			console.log('Client connected', user.uid);

			socket.join(user.uid);

			this.io.emit(SocketEvents.LIST_USERS, await SocketController.listAllUsers());

			socket.on(SocketEvents.DISCONNECT, async () => {
				await SocketController.disconnectUser(uid);

				this.io.emit(SocketEvents.LIST_USERS, await SocketController.listAllUsers());
			});

			socket.on(SocketEvents.PRIVATE_MESSAGE, async (message: MessageDto) => {
				console.log('Message received', message);
				await MessageService.saveMessage(message);
			});

		});
	}
}
