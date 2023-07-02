import { ID } from "src/_common/types";
import { z } from "zod";


const paramsSchema = z.object({
	id: z.string().optional(),
	userId: z.string(),
});

export type AlertWidgetsGroupInputParams = z.input<typeof paramsSchema>;

export class AlertWidgetsGroup {
	id: ID;
	userId: ID;

	constructor (params: AlertWidgetsGroupInputParams) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}
}