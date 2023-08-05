import { ID } from "src/_common/types";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	userId: z.string(),
  donationAlertWidgetId: z.string().nullable().optional().default(null),
});

export type UserMediaInputParams = z.input<typeof paramsSchema>;

export class UserMedia {
	id: ID;
	name: string;
	userId: ID;
  donationAlertWidgetId: ID | null;

	constructor(params: UserMediaInputParams) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}
};