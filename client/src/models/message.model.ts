export interface Message {
	from: string;
	to: string;
	message: string;
}

export interface PrivateMessage {
	from: string;
	to: string;
	message: string;
	createdAt: string;
}