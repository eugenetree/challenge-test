import { Module, forwardRef } from "@nestjs/common";
import { DonationNotifierService } from "./donation-notifier.service";
import { DonationModule } from "src/donation/donation.module";
import { DatabaseModule } from "src/_common/database/database.module";
import { AlertWidgetsGroupModule } from "src/alert-widgets-group/alert-widgets-group.module";
import { DonationAlertWidgetModule } from "src/donation-alert-widget/donation-alert-widget.module";
import { SocketModule } from "src/_common/socket/socket.module";

@Module({
	imports: [forwardRef(() => DonationModule), DatabaseModule, AlertWidgetsGroupModule, DonationAlertWidgetModule, SocketModule],
	providers: [DonationNotifierService],
	exports: [DonationNotifierService],
})
export class DonationNotifierModule { }