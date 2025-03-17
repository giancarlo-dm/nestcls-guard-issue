import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClsService } from 'nestjs-cls';

@Controller()
export class AppController {
	readonly #cls: ClsService;

	constructor(
		private readonly appService: AppService,
		cls: ClsService
	) {
		this.#cls = cls;
	}

	@Get()
	getHello(): string {
		console.log('Controller request id', this.#cls.getId());
		console.log('Controller database info:', this.#cls.get()['database']);
		console.log('Controller interceptor info:', this.#cls.get()['interceptor']);
		return this.appService.getHello();
	}
}
