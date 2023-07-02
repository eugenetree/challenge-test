import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { User } from "./user";
import { UserRepository } from "./user.repository";
import { OauthProvider } from "src/oauth-provider/oauth-provider";
import { OauthProviderService } from "src/oauth-provider/oauth-provider.service";
import { AlertWidgetsGroupService } from "src/alert-widgets-group/alert-widgets-group.service";
import { DonationAlertWidgetService } from "src/donation-alert-widget/donation-alert-widget.service";

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly oauthProviderService: OauthProviderService,
		private readonly alertWidgetsGroupService: AlertWidgetsGroupService,
		private readonly donationAlertWidgetService: DonationAlertWidgetService,
	) { }

	createWithOauth = async ({
		accessToken,
		refreshToken,
		oauthProviderProfileId,
		type
	}) => {
		const wasOauthProviderAlreadyUsed =
			Boolean(await this.oauthProviderService.findOne({ where: { profileId: oauthProviderProfileId } }));

		if (wasOauthProviderAlreadyUsed) {
			throw new Error('Oauth provider has been already used');
		}

		const createdUser = await this.userRepository.create({
			data: new User(
				{ token: this.generateUniqueToken() })
		});

		console.log(2);

		await this.oauthProviderService.create({
			data: new OauthProvider({
				accessToken,
				refreshToken,
				profileId: oauthProviderProfileId,
				type,
				userId: createdUser.id,
			})
		});

		const createdAlertWidgestGroup = await this.alertWidgetsGroupService.create({
			data: {
				userId: createdUser.id,
			}
		});

		await this.donationAlertWidgetService.create({
			data: {
				alertWidgetsGroupId: createdAlertWidgestGroup.id,
				userId: createdUser.id,
				text: 'Thank you for your donation!',
			}
		})

		return createdUser;
	}

	private generateUniqueToken(): string {
		return crypto.randomUUID();
	}
}