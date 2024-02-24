import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, ChatPage } from ".";
import { RoutesEnum } from "../enum";
import { Layout } from "../component";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				path: RoutesEnum.LOGIN,
				element: <LoginPage />,
			},
			{
				path: RoutesEnum.CHAT,
				element: <ChatPage />,
			},
		]
	},
]);

export const Router = () => {
	return (
		<RouterProvider router={router} />
	);
}