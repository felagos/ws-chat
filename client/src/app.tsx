import { SocketProvider } from "./context";
import { Router } from "./pages";

export const App = () => {

	return (
		<SocketProvider>
			<Router />
		</SocketProvider>
	)

};

