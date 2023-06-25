import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export class CreateRealDonationDto extends createZodDto(
	z.object({
		currency: z.enum(['uah']),
		amount: z.number(),
		senderName: z.string(),
		message: z.string(),
		recipientId: z.string(),
		paymentSystem: z.enum(['fondy']),
	})
) { }

export class CreateTestDonationDto extends createZodDto(
	z.object({
		currency: z.enum(['uah']),
		amount: z.string().transform(Number),
		senderName: z.string(),
		message: z.string(),
	})
) { }