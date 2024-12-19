import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TYPES } from '../types';
import { PrismaClient } from '@prisma/client';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
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
