import express from 'express';
import http from 'http';
import { Server as ServerIO } from 'socket.io';
import cors from 'cors';
import { envs } from './config/envs';
import { Sockets } from './sockets';
import { dbConnection } from './database/config';
import { authRouter } from './router/auth.router';

export class Server {

	private readonly app: express.Application;
	private readonly port: number;
	private readonly server: http.Server;
	private readonly io: ServerIO;

	constructor() {
		this.app = express();
		this.port = envs.PORT;

		this.server = http.createServer(this.app);

		this.io = new ServerIO(this.server, {
			cors: {
				origin: envs.CORS
			}
		});
	}

	private middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	private configSockets() {
		new Sockets(this.io);
	}

	private async configDatabase () {
		await dbConnection();
	}

	private configRoutes() {
		this.app.use('/api/auth', authRouter);
	}

	async execute() {
		this.middlewares();

		this.configSockets();

		await this.configDatabase();

		this.configRoutes();

		this.server.listen(this.port, () => {
			console.log('Server running at port:', this.port);
		});
	}

}
