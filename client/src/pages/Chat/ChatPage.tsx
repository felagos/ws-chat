import { ChatSelect, InboxPeople, MessagesList } from "../../component"
import { useChatStore } from "../../store";

export const ChatPage = () => {
	const activeChat = useChatStore(state => state.activeChat);

	return (
		<div className="messaging">
			<div className="inbox_msg">
				<InboxPeople />

				<ChatSelect />

				{activeChat ? <MessagesList /> : null}
			</div>
		</div>
	);
}