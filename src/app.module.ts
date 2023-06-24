import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './_common/database/database.module';
import { OauthProviderModule } from './oauth-provider/oauth-provide.module';
import { AuthModule } from './auth/auth.module';
import { DonationModule } from './donation/donation.module';
import { DonationPaymentModule } from './donation-payment/donation-payment.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    OauthProviderModule,
    AuthModule,
    DonationModule,
    DonationPaymentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}