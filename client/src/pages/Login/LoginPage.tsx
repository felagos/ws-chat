import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../enum";
import { useState } from "react";
import { doLogin } from "../../services";

export const LoginPage = () => {
	const navigate = useNavigate();

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

		const response = await doLogin(form.email, form.password);

		localStorage.setItem('token', response.token);
		localStorage.setItem('user', JSON.stringify(response.user));

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

			<div className="row mb-3">
				<div className="col">
					<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
					<label className="label-checkbox100">
						Recordarme
					</label>
				</div>

				<div className="col text-right">
					<Link to={RoutesEnum.REGISTER} className="u-txt">
						Nueva cuenta?
					</Link>
				</div>
			</div>

			<div className="container-login100-form-btn m-t-17">
				<button className="login100-form-btn">
					Ingresar
				</button>
			</div>

		</form>
	);
}