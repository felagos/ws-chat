import { Server } from "socket.io";
import { SocketEvents } from "./enum";

export class Sockets {

	private readonly io: Server;

	constructor(io: Server) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		this.io.on(SocketEvents.CONNECTION, (socket) => {

			console.log('Client connected', socket.id);

			socket.on(SocketEvents.DISCONNECT, () => {
				console.log('Client disconnected', socket.id);
			});

		});
	}
}
