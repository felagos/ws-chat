import { UserModel } from "../models";
import { useChatStore } from "../store";
import clsx from "clsx";

interface Props {
	user: UserModel;
}

export const SideBarChat = ({ user }: Props) => {

	const selectChat = useChatStore(state => state.selectChat);
	const selectedChat = useChatStore(state => state.selectedChat)

	const onSelectChat = () => selectChat(user.uid);

	return (
		<div className={clsx("chat_list", { "active_chat": selectedChat === user.uid })
		} onClick={onSelectChat}>
			<div className="chat_people">
				<div className="chat_img">
					<img src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256" alt="sunil" />
				</div>
				<div className="chat_ib">
					<h5>{user.name}</h5>
					{
						user.online ? (
							<span className="text-success">Online</span>
						) : (
							<span className="text-danger">Offline</span>
						)
					}
				</div>
			</div>
		</div>
	);

};