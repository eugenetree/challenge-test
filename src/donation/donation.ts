import { ID } from "src/_common/types";

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
	donationGoalWidgetId: ID | null;
};