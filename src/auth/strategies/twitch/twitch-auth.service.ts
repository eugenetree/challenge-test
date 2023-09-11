import { SettingsService } from "src/_common/settings/settings.service";
import { LoggerService } from "src/_common/logger/logger.service";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/user";
import { ID } from "src/_common/types";
import { TwitchAuthApiService } from "./twtch-auth-api.service";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";
import { OauthProvider } from "src/oauth-provider/oauth-provider";
import { OauthProviderRepository } from "src/oauth-provider/oauth-provider.repository";

@Injectable()
export class TwitchAuthService {
	constructor(
		private readonly settingsService: SettingsService,
		private readonly loggerService: LoggerService,
		private readonly twitchAuthApiService: TwitchAuthApiService,
		private readonly userRepository: UserRepository,
		private readonly userService: UserService,
		private readonly oauthProviderRepository: OauthProviderRepository,
	) { }

	getUrlToBeginAuth = (
		{ successUrl, failUrl }: { successUrl: string; failUrl: string; }
	): string => {
		return 'https://id.twitch.tv/oauth2/authorize?' +
			new URLSearchParams({
				response_type: 'code',
				client_id: this.settingsService.TWITCH_CLIENT_ID,
				redirect_uri: this.getRedirectUrl(),
				scope: 'user:read:email',
				state: `successUrl=${successUrl}&failUrl=${failUrl}`,
			})
	}


	getRedirectUrlsFromCallback = (state: string): { successUrl: string; failUrl: string } => {
		const urlParams = new URLSearchParams(state);
		const successUrl = urlParams.get('successUrl');
		const failUrl = urlParams.get('failUrl');

		if (!successUrl || !failUrl) {
			throw new Error('Incorrect state param in twitch callback');
		}

		return {
			successUrl,
			failUrl,
		}
	}

	authenticate = async (code: string): Promise<User> => {
		this.loggerService.info(TwitchAuthService.name, `Requesting user tokens and data by code: ${code}`)

		const { accessToken, refreshToken, profile } = await this.twitchAuthApiService.getDataByOauthCode(code);

		const user = await this.userRepository.findOneByOauthProvider({ where: { profileId: profile.id } });

		this.loggerService.info(
			TwitchAuthService.name,
			`User was found by profileId ${profile.id}: ${JSON.stringify(user)}`
		);

		if (user) return user;

		const createdUser = await this.userService.createViaOauth({
			accessToken,
			refreshToken,
			oauthProviderProfileId: profile.id,
			type: 'twitch'
		})

		this.loggerService.info(
			TwitchAuthService.name,
			`New user was created: ${JSON.stringify(createdUser)}`
		);

		return createdUser;
	}


	linkProviderToAccount = async ({ code, userId }: { code: string; userId: ID }) => {
		const { accessToken, refreshToken, profile } = await this.twitchAuthApiService.getDataByOauthCode(code);

		return this.oauthProviderRepository.create({
			data: {
				accessToken,
				refreshToken,
				profileId: profile.id,
				type: 'twitch',
				userId,
			}
		})
	};

	private getRedirectUrl = () => {
		const host = this.settingsService.ENV === 'development' ?
			'http://localhost:3000' :
			this.settingsService.BACK_APP_URL;

		return `${host}/auth/twitch/callback`;
	}
}