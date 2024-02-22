import { Request, Response } from 'express';
import { RequestWithUid } from '../types';
import { MessageService } from '../services';

export const getChats = async (req: Request, res: Response) => {
	const request = req as RequestWithUid;

	const from = request.params.from;
	const uid = request.uid;

	const messages = await MessageService.getFromChats(from, uid);
};