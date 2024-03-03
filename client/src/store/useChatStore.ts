import { StateCreator, create } from "zustand";
import { UserModel } from "../models";

interface ChatState {
	uuid: string;
	activeChat: string;
	users: UserModel[];
	messages: string[];
	setUsers: (user: UserModel[]) => void;
	cleanChat: () => void;
}

const storeApi: StateCreator<ChatState> = (set) => ({
	uuid: '',
	activeChat: '',
	users: [],
	messages: [],
	setUsers: (users) => set({ users }),
	cleanChat: () => set({ messages: [], activeChat: '', users: [], uuid: '' }),
});

export const useChatStore = create<ChatState>()(storeApi);