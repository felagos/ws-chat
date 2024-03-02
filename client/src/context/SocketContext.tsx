import { ReactNode, createContext, useEffect } from "react";
import { useSocket } from "../hooks";
import { Socket } from "socket.io-client";
import env from "../env";
import { useAuthStore } from "../store";

const URL_SOCKET = env.SOCKET_URL;

interface SocketContextProps {
	socket: Socket;
}

interface Props {
	children: ReactNode;
}

export const SocketContext = createContext({} as SocketContextProps);

export const SocketProvider = ({ children }: Props) => {
	const user = useAuthStore(state => state.user);
	const { socket, connectSocket, disconnectSocket } = useSocket(URL_SOCKET);

	useEffect(() => {
		if (user) {
			connectSocket();
		}
	}, [user, connectSocket]);

	useEffect(() => {
		if (!user) {
			disconnectSocket();
		}
	}, [user, disconnectSocket]);

	const value: SocketContextProps = {
		socket,
	};

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
};
