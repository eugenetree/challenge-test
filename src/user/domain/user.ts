import { ID } from "src/_common/types";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().optional(),
	email: z.string().nullable().optional().default(null),
	username: z.string().nullable().optional().default(null),
	token: z.string(),
});

type Params = z.input<typeof paramsSchema>;

export class User {
	id: ID;
	email: string | null;
	username: string | null;
	token: string;
	
	constructor (params: Params) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}
};

// preparation in advance for model expanding in future
export type UserFields = Omit<User, ''>;