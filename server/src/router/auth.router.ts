import { Router } from 'express'

export const authRouter = Router();

authRouter.post('/new', (req, res) => {
	res.send('new');
});

