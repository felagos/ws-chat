import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LoginPage, ChatPage, RegisterPage } from ".";
import { RoutesEnum } from "../enum";
import { PublicLayout, PrivateLayout } from "../component";
import { jwtIsExpired } from "../helpers";

const publicRouter = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		children: [
			{
				index: true,
				element: <Navigate to={RoutesEnum.LOGIN} replace />
			},
			{
				path: RoutesEnum.LOGIN,
				element: <LoginPage />,
			},
			{
				path: RoutesEnum.REGISTER,
				element: <RegisterPage />,
			}
		]
	},
]);

const privateRouter = createBrowserRouter([
	{
		path: "/",
		element: <PrivateLayout />,
		children: [
			{
				index: true,
				element: <Navigate to={RoutesEnum.CHAT} replace />
			},
			{
				path: RoutesEnum.CHAT,
				element: <ChatPage />,
			},
		]
	},
]);

const token = localStorage.getItem("token");
const isExpired = jwtIsExpired(token);

const router = isExpired ? publicRouter : privateRouter;

export const Router = () => {
	return (
		<RouterProvider router={router} />
	);
}