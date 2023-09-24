import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DonationAlertService } from './donation-alert.service';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';

@UseGuards(AuthSessionGuard)
@Controller('alert-widgets-groups/:alertWidgetsGroupId/widgets')
export class DonationAlertController {
  constructor(private readonly donationAlertService: DonationAlertService) {}

  @Post()
  create(
    @Param('alertWidgetsGroupId') alertWidgetsGroupId: string,
    @UserId() userId: ID,
  ) {
    return this.donationAlertService.create({
      alertWidgetsGroupId,
      userId,
    });
  }
}
