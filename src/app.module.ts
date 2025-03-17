import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClsGuard, ClsModule } from 'nestjs-cls';
import { FastifyRequest } from 'fastify';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Interceptor } from './interceptor';
import { DatabaseModule } from './database-module';
import { ClsWorkaroundGuard } from './cls-workaround.guard';
import { randomUUID } from 'node:crypto';

@Module({
	imports: [
		ClsModule.forRoot({
			global: true,
			guard: {
				mount: false,
				generateId: true,
				idGenerator: () => randomUUID()
			},
			interceptor: { mount: false },
			// middleware: { mount: false },
			middleware: {
				mount: true,
				generateId: true,
				idGenerator: (req: FastifyRequest) => req.id
			}
		}),
		DatabaseModule
	],

	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ClsGuard
		},
		// A possible workaround
		// {
		// 	provide: APP_GUARD,
		// 	useClass: ClsWorkaroundGuard
		// },
		{
			provide: APP_INTERCEPTOR,
			useClass: Interceptor
		}
	]
})
export class AppModule {


}
