import { ReactNode, createContext, useEffect } from "react";
import { useSocket } from "../hooks";
import { Socket } from "socket.io-client";
import env from "../env";
import { useAuthStore } from "../store";

const URL_SOCKET = env.SOCKET_URL;

interface SocketContextProps {
	socket: Socket;
	isOnline: boolean;
	connectSocket: () => void;
	disconnectSocket: () => void;
}

interface Props {
	children: ReactNode;
}

export const SocketContext = createContext({} as SocketContextProps);

export const SocketProvider = ({ children }: Props) => {
	const user = useAuthStore(state => state.user);
	const { socket, isOnline, connectSocket, disconnectSocket } = useSocket(URL_SOCKET);

	useEffect(() => {
		const socketCB = user ? connectSocket : disconnectSocket;
		
		socketCB();
	}, [connectSocket, disconnectSocket, user]);

	const value: SocketContextProps = {
		socket,
		isOnline,
		connectSocket,
		disconnectSocket
	};

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
};
