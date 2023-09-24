import { Module } from '@nestjs/common';
import { DonationNotifierService } from './donation-notifier.service';
import { DatabaseModule } from 'src/_common/database/database.module';
import { AlertWidgetModule } from 'src/alert-widget/alert-widget.module';
import { DonationAlertModule } from 'src/donation-alert/donation-alert.module';
import { SocketModule } from 'src/_common/socket/socket.module';

@Module({
  imports: [
    DatabaseModule,
    AlertWidgetModule,
    DonationAlertModule,
    SocketModule,
  ],
  providers: [DonationNotifierService],
  exports: [DonationNotifierService],
})
export class DonationNotifierModule {}
