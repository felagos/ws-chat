import { MessageDto } from "../dto";
import { Message } from "../models";

class MessageService {

	async getFromChats(from: string, uid: string, limit = 30): Promise<MessageDto[]> {
		const messages = await Message.find({
			$or: [
				{ to: uid, from },
				{ to: from, from: uid },
			]
		})
			.sort({ createdAt: 'desc' })
			.limit(limit);

		return messages.map(message => ({
			from: message.from._id.toString(),
			to: message.to._id.toString(),
			message: message.message,
			createdAt: message.createdAt.toDateString(),
		}));
	
	}

	async saveMessage(message: MessageDto): Promise<MessageDto>  {
		const newMessage = new Message(message);
		await newMessage.save();
		return {
			from: newMessage.from._id.toString(),
			to: newMessage.to._id.toString(),
			message: newMessage.message,
			createdAt: newMessage.createdAt.toDateString(),
		};
	}

}


export default new MessageService();