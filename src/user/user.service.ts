import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserRepository } from './user.repository';
import { OauthProviderRepository } from 'src/oauth-provider/oauth-provider.repository';
import { DonationAlertService } from 'src/donation-alert/donation-alert.service';
import { AlertWidgetService } from 'src/alert-widget/alert-widget.service';
import { User } from './user';
import { DonationAlertRepository } from 'src/donation-alert/donation-alert.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly oauthProviderRepository: OauthProviderRepository,
    private readonly alertWidgetService: AlertWidgetService,
    private readonly donationAlertService: DonationAlertService,
    private readonly donationAlertRepository: DonationAlertRepository,
  ) {}

  createViaOauth = async ({
    accessToken,
    refreshToken,
    oauthProviderProfileId,
    type,
  }): Promise<User> => {
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

    await this.donationAlertService.createDefault({
      userId: createdUser.id,
      alertWidgetId: createdAlertWidget.id,
    });

    return createdUser;
  };

  private generateUniqueToken(): string {
    return crypto.randomUUID();
  }
}
