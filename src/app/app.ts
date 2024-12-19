import express, { Express } from 'express';
import { Server } from 'http';
import dotenv from 'dotenv';
import { Container, inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';
import { setupAuthRoutes } from '../routes/auth.routes';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	constructor(@inject(TYPES.PrismaClient) private prismaclient: PrismaClient) {
		this.app = express();
		this.port = 5000;
	}
	public async init(appContainer: Container) {
		this.app.use(express.json());
		this.app.use(setupAuthRoutes(appContainer));
		dotenv.config();
		this.prismaclient.$connect();
		this.server = this.app.listen(this.port, () => {
			console.log(`Server start on http://localhost:${this.port}`);
		});
	}
	public close(): void {
		this.server.close();
	}
}
