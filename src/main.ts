import { IncomingMessage } from 'node:http';
import { randomUUID } from 'node:crypto';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as qs from 'qs';

import { AppModule } from './app.module';

async function bootstrap() {
	const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			trustProxy: true,
			genReqId: (req: IncomingMessage): string => {
				return req.headers['x-request-id'] as string ?? randomUUID();
			},
			querystringParser: (queryStr): qs.ParsedQs => qs.parse(queryStr, { arrayLimit: 100 })
		})
	);
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
