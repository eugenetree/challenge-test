import { Module } from "@nestjs/common";
import { DonationNotifierService } from "./donation-notifier.service";
import { DonationModule } from "src/donation/donation.module";
import { DatabaseModule } from "src/_common/database/database.module";
import { AlertWidgetsGroupModule } from "src/alert-widgets-group/alert-widgets-group.module";
import { DonationAlertWidgetModule } from "src/donation-alert-widget/donation-alert-widget.module";

@Module({
	imports: [DonationModule, DatabaseModule, AlertWidgetsGroupModule, DonationAlertWidgetModule],
	providers: [DonationNotifierService],
	exports: [DonationNotifierService],
})
export class DonationNotifierModule { }