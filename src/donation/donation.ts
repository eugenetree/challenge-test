import { ID } from "src/_common/types";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().optional(),
	currency: z.string(),
	amount: z.number(),
	senderName: z.string(),
	message: z.string(),
	paymentSystem: z.enum(['fondy', 'test']),
	paymentStatus: z.enum(['notPaid', 'success', 'fail']).optional().default('notPaid'),
	paymentData: z.object({}).catchall(z.any()).nullable().optional().default(null),
	paymentUrl: z.string().optional(),
	notificationWasPlayed: z.boolean().optional().default(false),
	recipientId: z.string(),
});

export type DonationInputParams = z.input<typeof paramsSchema>;

export class Donation {
	id: ID;
	currency: string;
	amount: number;
	senderName: string;
	message: string;
	paymentSystem: 'fondy' | 'test';
	paymentStatus: 'notPaid' | 'success' | 'fail';
	paymentData: Record<string, unknown> | null;
	notificationWasPlayed: boolean;
	recipientId: ID;

	constructor(params: DonationInputParams) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}
};