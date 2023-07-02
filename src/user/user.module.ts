import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { OauthProviderModule } from 'src/oauth-provider/oauth-provide.module';
import { DatabaseModule } from 'src/_common/database/database.module';
import { UserRepository } from './user.repository';
import { AlertWidgetsGroupModule } from 'src/alert-widgets-group/alert-widgets-group.module';
import { DonationAlertWidgetModule } from 'src/donation-alert-widget/donation-alert-widget.module';

@Module({
	imports: [DatabaseModule, OauthProviderModule, AlertWidgetsGroupModule, DonationAlertWidgetModule],
	exports: [UserRepository, UserService],
	providers: [UserRepository, UserService],
})
export class UserModule { }
