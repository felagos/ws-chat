import { useCallback, useState } from "react";
import io, { Socket } from "socket.io-client";
import env from "../env";

export const useSocket = (url: string = env.SOCKET_URL) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const connectSocket = useCallback(() => {
		const mewSocket = io(url, {
			transports: ['websocket'],
			autoConnect: false,
			forceNew: true
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