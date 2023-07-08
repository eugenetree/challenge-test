import { Module } from "@nestjs/common";
import { DonationAlertWidgetRepository } from "./donation-alert-widget.repository";
import { DatabaseModule } from "src/_common/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [DonationAlertWidgetRepository],
  exports: [DonationAlertWidgetRepository],
	controllers: [],
})
export class DonationAlertWidgetModule { }
