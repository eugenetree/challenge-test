import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export class TwitchAuthInitDto extends createZodDto(
	z.object({
		successUrl: z.string(),
		failUrl: z.string(),
	})
) { }

export class TwitchAuthCallbackDto extends createZodDto(
	z.object({
		code: z.string(),
		error: z.string().optional(),
		state: z.string(),
	})	
) {}