import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { User } from './user';
import { UserRepository } from './user.repository';
import { OauthProvider } from 'src/oauth-provider/oauth-provider';
import { AlertWidgetsGroup } from 'src/alert-widgets-group/alert-widgets-group';
import { DonationAlertWidget } from 'src/donation-alert-widget/donation-alert-widget';
import { OauthProviderRepository } from 'src/oauth-provider/oauth-provider.repository';
import { AlertWidgetsGroupRepository } from 'src/alert-widgets-group/alert-widgets-group.repository';
import { DonationAlertWidgetRepository } from 'src/donation-alert-widget/donation-alert-widget.repository';
import { MediaService } from 'src/media/media.service';
import { DonationAlertWidgetService } from 'src/donation-alert-widget/donation-alert-widget.service';
import { AlertWidgetsGroupService } from 'src/alert-widgets-group/alert-widgets-group.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly oauthProviderRepository: OauthProviderRepository,
    private readonly alertWidgetsGroupService: AlertWidgetsGroupService,
    private readonly donationAlertWidgetService: DonationAlertWidgetService,
  ) {}

  createViaOauth = async ({
    accessToken,
    refreshToken,
    oauthProviderProfileId,
    type,
  }) => {
    const createdUser = await this.userRepository.create({
      data: { token: this.generateUniqueToken() },
    });

    await this.oauthProviderRepository.create({
      data: {
        accessToken,
        refreshToken,
        profileId: oauthProviderProfileId,
        type,
        userId: createdUser.id,
      },
    });

    const createdAlertWidgetsGroup = await this.alertWidgetsGroupService.create(
      { userId: createdUser.id },
    );

    const createdWidget = await this.donationAlertWidgetService.create({
      userId: createdUser.id,
      alertWidgetsGroupId: createdAlertWidgetsGroup.id,
    });

    return {
      ...createdUser,
      alertWidgetsGroup: {
        ...createdAlertWidgetsGroup,
        widgets: [createdWidget],
      },
    };
  };

  private generateUniqueToken(): string {
    return crypto.randomUUID();
  }
}
