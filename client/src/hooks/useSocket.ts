import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import env from "../env";
import { SocketEvents } from "../enum";

export const useSocket = (url: string = env.SOCKET_URL) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isOnline, setIsOnline] = useState(false);

	const connectSocket = useCallback(() => {
		const socket = io(url, {
			transports: ['websocket'],
			autoConnect: true,
			forceNew: true
		});
		setSocket(socket);
	}, [url]);

	const disconnectSocket = useCallback(() => {
		socket?.disconnect();
	}, [socket]);

	useEffect(() => {
		socket?.on(SocketEvents.CONNECT, () => {
			setIsOnline(true);
		});

		socket?.on(SocketEvents.DISCONNECT, () => {
			setIsOnline(false);
		});

		return () => {
			socket?.disconnect();
		}

	}, [socket]);

	return {
		connectSocket,
		disconnectSocket,
		socket: socket!,
		isOnline
	}
}