import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { UserRepository } from "../domain/user.repository.type";
import { OauthProviderRepository } from "src/oauth-provider/domain/oauth-provider.repository.type";
import { DatabaseService } from "src/_common/database/database.service";
import { OauthProvider } from "src/oauth-provider/domain/oauth-provider";
import { User } from "../domain/user";

@Injectable()
export class UserService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly userRepository: UserRepository,
		private readonly oauthProviderRepository: OauthProviderRepository,
	) { }

	createWithOauth = async ({
		accessToken,
		refreshToken,
		oauthProviderProfileId,
		type
	}) => {
		const wasOauthProviderAlreadyUsed =
			Boolean(await this.oauthProviderRepository.findOne({ where: { profileId: oauthProviderProfileId } }));

		if (wasOauthProviderAlreadyUsed) {
			throw new Error('Oauth provider has been already used');
		}

		const userId = this.databaseService.generateId();

		return this.userRepository.createWithOauthProvider({
			data: {
				user: new User({ token: this.generateUniqueToken() }),
				oauthProvider: new OauthProvider({
					accessToken,
					refreshToken,
					profileId: oauthProviderProfileId,
					type,
					userId,
				}),
			}
		})
	}

	private generateUniqueToken(): string {
		return crypto.randomUUID();
	}
}