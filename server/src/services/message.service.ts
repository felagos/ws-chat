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

}


export default new MessageService();