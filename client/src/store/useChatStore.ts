import { StateCreator, create } from "zustand";
import { PrivateMessage, UserModel } from "../models";

interface ChatState {
	uid: string;
	selectedChat: string;
	users: UserModel[];
	messages: PrivateMessage[];
	setUsers: (user: UserModel[]) => void;
	selectChat: (uid: string) => void;
	cleanChat: () => void;
	addMessage: (message: PrivateMessage) => void;
}

const storeApi: StateCreator<ChatState> = (set, get) => ({
	uid: '',
	selectedChat: '',
	users: [],
	messages: [],
	setUsers: (users) => set({ users }),
	selectChat: (uid) => {
		if (get().selectedChat !== uid) {
			set({ selectedChat: uid });
		}
	},
	cleanChat: () => set({ messages: [], selectedChat: '', users: [], uid: '' }),
	addMessage: (message) => set(state => ({ messages: [...state.messages, message] })),
});

export const useChatStore = create<ChatState>()(storeApi);