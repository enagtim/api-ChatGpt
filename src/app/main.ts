import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TYPES } from '../types';
import { PrismaClient } from '@prisma/client';
import { IAuthRepository } from '../repositories/AuthRepository/auth.repository.interface';
import { AuthRepository } from '../repositories/AuthRepository/auth.repository';
import { IAuthService } from '../services/auth.service.interface';
import { AuthService } from '../services/auth.service';
import { IAuthController } from '../controllers/AuthController/auth.controller.interface';
import { AuthController } from '../controllers/AuthController/auth.controller';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
	bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);
	bind<IAuthService>(TYPES.AuthService).to(AuthService);
	bind<IAuthController>(TYPES.AuthController).to(AuthController);
	bind<App>(TYPES.Application).to(App);
});
async function bootstrap(): Promise<{ appContainer: Container; app: App }> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init(appContainer);
	return { appContainer, app };
}
export const boot = bootstrap();
