import { Layout } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
	}
]);

export const Router = () => {
	return (
		<RouterProvider router={router} />
	);
}