import { SideBarChat } from "."
import { useChatStore } from "../store";

export const SideBar = () => {
	const users = useChatStore(state => state.users);

	return (
		<div className="inbox_chat">
			{
				users.map((user) => (
					<SideBarChat key={user.uid} user={user} />
				))
			}
			<div className="extra_space" />
		</div>
	);
};