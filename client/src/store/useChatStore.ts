import { StateCreator, create } from "zustand";


interface ChatState {

}

const storeApi: StateCreator<ChatState> = (set) => ({

});

export const useChatStore = create<ChatState>()(storeApi);