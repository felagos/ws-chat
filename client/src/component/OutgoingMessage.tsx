import { PrivateMessage } from "../models";

interface Props {
	message: PrivateMessage
}

export const OutgoingMessage = ({ message }: Props) => {

	return (
		<div className="outgoing_msg">
			<div className="sent_msg">
				<p>{message.message}</p>
				<span className="time_date">{message.createdAt}</span>
			</div>
		</div>
	);

};