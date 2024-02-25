export const SendMessage = () => {

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="type_msg row">
				<div className="input_msg_write col-sm-9">
					<input type="text" className="write_msg" placeholder="Mensaje..." />
				</div>
				<div className="col-sm-3 text-center">
					<button className="msg_send_btn mt-3" type="submit">
						enviar
					</button>
				</div>
			</div>
		</form>
	);
};