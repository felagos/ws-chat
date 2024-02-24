import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../enum";
import { useEffect } from "react";
import { jwtIsExpired } from "../helpers";

interface Props {
	element: () => JSX.Element
}

const token = localStorage.getItem("token");
const isExpired = jwtIsExpired(token);

export const ProtectedRoute = ({ element: Element }: Props) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isExpired) {
			navigate(RoutesEnum.LOGIN, { replace: true });
		}
	}, [navigate]);

	return <Element />;
}