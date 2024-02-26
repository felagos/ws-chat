import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../enum";
import { useState } from "react";
import { useAuthStore } from "../../store";

export const RegisterPage = () => {
	const navigate = useNavigate();
	const doRegister = useAuthStore(state => state.doRegister);

	const [form, setForm] = useState({
		name: '',
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

		await doRegister(form.email, form.password, form.name);

		navigate(RoutesEnum.CHAT);
	}

	return (
		<form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
			<span className="login100-form-title mb-3">
				Chat - Registro
			</span>

			<div className="wrap-input100 validate-input mb-3">
				<input className="input100" type="text" name="name" placeholder="Nombre" onChange={onChange} />
				<span className="focus-input100"></span>
			</div>


			<div className="wrap-input100 validate-input mb-3">
				<input className="input100" type="email" name="email" placeholder="Email" onChange={onChange} />
				<span className="focus-input100"></span>
			</div>


			<div className="wrap-input100 validate-input mb-3">
				<input className="input100" type="password" name="password" placeholder="Password" onChange={onChange} />
				<span className="focus-input100"></span>
			</div>

			<div className="row mb-3">
				<div className="col text-right">
					<Link to={RoutesEnum.LOGIN} className="txt1">
						Ya tienes cuenta?
					</Link>
				</div>
			</div>

			<div className="container-login100-form-btn m-t-17">
				<button className="login100-form-btn" type="submit">
					Crear cuenta
				</button>
			</div>

		</form>
	);
}