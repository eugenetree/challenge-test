import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export class DonationPaymentRedirectDto extends createZodDto(
	z.object({
		currency: z.literal('uah'),
		amount: z.string().transform(Number),
		senderName: z.string(),
		message: z.string(),
		paymentSystem: z.enum(['fondy', 'manual']),
		redirectUrlAfterPayment: z.string(),
		recipientId: z.string(),
	})
) { }

export class DonationPaymentCallbackBodyDto extends createZodDto(
	z.object({}).catchall(z.any()),
) {}

export class DonationPaymentCallbackQueryDto extends createZodDto(
	z.object({id: z.string()})
) {}