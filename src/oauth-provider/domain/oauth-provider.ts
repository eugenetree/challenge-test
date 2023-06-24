import { ID } from "src/_common/types";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().optional(),
	accessToken: z.string(),
	refreshToken: z.string(),
	profileId: z.string(),
	type: z.enum(['twitch', 'youtube']),
	userId: z.string(),
});

export type OauthProviderInputParams = z.infer<typeof paramsSchema>;

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

// preparation in advance for model expanding in future
export type OauthProviderFields = Omit<OauthProvider, ''>;