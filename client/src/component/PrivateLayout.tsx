import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../enum";
import { jwtIsExpired } from "../helpers";

export const PrivateLayout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const isExpired = jwtIsExpired(token);

		if (isExpired) navigate(RoutesEnum.LOGIN, { replace: true });

	}, [navigate]);

	return (
		<Outlet />
	);
}