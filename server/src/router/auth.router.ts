import { Router } from 'express'
import { createUser, loginUser, renewToken } from '../controllers';
import { validateRequest, createUserSchema } from '../middlewares';

export const authRouter = Router();

authRouter.post('/new', validateRequest(createUserSchema), createUser);

authRouter.post('/login', loginUser);

authRouter.get('/renew', renewToken);