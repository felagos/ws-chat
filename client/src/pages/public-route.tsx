import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../enum";
import { jwtIsExpired } from "../helpers";

interface Props {
	element: () => JSX.Element;
}

const token = localStorage.getItem("token");
const isExpired = jwtIsExpired(token);

export const PublicRoute = ({ element: Element }: Props) => {
	const navigate = useNavigate();

	if (isExpired) {
		navigate(RoutesEnum.CHAT, { replace: true });
		return null;
	}

	return <Element />;
}