import { Module } from "@nestjs/common";
import { DonationNotifierService } from "./donation-notifier.service";
import { DatabaseModule } from "src/_common/database/database.module";
import { AlertWidgetsGroupModule } from "src/alert-widgets-group/alert-widgets-group.module";
import { DonationAlertWidgetModule } from "src/donation-alert-widget/donation-alert-widget.module";
import { SocketModule } from "src/_common/socket/socket.module";

@Module({
	imports: [DatabaseModule, AlertWidgetsGroupModule, DonationAlertWidgetModule, SocketModule],
	providers: [DonationNotifierService],
	exports: [DonationNotifierService],
})
export class DonationNotifierModule { }