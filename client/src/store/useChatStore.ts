import { StateCreator, create } from "zustand";
import { UserModel } from "../models";


interface ChatState {
	uuid: string;
	activeChat: string;
	users: UserModel[];
	messages: string[];
	setUsers: (user: UserModel[]) => void;
}

const storeApi: StateCreator<ChatState> = (set) => ({
	uuid: '',
	activeChat: '',
	users: [],
	messages: [],
	setUsers: (users) => set({ users }),
});

export const useChatStore = create<ChatState>()(storeApi);