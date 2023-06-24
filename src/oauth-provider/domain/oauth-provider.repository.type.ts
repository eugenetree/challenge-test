import { OauthProvider, OauthProviderFields } from "./oauth-provider";

export abstract class OauthProviderRepository {
	create: (payload: { data: OauthProvider }) => Promise<OauthProvider>;

	findOne: ({ where }:
		{ where: Partial<OauthProviderFields> }) => Promise<OauthProvider | null>;
}