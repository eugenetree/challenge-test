import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './_common/database/database.module';
import { OauthProviderModule } from './oauth-provider/oauth-provide.module';
import { AuthModule } from './auth/auth.module';
import { DonationModule } from './donation/donation.module';
import { DonationPaymentModule } from './donation-payment/donation-payment.module';
import { SocketModule } from './_common/socket/socket.module';
import { DonationAlertWidgetModule } from './donation-alert-widget/donation-alert-widget.module';
import { AlertWidgetsGroupModule } from './alert-widgets-group/alert-widgets-group.module';
import { AppController } from './app.controller';
import { DonationNotifierModule } from './donation-notifier/donation-notifier.module';
import { UserMediaModule } from './media/media.module';
import { SessionModule } from './auth/session/session.module';

@Module({
  imports: [
    UserModule,
    UserMediaModule,
    DatabaseModule,
    OauthProviderModule,
    AuthModule,
    DonationModule,
    DonationPaymentModule,
    DonationAlertWidgetModule,
    AlertWidgetsGroupModule,
    SocketModule,
    DonationNotifierModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule { }