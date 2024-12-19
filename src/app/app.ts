import express, { Express } from 'express';
import { Server } from 'http';
import dotenv from 'dotenv';
import { Container, inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	constructor(@inject(TYPES.PrismaClient) private prismaclient: PrismaClient) {
		this.app = express();
		this.port = 8000;
	}
	public async init(appContainer: Container) {
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
