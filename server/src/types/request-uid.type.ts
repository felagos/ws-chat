import { Request } from 'express'

export type RequestWithUid = Request & {
	uid: string;
}