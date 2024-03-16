import { IncomingMessage, OutgoingMessage, SendMessage } from ".";
import { useAuthStore, useChatStore } from "../store";

export const MessagesList = () => {
	const user = useAuthStore(state => state.user);
	const messages = useChatStore(state => state.messages);

	console.log('messages', messages);

	return (
		<div className="mesgs">

			<div className="msg_history">
				{
					messages.map((msg, idx) => (
						(msg.from === user?.uid) ? (
							<OutgoingMessage key={idx} message={msg} />
						) : (
							<IncomingMessage key={idx} message={msg} />
						)
					))
				}
			</div>

			<SendMessage />
		</div>
	);
};