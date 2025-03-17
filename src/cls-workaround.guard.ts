import { ClsGuard, ClsGuardOptions, ClsService } from 'nestjs-cls';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { CLS_GUARD_OPTIONS } from 'nestjs-cls/dist/src/lib/cls.internal-constants';

@Injectable()
export class ClsWorkaroundGuard extends ClsGuard {

	readonly #cls: ClsService;

	constructor(
		@Inject(CLS_GUARD_OPTIONS)
		options: Omit<ClsGuardOptions, 'mount'>,
		cls: ClsService
	) {
		super(options);
		this.#cls = cls;
	}


	async canActivate(context: ExecutionContext): Promise<boolean> {
		if (this.#cls.isActive()) {
			return true;
		}

		return super.canActivate(context);
	}
}
