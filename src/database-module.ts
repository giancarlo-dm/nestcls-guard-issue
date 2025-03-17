import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseMiddleware } from './database.middleware';

@Module({
	providers: [DatabaseMiddleware]
})
export class DatabaseModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(DatabaseMiddleware).forRoutes('(.*)');
	}
}
