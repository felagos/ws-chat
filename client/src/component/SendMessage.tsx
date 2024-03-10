import { useState } from "react";
import { useSocketContext } from "../context";
import { Message } from "../models";
import { useAuthStore, useChatStore } from "../store";
import { SocketEvents } from "../enum";

export const SendMessage = () => {
	const { socket } = useSocketContext();
	const user = useAuthStore(state => state.user!);
	const selectedChat = useChatStore(state => state.selectedChat);
	const [message, setMessage] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value.trim());
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (message === '') return;

		const messageToSend: Message = {
			from: user.uid,
			to: selectedChat,
			message,
		}

		socket.emit(SocketEvents.PRIVATE_MESSAGE, messageToSend);

		setMessage('');

	}

	return (
		<form onSubmit={onSubmit}>
			<div className="type_msg row">
				<div className="input_msg_write col-sm-9">
					<input
						type="text"
						className="write_msg"
						placeholder="Mensaje..."
						value={message}
						onChange={onChange} />
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