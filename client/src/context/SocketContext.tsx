import { ReactNode, createContext } from "react";
import { useSocket } from "../hooks";
import { Socket } from "socket.io-client";
import env from "../env";

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
	const { socket, isOnline, connectSocket, disconnectSocket } = useSocket(URL_SOCKET);

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
