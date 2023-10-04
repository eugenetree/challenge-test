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
import { DonationAlertModule } from './donation-alert/donation-alert.module';
import { AlertWidgetModule } from './alert-widget/alert-widget.module';
import { AppController } from './app.controller';
import { DonationNotifierModule } from './donation-notifier/donation-notifier.module';
import { UserMediaModule } from './media/media.module';
import { SessionModule } from './auth/session/session.module';
import { TemplateModule } from './template/template.module';
// import { PanelModule } from './panel/panel.module';

@Module({
  imports: [
    UserModule,
    UserMediaModule,
    DatabaseModule,
    OauthProviderModule,
    AuthModule,
    DonationModule,
    DonationPaymentModule,
    DonationAlertModule,
    AlertWidgetModule,
    SocketModule,
    DonationNotifierModule,
    SessionModule,
    TemplateModule,
    // PanelModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
