import { Module } from "@nestjs/common";
import { DonationAlertWidgetRepository } from "./donation-alert-widget.repository";
import { DonationAlertWidgetService } from "./donation-alert-widget.service";
import { DatabaseModule } from "src/_common/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [DonationAlertWidgetService, DonationAlertWidgetRepository],
  exports: [DonationAlertWidgetService],
	controllers: [],
})
export class DonationAlertWidgetModule { }
