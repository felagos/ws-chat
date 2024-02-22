import { Message } from "../models";

class MessageService {

	async getFromChats(from: string, uid: string, limit = 30) {
		const messages = await Message.find({
			$or: [
				{ to: uid, from },
				{ to: from, from: uid },
			]
		})
			.sort({ createdAt: 'desc' })
			.limit(limit);

		return messages;
	}

}


export default new MessageService();