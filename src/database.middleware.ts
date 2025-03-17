import { Injectable, NestMiddleware } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {

	readonly #cls: ClsService;

	constructor(cls: ClsService) {
		this.#cls = cls;
	}

	use(_req: FastifyRequest, _res: FastifyReply, next: () => void): void {
		this.#cls.set('database', 'database middleware was set');
		console.log('DatabaseMiddleware request id', this.#cls.getId());
		// console.log('DatabaseMiddleware store', this.#cls.get());
		next();
	}
}
