import express from 'express';
import http from 'http';
import { Server as ServerIO } from 'socket.io';
import cors from 'cors';
import { envs } from './config/envs';
import { Sockets } from './sockets';
import { dbConnection } from './database/config';

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

	middlewares() {
		this.app.use(cors());
	}

	configSockets() {
		new Sockets(this.io);
	}

	async configDatabase () {
		await dbConnection();
	}

	async execute() {
		this.middlewares();

		this.configSockets();

		await this.configDatabase();

		this.server.listen(this.port, () => {
			console.log('Server running at port:', this.port);
		});
	}

}
