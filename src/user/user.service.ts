import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { User } from './user';
import { UserRepository } from './user.repository';
import { OauthProvider } from 'src/oauth-provider/oauth-provider';
import { AlertWidget } from 'src/alert-widget/alert-widget';
import { DonationAlert } from 'src/donation-alert/donation-alert';
import { OauthProviderRepository } from 'src/oauth-provider/oauth-provider.repository';
import { AlertWidgetRepository } from 'src/alert-widget/alert-widget.repository';
import { DonationAlertRepository } from 'src/donation-alert/donation-alert.repository';
import { MediaService } from 'src/media/media.service';
import { DonationAlertService } from 'src/donation-alert/donation-alert.service';
import { AlertWidgetService } from 'src/alert-widget/alert-widget.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly oauthProviderRepository: OauthProviderRepository,
    private readonly alertWidgetService: AlertWidgetService,
    private readonly donationAlertService: DonationAlertService,
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

    const createdAlertWidget = await this.alertWidgetService.create({
      userId: createdUser.id,
    });

    const createdDonationAlert = await this.donationAlertService.create({
      userId: createdUser.id,
      alertWidgetId: createdAlertWidget.id,
    });

    return {
      ...createdUser,
      alertWidget: {
        ...createdAlertWidget,
        alerts: [createdDonationAlert],
      },
    };
  };

  private generateUniqueToken(): string {
    return crypto.randomUUID();
  }
}
