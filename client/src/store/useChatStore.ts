import { StateCreator, create } from "zustand";
import { UserModel } from "../models";

interface ChatState {
	uid: string;
	selectedChat: string;
	users: UserModel[];
	messages: string[];
	setUsers: (user: UserModel[]) => void;
	selectChat: (uid: string) => void;
	cleanChat: () => void;
}

const storeApi: StateCreator<ChatState> = (set, get) => ({
	uid: '',
	selectedChat: '',
	users: [],
	messages: [],
	setUsers: (users) => set({ users }),
	selectChat: (uid) => {
		if (get().selectedChat !== uid) {
			set({ selectedChat: uid, messages: [] });
		}
	},
	cleanChat: () => set({ messages: [], selectedChat: '', users: [], uid: '' }),
});

export const useChatStore = create<ChatState>()(storeApi);