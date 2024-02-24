import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LoginPage, ChatPage, RegisterPage } from ".";
import { RoutesEnum } from "../enum";
import { Layout } from "../component";
import { ProtectedRoute } from "./protected-route";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
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
				path: RoutesEnum.CHAT,
				element: <ProtectedRoute element={ChatPage} />,
			},
			{
				path: RoutesEnum.REGISTER,
				element: <RegisterPage />,
			}
		]
	},
]);

export const Router = () => {
	return (
		<RouterProvider router={router} />
	);
}