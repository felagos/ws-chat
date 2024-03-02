import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../enum";
import { useAuthStore } from "../store";

export const SearchBox = () => {
	const navigate = useNavigate();

	const doLogout = useAuthStore((state) => state.doLogout);

	const onExit = () => {
		doLogout();
		navigate(RoutesEnum.LOGIN);
	};

	return (
		<div className="headind_srch">
			<div className="recent_heading mt-2">
				<h4>Recientes</h4>
			</div>
			<div className="srch_bar">
				<div className="stylish-input-group">
					<button className="btn text-danger" onClick={onExit}>
						Salir
					</button>
				</div>
			</div>
		</div>
	);
};