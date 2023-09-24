import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthSessionGuard } from 'src/auth/auth-session.guard';
import { DonationGoalWidgetService } from './donation-goal-widget.service';
import { UserId } from 'src/auth/session/session.decorator';
import { ID } from 'src/_common/types';

@UseGuards(AuthSessionGuard)
@Controller('donation-goal-widgets')
export class DonationAlertController {
  constructor(
    private readonly donationGoalWidgetService: DonationGoalWidgetService,
  ) {}

  @Post()
  create(@UserId() userId: ID) {
    return this.donationGoalWidgetService.create({});
  }
}
