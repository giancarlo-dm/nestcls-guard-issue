import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements NestInterceptor {

	readonly #cls: ClsService;


	constructor(cls: ClsService) {
		this.#cls = cls;
	}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		this.#cls.set('interceptor', 10);
		console.log('Interceptor request id:', this.#cls.getId());
		// console.log('Interceptor store:', this.#cls.get());

		return next.handle();
	}
}
