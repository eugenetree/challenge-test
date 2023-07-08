import { ID } from "src/_common/types";
import { z } from "zod";


const paramsSchema = z.object({
	id: z.string().optional(),
	text: z.string(),
	minAmount: z.number().nullable().optional().default(null),
	maxAmount: z.number().nullable().optional().default(null),
	specificAmount: z.number().nullable().optional().default(null),
	userId: z.string().optional(),
	alertWidgetsGroupId: z.string().optional(),
});

export type DonationAlertWidgetInputParams = z.input<typeof paramsSchema>;

export class DonationAlertWidget {
	id: ID;
	text: string;
	minAmount: number | null;
	maxAmount: number | null;
	specificAmount: number | null;
	userId: ID;
	alertWidgetsGroupId: ID;

	constructor (params: DonationAlertWidgetInputParams) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}
}