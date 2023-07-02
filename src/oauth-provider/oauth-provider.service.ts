import { Injectable } from "@nestjs/common";
import { OauthProviderRepository } from "./oauth-provider.repository";
import { OauthProvider } from "./oauth-provider";

@Injectable()
export class OauthProviderService {
	constructor(
		private readonly oauthProviderRepository: OauthProviderRepository,
	) { }

	create = async ({ data }: { data: OauthProvider }): Promise<OauthProvider> => {
		return this.oauthProviderRepository.create({ data });
	}

	findOne = async ({where}: {where: Partial<OauthProvider>}): Promise<OauthProvider | null> => {
		const foundOauthProvider = await this.oauthProviderRepository.findOne({ where });
		return foundOauthProvider ? new OauthProvider(foundOauthProvider) : null;
	}
}