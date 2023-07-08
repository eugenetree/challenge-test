import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { User } from "./user";
import { UserRepository } from "./user.repository";
import { OauthProvider } from "src/oauth-provider/oauth-provider";
import { AlertWidgetsGroup } from "src/alert-widgets-group/alert-widgets-group";
import { DonationAlertWidget } from "src/donation-alert-widget/donation-alert-widget";

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
	) { }

	createViaOauth = async ({
		accessToken,
		refreshToken,
		oauthProviderProfileId,
		type
	}) => {
		const createdUser = await this.userRepository.createUserViaOauthWithDefaults({
			data: {
				user: new User({ token: this.generateUniqueToken() }),
				oauthProvider: new OauthProvider({
					accessToken,
					refreshToken,
					profileId: oauthProviderProfileId,
					type,
				}),
				alertWidgetsGroup: new AlertWidgetsGroup({}),
				donationAlertWidget: new DonationAlertWidget({
					text: 'Default donation text',
				})
			}
		});

		return createdUser;
	}

	private generateUniqueToken(): string {
		return crypto.randomUUID();
	}
}