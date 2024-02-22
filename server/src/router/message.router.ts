import { Router } from 'express';
import { tokenValidation } from '../middlewares/token.middleware';
import { getChats } from '../controllers';

export const messageRouter = Router();

messageRouter.get('/:from', tokenValidation, getChats);