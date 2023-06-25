import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export class CreatePaymentUrlDto extends createZodDto(
	z.object({
		donationId: z.string(),
		paymentSystem: z.enum(['fondy']),
		redirectUrlAfterPayment: z.string(),
	})
) { }

export class DonationPaymentCallbackBodyDto extends createZodDto(
	z.object({}).catchall(z.any()),
) { }

export class DonationPaymentCallbackQueryDto extends createZodDto(
	z.object({ id: z.string() })
) { }