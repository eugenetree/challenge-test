import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { OauthProviderModule } from 'src/oauth-provider/oauth-provide.module';
import { DatabaseModule } from 'src/_common/database/database.module';
import { UserRepository } from './user.repository';
import { AlertWidgetModule } from 'src/alert-widget/alert-widget.module';
import { DonationAlertModule } from 'src/donation-alert/donation-alert.module';

@Module({
  imports: [
    DatabaseModule,
    OauthProviderModule,
    AlertWidgetModule,
    DonationAlertModule,
  ],
  exports: [UserRepository, UserService],
  providers: [UserRepository, UserService],
})
export class UserModule {}
