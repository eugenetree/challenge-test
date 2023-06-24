import { ID } from "src/_common/types";
import { z } from "zod";
import { pick } from "lodash";

const paramsSchema = z.object({
	id: z.string().optional(),
	currency: z.string(),
	amount: z.number(),
	senderName: z.string(),
	message: z.string(),
	paymentSystem: z.enum(['fondy', 'manual']),
	paymentStatus: z.enum(['idle', 'progress', 'success', 'fail']).optional().default('idle'),
	paymentData: z.object({}).catchall(z.any()).nullable().optional().default(null),
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
	paymentSystem: 'fondy' | 'manual';
	paymentStatus: 'idle' | 'progress' | 'success' | 'fail';
	paymentData: Record<string, unknown> | null;
	notificationWasPlayed: boolean;
	recipientId: ID;

	constructor(params: DonationInputParams) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}

	markSuccessfulPayment = (params: { paymentData: Donation['paymentData'] }) => {
		this.paymentStatus = 'success';
		this.paymentData = params.paymentData;
	}

	markFailedPayment = () => {
		this.paymentStatus = 'fail';
	}
};

// preparation in advance for model expanding in future
export type DonationFields = Omit<Donation, 'markSuccessfulPayment' | 'markFailedPayment'>;
