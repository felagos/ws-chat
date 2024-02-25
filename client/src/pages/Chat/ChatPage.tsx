import { ChatSelect, InboxPeople, MessagesList } from "../../component"

export const ChatPage = () => {
	return (
		<div className="messaging">
			<div className="inbox_msg">
				<InboxPeople />

				<ChatSelect />

				<MessagesList />
			</div>
		</div>
	);
}