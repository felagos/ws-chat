import { ChatSelect, InboxPeople, MessagesList } from "../../component"
import { useChatStore } from "../../store";

export const ChatPage = () => {
	const selectedChat = useChatStore(state => state.selectedChat);

	return (
		<div className="messaging">
			<div className="inbox_msg">
				<InboxPeople />

				{selectedChat ? <MessagesList /> : <ChatSelect />}
			</div>
		</div>
	);
}