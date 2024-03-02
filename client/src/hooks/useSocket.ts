import { useCallback, useState } from "react";
import io, { Socket } from "socket.io-client";
import env from "../env";

export const useSocket = (url: string = env.SOCKET_URL) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const connectSocket = useCallback(() => {
		const token = localStorage.getItem('token');

		const mewSocket = io(url, {
			transports: ['websocket'],
			autoConnect: true,
			forceNew: true,
			query: { token }
		});
		
		setSocket(mewSocket);
	}, [url]);

	const disconnectSocket = useCallback(() => {
		socket?.disconnect();
	}, [socket]);

	return {
		connectSocket,
		disconnectSocket,
		socket: socket!,
	}
}