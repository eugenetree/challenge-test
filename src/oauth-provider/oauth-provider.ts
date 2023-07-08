import { ID } from "src/_common/types";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().optional(),
	accessToken: z.string(),
	refreshToken: z.string(),
	profileId: z.string(),
	type: z.enum(['twitch', 'youtube']),
	userId: z.string().optional(),
});

type OauthProviderInputParams = z.input<typeof paramsSchema>;

export class OauthProvider {
	id: ID;
	accessToken: string;
	refreshToken: string;
	profileId: string;
	type: "twitch" | "youtube";
	userId: ID;

	constructor (params: OauthProviderInputParams) {
		paramsSchema.parse(params);
		Object.assign(this, params);
	}
};