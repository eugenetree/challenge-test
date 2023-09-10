import { ID } from "src/_common/types";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	userId: z.string().nullable().optional().default(null),
  donationAlertWidgetId: z.string().nullable().optional().default(null),
});

export type ImageInputParams = z.input<typeof paramsSchema>;

export class Image {
	id: ID;
	name: string;
	userId: ID | null;
  donationAlertWidgetId: ID | null;

	constructor(params: ImageInputParams) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}
};