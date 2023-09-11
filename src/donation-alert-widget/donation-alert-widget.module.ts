import { Module } from "@nestjs/common";
import { DonationAlertWidgetRepository } from "./donation-alert-widget.repository";
import { DatabaseModule } from "src/_common/database/database.module";
import { DonationAlertWidgetController } from "./donation-alert-widget.controller";
import { DonationAlertWidgetService } from "./donation-alert-widget.service";
import { SessionModule } from "src/auth/session/session.module";

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [DonationAlertWidgetRepository, DonationAlertWidgetService],
  exports: [DonationAlertWidgetRepository, DonationAlertWidgetService],
	controllers: [DonationAlertWidgetController],
})
export class DonationAlertWidgetModule { }
