import { Outlet } from "react-router-dom";

export const PublicLayout = () => {

	return (
		<div className="auth">
			<div className="auth-container">
				<div className="wrap-login100 p-t-50 p-b-90">
					<Outlet />
				</div>
			</div>
		</div>
	);

}