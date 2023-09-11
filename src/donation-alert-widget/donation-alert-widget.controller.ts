import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { DonationAlertWidgetService } from "./donation-alert-widget.service";
import { AuthSessionGuard } from "src/auth/auth-session.guard";
import { UserId } from "src/auth/session/session.decorator";
import { ID } from "src/_common/types";

@UseGuards(AuthSessionGuard)
@Controller('alert-widgets-groups/:alertWidgetsGroupId/widgets')
export class DonationAlertWidgetController {
  constructor(
    private readonly donationAlertWidgetService: DonationAlertWidgetService,
  ) { }

  @Post()
  create(
    @Param('alertWidgetsGroupId') alertWidgetsGroupId: string,
    @UserId() userId: ID,
  ) {
    return this.donationAlertWidgetService.create({
      alertWidgetsGroupId,
      userId,
    });
  }
}