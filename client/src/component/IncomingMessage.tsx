import { PrivateMessage } from "../models";

interface Props {
	message: PrivateMessage
}


export const IncomingMessage = ({ message }: Props) => {

	return (
		<div className="incoming_msg">
			<div className="incoming_msg_img">
				<img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256" alt="sunil" />
			</div>
			<div className="received_msg">
				<div className="received_withd_msg">
				<p>{message.message}</p>
				<span className="time_date">{message.createdAt}</span>
				</div>
			</div>
		</div>
	);

};	