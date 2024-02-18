import { Router } from 'express'

export const authRouter = Router();

authRouter.post('/new', (req, res) => {
	res.send('new');
});

authRouter.post('/login', (req, res) => {
	res.send('login');
});

authRouter.get('/renew', (req, res) => {
	res.send('renew');
});