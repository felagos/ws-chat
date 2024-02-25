import { IncomingMessage, OutgoingMessage, SendMessage } from ".";

export const MessagesList = () => {
	return (
		<div className="mesgs">

			<div className="msg_history">

				<IncomingMessage />

				<OutgoingMessage />

			</div>

			<SendMessage />
		</div>
	);
};