import { Router } from 'express'
import { createUser, loginUser, renewToken } from '../controllers';
import { validateRequest, createUserSchema } from '../middlewares';
import { tokenValidation } from '../middlewares/token.middleware';

export const authRouter = Router();

authRouter.post('/new', tokenValidation, validateRequest(createUserSchema), createUser);

authRouter.post('/login', loginUser);

authRouter.get('/renew', tokenValidation, renewToken);