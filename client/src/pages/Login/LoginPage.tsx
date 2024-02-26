import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../enum";
import { useState } from "react";
import { useAuthStore } from "../../store";

export const LoginPage = () => {
	const navigate = useNavigate();
	const doLogin = useAuthStore(state => state.doLogin);

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await doLogin(form.email, form.password);

		navigate(RoutesEnum.CHAT);
	}

	return (
		<form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
			<span className="login100-form-title mb-3">
				Chat - Ingreso
			</span>

			<div className="wrap-input100 validate-input mb-3">
				<input className="input100" type="email" name="email" placeholder="Email" onChange={onChange} />
				<span className="focus-input100"></span>
			</div>


			<div className="wrap-input100 validate-input mb-3">
				<input className="input100" type="password" name="password" placeholder="Password" onChange={onChange} />
				<span className="focus-input100"></span>
			</div>

			<div className="container-login100-form-btn m-t-17">
				<button className="login100-form-btn">
					Ingresar
				</button>
			</div>

			<div className="row mt-3">
				<div className="col text-center">
					<Link to={RoutesEnum.REGISTER} className="u-txt">
						Nueva cuenta?
					</Link>
				</div>
			</div>

		</form>
	);
}